document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showMessage('Login successful!');
        // Redirect or perform actions after successful login
      } else {
        showMessage('Invalid username or password. Please try again.');
      }
    })
    .catch(error => {
      showMessage('An error occurred. Please try again later.');
    });
  });
  
  function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
  }
  