import { useData } from '@/contexts/DataContent';
import { useState } from 'react';
import { FaCalendarAlt, FaPlus, FaTimes } from 'react-icons/fa';
// import { useData } from '../contexts/DataContext.jsx';

const TaskForm = ({ categoryId, editTask = null, onComplete }) => {
  const { addTask, updateTask } = useData();
  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [details, setDetails] = useState(editTask ? editTask.details : '');
  const [deadline, setDeadline] = useState(editTask ? editTask.deadline : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (editTask) {
      updateTask(editTask.id, { 
        title, 
        details, 
        deadline: deadline || null 
      });
    } else {
      addTask({ 
        categoryId,
        title, 
        details, 
        deadline: deadline || null 
      });
    }
    
    setTitle('');
    setDetails('');
    setDeadline('');
    if (onComplete) onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50 p-4 rounded-lg border-2 border-black retro-shadow mb-4">
      <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
        {editTask ? 'Edit Task' : 'Create New Task'}
      </h3>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="details" className="block text-sm font-medium mb-1">
          Task Details (Optional)
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
          placeholder="Enter task details"
          rows="3"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="deadline" className="block text-sm font-medium mb-1 flex items-center">
          <FaCalendarAlt className="mr-1" /> Deadline (Optional)
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
        />
      </div>
      
      <div className="flex justify-end gap-2">
        {onComplete && (
          <button
            type="button"
            onClick={onComplete}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded border-2 border-gray-400 hover:bg-gray-300 transition"
          >
            <FaTimes className="mr-1" /> Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded border-2 border-green-700 hover:bg-green-600 transition"
        >
          <FaPlus className="mr-1" /> {editTask ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;