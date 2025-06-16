// Initialize empty array to store guest objects
let myGuests = [];

// Get DOM elements
const form = document.getElementById('guestForm');
const guestList = document.getElementById('guestList');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    
    // Get form values
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const category = document.getElementById('category').value;

    // Validate required fields
    if(!firstName || !lastName || !phone) {
        alert("Please fill in all required fields");
        return;
    }
    
    // Check if guest list has reached limit
    if(myGuests.length >= 10) {
        alert("The guest list has reached the limit.");
        return;
    }
    
    // Create new guest object
    const newGuest = {
        id: Date.now(),
        firstName,
        lastName,
        phone,
        category,
        attending: true,
        addedAt: new Date().toLocaleTimeString()
    };

    // Add to guests array
    myGuests.push(newGuest);
    
    // Reset form
    form.reset();
    
    // Update the display
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
                <span>Status: ${guest.attending ? 'Attending' : 'Not Attending'}</span>
            </div>
            <div class="actions">
                <button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
                <button onclick="removeGuest(${guest.id})">Remove</button>
            </div>
        `;

        guestList.appendChild(li);
    });
}

// Function to toggle attendance status
function toggleRSVP(id) {
    myGuests = myGuests.map(g => g.id === id ? { ...g, attending: !g.attending } : g);
    renderGuests();
}

// Function to remove a guest
function removeGuest(id) {
    myGuests = myGuests.filter(g => g.id !== id);
    renderGuests();
}