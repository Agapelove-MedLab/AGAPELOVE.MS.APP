document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const messageDiv = document.getElementById('message');

  messageDiv.textContent = 'Processing...'; // Show processing message
  messageDiv.className = 'message processing'; // Apply processing class
  const formData = new FormData(event.target);

  const data = {
    identifier: formData.get('email') || formData.get('phone'),
    password: formData.get('password')
  };
  
  try {
    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        //  'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok && result.token) {
      localStorage.setItem('token', result.token);
      setTimeout(() => {
        messageDiv.textContent = 'Login successful. Access granted.';
        messageDiv.className = 'message success'; // Apply success class
  
      }, 2000); // Wait 1 second before redirecting
      loginForm.reset(); // Reset the form
      
      setTimeout(() => {
        window.location.href = '/main';  // Redirect to main system page
      }, 2000); // Wait 1 second before redirecting
    } else {
      messageDiv.textContent = result.message || 'Login failed. Invalid email or password!.';
      messageDiv.className = 'message error'; // Apply error class
    }
  } catch (error) {
    console.error('Error:', error);
    messageDiv.textContent = 'An error occurred during login. Please try again later.';
    messageDiv.className = 'message error'; // Apply error class
  }
});



// Function to open the authentication modal
function openAuthModal() {
  document.getElementById('auth-modal').style.display = 'block';
}

// Function to close the authentication modal
function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
}

// Function to show an alert in the authentication modal
function showAuthAlert(message) {
  const alertBox = document.getElementById('auth-alert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';
  setTimeout(() => alertBox.style.display = 'none', 3000);
}

// Function to verify staff code
async function verifyStaffCode(staffCode) {
  try {
      const response = await fetch(`http://localhost:3002/verifyCode`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: staffCode })
      });

      if (!response.ok) {
          throw new Error('Failed to verify staff code: ' + response.statusText);
      }

      const data = await response.json();
      if (!data.isValid) {
          throw new Error('Invalid staff code');
      }

      return data;
  } catch (error) {
      console.error('Error verifying staff code:', error);
      throw error;
  }
}

// Event listener for the Register button on the login page
document.getElementById('register-btn').addEventListener('click', function () {
  document.getElementById('codeInput').value = '';
  openAuthModal();
});

// Event listener for authentication submit button
document.getElementById('auth-submit-btn').addEventListener('click', async function () {
  const staffCode = document.getElementById('codeInput').value.trim();
  try {
      const result = await verifyStaffCode(staffCode);

      if (result.isValid) {
          closeAuthModal();
          window.location.href = '/register'; // Navigate to the registration page on successful authentication
      } else {
          showAuthAlert('Invalid Staff Code');
      }
  } catch (error) {
      showAuthAlert('Error verifying staff code');
  }
});

// Close the modal when the user clicks on <span> (x)
document.getElementById('auth-close-btn').addEventListener('click', function () {
  document.getElementById('auth-modal').style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  if (event.target == document.getElementById('auth-modal')) {
      document.getElementById('auth-modal').style.display = 'none';
  }
};


// Function to toggle the password visibility
document.getElementById('togglePassword').addEventListener('change', function (event) {
  const passwordInput = document.getElementById('codeInput');
  if (event.target.checked) {
      passwordInput.type = 'text';
  } else {
      passwordInput.type = 'password';
  }
});





function redirectToForgotPassword() {
  window.location.href = '/forgotPassword'; // Redirect to the registration page
}
