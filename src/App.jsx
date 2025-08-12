import { useState } from "react";
import Column from "./components/Column";
import TodoCard from "./components/TodoCard";
import ContextMenu from "./components/ContextMenu";
import Header from "./components/Header";
import NewTask from "./components/NewTask";

function App() {

  // Sample starting tasks
  const [tasks, setTasks] = useState([]);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    taskId: null,
    status: null,
  });

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

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">

        {/* New Section Column */}
        <Column title="New" rightElement={<NewTask onAddTask={handleAddTask} />}>
          {tasks
            .filter((t) => t.status === "new")
            .map((task) => (
              <TodoCard
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                onContextMenu={(e) => handleContextMenu(e, task.id, task.status)}
              />
            ))}
        </Column>

        {/* Ongoing Section Column */}
        <Column title="Ongoing">
          {tasks
            .filter((t) => t.status === "ongoing")
            .map((task) => (
              <TodoCard
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                onContextMenu={(e) => handleContextMenu(e, task.id, task.status)}
              />
            ))}
        </Column>

        {/* Done Section Column */}
        <Column title="Done">
          {tasks
            .filter((t) => t.status === "done")
            .map((task) => (
              <TodoCard
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                onContextMenu={(e) => handleContextMenu(e, task.id, task.status)}
              />
            ))}
        </Column>

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
