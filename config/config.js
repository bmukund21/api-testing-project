// config/config.js

const config = {
    // Base URL for the API
    baseUrl: 'http://localhost:3000',
  
    // User credentials
    users: {
      existing: [
        { username: 'john_doe', password: 'Password123!' },
        { username: 'jane_smith', password: 'SecurePassword456!' },
      ],

    },
  
    // Tokens
    tokens: {
      valid: 'valid_token',
      invalid: 'invalid_token',
    },
  
    // Test Data
    testData: {
      // Blacklisted usernames as per your mock API
      blacklistedUsernames: ['admin', 'superuser', 'root', 'administrator'],
  
      // Sample payloads for registration tests
      registration: {
        validUser: {
          username: 'test_user',
          password: 'TestPass123!',
          password_confirmation: 'TestPass123!',
        },
        missingPasswordConfirmation: {
          username: 'test_user2',
          password: 'TestPass123!',
        },
        passwordMismatch: {
          username: 'test_user3',
          password: 'TestPass123!',
          password_confirmation: 'TestPass1234!',
        },
        existingUser: {
          username: 'john_doe', // Assuming this user exists
          password: 'Password123!',
          password_confirmation: 'Password123!',
        },
        blacklistedUsername: {
          username: 'admin',
          password: 'TestPass123!',
          password_confirmation: 'TestPass123!',
        },
        invalidUsername: {
          username: 'invalid@user!',
          password: 'TestPass123!',
          password_confirmation: 'TestPass123!',
        },
        weakPassword: {
          username: 'test_user4',
          password: 'weakpass',
          password_confirmation: 'weakpass',
        },
      },
  
      // Sample payloads for login tests
      login: {
        validCredentials: {
          username: 'john_doe',
          password: 'Password123!',
        },
        missingUsername: {
          password: 'Password123!',
        },
        incorrectPassword: {
          username: 'john_doe',
          password: 'WrongPassword!',
        },
        missingCredentials: {},
      },
  
      // Sample payloads for add to cart tests
      addToCart: {
        validPayload: {
          book_id: '5678', 
          quantity: 2,
        },
        missingFields: {},
        invalidToken: {
          book_id: '5678',
          quantity: 2,
          token: 'invalid_token',
        },
      },
  
      // Sample payloads for checkout tests
      checkout: {
        validPayload: {
          book_id: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 2,
          price: 50,
        },
        paymentDecline: {
          book_id: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
          price: 150,
        },
        missingFields: {
          book_id: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
          // Missing price
        },
        missingToken: {
          book_id: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 2,
          price: 50,
        },
      },
    },
  };
  
export default config;  