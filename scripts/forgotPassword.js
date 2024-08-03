document.getElementById('otpRequestForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const messageDiv = document.getElementById('message');
  const formData = new FormData(event.target);
  const data = { email: formData.get('email') };

  try {
    const response = await fetch('http://localhost:3002/api/auth/forgot-password', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    messageDiv.textContent = result.message;
    messageDiv.className = response.ok ? 'message success' : 'message error';

    if (response.ok) {
      setTimeout(() => {
        window.location.href = '/resetPassword.html'; // Redirect to reset password page
      }, 2000);
    }
  } catch (error) {
    console.error('Error:', error);
    messageDiv.textContent = 'An error occurred. Please try again.';
    messageDiv.className = 'message error';
  }
});


function redirectToLogin() {
  window.location.href = '/login'; // Redirect to the registration page
}
