import { useState, useRef, useEffect } from "react";
import Column from "./components/Column";
import TodoCard from "./components/TodoCard";
import ContextMenu from "./components/ContextMenu";
import Header from "./components/Header";
import NewTask from "./components/NewTask";

function App() {

  const [tasks, setTasks] = useState([]);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    taskId: null,
    status: null,
  });

  // Check for overdue tasks
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.status === 'ongoing' && task.dueAt && new Date(task.dueAt) <= now) {
          // Check if we've already alerted for this overdue task
          if (!task.alerted) {
            alert(`Task "${task.title}" is overdue!`);
            // Mark that we've alerted for this task to avoid repeated alerts
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, alerted: true } : t));
          }
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = (newTask) => {
    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      status: "new",
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, task]);
  }

  const handleContextMenu = (e, id, status) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      taskId: id,
      status,
    });
  };

  const handleAction = (option) => {
    const statusMap = {
      "Move to New": "new",
      "Move to Ongoing": "ongoing",
      "Move to Done": "done",
    };

    const newStatus = statusMap[option];


    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== contextMenu.taskId) return task;

        const updatedTask = { ...task, status: newStatus };

        if (newStatus === "ongoing") {
          updatedTask.movedAt = new Date().toISOString();
        }

        if (newStatus === "done") {
          updatedTask.completedAt = new Date().toISOString();
        }

        return updatedTask;
      })
    );

    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDragStart = (e, payload) => {
    // payload = { id, status }
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
    e.dataTransfer.effectAllowed = "move";
    console.log("Drag started:", payload);
    // hide context menu if open
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    try {
      const { id, status: fromStatus } = JSON.parse(data);
      if (!id || fromStatus === targetStatus) return;

      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const updated = { ...t, status: targetStatus };
          if (targetStatus === "ongoing") updated.movedAt = new Date().toISOString();
          if (targetStatus === "done") updated.completedAt = new Date().toISOString();
          return updated;
        })
      );
    } catch (err) {
      console.error("Failed to parse drag data", err);
    }

    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleSetDueAt = (id, dueAt) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, dueAt, alerted: false } : t)));
  };

  return (
    <div className="h-screen flex flex-col bg-white text-slate-900 dark:bg-black dark:text-slate-200">
      <Header />
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">

        {/* New Section Column */}
        <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "new")}>
          <Column title="New" rightElement={<NewTask onAddTask={handleAddTask} />}>
            {tasks
              .filter((t) => t.status === "new")
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest tasks first
              .map((task) => (
                <TodoCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onContextMenu={(e) => handleContextMenu(e, task.id, task.status)}
                  onDragStart={handleDragStart}
                />
              ))}
          </Column>
        </div>

        {/* Ongoing Section Column */}
        <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "ongoing")}>
          <Column title="Ongoing">
            {tasks
              .filter((t) => t.status === "ongoing")
              .sort((a, b) => new Date(a.movedAt || 0) - new Date(b.movedAt || 0)) // in order moved
              .map((task) => (
                <TodoCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onContextMenu={(e) => handleContextMenu(e, task.id, task.status)}
                  onDragStart={handleDragStart}
                  dueAt={task.dueAt}
                  onSetDueAt={handleSetDueAt}
                />
              ))}
          </Column>
        </div>

        {/* Done Section Column */}
        <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "done")}>
          <Column title="Done">
            {tasks
              .filter((t) => t.status === "done")
              .sort((a, b) => new Date(a.completedAt || 0) - new Date(b.completedAt || 0)) // in order completed
              .map((task) => (
                <TodoCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onContextMenu={(e) => handleContextMenu(e, task.id, task.status)}
                  onDragStart={handleDragStart}
                />
              ))}
          </Column>
        </div>

      </main>

      {/* Context Menu Display if visible */}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          status={contextMenu.status}
          onClose={() => setContextMenu((prev) => ({ ...prev, visible: false }))}
          onAction={handleAction}
        />
      )}
    </div>
  );
}

export default App;
