
document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const messageDiv = document.getElementById('message');
  messageDiv.textContent = 'Processing...'; // Show processing message
  messageDiv.className = 'message processing'; // Apply processing class


  const formData = new FormData(event.target);
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    nationality: formData.get('nationality'),
    state: formData.get('state'),
    city: formData.get('city'),
    address: formData.get('address'),
    password: formData.get('password'),
    role: formData.get('role')
  };

  try {
      const response = await fetch('http://localhost:3002/api/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result.message);
    if (result.message === 'User registered successfully') {
      messageDiv.textContent = 'Registration successful. Redirecting to login page...';
      messageDiv.className = 'message success'; // Apply success class
      registerForm.reset(); // Reset the form
      setTimeout(() => {
        window.location.href = '/login';  // Redirect to login page
      }, 2000); // Wait 1 second before redirecting
    } else {
      messageDiv.textContent = result.message || 'Registration failed. Please try again.';
      messageDiv.className = 'message error'; // Apply error class
    }
      // Optionally, you can redirect the user to the login page
    } catch (error) {
      console.error('Error:', error);
      messageDiv.textContent = 'An error occurred during registration. Please try again later.';
      messageDiv.className = 'message error'; // Apply error class
    }
});


function redirectToLogin() {
  window.location.href = '/login'; // Redirect to the registration page
}
