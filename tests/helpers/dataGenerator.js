import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  username: faker.person.firstName(),
  password: 'TestPass123!',
  password_confirmation: 'TestPass123!',
});

export const generateBook = () => ({
  book_id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  author_name: faker.name.findName(),
  price: faker.commerce.price(),
  currency: 'USD',
  category: faker.commerce.department(),
  createdAt: new Date().toISOString(),
});