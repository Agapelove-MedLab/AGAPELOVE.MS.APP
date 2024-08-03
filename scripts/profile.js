// Function to toggle Profile Menu

const profileMenu = document.getElementById('profile');
function toggleProfileMenu() {
  if (profileMenu.classList.contains('show')) {
    profileMenu.classList.remove('show');
  } else {
    profileMenu.classList.add('show');
  }
}


  // Function to toggle Chat Interface
  function toggleChat() {
    const chat = document.querySelector('.chat');
    chat.style.display = (chat.style.display === 'none' || chat.style.display === '') ? 'flex' : 'none';
  }


  document.addEventListener('DOMContentLoaded', function() {
    const profileUserIcon = document.getElementById('profile-user-icon');
    const userIcon = document.getElementById('user-icon');
    const editIcon = document.getElementById('edit-icon');
    const uploadModal = document.getElementById('upload-modal');
    const closeModal = document.querySelector('.close');
    const uploadBtn = document.getElementById('upload-btn');
    const profilePictureInput = document.getElementById('profile-picture-input');
  
    // Fetch user profile
    async function fetchUserProfile() {
        try {
            const response = await fetch('http://localhost:3002/api/profile/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const user = await response.json();
            if (response.ok) {
                console.log('User profile fetched:', user);
                const profilePicUrl = user.profilePicture || 'default-user-icon.png';
                profileUserIcon.src = profilePicUrl;
                userIcon.src = profilePicUrl;
                document.getElementById('user-name').textContent = user.username;
                document.getElementById('profile-email').textContent = user.email;
                document.getElementById('profile-phone').textContent = user.phone;
                document.getElementById('profile-gender').textContent = user.gender;
                document.getElementById('profile-nationality').textContent = user.nationality;
                document.getElementById('profile-state').textContent = user.sate;
                document.getElementById('profile-city').textContent = user.city;
                document.getElementById('profile-address').textContent = user.address;
                document.getElementById('profile-role').textContent = user.role;
                 
            } else {
                console.error(user.message);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
  
    // Open upload modal
    editIcon.addEventListener('click', () => {
        uploadModal.style.display = 'block';
    });
  
    // Close upload modal
    closeModal.addEventListener('click', () => {
        uploadModal.style.display = 'none';
    });
  
    // Upload new profile picture
    uploadBtn.addEventListener('click', async () => {
        const file = profilePictureInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePicture', file);
  
            try {
                const response = await fetch('http://localhost:3002/api/profile/update', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });
  
                const result = await response.json();
                if (response.ok) {
                    alert('Profile updated successfully');
                    console.log('Updated user profile:', result.user);
                    if (result.user.profilePicture) {
                        const profilePicUrl = `${result.user.profilePicture}?t=${new Date().getTime()}`;
                        profileUserIcon.src = profilePicUrl;
                        userIcon.src = profilePicUrl;
                    }
                    document.getElementById('user-name').textContent = result.user.username;
                    document.getElementById('profile-email').textContent = result.user.email;
                    document.getElementById('profile-phone').textContent = user.phone;
                    document.getElementById('profile-gender').textContent = user.gender;
                    document.getElementById('profile-nationality').textContent = user.nationality;
                    document.getElementById('profile-state').textContent = user.sate;
                    document.getElementById('profile-city').textContent = user.city;
                    document.getElementById('profile-address').textContent = user.address;
                    document.getElementById('profile-role').textContent = user.role;
                    uploadModal.style.display = 'none';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                alert('An error occurred while updating the profile');
            }
        }
    });
  
    // Fetch user profile on page load
    fetchUserProfile();
});




document.addEventListener('DOMContentLoaded', function() {
  const userList = document.getElementById('user-list');
  let messageArea = document.getElementById('messages');
  let messageContent = document.getElementById('message-content');
  let fileInput = document.getElementById('file-input');
  let selectedUserId = null;

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3002/api/profile/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const users = await response.json();
      
      if (response.ok) {
        const userList = document.querySelector('.user-list');
        
        // Dynamically create user items
        userList.innerHTML = users.map(user => `
          <div class="user-item" data-id="${user._id}">
            <img src="${user.profilePicture || 'default-user-icon.png'}" alt="${user.username}">
            <span>${user.username}</span>
            ${user.hasUnreadMessages ? '<div class="notification-dot visible"></div>' : '<div class="notification-dot"></div>'}
          </div>
        `).join('');
        
        // Attach click handlers to user items
        attachUserClickHandlers();
      } else {
        console.error(users.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function updateUserNotificationDots() {
      try {
          const response = await fetch('http://localhost:3002/api/messages/unread', {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          const unreadData = await response.json();
          if (response.ok) {
              document.querySelectorAll('.user-item .notification-dot').forEach(dot => dot.classList.remove('visible'));
              unreadData.forEach(user => {
                  const userElement = document.querySelector(`.user-item[data-user-id="${user._id}"] .notification-dot`);
                  if (userElement) {
                      userElement.classList.add('visible');
                  }
              });
          } else {
              console.error(unreadData.message);
          }
      } catch (err) {
          console.error('Error updating user notification dots:', err);
      }
  }

  function attachUserClickHandlers() {
    document.querySelectorAll('.user-item').forEach(item => {
      item.addEventListener('click', async function () {
        selectedUserId = this.getAttribute('data-id');
        const selectedUserProfilePic = this.querySelector('img').src;
        const selectedUserName = this.querySelector('span').textContent;
  
        // Clear notification dot for this user
        this.querySelector('.notification-dot').classList.remove('visible');
  
        // Open the chat with the specific user
        await openChatWithUser(selectedUserId);
  
        document.querySelectorAll('.user-item').forEach(user => user.classList.remove('selected'));
        this.classList.add('selected');
  
        document.querySelector('.message-area').innerHTML = `
          <div class="selected-user-info">
            <img src="${selectedUserProfilePic}" alt="${selectedUserName}" class="selected-user-pic">
            <span class="selected-user-name">${selectedUserName}</span>
          </div>
          <div id="messages">
            <!-- Messages will be displayed here -->
          </div>
          <div class="messaging-controllers">
            <textarea id="message-content" placeholder="Type your message"></textarea>
            <div class="file-upload-wrapper">
              <input type="file" id="file-input" multiple>
              <button id="file-upload-btn"><i class="fas fa-paperclip"></i></button>
            </div>
            <button id="send-message-btn"><i class="fas fa-paper-plane"></i></button>
          </div>
        `;
  
        messageArea = document.getElementById('messages');
        messageContent = document.getElementById('message-content');
        fileInput = document.getElementById('file-input');
  
        document.getElementById('send-message-btn').addEventListener('click', sendMessage);
        await fetchMessages(selectedUserId);
      });
    });
  }
  
  async function openChatWithUser(userId) {
    await fetchMessages(userId);
  }
  
  


  async function fetchMessages(userId) {
      try {
          const response = await fetch(`http://localhost:3002/api/messages/messages/${userId}`, {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          const messages = await response.json();
          if (response.ok) {
              if (messages.length === 0) {
                  messageArea.innerHTML = '<p>No previous chats. Start a new conversation!</p>';
              } else {
                  messageArea.innerHTML = messages.map(msg => `
                      <div class="messages ${msg.sender === userId ? 'received' : 'sent'}">
                          ${msg.content ? `<p>${msg.content}</p>` : ''}
                          ${msg.file ? `
                              <div class="file-container">
                                  <img src="${msg.file}" alt="Sent File" />
                                  <div class="file-actions">
                                      <a href="${msg.file}" download class="download-icon"><i class="fas fa-download"></i></a>
                                      <a href="${msg.file}" target="_blank" class="share-icon"><i class="fas fa-eye"></i></a>
                                  </div>
                              </div>
                          ` : ''}
                          <div class="timestamp">${formatDate(msg.createdAt)}</div>
                      </div><br>
                  `).join('');
              }
          } else {
              console.error(messages.message);
          }
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
  }

  async function sendMessage() {
      const content = messageContent.value.trim();
      const file = fileInput.files[0];
      if (!content && !file) return;

      const formData = new FormData();
      formData.append('receiver', selectedUserId);
      formData.append('content', content);
      if (file) formData.append('file', file);

      try {
          const response = await fetch('http://localhost:3002/api/messages/messages', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: formData
          });
          const result = await response.json();
          if (response.ok) {
              messageContent.value = '';
              fileInput.value = '';
              await fetchMessages(selectedUserId);
          } else {
              console.error(result.message);
          }
      } catch (error) {
          console.error('Error sending message:', error);
      }
  }

  function formatDate(dateString) {
      const date = new Date(dateString);
      return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
  }

  // document.getElementById('chat-button').addEventListener('click', () => {
  //     toggleChat();
  //     document.getElementById('notification-dot').classList.remove('visible');
  // });

  fetchUsers();
  updateUserNotificationDots();
  setInterval(updateUserNotificationDots, 5000);
});

  

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Attach click events to the buttons
    document.getElementById('chat-btn').addEventListener('click', toggleChat);
    document.getElementById('user-icon').addEventListener('click', toggleProfileMenu);
});


  function logOut() {
    // Show the confirmation modal
    document.getElementById('logoutModal').style.display = 'block';
}

document.getElementById('confirmLogout').addEventListener('click', () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = '/login';

    // Hide the modal
    document.getElementById('logoutModal').style.display = 'none';
});
  


// To close the modal if user clicks outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('logoutModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


window.addEventListener('click', function (event) {
    const modal = document.getElementById('profile');
    if (event.target == modal || event.target.className == 'close') {
      modal.style.display = 'none';
    }
  });