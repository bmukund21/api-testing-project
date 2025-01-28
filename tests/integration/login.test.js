import { expect } from 'chai';
import { post } from '../helpers/apiClient.js';
import config from '../../config/config.js';

describe('Login API', () => {
  it('should login a user successfully', async () => {
    const userPayload = {
      username: 'john_doe',
      password: 'Password123!',
    };

    const { response, data } = await post('/users/login', userPayload);

    expect(response.status).to.equal(200); // Successful login
    expect(data).to.have.property('username', 'john_doe');
    expect(data).to.have.property('token');
    expect(data).to.have.property('message', 'Welcome back');
  });

  it('should fail if username is missing', async () => {
    const userPayload = {
      password: 'Password123!',
    };

    const { response, data } = await post('/users/login', userPayload);

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Username and password are required');
  });

  it('should fail if password is incorrect', async () => {
    const userPayload = {
      username: 'john_doe',
      password: 'WrongPassword!',
    };

    const { response, data } = await post('/users/login', userPayload);

    expect(response.status).to.equal(401); // Unauthorized
    expect(data).to.have.property('error', 'Invalid password');
  });

  it('should fail if both username and password are missing', async () => {
    const userPayload = {};

    const { response, data } = await post('/users/login', userPayload);

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Username and password are required');
  });

  it('should fail if user does not exist', async () => {
    const userPayload = {
      username: 'non_existent_user',
      password: 'Password123!',
    };

    const { response, data } = await post('/users/login', userPayload);

    expect(response.status).to.equal(401); // Unauthorized
    expect(data).to.have.property('error', 'User not found');
  });
});
