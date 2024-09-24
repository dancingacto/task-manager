// src/components/AddTask.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Not started');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        status,
        priority,
        dueDate: dueDate ? dueDate.toISOString() : null,
      }),
    });

    if (response.ok) {
      const task = await response.json();
      onTaskAdded(task); // Notify parent to refresh the task list
      setTitle(''); // Clear the input fields
      setStatus('Not started');
      setPriority('Medium');
      setDueDate(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="Not started">Not started</option>
          <option value="Working on it">Working on it</option>
          <option value="Stuck">Stuck</option>
          <option value="Done">Done</option>
        </select>

        {/* Priority Dropdown */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        {/* Due Date Picker */}
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholderText="Select Due Date"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
