//login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('usernameField').value;
            const password = document.getElementById('passwordField').value;

            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Checking if username and password match any user's credentials
            const authenticatedUser = users.find(user => user.username === username && user.password === password);

            if (authenticatedUser) {
                alert(`${authenticatedUser.username} has signed in.`);
                window.location.href = '/Pages/home/home.html'; // Redirect on successful login
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    } else {
        console.error("Login form element not found.");
    }
});

