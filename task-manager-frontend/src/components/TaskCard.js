// src/components/TaskCard.js
import React from 'react';
import { format } from 'date-fns';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants'; // Import color mappings

function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3> {/* Title now has margin-bottom */}
      
      <div className="space-y-4"> {/* Stacking items vertically with space between them */}
        {/* Task Owner (If applicable) */}
        {/* Status */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Status:</span>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded ${STATUS_COLORS[task.status]} text-white`}
          >
            {task.status}
          </span>
        </div>

        {/* Priority */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Priority:</span>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded ${PRIORITY_COLORS[task.priority]} text-white`}
          >
            {task.priority}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Due Date:</span>
            <span className="text-sm text-gray-600">
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
        )}

        {/* Delete Button */}
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
