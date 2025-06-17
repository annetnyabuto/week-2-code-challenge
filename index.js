// Initialize empty array to store guest objects
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
    
    // Validate phone number contains only digits
    if(!/^\d+$/.test(phone)) {
        alert("Phone number must contain only numbers");
        return;
    }
    
    if (editingGuestId) {
        // Update existing guest
        myGuests = myGuests.map(guest => 
            guest.id === editingGuestId ? 
            {...guest, firstName, lastName, phone, category} : 
            guest
        );
        
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
            firstName,
            lastName,
            phone,
            category,
            attending: true,
            addedAt: new Date().toLocaleTimeString()
        });
    }
    
    form.reset();
    renderGuests();
});

// Function to render the guest list
function renderGuests() {
    guestList.innerHTML = '';

    myGuests.forEach(guest => {
        const li = document.createElement('li');
        li.className = guest.category;

        li.innerHTML = `
            <div>
                <strong>${guest.firstName} ${guest.lastName}</strong> - 
                <em>${guest.phone}</em><br>
                <span>Category: ${guest.category}</span> | 
                <span>Status: ${guest.attending ? 'Attending' : 'Not Attending'}</span><br>
                <small>Added at: ${guest.addedAt}</small>
            </div>
            <div class="actions">
                <button onclick="editGuest(${guest.id})">Edit</button>
                <button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
                <button onclick="removeGuest(${guest.id})">Remove</button>
            </div>
        `;

        guestList.appendChild(li);
    });
}

// Function to edit a guest
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

// Function to toggle attendance status
function toggleRSVP(id) {
    myGuests = myGuests.map(g => 
        g.id === id ? {...g, attending: !g.attending} : g
    );
    renderGuests();
}

// Function to remove a guest
function removeGuest(id) {
    myGuests = myGuests.filter(g => g.id !== id);
    renderGuests();
}