document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('usernameField').value;
  const password = document.getElementById('passwordField').value;

  // Define user credentials
  const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' }
      // Add more users if needed
  ];

  // Checking if username and password match any user's credentials
  const authenticatedUser = users.find(user => user.username === username && user.password === password);

  if (authenticatedUser) {
      alert(`${authenticatedUser.username} has signed in.`);
      window.location.href = '/Pages/home/home.html'; // Redirect on successful login
  } else {
      alert('Invalid username or password. Please try again.');
  }
});
