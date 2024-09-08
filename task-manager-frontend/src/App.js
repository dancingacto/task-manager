import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css'; // Include any custom styles if necessary

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false); // Toggle between login and signup form

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleCreateDemo = async () => {
    try {
      const response = await fetch('http://localhost:4000/users/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        alert(`Logged in as demo user: ${data.user.email}`);
      } else {
        alert('Failed to create demo account');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating demo account');
    }
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
            <AddTask onTaskAdded={() => window.location.reload()} />
            <TaskList />
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
