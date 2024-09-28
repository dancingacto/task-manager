// src/components/TaskList.js
import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, setTasks }) {

  const handleDelete = async (id) => {
    // Implement delete logic here, e.g., make a DELETE request to your API
    // After successful deletion, update the tasks state
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default TaskList;
