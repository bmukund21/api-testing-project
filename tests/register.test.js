import fetch from 'node-fetch';
import { expect } from 'chai';
const baseUrl = 'http://localhost:3000'; // Ensure this is the correct base URL
import { faker } from '@faker-js/faker';


describe('Register API', () => {

  it('should register a new user successfully', async () => {
    const userPayload = {
      username: faker.person.firstName(),
      password: 'Password123!',
      password_confirmation: 'Password123!'
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
      password: 'Password123!'
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
      password: 'Password123!',
      password_confirmation: 'Password12345!' // Mismatched password confirmation
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
      username: 'existing_user',
      password: 'Password123!',
      password_confirmation: 'Password123!'
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
