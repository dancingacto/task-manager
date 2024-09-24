// src/components/TaskCard.js
import React from 'react';
import { format } from 'date-fns'; // For formatting the date

const STATUS_COLORS = {
  'Not started': 'bg-red-300',
  'Working on it': 'bg-orange-300',
  'Stuck': 'bg-yellow-300',
  'Done': 'bg-green-300',
};

const PRIORITY_COLORS = {
  'Critical': 'bg-blue-900',
  'High': 'bg-blue-700',
  'Medium': 'bg-blue-500',
  'Low': 'bg-blue-300',
};

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center">
        {/* Task Title */}
        <h3 className="text-xl font-bold">{task.title}</h3>
        <div className="flex space-x-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-2 flex space-x-2">
        {/* Task Status with Color Coding */}
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded ${STATUS_COLORS[task.status]}`}
        >
          {task.status}
        </span>

        {/* Task Priority with Color Coding */}
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due Date (if it exists) */}
      {task.dueDate && (
        <div className="mt-2 text-sm text-gray-600">
          Due Date: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
