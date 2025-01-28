const login = {
    validUser: {
      username: 'john_doe',
      password: 'Password123!',
    },
    missingUsername: {
      password: 'Password123!',
    },
    missingPassword: {
      username: 'john_doe',
    },
    nonExistentUser: {
      username: 'non_existent_user',
      password: 'Password123!',
    },
  };
  
  export default login;