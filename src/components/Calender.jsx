import { useState } from 'react';
import {
    FaCalendarDay,
    FaCheck,
    FaChevronLeft,
    FaChevronRight,
    FaTimes
} from 'react-icons/fa';
// import { useData } from '../contexts/DataContext.jsx';
import {
    getDaysInMonth,
    getFirstDayOfMonth,
    getNextMonth,
    getPreviousMonth
} from '../utils/dateUtils.js';
import { useData } from '@/contexts/DataContent.jsx';

const Calendar = () => {
  const { tasks, specialDays, addSpecialDay, updateSpecialDay, deleteSpecialDay } = useData();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [specialDayNote, setSpecialDayNote] = useState('');
  const [editingSpecialDay, setEditingSpecialDay] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateToPrevMonth = () => {
    const { year, month } = getPreviousMonth(currentYear, currentMonth);
    setCurrentMonth(month);
    setCurrentYear(year);
    setSelectedDate(null);
  };

  const navigateToNextMonth = () => {
    const { year, month } = getNextMonth(currentYear, currentMonth);
    setCurrentMonth(month);
    setCurrentYear(year);
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    setSelectedDate(dateString);
    
    const existingSpecialDay = specialDays.find(day => day.date === dateString);
    if (existingSpecialDay) {
      setEditingSpecialDay(existingSpecialDay);
      setSpecialDayNote(existingSpecialDay.note);
    } else {
      setEditingSpecialDay(null);
      setSpecialDayNote('');
    }
  };

  const handleSaveSpecialDay = () => {
    if (!specialDayNote.trim()) {
      if (editingSpecialDay) {
        deleteSpecialDay(editingSpecialDay.id);
      }
    } else {
      if (editingSpecialDay) {
        updateSpecialDay(editingSpecialDay.id, { 
          note: specialDayNote 
        });
      } else {
        addSpecialDay({
          date: selectedDate,
          note: specialDayNote
        });
      }
    }
    
    setSelectedDate(null);
    setSpecialDayNote('');
    setEditingSpecialDay(null);
  };

  const getTasksForDate = (dateString) => {
    return tasks.filter(task => task.deadline === dateString);
  };

  const getSpecialDayForDate = (dateString) => {
    return specialDays.find(day => day.date === dateString);
  };

  // Build calendar days
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="bg-white rounded-lg border-2 border-black retro-shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={navigateToPrevMonth}
          className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          <FaChevronLeft />
        </button>
        <h2 className="text-xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button 
          onClick={navigateToNextMonth}
          className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          <FaChevronRight />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center font-bold py-2 bg-orange-100 border border-orange-200">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="calendar-day bg-gray-100 opacity-50"></div>;
          }
          
          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isToday = dateString === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          const isSelected = dateString === selectedDate;
          const tasksForDate = getTasksForDate(dateString);
          const specialDay = getSpecialDayForDate(dateString);
          
          return (
            <div 
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              className={`calendar-day p-2 border-2 cursor-pointer relative overflow-hidden ${
                isToday ? 'bg-orange-100 border-orange-500' : 'bg-white border-gray-200'
              } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="text-right font-bold">{day}</div>
              
              {specialDay && (
                <div className="mt-1 text-sm bg-purple-100 p-1 border-l-4 border-purple-500 line-clamp-1">
                  {specialDay.note}
                </div>
              )}
              
              {tasksForDate.length > 0 && (
                <div className="mt-1">
                  {tasksForDate.length > 2 ? (
                    <div className="text-xs bg-blue-100 p-1 rounded">
                      {tasksForDate.length} tasks due
                    </div>
                  ) : (
                    tasksForDate.map(task => (
                      <div 
                        key={task.id} 
                        className="text-xs truncate p-1 mb-1 rounded"
                        style={{ backgroundColor: `${task.completed ? '#d1fae5' : '#fee2e2'}` }}
                      >
                        {task.title}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedDate && (
        <div className="mt-4 p-4 border-2 border-black rounded bg-amber-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold flex items-center">
              <FaCalendarDay className="mr-1" />
              {selectedDate}
            </h3>
            <button
              onClick={() => {
                setSelectedDate(null);
                setSpecialDayNote('');
                setEditingSpecialDay(null);
              }}
              className="p-1 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Special Note for This Day
            </label>
            <textarea
              value={specialDayNote}
              onChange={(e) => setSpecialDayNote(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded focus:border-orange-500 focus:outline-none"
              placeholder="What's special about this day?"
              rows="2"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveSpecialDay}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded border-2 border-green-700 hover:bg-green-600 transition"
            >
              <FaCheck className="mr-1" /> 
              {editingSpecialDay ? 'Update' : 'Save'}
            </button>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Tasks due on this day:</h4>
            {getTasksForDate(selectedDate).length > 0 ? (
              <ul className="space-y-1">
                {getTasksForDate(selectedDate).map(task => (
                  <li 
                    key={task.id}
                    className={`p-2 border rounded ${task.completed ? 'bg-green-100' : 'bg-red-100'}`}
                  >
                    <div className="font-medium">{task.title}</div>
                    {task.details && <div className="text-sm text-gray-700 mt-1">{task.details}</div>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No tasks due on this day.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;