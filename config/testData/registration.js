const registration = {
    validUser: {
      username: 'new_user',
      password: 'Password123!',
      password_confirmation: 'Password123!',
    },
    missingPasswordConfirmation: {
      username: 'new_user',
      password: 'Password123!',
    },
    passwordMismatch: {
      username: 'new_user',
      password: 'Password123!',
      password_confirmation: 'Password456!',
    },
    existingUser: {
      username: 'john_doe',
      password: 'Password123!',
      password_confirmation: 'Password123!',
    },
    invalidUsername: {
      username: 'invalid@username!',
      password: 'Password123!',
      password_confirmation: 'Password123!',
    },
  };
  
  export default registration;