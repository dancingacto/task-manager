const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
const router = express.Router();

// Middleware to check authentication
router.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = decoded.userId;
        next();
    });
});

// Create a task
router.post('/', async (req, res) => {
    const { title } = req.body;
    const task = await prisma.task.create({ data: { title, userId: req.userId } });
    res.status(201).json(task);
});

// Get all tasks for a user
router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
    res.json(tasks);
});

// Delete a task by id
router.delete('/:id', async (req, res) => {
    const taskId = parseInt(req.params.id); // Get task ID from request parameters

    try {
        // Check if the task exists and belongs to the current user
        const task = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task || task.userId !== req.userId) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        // Delete the task
        await prisma.task.delete({
            where: { id: taskId },
        });

        res.status(204).send(); // 204 No Content, successful deletion with no response body
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Update a task by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        // Find the task and update it if it belongs to the logged-in user
        const task = await prisma.task.updateMany({
            where: {
                id: parseInt(id),
                userId: req.userId, // Ensure the task belongs to the user
            },
            data: {
                title,
                completed,
            },
        });

        if (task.count === 0) {
            return res.status(404).json({ error: 'Task not found or not authorized to update' });
        }

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});


module.exports = router;
