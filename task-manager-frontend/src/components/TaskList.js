import TaskCard from './TaskCard';


function TaskList({ tasks, setTasks }) {

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


  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 mt-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Tasks</h2>
      
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
