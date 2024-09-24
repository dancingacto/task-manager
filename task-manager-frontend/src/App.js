import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal'; // Import the modal
import './App.css'; // Include any custom styles if necessary

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false); // Toggle between login and signup form
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [tasks, setTasks] = useState([]); // State to hold tasks

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

  // Handle adding a task
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the existing task list
    setIsModalOpen(false); // Close the modal after task is added
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-blue-200 to-pink-200">
      <div className="w-full max-w-4xl p-8 bg-white rounded-3xl shadow-2xl">
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
            {/* Button to trigger modal for adding a task */}
            <button
              onClick={() => setIsModalOpen(true)} // Open the modal
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add New Task
            </button>

            {/* TaskList component */}
            <TaskList />

            {/* Modal for adding tasks */}
            <AddTaskModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)} // Close modal when needed
              onTaskAdded={handleTaskAdded} // Callback for when a task is added
            />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
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
