import { useEffect } from "react";

const ContextMenu = ({ x, y, onClose, onAction, status }) => {
  const options = {
    new: ["Move to Ongoing", "Move to Done"],
    ongoing: ["Move to New", "Move to Done"],
    done: ["Move to New", "Move to Ongoing"],
  };

  useEffect(() => {
    const handleClick = () => onClose();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <div
      className="absolute bg-white border border-slate-200 shadow-xl rounded z-50 min-w-40 dark:bg-slate-900 dark:border-slate-800"
      style={{ top: y, left: x }}
    >
      {options[status].map((option) => (
        <div
          key={option}
          onClick={() => onAction(option)}
          className="px-3 py-1.5 hover:bg-slate-800 cursor-pointer text-sm text-slate-200"
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
