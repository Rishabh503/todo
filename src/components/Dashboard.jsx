import { useData } from '@/contexts/DataContent.jsx';
import { FaCalendarAlt, FaCheckCircle, FaHourglassHalf, FaListAlt } from 'react-icons/fa';
// import { useData } from '../contexts/DataContext.jsx';

const Dashboard = () => {
  // const [tasks,categories, specialDays ] = useData();
  const {tasks,categories, specialDays } = useData();
  // const {tasks}=useData();/
  
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  
  // Tasks due today
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const tasksDueToday = tasks.filter(task => task.deadline === todayStr && !task.completed);
  
  // Tasks due in the next 7 days (including today)
  const next7Days = new Date();
  next7Days.setDate(next7Days.getDate() + 7);
  const next7DaysStr = `${next7Days.getFullYear()}-${String(next7Days.getMonth() + 1).padStart(2, '0')}-${String(next7Days.getDate()).padStart(2, '0')}`;
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.deadline || task.completed) return false;
    return task.deadline >= todayStr && task.deadline <= next7DaysStr;
  });

  // Check for special day today
  const specialDay = specialDays.find(day => day.date === todayStr);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border-2 border-black retro-shadow">
          <div className="flex items-center">
            <FaListAlt className="text-orange-500 text-3xl mr-3" />
            <div>
              <h3 className="font-bold text-gray-700">Categories</h3>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-2 border-black retro-shadow">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 text-3xl mr-3" />
            <div>
              <h3 className="font-bold text-gray-700">Completed</h3>
              <p className="text-2xl font-bold">{completedTasks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-2 border-black retro-shadow">
          <div className="flex items-center">
            <FaHourglassHalf className="text-red-500 text-3xl mr-3" />
            <div>
              <h3 className="font-bold text-gray-700">Pending</h3>
              <p className="text-2xl font-bold">{pendingTasks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-2 border-black retro-shadow">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-500 text-3xl mr-3" />
            <div>
              <h3 className="font-bold text-gray-700">Due Today</h3>
              <p className="text-2xl font-bold">{tasksDueToday.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {specialDay && (
        <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300 retro-shadow">
          <h3 className="font-bold text-lg text-purple-800 flex items-center">
            <FaCalendarAlt className="mr-2" />
            Special Day Today
          </h3>
          <p className="mt-1">{specialDay.note}</p>
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg border-2 border-black retro-shadow">
        <h3 className="font-bold text-lg border-b-2 border-gray-200 pb-2 mb-3">Due Today</h3>
        {tasksDueToday.length > 0 ? (
          <div className="space-y-2">
            {tasksDueToday.map(task => {
              const category = categories.find(cat => cat.id === task.categoryId);
              return (
                <div 
                  key={task.id}
                  className="p-3 border-l-4 rounded bg-red-50"
                  style={{ borderLeftColor: category?.color || '#ef4444' }}
                >
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-500">
                    {category?.name || 'Uncategorized'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic">No tasks due today. Enjoy your day!</p>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg border-2 border-black retro-shadow">
        <h3 className="font-bold text-lg border-b-2 border-gray-200 pb-2 mb-3">Upcoming (Next 7 Days)</h3>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-2">
            {upcomingTasks.map(task => {
              const category = categories.find(cat => cat.id === task.categoryId);
              return (
                <div 
                  key={task.id}
                  className="p-3 border-l-4 rounded bg-blue-50"
                  style={{ borderLeftColor: category?.color || '#3b82f6' }}
                >
                  <div className="font-medium">{task.title}</div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      {category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-sm font-medium text-blue-700">
                      Due: {task.deadline}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic">No upcoming tasks for the next 7 days.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;