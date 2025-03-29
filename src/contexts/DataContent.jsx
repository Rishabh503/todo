import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadState, saveState } from '../utils/localStorage.js';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => loadState('categories') || []);
  const [tasks, setTasks] = useState(() => loadState('tasks') || []);
  const [specialDays, setSpecialDays] = useState(() => loadState('specialDays') || []);

  useEffect(() => {
    saveState('categories', categories);
    saveState('tasks', tasks);
    saveState('specialDays', specialDays);
  }, [categories, tasks, specialDays]);

  // Category Operations
  const addCategory = (category) => {
    const newCategory = {
      id: Date.now().toString(),
      name: category.name,
      color: category.color || '#6366f1'
    };
    setCategories([...categories, newCategory]);
    return newCategory.id;
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  const deleteCategory = (id) => {
    // Delete associated tasks first
    setTasks(tasks.filter(task => task.categoryId !== id));
    // Then delete the category
    setCategories(categories.filter(category => category.id !== id));
  };

  // Task Operations
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      details: task.details || '',
      deadline: task.deadline || null,
      completed: false,
      categoryId: task.categoryId,
      order: tasks.filter(t => t.categoryId === task.categoryId).length
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const reorderTasks = (categoryId, taskIds) => {
    const updatedTasks = [...tasks];
    taskIds.forEach((taskId, index) => {
      const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        updatedTasks[taskIndex] = { 
          ...updatedTasks[taskIndex], 
          order: index 
        };
      }
    });
    setTasks(updatedTasks);
  };

  // Special Day Operations
  const addSpecialDay = (specialDay) => {
    const newSpecialDay = {
      id: Date.now().toString(),
      date: specialDay.date,
      note: specialDay.note
    };
    setSpecialDays([...specialDays, newSpecialDay]);
  };

  const updateSpecialDay = (id, updatedSpecialDay) => {
    setSpecialDays(
      specialDays.map((day) =>
        day.id === id ? { ...day, ...updatedSpecialDay } : day
      )
    );
  };

  const deleteSpecialDay = (id) => {
    setSpecialDays(specialDays.filter(day => day.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        tasks,
        specialDays,
        addCategory,
        updateCategory,
        deleteCategory,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        reorderTasks,
        addSpecialDay,
        updateSpecialDay,
        deleteSpecialDay,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};