import addToCart from '../testData/addToCart.js';
import checkout from '../testData/checkout.js';
import login from '../testData/login.js';
import registration from '../testData/registration.js';

const config = {
  baseUrl: 'http://localhost:3000',
  tokens: {
    valid: 'valid_token',
    invalid: 'invalid_token',
  },
  testData: {
    addToCart,
    checkout,
    login,
    registration,
  },
};

export default config;