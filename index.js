//const form = document.getElementById('guestform');
//const guestList = document.getElementById('guestList'); //display list of guests

//let myGuests = []; //empty array that store guest objects like names

//form.addEventListener('submit', function(event){
    //event.preventDefault(); //stops the form from refreshing the page
    // get the values that the user has keyed in the form
    //const firstName = document.getElementById('fname').value.trim(); //trim removes white spaces that are extra
    //const lastName = document.getElementById('lname').value.trim();
    //const phone = document.getElementById('phone').value.trim();
    //const category = document.getElementById('category').value;

    //alerts the user if the required fields are empty
    //if(!firstName || !lastName || !phone){
        //alert("please fill in the required fields");
        //return;
   // }
    
    //user is alert if the guest list has reached the limit(10)
    //if(myGuests.length >=10){
        //alert("The guest list has reached the limit.");
        //return;
    //}
    //const newGuest = {
        //id: Date.now(),
        //firstName,
        //lastName,
        //phone,
        //category,
        //attending: true,
        //addedAt: new Date().toLocaleTimeString()
    //};

    //myGuests.push(newGuest);
    //form.requestFullscreen();
    //renderGuests();
//});

//function renderGuests() {
 // guestList.innerHTML = '';

  //guests.forEach(guest => {
    //const li = document.createElement('li');
    //li.className = `guest ${guest.category}`;

   // li.innerHTML = `
      //<div>
        //<strong>${guest.firstName} ${guest.lastName}</strong> - 
        //<em>${guest.phone}</em><br>
        //<span>Category: ${guest.category}</span> |
        //<span>Status: ${guest.attending ? 'Attending' : 'Not Attending'}</span><br>
        //<span class="timestamp">Added at: ${guest.addedAt}</span>
      //</div>
      //<div class="actions">
        //<button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
        //<button onclick="editGuest(${guest.id})">Edit</button>
        //<button onclick="removeGuest(${guest.id})">Remove</button>
     // </div>
    //`;

    //guestList.appendChild(li);
  //});
//}

//function toggleRSVP(id) {
  //guests = guests.map(g => g.id === id ? { ...g, attending: !g.attending } : g);
  //renderGuests();
//}

//function editGuest(id) {
  //const guest = guests.find(g => g.id === id);
  //if (!guest) return;

  //const newFirst = prompt("Edit first name:", guest.firstName);
  //const newLast = prompt("Edit last name:", guest.lastName);
  //if (newFirst && newLast) {
    //guest.firstName = newFirst.trim();
    //guest.lastName = newLast.trim();
    //renderGuests();
  //}
//}

//function removeGuest(id) {
  //guests = guests.filter(g => g.id !== id);
  //renderGuests();
//}


//class work

let submit = document.querySelector("button")
submit.addEventListener('click',SubmitEvent)

function SubmitEvent(){
  let userInput = document.getElementById("fname").value
  //console.log("userInput")
  let outputArea = document.querySelector(".output")
  let li = document.createElement("li")
  li.innerHTML = userInput
  outputArea.appendChild(li)
  //console.log(li)
}