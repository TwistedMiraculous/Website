// Simulated user data (for demo, replace this with a database)
const users = [
    { username: 'user', password: 'cool123' }
  ];
  
  function hashPassword(password) {
    // In a real scenario, use stronger hashing algorithms like SHA256, this is just a simple example
    return password.split('').reverse().join(''); // Reversing the password as a simple "hashing" method
  }
  
  function loginUser(username, password) {
    const user = users.find(user => user.username === username);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    } else {
      const hashedPassword = hashPassword(password);
      
      if (user.password === hashedPassword) {
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Incorrect password' };
      }
    }
  }
  
  // Example usage:
  const inputUsername = 'user';
  const inputPassword = 'password';
  
  const loginResult = loginUser(inputUsername, inputPassword);
  console.log(loginResult.message);
  