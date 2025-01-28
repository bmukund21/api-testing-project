import express from 'express';
const router = express.Router();

// Simulating the users array for registration and login
const users = [
  { username: 'john_doe', password: 'Password123!' },
  { username: 'jane_smith', password: 'SecurePassword456!' },
];

router.post('/register', (req, res) => {
  const { username, password, password_confirmation } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Check for username already present
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  // Check for blacklisted usernames
  const blacklistedUsernames = ['admin', 'superuser', 'root', 'administrator'];
  if (blacklistedUsernames.includes(username.toLowerCase())) {
    return res.status(400).json({ error: 'This username is not allowed' });
  }

  // Check for weird characters in usernames
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: 'Username can only contain letters, numbers, hyphens, and underscores' });
  }

  // Check for password_confirmation presence and match with password
  if (!password_confirmation) {
    return res.status(400).json({ error: 'Password confirmation is required' });
  }
  if (password !== password_confirmation) {
    return res.status(400).json({ error: 'Password and confirmation do not match' });
  }

  // Check for minimum password length and strength
  const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordStrengthRegex.test(password)) {
    return res.status(400).json({
      error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    });
  }

  // If all checks pass, register the user
  users.push({ username, password });
  res.status(201).json({ username, status: 'user registered' });
});

export default router;