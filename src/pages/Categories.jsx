
// src/pages/Categories.jsx
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CategoryForm from '../components/CategoryForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { useData } from '@/contexts/DataContent.jsx';
// import { useData } from '../contexts/DataContext.jsx';

const Categories = () => {
  const { categories } = useData();
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories & Tasks</h1>
        <button
          onClick={() => setIsAddingCategory(!isAddingCategory)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg border-2 border-orange-700 hover:bg-orange-600 transition"
        >
          <FaPlus className="mr-1" /> 
          {isAddingCategory ? 'Cancel' : 'New Category'}
        </button>
      </div>
      
      {isAddingCategory && (
        <CategoryForm onComplete={() => setIsAddingCategory(false)} />
      )}
      
      {categories.length > 0 ? (
        <div className="space-y-6">
          {categories.map(category => (
            <TaskList key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border-2 border-black retro-shadow text-center">
          <h2 className="text-xl font-bold mb-4">No Categories Yet</h2>
          <p className="text-gray-600 mb-4">
            Start by creating a category to organize your tasks.
          </p>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded mx-auto border-2 border-green-700 hover:bg-green-600 transition"
          >
            <FaPlus className="mr-1" /> Create First Category
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;