import express from 'express';
import { faker } from '@faker-js/faker';

const router = express.Router();

const isValidUserId = (userId) => {
  const regex = /^\d{1,4}$/;
  return regex.test(userId);
};

router.post('/:userId/cart', (req, res) => {
  const token = req.headers['authorization'];
  const { userId } = req.params;

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  if (token !== 'valid_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!isValidUserId(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
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

export default router;