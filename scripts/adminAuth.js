document.getElementById('staffRecord-btn').addEventListener('click', openStaffManagementModal);
function openStaffManagementModal() {
  const modal = document.getElementById('staff-management-modal');
  modal.style.display = 'block';
  fetchStaffList();
}

async function fetchStaffList() {
  try {
    const response = await fetch('http://localhost:3002/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const users = await response.json();

    if (response.ok) {
      const staffList = document.querySelector('.staff-list');
      staffList.innerHTML = users.map(user => `
        <div class="staff-item" data-id="${user._id}">
          <img src="${user.profilePicture || 'default-user-icon.png'}" alt="${user.username}">
          <span>${user.username}</span>
        </div>
      `).join('');

      attachStaffClickHandlers();
    } else {
      console.error(users.message);
    }
  } catch (error) {
    console.error('Error fetching staff:', error);
  }
}

function attachStaffClickHandlers() {
  document.querySelectorAll('.staff-item').forEach(item => {
    item.addEventListener('click', async function () {
      const userId = this.getAttribute('data-id');
      currentUserId = userId;
      fetchUserDetails(userId);
    });
  });
}


async function fetchUserDetails(userId) {

  try {
    const response = await fetch(`http://localhost:3002/api/admin/fetchUserDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User details:', data);
      displayStaffDetails(data); // Implement this function to display user details
    } else {
      console.error('Error fetching user details:', data.message);
      showAlert(data.message || 'Error fetching user details. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    showAlert(error || 'Error occured.', 'error');
  }
}

async function blockUser() {

  try {
    const response = await fetch('http://localhost:3002/api/admin/blockUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: currentUserId })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User blocked successfully');
      showAlert('User blocked successfully', 'success');
      fetchStaffList(); // Refresh the staff list after blocking a user
    } else {
      console.error('Error blocking user:', data.message);
      showAlert(data.message || 'Error blocking user.', 'error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    showAlert('An error occurred. Please try again.', 'error');
  }
}

async function unblockUser() {

  try {
    const response = await fetch('http://localhost:3002/api/admin/unblockUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: currentUserId })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User unblocked successfully');
      showAlert('User unblocked successfully', 'success');
      fetchStaffList(); // Refresh the staff list after unblocking a user
    } else {
      console.error('Error unblocking user:', data.message);
      showAlert(data.message || 'An error occurred. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    showAlert('An error occurred. Please try again.', 'error');
  }
}

async function deleteUser() {

  try {
    const response = await fetch('http://localhost:3002/api/admin/deleteUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ userId: currentUserId })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User deleted successfully');
      showAlert('User deleted successfully', 'success');
      fetchStaffList(); // Refresh the staff list after deleting a user
    } else {
      console.error('Error deleting user:', data.message);
      console.error('Error deleting user:', data.message);
      showAlert(data.message || 'An error occurred. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    showAlert('An error occurred. Please try again.', 'error');
  }
}


let currentUserId = null;

function displayStaffDetails(user) {
  currentUserId = user._id; // Set the current user ID
  const staffDetails = document.querySelector('.staff-details');
  staffDetails.innerHTML = `
    <img src="${user.profilePicture || 'default-user-icon.png'}" alt="${user.username}">
    <h3>${user.username}</h3>
    <div class="staff-details-body">
      <div class="details">
        <p>Email: <span contenteditable="false" id="user-email">${user.email}</span></p>
        <p>Phone: <span contenteditable="false" id="user-phone">${user.phone}</span></p>
        <p>Gender: <span contenteditable="false" id="user-gender">${user.gender}</span></p>
        <p>Nationality: <span contenteditable="false" id="user-nationality">${user.nationality}</span></p>
        <p>State: <span contenteditable="false" id="user-state">${user.state}</span></p>
        <p>City: <span contenteditable="false" id="user-city">${user.city}</span></p>
        <p>Address: <span contenteditable="false" id="user-address">${user.address}</span></p>
        <p>Role: <span contenteditable="false" id="user-role">${user.role}</span></p>
        <p>Last Active: <span>${user.lastActive}</span></p>
        <p>Created At: <span>${user.createdAt}</span></p>
      </div>
      <div id="task-section">
        <h2>Assign Tasks</h2>
        <form id="assign-task-form">
          <input type="text" id="task-title" placeholder="Task Title" required>
          <textarea id="task-desc" placeholder="Task Description" required></textarea>
          <input type="date" id="task-due-date" required>
          <button type="submit">Assign Task</button>
        </form>
        <div class="btn">
          <button id="edit-btn" title="Edit user" class="edit-btn"><i class="fas fa-edit"></i></button>
          <button id="save-btn" title="Save changes" class="save-btn hidden"><i class="fas fa-save"></i></button>
          <button id="cancel-btn" title="Cancel edit" class="cancel-btn hidden">X</button>
          <button class="block-btn" title="Block user" onclick="blockUser('${user._id}')"><i class="fas fa-ban"></i></button>
          <button class="unblock-btn" title="Unblock user" onclick="unblockUser('${user._id}')"><i class="fas fa-unlock"></i></button>
          <button class="delete-btn" title="Delete user" onclick="deleteUser('${user._id}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('edit-btn').addEventListener('click', enableEditing);
  document.getElementById('save-btn').addEventListener('click', saveUserDetails);
  document.getElementById('cancel-btn').addEventListener('click', cancelEditing);

  // Add event listener for the task assignment form
  document.getElementById('assign-task-form').addEventListener('submit', assignTask);
}



function enableEditing() {
  const fields = ['email', 'phone', 'gender', 'nationality', 'state', 'city', 'address', 'role'];
  fields.forEach(field => {
    document.getElementById(`user-${field}`).contentEditable = 'true';
  });
  document.getElementById('edit-btn').classList.add('hidden');
  document.getElementById('save-btn').classList.remove('hidden');
  document.getElementById('cancel-btn').classList.remove('hidden');
}

function cancelEditing() {
  const fields = ['email', 'phone', 'gender', 'nationality', 'state', 'city', 'address', 'role'];
  fields.forEach(field => {
    document.getElementById(`user-${field}`).contentEditable = 'false';
  });
  document.getElementById('edit-btn').classList.remove('hidden');
  document.getElementById('save-btn').classList.add('hidden');
  document.getElementById('cancel-btn').classList.add('hidden');
  fetchUserDetails(currentUserId); // Re-fetch user details to discard any unsaved changes
}

async function saveUserDetails() {
  const updatedUser = {
    userId: currentUserId,
    email: document.getElementById('user-email').textContent,
    phone: document.getElementById('user-phone').textContent,
    gender: document.getElementById('user-gender').textContent,
    nationality: document.getElementById('user-nationality').textContent,
    state: document.getElementById('user-state').textContent,
    city: document.getElementById('user-city').textContent,
    address: document.getElementById('user-address').textContent,
    role: document.getElementById('user-role').textContent
  };

  try {
    const response = await fetch('http://localhost:3002/api/admin/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedUser)
    });

    const result = await response.json();

    if (response.ok) {
      showAlert('User details updated successfully', 'success');
      cancelEditing();
      fetchUserDetails(currentUserId); // Re-fetch user details to show updated data
    } else {
      console.error('Error updating user details:', result.message);
      showAlert(result.message || 'An error occurred. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    showAlert('An error occurred. Please try again.', 'error');
  }
}




// JavaScript for Admin Task Management
async function assignTask(e) {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const dueDate = document.getElementById('task-due-date').value;

  try {
    const response = await fetch('http://localhost:3002/api/task/assignTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, description, userId: currentUserId, dueDate })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Task assigned successfully');
      showAlert('Task assigned successfully', 'success');
    } else {
      console.error('Error assigning task:', data.message);
      showAlert(data.message || 'Error assigning task.', 'error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    showAlert('An error occurred. Please try again.', 'error');
  }
}




async function fetchTasks(userId) {
  try {
    const response = await fetch(`http://localhost:3002/api/task/tasks/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const tasks = await response.json();
    if (response.ok) {
      console.log('Fetching tasks for userId:', userId);
      console.log('Tasks fetched successfully');
      displayTasks(tasks);
    } else {
      console.error('Error fetching tasks:', tasks.message);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

function displayTasks(tasks) {
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = tasks.filter(task => !task.completed).map(task => `
    <div class="task-item" data-id="${task._id}">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
      <button onclick="markTaskComplete('${task._id}')">Mark as Complete</button>
    </div>
  `).join('');

  const completedTasksList = document.getElementById('completed-tasks-list');
  completedTasksList.innerHTML = tasks.filter(task => task.completed).map(task => `
    <div class="task-item" data-id="${task._id}">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Completed on: ${new Date(task.updatedAt).toLocaleDateString()}</p>
    </div>
  `).join('');
}

async function markTaskComplete(taskId) {
  try {
    const response = await fetch(`http://localhost:3002/api/task/completeTask/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Task marked as complete');
      document.querySelector(`.task-item[data-id="${taskId}"]`).remove();
      fetchTasks(currentUserId); // Refresh tasks list
    } else {
      console.error('Error marking task as complete:', data.message);
    }
  } catch (error) {
    console.error('Error marking task as complete:', error);
  }
}

// Fetch tasks when the user details are displayed
document.getElementById('task-btn').addEventListener('click', () => {
  if (currentUserId) {
    console.log('currentUserId:', currentUserId);
    fetchTasks(currentUserId);
  } else {
    console.error('Error: currentUserId is not set.');
  }
});


// console.log('currentUserId:', currentUserId);
// console.log('Fetching tasks for userId:', userId);





function showAlert(message, type = 'error') {
  const messageDiv = document.getElementById('messagess');
  messageDiv.textContent = message;
  messageDiv.className = `messagess ${type}`;
  messageDiv.style.display = 'block';
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}

// Fetch staff list on page load
fetchStaffList();

// Close the modal when the user clicks outside of it or on the close button
window.addEventListener('click', function (event) {
  const modal = document.getElementById('staff-management-modal');
  if (event.target == modal || event.target.className == 'close') {
    modal.style.display = 'none';
  }
});
