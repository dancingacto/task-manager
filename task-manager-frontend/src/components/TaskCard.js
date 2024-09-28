// src/components/TaskCard.js
import React from 'react';
import { format } from 'date-fns';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants';

function TaskCard({ task, onDelete }) {
  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), 'MMM dd, yyyy')
    : 'No due date';

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 w-full">
      <h3 className="text-2xl font-bold mb-4">{task.title}</h3>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center">
          <span className="text-gray-500 flex-shrink-0 w-40">Status:</span>
          <span
            className={`flex-grow text-right inline-block px-4 py-2 text-sm font-semibold rounded ${STATUS_COLORS[task.status]} text-white`}
          >
            {task.status}
          </span>
        </div>

        {/* Priority */}
        <div className="flex items-center">
          <span className="text-gray-500 flex-shrink-0 w-40">Priority:</span>
          <span
            className={`flex-grow text-right inline-block px-4 py-2 text-sm font-semibold rounded ${PRIORITY_COLORS[task.priority]} text-white`}
          >
            {task.priority}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center">
            <span className="text-gray-500 flex-shrink-0 w-40">Due Date:</span>
            <span className="flex-grow text-right inline-block px-4 py-2 text-sm bg-gray-300 text-black">
              {formattedDate}
            </span>
          </div>
        )}

        {/* Delete Button */}
        <div className="flex justify-end mt-4">
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
