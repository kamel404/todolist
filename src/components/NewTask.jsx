import { useState } from 'react';

const NewTask = ({ onAddTask }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex ">
      <button className='bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600' onClick={() => setIsOpen(!isOpen)}>
        + Add Task
      </button>
      {isOpen && (
        <div>Form goes here</div>
      )}
    </div>
  )
}

export default NewTask