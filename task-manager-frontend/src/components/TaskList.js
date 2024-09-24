import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal'; // Import the modal component

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

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

  // Handle task deletion
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    } else {
      alert('Failed to delete task');
    }
  };

  // Handle adding a new task
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]); // Add new task to the list
    setIsModalOpen(false); // Close the modal after adding the task
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Tasks</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)} // Open the modal
      >
        Add New Task
      </button>

      {/* Modal for Adding Task */}
      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskAdded={handleTaskAdded} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Add a new one!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
