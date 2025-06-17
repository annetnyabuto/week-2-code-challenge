let myGuests = [];
let editingGuestId = null;

// Get DOM elements
const form = document.getElementById('guestForm');
const guestList = document.getElementById('guestList');
const submitButton = document.getElementById('nameSmt');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const category = document.getElementById('category').value;

    // Validate inputs
    if(!firstName || !lastName || !phone) {
        alert("Please fill in all required fields");
        return;
    }
    
    // Validate phone number - check if it contains only digits
    for (let digit of phone) {
        if (digit < '0' || digit > '9') {
            alert("Phone number must contain only numbers");
            return;
        }
    }
    
    if (editingGuestId) {
        // Update existing guest
        for (let i = 0; i < myGuests.length; i++) {
            if (myGuests[i].id === editingGuestId) {
                myGuests[i].firstName = firstName;
                myGuests[i].lastName = lastName;
                myGuests[i].phone = phone;
                myGuests[i].category = category;
                break;
            }
        }
        
        // Reset editing state
        editingGuestId = null;
        submitButton.textContent = 'Add Guest';
    } else {
        // Check guest limit
        if(myGuests.length >= 10) {
            alert("The guest list has reached the limit.");
            return;
        }
        
        // Add new guest
        myGuests.push({
            id: Date.now(),
            firstName, lastName, phone, category,
            attending: true,
            addedAt: new Date().toLocaleTimeString()
        });
    }
    
    form.reset();
    renderGuests();
});

// Render guest list
function renderGuests() {
    guestList.innerHTML = '';

    myGuests.forEach(guest => {
        const li = document.createElement('li');
        
        // Guest info
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <strong>${guest.firstName} ${guest.lastName}</strong> - 
            <em>${guest.phone}</em><br>
            Category: ${guest.category} | 
            Status: ${guest.attending ? 'Attending' : 'Not Attending'}<br>
            <small>Added at: ${guest.addedAt}</small>
        `;
        
        // Action buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';
        
        // Edit button with category color
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = `${guest.category}-btn`;
        editButton.onclick = () => editGuest(guest.id);
        
        // Other buttons
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle RSVP';
        toggleButton.onclick = () => toggleRSVP(guest.id);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeGuest(guest.id);
        
        // Add buttons to actions div
        actionsDiv.append(editButton, toggleButton, removeButton);
        
        // Add everything to list item
        li.append(infoDiv, actionsDiv);
        guestList.appendChild(li);
    });
}

// Edit guest details
function editGuest(id) {
    const guest = myGuests.find(g => g.id === id);
    if (guest) {
        document.getElementById('fname').value = guest.firstName;
        document.getElementById('lname').value = guest.lastName;
        document.getElementById('phone').value = guest.phone;
        document.getElementById('category').value = guest.category;
        
        editingGuestId = id;
        submitButton.textContent = 'Update Guest';
    }
}

// Toggle RSVP status
function toggleRSVP(id) {
    for (let i = 0; i < myGuests.length; i++) {
        if (myGuests[i].id === id) {
            myGuests[i].attending = !myGuests[i].attending;
            break;
        }
    }
    renderGuests();
}

//remove a guest
function removeGuest(id) {
    myGuests = myGuests.filter(guest => guest.id !== id);
    renderGuests();
}