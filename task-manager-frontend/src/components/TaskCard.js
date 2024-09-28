// src/components/TaskCard.js
import React from 'react';
import { format } from 'date-fns';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants'; // Import color mappings

function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>

      <div className="space-y-4"> {/* Stack entries vertically with space */}
        
        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Status:</span>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded ${STATUS_COLORS[task.status]} text-white min-w-[120px] text-center`}
          >
            {task.status}
          </span>
        </div>

        {/* Priority */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Priority:</span>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded ${PRIORITY_COLORS[task.priority]} text-white min-w-[120px] text-center`}
          >
            {task.priority}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Due Date:</span>
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded text-white min-w-[120px] text-center bg-slate-100">
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
