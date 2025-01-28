import express from 'express';
const router = express.Router();

// Simulating the users array for registration and login
const users = [
  { username: 'john_doe', password: 'Password123!' },
  { username: 'jane_smith', password: 'SecurePassword456!' },
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = 'valid_token'; // Fixed placeholder token
  res.status(200).json({ username, token, message: 'Welcome back' });
});

export default router;
