// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal'; // Import the edit modal
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to control add modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // Task currently being edited

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleCreateDemo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      } else {
        alert('Failed to create demo account');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating demo account');
    }
  };

  // Fetch tasks when the component mounts or when isLoggedIn changes
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

  // Handle adding a task
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsAddModalOpen(false);
  };

  // Handle updating a task
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  // Handle editing a task
  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-blue-200 to-pink-200">
      <div className="w-full max-w-4xl p-8 bg-violet-50 rounded-3xl shadow-2xl">
        {!isLoggedIn ? (
          <div className="w-full max-w-md mx-auto">
            {showSignup ? (
              <Signup onSignup={() => setShowSignup(false)} setShowSignup={setShowSignup} />
            ) : (
              <Login
                onLogin={handleLogin}
                handleCreateDemo={handleCreateDemo}
                setShowSignup={setShowSignup}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8">
            {/* Add Task Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md transition-all"
            >
              Add New Task
            </button>

            {/* TaskList component */}
            <TaskList tasks={tasks} setTasks={setTasks} onEdit={handleEdit} />

            {/* Modal for adding tasks */}
            <AddTaskModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              onTaskAdded={handleTaskAdded}
            />

            {/* Modal for editing tasks */}
            <EditTaskModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              taskToEdit={taskToEdit}
              onTaskUpdated={handleTaskUpdated}
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
