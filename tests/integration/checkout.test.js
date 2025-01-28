import { expect } from 'chai';
import { post } from '../helpers/apiClient.js';
import config from '../../config/config.js';

describe('Checkout API Tests', () => {
  it('should return error if token is missing', async () => {
    const userId = '123';
    const payload = config.testData.checkout.missingToken;

    const { response, data } = await post(`/users/${userId}/checkout`, payload);

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Token required');
  });

  it('should complete the checkout with valid inputs', async () => {
    const userId = '123';
    const payload = config.testData.checkout.validPayload;

    const { response, data } = await post(`/users/${userId}/checkout`, payload, config.tokens.valid);

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
    const payload = config.testData.checkout.paymentDecline;

    const { response, data } = await post(`/users/${userId}/checkout`, payload, config.tokens.valid);

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Payment declined');
  });

  it('should return error if book_id, quantity, or price is missing', async () => {
    const userId = '123';
    const payload = config.testData.checkout.missingFields;

    const { response, data } = await post(`/users/${userId}/checkout`, payload, config.tokens.valid);

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Book ID, quantity, and price are required');
  });
});