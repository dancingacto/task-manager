import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  // Track user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);

  // Handle regular login (from the Login component)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logging out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Handle demo account creation and login
  const handleCreateDemo = async () => {
    try {
      const response = await fetch('http://localhost:4000/users/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (response.ok) {
        // Store the token and log the user in
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* If not logged in, show login/signup options and demo button */}
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

          {/* Add Demo Account button below the Login/Signup */}
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
        <>
          {/* If logged in, show the task list and logout option */}
          <button
            onClick={handleLogout}
            className="mb-4 text-red-500 hover:text-red-700"
          >
            Logout
          </button>
          <TaskList />
          <AddTask onTaskAdded={() => window.location.reload()} />
        </>
      )}
    </div>
  );
}

export default App;
