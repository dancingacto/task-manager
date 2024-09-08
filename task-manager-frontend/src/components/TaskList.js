import React, { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
