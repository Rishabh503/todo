import { useState } from 'react';
import { FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
// import { useData } from '../contexts/DataContext.jsx';
import TaskForm from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import { useData } from '@/contexts/DataContent.jsx';
// import TaskForm from './TaskForm.jsx';
// import TaskItem from './TaskItem.jsx';

const TaskList = ({ category }) => {
  const { tasks, deleteCategory, updateCategory, reorderTasks } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const [draggedOverTaskId, setDraggedOverTaskId] = useState(null);

  // Filter tasks for this category and sort by order
  const categoryTasks = tasks
    .filter(task => task.categoryId === category.id)
    .sort((a, b) => a.order - b.order);

  const handleDeleteCategory = () => {
    if (window.confirm(`Are you sure you want to delete "${category.name}" and all its tasks?`)) {
      deleteCategory(category.id);
    }
  };

  const handleUpdateCategory = () => {
    updateCategory(category.id, { name: categoryName });
    setIsEditing(false);
  };

  const handleDragOver = (taskId) => {
    setDraggedOverTaskId(taskId);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData('taskId');
    
    if (draggedTaskId && draggedOverTaskId && draggedTaskId !== draggedOverTaskId) {
      const taskIds = categoryTasks.map(task => task.id);
      const fromIndex = taskIds.indexOf(draggedTaskId);
      const toIndex = taskIds.indexOf(draggedOverTaskId);
      
      if (fromIndex !== -1 && toIndex !== -1) {
        const newTaskIds = [...taskIds];
        newTaskIds.splice(fromIndex, 1);
        newTaskIds.splice(toIndex, 0, draggedTaskId);
        
        reorderTasks(category.id, newTaskIds);
      }
    }
    
    setDraggedOverTaskId(null);
  };

  return (
    <div 
      className="mb-6 bg-orange-100 p-4 rounded-lg border-2 border-black retro-shadow"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
        {isEditing ? (
          <div className="flex items-center w-full">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="flex-1 p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
            />
            <div className="flex ml-2">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
                title="Cancel"
              >
                <FaTimes />
              </button>
              <button
                onClick={handleUpdateCategory}
                className="p-2 text-green-600 hover:text-green-800"
                title="Save"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 
              className="text-xl font-bold"
              style={{ color: category.color }}
            >
              {category.name} ({categoryTasks.length})
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 hover:text-blue-800 transition"
                title="Edit category"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDeleteCategory}
                className="p-1 text-red-600 hover:text-red-800 transition"
                title="Delete category"
              >
                <FaTrash />
              </button>
            </div>
          </>
        )}
      </div>
      
      {categoryTasks.length > 0 ? (
        <div className="space-y-2">
          {categoryTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              categoryColor={category.color}
              onDragStart={() => {}}
              onDragEnd={() => setDraggedOverTaskId(null)}
              onDragOver={() => handleDragOver(task.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No tasks yet. Add your first task!
        </div>
      )}
      
      {isAddingTask ? (
        <TaskForm 
          categoryId={category.id} 
          onComplete={() => setIsAddingTask(false)} 
        />
      ) : ( <button
        onClick={() => setIsAddingTask(true)}
        className="mt-4 w-full py-2 flex items-center justify-center bg-green-500 text-white rounded border-2 border-green-700 hover:bg-green-600 transition"
      >
        <FaPlus className="mr-1" /> Add New Task
      </button>
    )}
  </div>
);
};

export default TaskList;