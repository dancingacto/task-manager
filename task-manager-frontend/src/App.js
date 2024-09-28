// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleCreateDemo = async () => {
    // Your demo account creation logic
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    };

    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-blue-200 to-pink-200">
      <div className="w-full max-w-6xl p-8 bg-white rounded-3xl shadow-2xl">
        {!isLoggedIn ? (
          <div className="w-full max-w-md mx-auto">
            {showSignup ? (
              <Signup onSignup={() => setShowSignup(false)} setShowSignup={setShowSignup} />
            ) : (
              <Login onLogin={handleLogin} handleCreateDemo={handleCreateDemo} setShowSignup={setShowSignup} />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md transition-all"
            >
              Add New Task
            </button>

            {/* TaskList component */}
            <TaskList tasks={tasks} setTasks={setTasks} />

            {/* Modal for adding tasks */}
            <AddTaskModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onTaskAdded={handleTaskAdded}
            />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-4 text-red-500 hover:text-red-700 underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
