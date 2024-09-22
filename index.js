const express = require('express');
const cors = require('cors'); // Import CORS middleware
const path = require('path'); // Import path to serve static files

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes and origins
app.use(cors());

// Enable express to parse JSON bodies
app.use(express.json());

// Import API routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

// Use the user and task routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Serve the static files from the React frontend build folder
app.use(express.static(path.join(__dirname, 'task-manager-frontend', 'build')));

// Catch-all route to serve the React app for any other requests (i.e., frontend routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'task-manager-frontend', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//testing