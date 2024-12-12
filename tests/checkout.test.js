import fetch from 'node-fetch';
import { expect } from 'chai';

const baseUrl = 'http://localhost:3000';

describe('Checkout API Tests', () => {
  it('should return error if token is missing', async () => {
    const userId = '123';
    const payload = {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 2,
      price: 50
    };

    const response = await fetch(`${baseUrl}/users/${userId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // No Authorization header
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Token required');
  });

  it('should complete the checkout with valid inputs', async () => {
    const userId = '123';
    const payload = {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 2,
      price: 50
    };

    const response = await fetch(`${baseUrl}/users/${userId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'valid_token'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.have.property('cart');
    expect(data.cart).to.have.property('cart_items').that.is.an('array');

    const cartItems = data.cart.cart_items;
    expect(cartItems.length).to.be.greaterThan(0);

    const firstItem = cartItems[0];
    expect(firstItem).to.have.property('book_id').that.is.a('string');
    expect(firstItem).to.have.property('qty').that.is.a('number');
    expect(firstItem).to.have.property('price').that.is.a('string');
    expect(firstItem).to.have.property('line_total').that.is.a('string');

    expect(data.cart).to.have.property('total_amount').that.is.a('string');
    expect(data).to.have.property('order_id').that.is.a('string');
    expect(data).to.have.property('status', 'pending');
  });

  it('should return error for payment decline if price exceeds 100', async () => {
    const userId = '123';
    const payload = {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 1,
      price: 150
    };

    const response = await fetch(`${baseUrl}/users/${userId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'valid_token'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(402);
    expect(data).to.have.property('error', 'Payment declined');
  });

  it('should return error if book_id, quantity, or price is missing', async () => {
    const userId = '123';
    const payload = {
      book_id: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 1
      // price is missing
    };

    const response = await fetch(`${baseUrl}/users/${userId}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'valid_token'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Book ID, quantity, and price are required');
  });
});
