import { useRef, useState } from 'react';
import {
    FaCalendarAlt,
    FaCheck,
    FaEdit,
    FaGripLines,
    FaTimes,
    FaTrash
} from 'react-icons/fa';
// import { useData } from '../contexts/DataContext.jsx';
import { formatDate } from '../utils/dateUtils.js';
import { useData } from '@/contexts/DataContent.jsx';

const TaskItem = ({ task, categoryColor, onDragStart, onDragEnd, onDragOver, isDraggable = true }) => {
  const { updateTask, deleteTask, toggleTaskCompletion } = useData();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [details, setDetails] = useState(task.details || '');
  const [deadline, setDeadline] = useState(task.deadline || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const dragRef = useRef(null);

  const handleUpdate = () => {
    updateTask(task.id, { title, details, deadline });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDetails(task.details || '');
    setDeadline(task.deadline || '');
    setEditing(false);
  };

  const handleDragStart = (e) => {
    if (!isDraggable) return;
    e.dataTransfer.setData('taskId', task.id);
    if (dragRef.current) {
      dragRef.current.classList.add('dragging');
    }
    if (onDragStart) onDragStart(task.id);
  };

  const handleDragEnd = () => {
    if (!isDraggable) return;
    if (dragRef.current) {
      dragRef.current.classList.remove('dragging');
    }
    if (onDragEnd) onDragEnd();
  };

  const handleDragOver = (e) => {
    if (!isDraggable) return;
    e.preventDefault();
    if (onDragOver) onDragOver(task.id);
  };

  if (editing) {
    return (
      <div 
        className="task-item p-3 mb-2 bg-white rounded-lg border-2 border-black retro-shadow"
        style={{ borderLeft: `5px solid ${categoryColor}` }}
      >
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
            rows="2"
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1 flex items-center">
            <FaCalendarAlt className="mr-1" /> Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
          />
        </div>
        
        <div className="flex justify-end space-x-2 mt-2">
          <button
            onClick={handleCancel}
            className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded border-2 border-gray-400 hover:bg-gray-300 transition"
          >
            <FaTimes className="mr-1" /> Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded border-2 border-blue-700 hover:bg-blue-600 transition"
          >
            <FaCheck className="mr-1" /> Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dragRef}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      className={`task-item p-3 mb-2 rounded-lg border-2 border-black retro-shadow ${task.completed ? 'task-completed' : 'bg-white'}`}
      style={{ borderLeft: `5px solid ${categoryColor}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          {isDraggable && (
            <div className="mr-2 cursor-move mt-1 text-gray-500">
              <FaGripLines />
            </div>
          )}
          <div className="flex-1">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleTaskCompletion(task.id);
                }}
                className="mr-2 h-5 w-5 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
              <h3 
                className={`text-lg font-medium ${task.completed ? 'line-through' : ''}`}
              >
                {task.title}
              </h3>
            </div>
            
            {(isExpanded || (!isExpanded && task.details)) && (
              <div className={`mt-2 text-gray-700 ${!isExpanded && task.details ? 'line-clamp-1' : ''}`}>
                {task.details}
              </div>
            )}
            
            {task.deadline && (
              <div className="mt-1 text-sm flex items-center text-orange-600">
                <FaCalendarAlt className="mr-1" />
                {formatDate(task.deadline)}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-1 ml-2">
          <button
            onClick={() => setEditing(true)}
            className="p-1 text-blue-600 hover:text-blue-800 transition"
            title="Edit task"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 text-red-600 hover:text-red-800 transition"
            title="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;