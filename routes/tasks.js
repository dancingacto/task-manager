const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient'); // Import Prisma Client instance
const router = express.Router();

// Middleware to authenticate user
router.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header
    if (!token) return res.status(401).json({ error: 'Token required' });

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = decoded.userId; // Set the user ID from the token
        next();
    });
});

// Create a task
router.post('/', async (req, res) => {
    const { title } = req.body;
    const task = await prisma.task.create({
        data: { title, userId: req.userId }, // Link task to authenticated user
    });
    res.status(201).json(task);
});

// Get all tasks for the user
router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
    res.json(tasks);
});

module.exports = router;
