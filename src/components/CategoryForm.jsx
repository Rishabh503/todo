// src/components/CategoryForm.jsx
import { useData } from '@/contexts/DataContent';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
// import { useData } from '../contexts/DataContext.jsx,jsx';

const CategoryForm = ({ editCategory = null, onComplete }) => {
  const { addCategory, updateCategory } = useData();
  const [name, setName] = useState(editCategory ? editCategory.name : '');
  const [color, setColor] = useState(editCategory ? editCategory.color : '#6366f1');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    if (editCategory) {
      updateCategory(editCategory.id, { name, color });
    } else {
      addCategory({ name, color });
    }
    
    setName('');
    setColor('#6366f1');
    if (onComplete) onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border-2 border-black retro-shadow mb-4">
      <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
        {editCategory ? 'Edit Category' : 'Create New Category'}
      </h3>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
          placeholder="Enter category name"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium mb-1">
          Category Color
        </label>
        <div className="flex items-center">
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-20 border-2 border-gray-300 rounded mr-2"
          />
          <span className="text-sm text-gray-600">{color}</span>
        </div>
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
          <FaPlus className="mr-1" /> {editCategory ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
