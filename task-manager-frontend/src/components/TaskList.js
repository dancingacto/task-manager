import React, { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
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

  // Function to handle task deletion
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task.id !== taskId));
    } else {
      console.error('Failed to delete task');
      alert('Failed to delete task');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 mt-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Tasks</h2>
      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <ul className="space-y-4 w-full">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Add a new one!</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition-colors w-full flex-shrink-0"
              >
                <span className="text-lg font-medium text-gray-900">{task.title}</span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
