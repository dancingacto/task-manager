const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient'); // Import Prisma Client instance
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await prisma.user.create({
        data: { email, password: hashedPassword },
    });
    res.status(201).json(user); // Send back the newly created user
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } }); // Find user by email
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' }); // Invalid credentials
    }
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret'); // Sign a JWT token
    res.json({ token }); // Return the token to the user
});

module.exports = router;
