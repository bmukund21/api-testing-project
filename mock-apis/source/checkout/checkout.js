import express from 'express';
const router = express.Router();

const isValidUserId = (userId) => {
    const regex = /^\d{1,4}$/;
    return regex.test(userId);
  };

router.post('/:userId/checkout', (req, res) => {
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

  const { book_id, quantity, price } = req.body;

  if (!book_id || !quantity || !price) {
    return res.status(400).json({ error: 'Book ID, quantity, and price are required' });
  }

  if (price > 100) {
    return res.status(400).json({ error: 'Payment declined' });
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

export default router;