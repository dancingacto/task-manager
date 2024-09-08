import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css'; // Include any custom styles if necessary

function App() {
  // State for user authentication and sign-up form
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);

  // Handle login action
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Handle demo account creation
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
            {/* Toggle between Login and Signup forms */}
            <button
              onClick={() => setShowSignup(!showSignup)}
              className="text-blue-500 hover:text-blue-700 mb-4"
            >
              {showSignup ? 'Already have an account? Log in' : 'Don’t have an account? Sign up'}
            </button>
            {showSignup ? (
              <Signup onSignup={() => setShowSignup(false)} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            {/* Demo account button */}
            <div className="mt-4">
              <button
                onClick={handleCreateDemo}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Try Demo Account
              </button>
            </div>
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
