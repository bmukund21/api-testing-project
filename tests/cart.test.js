import fetch from 'node-fetch';
import { expect } from 'chai';

const baseUrl = 'http://localhost:3000';

describe('Add to Cart API', () => {

  // Test Case 1: Missing Token
  it('should return an error if token is missing', async () => {
    const payload = {
      book_id: '5678',
      quantity: 2
    };

    const response = await fetch(`${baseUrl}/users/123/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Required header
        // No Authorization header
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Token required');
  });

  // Test Case 2: Successful addition to cart
  it('should add item to the cart successfully with a valid token', async () => {
    const payload = {
      book_id: '5678',
      quantity: 2
    };

    const response = await fetch(`${baseUrl}/users/123/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'valid_token'  // Providing a valid token
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.have.property('cart');
    expect(data.cart).to.have.property('cart_items').that.is.an('array');

    const cartItems = data.cart.cart_items;
    expect(cartItems).to.have.length.greaterThan(0);
    
    const firstItem = cartItems[0];
    expect(firstItem).to.have.property('book_id').that.is.a('string');
    expect(firstItem).to.have.property('qty').that.is.a('number');
    expect(firstItem).to.have.property('price').that.is.a('string');
    expect(firstItem).to.have.property('line_total').that.is.a('string');

    // total_amount exists
    expect(data.cart).to.have.property('total_amount').that.is.a('string');
  });

  // Test Case 3: Missing book_id or quantity
  it('should return an error if book_id or quantity is missing', async () => {
    const payload = {
      // Missing book_id and quantity
    };

    const response = await fetch(`${baseUrl}/users/123/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'valid_token'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Book ID and quantity are required');
  });

  // Test Case 4 (Optional): Invalid Token
  it('should return unauthorized error if the token is invalid', async () => {
    const payload = {
      book_id: '5678',
      quantity: 2
    };

    const response = await fetch(`${baseUrl}/users/123/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'invalid_token' // Invalid token
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    expect(response.status).to.equal(401);
    expect(data).to.have.property('error', 'Unauthorized');
  });

});
