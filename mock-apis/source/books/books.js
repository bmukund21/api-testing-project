import express from 'express';
import { faker } from '@faker-js/faker';

const router = express.Router();

router.get('/books', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  if (token !== 'valid_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const numBooks = 5;
  const books = Array.from({ length: numBooks }, () => ({
    book_id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    author_name: faker.name.findName(),
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

export default router;