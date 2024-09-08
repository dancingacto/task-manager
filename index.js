const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
