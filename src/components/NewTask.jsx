import { useState } from 'react';

const NewTask = ({ onAddTask }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()){
      onAddTask({title, description});
      
      setTitle("");
      setDescription("");
      setIsOpen(false);
    }
  }

  return (
    <div className="flex ">
      <button className='bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-500' onClick={() => setIsOpen(!isOpen)}>
        + Add Task
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg shadow-xl w-96 border border-slate-800">
            <div className="flex justify-between items-center p-4 border-b border-slate-800">
              <h3 className="text-lg font-medium text-slate-100">Add New Task</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400"
                  placeholder="Enter task title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400"
                  placeholder="Enter task description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-800 text-slate-200 rounded-md border border-slate-700 hover:bg-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewTask