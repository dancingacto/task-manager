// src/components/AddTaskModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants'; // Import color mappings

Modal.setAppElement('#root'); // For accessibility

function AddTaskModal({ isOpen, onClose, onTaskAdded }) {
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
      onTaskAdded(task);
      setTitle('');
      setStatus('Not started');
      setPriority('Medium');
      setDueDate(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Task"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* Task Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none ${STATUS_COLORS[status]}`} // Apply background color
        >
          <option value="Not started">Not started</option>
          <option value="Working on it">Working on it</option>
          <option value="Stuck">Stuck</option>
          <option value="Done">Done</option>
        </select>

        {/* Task Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none ${PRIORITY_COLORS[priority]}`} // Apply background color
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

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add Task
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddTaskModal;
