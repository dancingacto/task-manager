const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('DATABASE_URL:', process.env.DATABASE_URL);  // Log this to ensure it's being used correctly
module.exports = prisma;
