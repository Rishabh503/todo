import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
// import Home from './pages/Home.jsx';
// import Categories from './pages/Categories.jsx';
// import CalendarPage from './pages/Calendar.jsx';
import { FaRegCalendarCheck } from 'react-icons/fa';
import CalendarPage from './pages/Calender.jsx';
import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
// import { Home } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <header className="bg-orange-600 text-white p-4 border-b-4 border-black">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <FaRegCalendarCheck />
              Rishabh tracker
            </h1>
          </div>
        </header>
        <Navigation />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
        <footer className="text-center p-4 text-gray-700 bg-amber-100 border-t-2 border-black mt-8">
          <p>&copy; {new Date().getFullYear()} RetroTracker - Your Retro Task Manager</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;