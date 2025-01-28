import express from 'express';
import { faker } from '@faker-js/faker';

const router = express.Router();

router.get('/search', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  if (token !== 'valid_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const query = req.query.query || '';
  const numBooks = 5;
  const books = Array.from({ length: numBooks }, () => ({
    book_id: faker.string.uuid(),
    name: `${query} ${faker.commerce.productName()}`, // Ensure the query is part of the name
    author_name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    publisher: faker.company.name(),
    publishedDate: faker.date.past().toISOString().split('T')[0],
    price: faker.commerce.price(),
    currency: 'USD',
    category: faker.commerce.department(),
    ratings: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    createdAt: new Date().toISOString(),
  }));

  res.status(200).json({
    resultSize: books.length,
    pageNum: 1,
    pageSize: numBooks,
    results: books,
  });
});

export default router;