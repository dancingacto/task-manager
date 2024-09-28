// src/components/TaskCard.js
import React from 'react';
import { format } from 'date-fns';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants'; // Import color mappings

function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">{task.title}</h3>
        <div className="flex space-x-2">
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
        {/* Task Status with Dynamic Color */}
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded ${STATUS_COLORS[task.status]} text-white`}
        >
          {task.status}
        </span>

        {/* Task Priority with Dynamic Color */}
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded ${PRIORITY_COLORS[task.priority]} text-white`}
        >
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <div className="mt-2 text-sm text-gray-600">
          Due Date: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
