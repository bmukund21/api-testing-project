import fetch from 'node-fetch';
import { expect } from 'chai';
import config from '../config/config.js'; // path to config file

const baseUrl = config.baseUrl;

describe('Login API', () => {

  // Test Case 1: Successful Login
  it('should login a user successfully', async () => {
    const userCredentials = config.testData.login.validCredentials;

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
    const userCredentials = config.testData.login.missingUsername;

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
    const userCredentials = config.testData.login.incorrectPassword;

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
    const userCredentials = config.testData.login.missingCredentials;  // Both fields missing

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
