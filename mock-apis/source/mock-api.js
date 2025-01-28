import express, { json } from 'express';
const app = express();
app.use(json());

import loginRoutes from './auth/login.js';
import registerRoutes from './auth/register.js';
import booksRoutes from './books/books.js';
import searchRoutes from './books/search.js';
import cartRoutes from './checkout/addToCart.js';
import checkoutRoutes from './checkout/checkout.js';

app.use('/users', loginRoutes);
app.use('/users', registerRoutes);
app.use('/books', booksRoutes);
app.use('/books', searchRoutes);
app.use('/users/', cartRoutes);
app.use('/users/', checkoutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
