// src/components/TaskCard.js
import React from 'react';
import { format } from 'date-fns';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants';

function TaskCard({ task, onDelete }) {
  const formattedDate = task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date';

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200 w-full">
      <h3 className="text-3xl font-bold mb-6">{task.title}</h3>

      <div className="space-y-8">
        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-600">Status:</span>
          <span
            className={`inline-block w-40 px-6 py-3 text-base font-semibold text-center rounded ${STATUS_COLORS[task.status]} text-white`}
          >
            {task.status}
          </span>
        </div>

        {/* Priority */}
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-600">Priority:</span>
          <span
            className={`inline-block w-40 px-6 py-3 text-base font-semibold text-center rounded ${PRIORITY_COLORS[task.priority]} text-white`}
          >
            {task.priority}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-600">Due Date:</span>
            <span className="inline-block w-40 px-6 py-3 text-base text-center bg-gray-300 text-black">
              {formattedDate}
            </span>
          </div>
        )}

        {/* Delete Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 font-semibold text-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
