


let inventoryData = []; // Array to store fetched inventory data

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

// Event listener for opening the inventory overlay
document.getElementById('open-inventory-btn').addEventListener('click', function () {
    document.getElementById('codeInput').value = '';
    openAuthModal();
});

// Event listener for authentication submit button
document.getElementById('auth-submit-btn').addEventListener('click', async function () {
    const staffCode = document.getElementById('codeInput').value.trim();
    const result = await verifyStaffCode(staffCode);

    if (result.isValid) {
        closeAuthModal();
        document.getElementById('inventory-overlay').style.display = 'block';
        logAccess(result.staffName);
        fetchInventoryData(); // Fetch inventory data on successful authentication
    } else {
        showAuthAlert('Invalid Staff Code');
    }
});

// Close the modal when the user clicks on <span> (x)
document.getElementById('auth-close-btn').addEventListener('click', function () {
    document.getElementById('inventory-overlay').style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
    if (event.target == document.getElementById('auth-modal')) {
        document.getElementById('auth-modal').style.display = 'none';
    }
};

// Function to open the authentication modal
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'block';
}

// Function to close the authentication modal
function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function showAuthAlert(message) {
    const alertBox = document.getElementById('auth-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 3000);
}

// Function to log staff access to inventory
async function logAccess(staffName) {
    const timestamp = new Date().toLocaleString();
    const accessLog = `${staffName} accessed the inventory on ${timestamp}.`;

    try {
        await fetch('http://localhost:3002/logAccess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffName, timestamp })
        });
    } catch (error) {
        console.error('Error logging access:', error);
    }

    // Add log to recent access list (displayed in the UI)
    const accessHistory = document.getElementById('access-history');
    const logEntry = document.createElement('li');
    logEntry.textContent = accessLog;
    accessHistory.prepend(logEntry); // Prepend new log to show most recent first
}

