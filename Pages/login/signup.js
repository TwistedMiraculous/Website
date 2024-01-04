document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPasswordField').value;

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const existingUser = users.find(user => user.username === newUsername);

    if (existingUser) {
        alert('Username already exists. Please choose a different one.');
    } else {
        // Add the new user to the users array
        users.push({ username: newUsername, password: newPassword });

        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully!');
        window.location.href = '/Pages/login/login.html'; // Redirect to login page
    }
});
