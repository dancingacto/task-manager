const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
const router = express.Router();

// User registration
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashedPassword } });
    res.status(201).json(user);
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
    res.json({ token });
});

// Demo account creation route
router.post('/demo', async (req, res) => {
    try {
      const demoEmail = `demo${Date.now()}@example.com`;  // Unique email
      const demoPassword = 'demopassword';  // Fixed password for demo users
      
      const hashedPassword = await bcrypt.hash(demoPassword, 10);
      
      const demoUser = await prisma.user.create({
        data: {
          email: demoEmail,
          password: hashedPassword,
        },
      });
      
      // Generate JWT token for demo user
      const token = jwt.sign({ userId: demoUser.id }, 'your_jwt_secret', { expiresIn: '1h' });
      
      // Respond with token and user details
      res.status(201).json({
        message: 'Demo account created successfully',
        token,
        user: {
          id: demoUser.id,
          email: demoUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create demo account' });
    }
  });

module.exports = router;
