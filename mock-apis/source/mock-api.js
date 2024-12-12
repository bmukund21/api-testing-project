import express from 'express';
import { faker } from '@faker-js/faker';


const app = express();
app.use(express.json());

// Simulating the users array for registration and login
const users = [
  { username: 'john_doe', password: 'Password123!' },
  { username: 'jane_smith', password: 'SecurePassword456!' },
];

// Register user
app.post('/users/register', (req, res) => {
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

// User login
app.post('/users/login', (req, res) => {
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

// Get books
app.get('/books', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  if (token !== 'valid_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const numBooks = 5;
  const books = Array.from({ length: numBooks }, () => ({
    book_id: faker.string.uuid(), 
    name: faker.commerce.productName(),
    author_name: faker.person.fullName(),
    price: faker.commerce.price(),
    currency: 'USD',
    category: faker.commerce.department(),
    createdAt: new Date().toISOString(),
  }));

  res.status(200).json({
    resultSize: numBooks,
    pageNum: 1,
    pageSize: numBooks,
    results: books,
  });
});

// Add to cart
app.post('/users/:userId/cart', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  if (token !== 'valid_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { book_id, quantity } = req.body;
  if (!book_id || !quantity) {
    return res.status(400).json({ error: 'Book ID and quantity are required' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than zero' });
  }

  const cartItems = Array.from({ length: 3 }, () => ({
    book_id: faker.string.uuid(),
    qty: faker.number.int({ min: 1, max: 5 }),
    price: faker.commerce.price(),
    line_total: faker.commerce.price(),
  }));

  const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.line_total), 0);

  res.status(201).json({
    cart: { cart_items: cartItems, total_amount: totalAmount.toFixed(2) },
  });
});

app.post('/users/:userId/checkout', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  if (token !== 'valid_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { book_id, quantity, price } = req.body;

  if (!book_id || !quantity || !price) {
    return res.status(400).json({ error: 'Book ID, quantity, and price are required' });
  }

  if (price > 100) {
    return res.status(402).json({ error: 'Payment declined' });
  }

  const total_amount = price * quantity;
  res.status(201).json({
    cart: {
      cart_items: [{
        book_id,
        qty: quantity,
        price: price.toFixed(2),
        line_total: total_amount.toFixed(2),
      }],
      total_amount: total_amount.toFixed(2),
    },
    order_id: 'some_generated_uuid',
    status: 'pending',
  });
});



app.listen(3000, () => console.log('Mock API server running on http://localhost:3000'));
