import React, { useState } from 'react';

function Login({ onLogin, handleCreateDemo, setShowSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      onLogin(); // Call parent component to update login state
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Welcome back</h1>
      <p className="text-center text-gray-600 mb-6">
        New to this app?{' '}
        <a
          href="#"
          className="text-orange-500 hover:underline"
          onClick={() => setShowSignup(true)} // Switch to signup form
        >
          Create an account.
        </a>
      </p>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          Log in
        </button>
      </form>

      {/* Try Demo Account Button */}
      <div className="mt-4">
        <button
          onClick={handleCreateDemo}
          className="w-full border border-orange-500 text-orange-500 py-2 rounded-lg hover:bg-orange-50 transition duration-300 flex justify-center items-center"
        >
          <span className="mr-2">👤</span> Try a demo account
        </button>
      </div>
    </div>
  );
}

export default Login;
