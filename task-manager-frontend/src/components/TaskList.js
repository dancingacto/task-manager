import React, { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
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

    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
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

  // Function to handle task editing
  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
  };

  // Function to handle task update
  const handleUpdate = async (taskId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editTitle }),
    });

    if (response.ok) {
      // Update the task in the state
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, title: editTitle } : task)));
      setEditTaskId(null);
      setEditTitle('');
    } else {
      console.error('Failed to update task');
      alert('Failed to update task');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-6 mt-8 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Tasks</h2>
      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <ul className="space-y-4 w-full">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Add a new one!</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-50 transition-colors w-full flex-shrink-0"
              >
                {editTaskId === task.id ? (
                  // Edit mode
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-lg font-medium text-gray-900 w-full mr-4 p-2 border rounded-lg"
                  />
                ) : (
                  // View mode
                  <span className="text-lg font-medium text-gray-900 flex-grow">{task.title}</span>
                )}

                <div className="flex space-x-2">
                  {editTaskId === task.id ? (
                    // Save and Cancel buttons
                    <>
                      <button
                        onClick={() => handleUpdate(task.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditTaskId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105 focus:outline-none"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    // Edit and Delete buttons
                    <>
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
