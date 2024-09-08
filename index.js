const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

// Use the user and task routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
