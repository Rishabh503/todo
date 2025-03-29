import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaListUl, FaCalendarAlt } from 'react-icons/fa';

const Navigation = () => {
  return (
    <nav className="bg-orange-500 text-white">
      <div className="container mx-auto">
        <ul className="flex">
          <li className="flex-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex flex-col items-center p-3 transition hover:bg-orange-600 ${isActive ? 'bg-orange-700 font-bold' : ''}`
              }
            >
              <FaHome className="text-xl mb-1" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/categories" 
              className={({ isActive }) => 
                `flex flex-col items-center p-3 transition hover:bg-orange-600 ${isActive ? 'bg-orange-700 font-bold' : ''}`
              }
            >
              <FaListUl className="text-xl mb-1" />
              <span>Categories</span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink 
              to="/calendar" 
              className={({ isActive }) => 
                `flex flex-col items-center p-3 transition hover:bg-orange-600 ${isActive ? 'bg-orange-700 font-bold' : ''}`
              }
            >
              <FaCalendarAlt className="text-xl mb-1" />
              <span>Calendar</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;