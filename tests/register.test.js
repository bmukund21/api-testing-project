// tests/registration.test.js

import fetch from 'node-fetch';
import { expect } from 'chai';
import config from '../config/config.js'; // path to config file
import { faker } from '@faker-js/faker';

const baseUrl = config.baseUrl;

describe('Register API', () => {
  
  it('should register a new user successfully', async () => {
    const userPayload = {
      username: faker.person.firstName(),
      password: config.testData.registration.validUser.password,
      password_confirmation: config.testData.registration.validUser.password_confirmation,
    };

    const response = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload),
    });

    const data = await response.json();
    expect(response.status).to.equal(201); // Successful registration (Created)
    expect(data).to.have.property('username');
    expect(data).to.have.property('status', 'user registered');
  });

  it('should fail if password confirmation is missing', async () => {
    const userPayload = {
      username: faker.person.firstName(),
      password: config.testData.registration.missingPasswordConfirmation.password,
    };

    const response = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload),
    });

    const data = await response.json();
    expect(response.status).to.equal(400); // Error for missing password confirmation
    expect(data).to.have.property('error', 'Password confirmation is required');
  });

  it('should fail if passwords do not match', async () => {
    const userPayload = {
      username: faker.person.firstName(),
      password: config.testData.registration.passwordMismatch.password,
      password_confirmation: config.testData.registration.passwordMismatch.password_confirmation,
    };

    const response = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload),
    });

    const data = await response.json();
    expect(response.status).to.equal(400); // Error for mismatched passwords
    expect(data).to.have.property('error', 'Password and confirmation do not match');
  });

  it('should fail if username is already taken', async () => {
    const userPayload = {
      username: config.testData.registration.existingUser.username,
      password: config.testData.registration.existingUser.password,
      password_confirmation: config.testData.registration.existingUser.password_confirmation,
    };

    const response = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload),
    });

    const data = await response.json();
    expect(response.status).to.equal(400); // Error for already taken username
    expect(data).to.have.property('error', 'Username is already taken');
  });

  
});
