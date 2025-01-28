import { expect } from 'chai';
import { post } from '../helpers/apiClient.js';
import { generateUser } from '../helpers/dataGenerator.js';
import config from '../../config/config.js';

describe('Register API', () => {
  it('should register a new user successfully', async () => {
    const userPayload = generateUser();

    const { response, data } = await post('/users/register', userPayload);

    expect(response.status).to.equal(201); // Successful registration (Created)
    expect(data).to.have.property('username');
    expect(data).to.have.property('status', 'user registered');
  });

  it('should fail if password confirmation is missing', async () => {
    const userPayload = {
      username: generateUser().username,
      password: config.testData.registration.missingPasswordConfirmation.password,
    };

    const { response, data } = await post('/users/register', userPayload);

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Password confirmation is required');
  });

  it('should fail if passwords do not match', async () => {
    const userPayload = {
      username: generateUser().username,
      password: config.testData.registration.passwordMismatch.password,
      password_confirmation: config.testData.registration.passwordMismatch.password_confirmation,
    };

    const { response, data } = await post('/users/register', userPayload);

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Password and confirmation do not match');
  });

  it('should fail if username is already taken', async () => {
    const userPayload = {
      username: 'john_doe',
      password: config.testData.registration.validUser.password,
      password_confirmation: config.testData.registration.validUser.password_confirmation,
    };

    const { response, data } = await post('/users/register', userPayload);

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Username is already taken');
  });

  it('should fail if username contains invalid characters', async () => {
    const userPayload = {
      username: 'invalid@username!',
      password: config.testData.registration.validUser.password,
      password_confirmation: config.testData.registration.validUser.password_confirmation,
    };

    const { response, data } = await post('/users/register', userPayload);

    expect(response.status).to.equal(400); // Bad Request
    expect(data).to.have.property('error', 'Username can only contain letters, numbers, hyphens, and underscores');
  });
});