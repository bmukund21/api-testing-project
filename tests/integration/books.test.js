import { expect } from 'chai';
import { get } from '../helpers/apiClient.js';
import config from '../../config/config.js';

describe('Books Search API', () => {
  it('should return the book when search query matches "Book1"', async () => {
    const { response, data } = await get('/books/search?query=Book 1', config.tokens.valid);

    expect(response.status).to.equal(200); // Success
    expect(data).to.have.property('pageSize');
    expect(data).to.have.property('results').that.is.an('array');
    expect(data.results).to.have.length.greaterThan(0);

    const firstBook = data.results[0];
    expect(firstBook).to.have.property('book_id').that.is.a('string');
    expect(firstBook).to.have.property('name').that.is.a('string');
    expect(firstBook).to.have.property('author_name').that.is.a('string');
    expect(firstBook).to.have.property('price').that.is.a('string');
    expect(firstBook).to.have.property('currency').that.is.a('string');
    expect(firstBook).to.have.property('category').that.is.a('string');
    expect(firstBook).to.have.property('createdAt').that.is.a('string');
  });

  it('should return an error if token is missing', async () => {
    const { response, data } = await get('/books/search?query=Book 1');

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Token required');
  });

  it('should return an error if token is invalid', async () => {
    const { response, data } = await get('/books/search?query=Book 1', config.tokens.invalid);

    expect(response.status).to.equal(401); // Unauthorized
    expect(data).to.have.property('error', 'Unauthorized');
  });
});