// Fetch inventory data from Express server and display it
document.addEventListener('DOMContentLoaded', (event) => {
    let inventoryData = [];

    async function fetchInventoryData() {
        try {
            const response = await fetch('http://localhost:3002/inventory');
            if (!response.ok) {
                throw new Error('Failed to fetch inventory data');
            }
            inventoryData = await response.json();
            console.log('Fetched Inventory Data:', inventoryData); // Debugging line
            renderInventoryTable(inventoryData);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    }

    function applySort() {
        const sortBy = document.getElementById('sort-option').value;
        let sortedData = [...inventoryData];
        console.log('Applying Sort:', sortBy); // Debugging line

        switch (sortBy) {
            case 'name':
                sortedData.sort((a, b) => a.itemName.localeCompare(b.itemName));
                break;
            case 'quantity':
                sortedData.sort((a, b) => a.quantity - b.quantity);
                break;
            case 'status':
                sortedData.sort((a, b) => a.status.localeCompare(b.status));
                break;
            default:
                break;
        }

        console.log('Sorted Data:', sortedData); // Debugging line
        renderInventoryTable(sortedData); // Render sorted data
    }

    function applyFilters() {
        const category = document.getElementById('filter-category').value;
        const specificItem = document.getElementById('specific-item').value.toLowerCase();
        console.log('Applying Filters - Category:', category, 'Item:', specificItem); // Debugging line

        let filteredData = inventoryData;

        if (category) {
            filteredData = filteredData.filter(item => item.category === category);
        }

        if (specificItem) {
            filteredData = filteredData.filter(item => item.itemName.toLowerCase().includes(specificItem));
        }

        console.log('Filtered Data:', filteredData); // Debugging line
        renderInventoryTable(filteredData); // Render filtered data
    }

    function renderInventoryTable(data) {
        const tableBody = document.getElementById('inventory-table-body');
        tableBody.innerHTML = ''; // Clear existing table rows

        if (!Array.isArray(data)) {
            console.error('Data is not an array:', data);
            return;
        }

        data.forEach(item => {
            console.log('Rendering Item:', item); // Debugging line

            // Ensure each field is properly handled, use 'N/A' as fallback
            const itemName = item.itemName || 'N/A';
            const category = item.category || 'N/A';
            const quantity = item.quantity || 'N/A';
            const status = item.status || 'N/A';
            const lastUpdated = item.lastUpdated || 'N/A';
            const accessedBy = item.accessedBy || 'N/A';
            const searchCode = item.searchCode || 'N/A';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${itemName}</td>
                <td>${category}</td>
                <td>${quantity}</td>
                <td>${status}</td>
                <td>${lastUpdated}</td>
                <td>${accessedBy}</td>
                <td>${searchCode}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Event listeners for sort and filter options
    document.getElementById('sort-option').addEventListener('change', applySort);
    document.getElementById('filter-category').addEventListener('change', applyFilters);
    document.getElementById('specific-item').addEventListener('keyup', applyFilters);

    // Initial fetch of inventory data
    fetchInventoryData();
});


function showInventoryAlert(message) {
    const alertBox = document.getElementById('fetch-inventory-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 6000);
}

// Function to update inventory (restock, use, damage)
async function updateInventory(itemName, quantity, action, staffCode) {
    const status = (action === 'restock') ? 'In Stock' : (action === 'use') ? 'Used' : 'Damaged';

    console.log("Sending data to server:", { itemName, quantity, action, status, staffCode });
    // Show loading message while updating inventory
    showUpdateInventoryAlert('Updating inventory...');  
    
    // Simulate delay for demonstration purposes
    await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate delay of 1 second
    
    // Hide loading message after updating inventory
    showUpdateInventoryAlert('Inventory updated successfully!');


    try {
        const response = await fetch('http://localhost:3002/updateInventory', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemName, quantity, action, status, staffCode })
        });

        if (!response.ok) {

            throw new Error(`Failed to update inventory for action '${action}': ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status !== 'success') {

            throw new Error(`Error from server while updating inventory for action '${action}': ${data.error}`);
        }

        // Optional: Fetch updated inventory data after successful update
        fetchInventoryData();
    } catch (error) {
        console.error(`Error updating inventory for action '${action}':`, error);
        // showUpdateInventoryAlert(`Failed to update inventory for action '${action}'. Please check your internet connection and try again later.`);
    }
}

function showUpdateInventoryAlert(message) {
    const alertBox = document.getElementById('update-inventory-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 6000);
}

// Event listeners for restock, use, and damage buttons
document.getElementById('restock-btn').addEventListener('click', function() {
    openModal('Restock Item', 'restock');
});

document.getElementById('use-item-btn').addEventListener('click', function() {
    openModal('Use Item', 'use');
});

document.getElementById('record-damage-btn').addEventListener('click', function() {
    openModal('Record Damage', 'damage');
});

// Function to open modal for restock, use, and damage actions
function openModal(title, action) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-item-name').value = '';
    document.getElementById('modal-quantity').value = '';
    document.getElementById('modal-staff-code').value = '';
    document.getElementById('modal').setAttribute('data-action', action);
    document.getElementById('modal').style.display = 'block';

    // Focus on the item name input field when the modal opens
    document.getElementById('modal-item-name').focus();
}

document.getElementById('modal-submit-btn').addEventListener('click', async function() {
    const itemName = document.getElementById('modal-item-name').value.trim();
    const quantity = parseInt(document.getElementById('modal-quantity').value, 10);
    const staffCode = document.getElementById('modal-staff-code').value.trim();
    const action = document.getElementById('modal').getAttribute('data-action');

    if (itemName && !isNaN(quantity) && quantity > 0 && staffCode) {
        updateInventory(itemName, quantity, action, staffCode);
        closeModal();
    } else {
        showModalAlert('Please enter valid details');
    }
    // Clear the form fields after successful update
    document.getElementById('modal-item-name').value = '';
    document.getElementById('modal-quantity').value = '';
    document.getElementById('modal-staff-code').value = '';
});

// Function to close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function showModalAlert(message) {
    const alertBox = document.getElementById('modal-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 3000);
}


// Event listener for closing modal
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
document.getElementById('add-modal-close-btn').addEventListener('click', closeAddModal);

// Function to add a new inventory item
async function addNewItem(itemName, category, quantity, staffCode, staffName, action) {
    const timestamp = new Date().toISOString();

    try {
        const response = await fetch('http://localhost:3002/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemName, category, quantity, staffCode, staffName, timestamp, action })
        });

        if (!response.ok) {
            throw new Error('Failed to add item: ' + response.statusText);
        }
        const data = await response.json();
        if (data.status !== 'success') {
            throw new Error('Error from server: ' + data.message);
        }
        fetchInventory();
    } catch (error) {
        console.error('Error adding item:', error);
        showAddModalAlert(`Failed to add '${itemName}' to the inventory. Please check your internet connection and try again later.`);
    }
}

function showAddModalAlert(message) {
    const alertBox = document.getElementById('add-modal-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 6000);
}

// Open add item modal
document.getElementById('add-item-btn').addEventListener('click', function () {
    openAddItemModal('Add New Item', 'addItem'); // Pass 'add' as the action
});

function openAddItemModal(title, action) {
    document.getElementById('add-modal-title').textContent = title;
    document.getElementById('add-modal-item-name').value = '';
    document.getElementById('add-modal-category').value = '';
    document.getElementById('add-modal-quantity').value = '';
    document.getElementById('add-modal-staff-code').value = '';
    document.getElementById('searchCode').value = '';
    document.getElementById('add-modal').setAttribute('data-action', action); // Set action value in the modal
    document.getElementById('add-modal').style.display = 'block';
}

// Event listener for add item modal submit button
document.getElementById('add-modal-submit-btn').addEventListener('click', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const itemName = document.getElementById('add-modal-item-name').value.trim();
    const category = document.getElementById('add-modal-category').value.trim();
    const quantity = parseInt(document.getElementById('add-modal-quantity').value, 10);
    const staffCode = document.getElementById('add-modal-staff-code').value.trim();

    if (itemName && category && !isNaN(quantity) && quantity > 0 && staffCode) {
        try {
            const result = await verifyStaffCode(staffCode);
            if (result.isValid) {
                await addNewItem(itemName, category, quantity, staffCode, result.staffName, 'addItem');
                closeAddModal();
            } else {
                showAddModalAlert('Invalid Staff Code');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            showAddModalAlert('Failed to add item. Please check your internet connection and try again later.');
        }
    } else {
        showAddModalAlert('Please enter valid details');
    }
    // Clear the form fields after successful update
    document.getElementById('modal-item-name').value = '';
    document.getElementById('modal-quantity').value = '';
    document.getElementById('modal-staff-code').value = '';
});


function closeAddModal() {
    document.getElementById('add-modal').style.display = 'none';
}

function showAddModalAlert(message) {
    const alertBox = document.getElementById('add-modal-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 3000);
}

// Event listener for fetching inventory data on page load
// document.addEventListener('DOMContentLoaded', fetchInventory);



// Function to check for low stock items
function checkLowStock() {
    const lowStockItems = inventoryData.filter(item => item.quantity < 5);
    if (lowStockItems.length > 0) {
        showLowStockAlert(`Low stock items:\n${lowStockItems.map(item => item.itemName).join('\n')}`);
    } else {
        showLowStockAlert('No low stock items found. Kindly check again');
    }
}

// Event listener for low stock button
document.getElementById('check-low-stock-btn').addEventListener('click', checkLowStock);

function showLowStockAlert(message) {
    const alertBox = document.getElementById('low-stock-alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 5000);
}

async function viewHistory() {
    const action = document.getElementById('history-action').value;
    const startDate = document.getElementById('history-start-date').value;
    const endDate = document.getElementById('history-end-date').value;
    const itemName = document.getElementById('history-item-name').value;

    // Show loading indicator or disable the button while fetching data
    const viewHistoryButton = document.getElementById('view-history-btn');
    viewHistoryButton.disabled = true;

    try {
        const queryParams = new URLSearchParams({ action, startDate, endDate, itemName });
        const response = await fetch(`http://localhost:3002/viewHistory?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error('Failed to fetch inventory history');
        }
        const historyData = await response.json();
        if (historyData.status === 'error') {
            throw new Error(historyData.message);
        }

        if (!historyData.data || !Array.isArray(historyData.data)) {
            throw new Error('Invalid data format received');
        }

        console.log('Fetched Data:', historyData.data); // Log the fetched data
        renderHistoryTable(historyData.data);
    } catch (error) {
        console.error('Error fetching inventory history:', error);
        alert('Failed to fetch inventory history. Please check your internet connection and try again later.');
    } finally {
        viewHistoryButton.disabled = false;
    }
}

function renderHistoryTable(data) {
    const tableBody = document.getElementById('history-table-body');
    tableBody.innerHTML = ''; // Clear existing table rows

    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return;
    }

    data.forEach(item => {
        console.log('Rendering Item:', item); // Log each item being rendered

        // Ensure each field is properly handled, use 'N/A' as fallback
        const timestamp = item.timestamp || 'N/A';
        const itemName = item.itemName || 'N/A';
        const quantity = item.quantity || 'N/A';
        const staffCode = item.staffCode || 'N/A';

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${timestamp}</td>
          <td>${itemName}</td>
          <td>${quantity}</td>
          <td>${staffCode}</td>
        `;
        tableBody.appendChild(row);
    });
}

function showHistoryAlert(message, type = 'error') {
    const alertBox = document.getElementById('fetch-history-alert');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`; // Assumes there are CSS classes for different alert types
    alertBox.style.display = 'block';
    setTimeout(() => alertBox.style.display = 'none', 6000);
}

document.getElementById('view-history-btn').addEventListener('click', viewHistory);


