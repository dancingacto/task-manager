// src/components/EditTaskModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Set the app element to avoid screen reader accessibility issues
Modal.setAppElement('#root');

function EditTaskModal({ isOpen, onClose, taskToEdit, onTaskUpdated }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Not started');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : null);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskToEdit.id}`, {
      method: 'PUT',
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
      const updatedTask = await response.json();
      onTaskUpdated(updatedTask);
      onClose(); // Close the modal after task is updated
    } else {
      alert('Failed to update task');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Task"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="w-1/4 text-right text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Task Status */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="w-1/4 text-right text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Not started">Not started</option>
            <option value="Working on it">Working on it</option>
            <option value="Stuck">Stuck</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Task Priority */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="w-1/4 text-right text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        
        {/* Task Due Date */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="w-1/4 text-right text-gray-700">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Select Due Date"
            className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>


        {/* Footer Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Task
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditTaskModal;
