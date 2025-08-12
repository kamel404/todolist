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
      className="absolute bg-white border border-gray-200 shadow-md rounded z-50"
      style={{ top: y, left: x }}
    >
      {options[status].map((option) => (
        <div
          key={option}
          onClick={() => onAction(option)}
          className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
