import { expect } from 'chai';
import { post } from '../helpers/apiClient.js';
import config from '../../config/config.js';

describe('Add to Cart API', () => {
  it('should return an error if token is missing', async () => {
    const payload = config.testData.addToCart.validPayload;

    const { response, data } = await post('/users/123/cart', payload);

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Token required');
  });

  it('should add item to the cart successfully with a valid token', async () => {
    const payload = config.testData.addToCart.validPayload;

    const { response, data } = await post('/users/123/cart', payload, config.tokens.valid);

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

    expect(data.cart).to.have.property('total_amount').that.is.a('string');
  });

  it('should return an error if book_id or quantity is missing', async () => {
    const payload = config.testData.addToCart.missingFields;

    const { response, data } = await post('/users/123/cart', payload, config.tokens.valid);

    expect(response.status).to.equal(400);
    expect(data).to.have.property('error', 'Book ID and quantity are required');
  });

  it('should return unauthorized error if the token is invalid', async () => {
    const payload = config.testData.addToCart.validPayload;

    const { response, data } = await post('/users/123/cart', payload, config.tokens.invalid);

    expect(response.status).to.equal(401);
    expect(data).to.have.property('error', 'Unauthorized');
  });
});