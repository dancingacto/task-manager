import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  // State to manage login status and form toggle
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);

  // Handle successful login (set isLoggedIn to true)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout (clear token and set isLoggedIn to false)
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {!isLoggedIn ? (
        <div className="w-full max-w-md mx-auto">
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
        </div>
      ) : (
        <>
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
