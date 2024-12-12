import fetch from 'node-fetch';
import { expect } from 'chai';
const baseUrl = 'http://localhost:3000';

describe('Login API', () => {

  // Test Case 1: Successful Login
  it('should login a user successfully', async () => {
    const userCredentials = {
      username: 'john_doe',
      password: 'Password123!'  // Correct credentials
    };

    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Required header
      },
      body: JSON.stringify(userCredentials),
    });

    const data = await response.json();
    
    expect(response.status).to.equal(200); // Success
    expect(data).to.have.property('username', 'john_doe');
    expect(data).to.have.property('token').that.is.a('string'); // token is returned and is a string
    expect(data).to.have.property('message', 'Welcome back');
  });

  // Test Case 2: Missing Username
  it('should fail if username is missing', async () => {
    const userCredentials = {
      password: 'Password123!'  // Missing username
    };

    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Required header
      },
      body: JSON.stringify(userCredentials),
    });

    const data = await response.json();
    
    expect(response.status).to.equal(400); // Error: Missing username
    expect(data).to.have.property('error', 'Username and password are required');
  });

  // Test Case 3: Incorrect Password
  it('should fail if password is incorrect', async () => {
    const userCredentials = {
      username: 'john_doe',
      password: 'wrongPassword123!'  // Incorrect password
    };

    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Required header
      },
      body: JSON.stringify(userCredentials),
    });

    const data = await response.json();
    
    expect(response.status).to.equal(401); // Error: Incorrect password
    expect(data).to.have.property('error', 'Invalid password');
  });

  // Test Case 4: Missing Credentials (both username and password)
  it('should fail if both username and password are missing', async () => {
    const userCredentials = {};  // Both fields missing

    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Required header
      },
      body: JSON.stringify(userCredentials),
    });

    const data = await response.json();
    
    expect(response.status).to.equal(400); // Error: Missing credentials
    expect(data).to.have.property('error', 'Username and password are required');
  });

});
