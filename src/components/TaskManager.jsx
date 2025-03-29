import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Trash, PlusCircle } from "lucide-react";
import Draggable from "react-draggable";
import "tailwindcss/tailwind.css";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TaskManager = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: "", details: "", deadline: "", categoryId: "" });

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setCategories(storedCategories);
    setTasks(storedTasks);
    setCalendarEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
  }, [categories, tasks, calendarEvents]);

  const addCategory = () => {
    if (categoryName) {
      const newCategories = [...categories, { id: uuidv4(), name: categoryName }];
      setCategories(newCategories);
      setCategoryName("");
    }
  };

  const addTask = (event) => {
    event.preventDefault();
    if (taskForm.title && taskForm.categoryId) {
      const newTasks = [...tasks, { id: uuidv4(), ...taskForm, completed: false }];
      setTasks(newTasks);
      setTaskForm({ title: "", details: "", deadline: "", categoryId: "" });
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
  };

  const handleDateClick = (slotInfo) => {
    const title = prompt("Enter special note for this day:");
    if (title) {
      const newEvents = [...calendarEvents, { id: uuidv4(), title, date: slotInfo.start }];
      setCalendarEvents(newEvents);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4">
        <input className="border p-2 rounded" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        <button onClick={addCategory} className="bg-blue-500 text-white p-2 rounded">Add Category</button>
      </div>
      
      <form onSubmit={addTask} className="p-4 border rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Add Task</h2>
        <input className="border p-2 w-full mt-2 rounded" placeholder="Task Title" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
        <input className="border p-2 w-full mt-2 rounded" placeholder="Task Details" value={taskForm.details} onChange={(e) => setTaskForm({ ...taskForm, details: e.target.value })} />
        <input className="border p-2 w-full mt-2 rounded" placeholder="Deadline (optional)" value={taskForm.deadline} onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })} />
        <select className="border p-2 w-full mt-2 rounded" value={taskForm.categoryId} onChange={(e) => setTaskForm({ ...taskForm, categoryId: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <button type="submit" className="mt-2 bg-green-500 text-white p-2 rounded w-full">Add Task</button>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">{category.name}</h2>
            {tasks.filter(task => task.categoryId === category.id).map((task) => (
              <Draggable key={task.id}>
                <div className={`p-2 mt-2 border rounded ${task.completed ? "bg-green-500" : "bg-gray-100"}`}>
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />
                  <span className="ml-2">{task.title}</span>
                </div>
              </Draggable>
            ))}
          </div>
        ))}
      </div>
      
      <div>
        <h2 className="text-xl font-bold">Calendar View</h2>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="date"
          endAccessor="date"
          style={{ height: 400 }}
          selectable
          onSelectSlot={handleDateClick}
        />
      </div>
    </div>
  );
};

export default TaskManager;
