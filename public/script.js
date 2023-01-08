const main = document.querySelector("main");
const contactContainerDiv = document.querySelector(".contact_container");
const submitBtn = document.querySelector("#submit_btn");
const form = document.querySelector(".form_con");
const updateContainer = document.querySelector(".update_container")
const closePopup = document.querySelector(".close-button")
const popupUpdateBtn = document.querySelector(".popupUpdateBtn")
const overlay = document.querySelector("#overlay")

const searchDiv = document.querySelector(".search_div")
const searchInput = document.querySelector(".search_input")
const searchBtn = document.querySelector(".searchBtn")
const searchPopupDiv = document.createElement("div");
searchDiv.appendChild(searchPopupDiv)
const searchFirstname = document.querySelector("#search_firstname")

const email = document.querySelector("#email");
const firstName = document.querySelector("#firstN");
const lastName = document.querySelector("#lastN");

async function getAllContacts() {
    try{
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json();
       
        renderAllContacts(data)
    } catch {
        console.log("error")
    }
}

getAllContacts()



function renderAllContacts (contacts) {

    contactContainerDiv.innerHTML = ""
    for(const contact of contacts) {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contactCard")

        const contactId = document.createElement("p");
        contactId.innerText = "Id: " + contact.id
        const contactemail = document.createElement("p");
        contactemail.innerText = "Email: " + contact.email
        const contactFirstName = document.createElement("p");
        contactFirstName.innerText = "Firstname: " + contact.firstName   
        const contactLastName = document.createElement("p");
        contactLastName.innerText = "Lastname: " + contact.lastName

        const updateBtn = document.createElement("button");
        updateBtn.innerText = "Update" 
        const updateIcon = document.createElement("i");
        updateIcon.setAttribute("class", "fa-solid fa-pencil");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "delete" 
        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fa-regular fa-trash-can");
        
        contactContainerDiv.appendChild(contactCard)
        contactCard.appendChild(contactId);
        contactCard.appendChild(contactemail);
        contactCard.appendChild(contactFirstName);
        contactCard.appendChild(contactLastName);
        contactCard.appendChild(updateBtn);
        updateBtn.insertAdjacentElement("afterBegin", updateIcon);
        updateBtn.setAttribute('id', contact.id)
        updateBtn.addEventListener('click', (e) => {
            console.log(e.target.id);
            const updatetarget = e.target.id
            updatePopup(updatetarget)
        })

        deleteBtn.insertAdjacentElement("afterBegin", deleteIcon);
        deleteBtn.setAttribute('id', contact.id)
        contactCard.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', (e) => {
            console.log(e.target.id);
            const deletetarget = e.target.id
            removeUser(deletetarget)
        })
      

    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();


    const formData = new FormData(form);//new objekt of type form data, 
    const data = Object.fromEntries(formData)
    
    fetch('http://localhost:3000/api/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => renderAllContacts(data))
    .catch(err => console.log(err))
})



async function removeUser(contact) {
    
        const responses = await fetch(`http://localhost:3000/api/users/${contact}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
        });
   
    const data = await responses.json()
    renderAllContacts(data);
}

function updatePopup(updatetarget) {
    updateContainer.style.display = "block"
    overlay.style.display = "block"
    popupUpdateBtn.addEventListener('click', () => {
       
        updateContact(updatetarget)
      
    })
   
}


closePopup.addEventListener('click', () => {
    updateContainer.style.display = "none"
    // updateContact()
    overlay.style.display ="none"
})


async function updateContact (updatetarget) {
   

    const response = await fetch(`http://localhost:3000/api/users/${updatetarget}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify({"email": email.value, "firstName": firstName.value, "lastName": lastName.value})
    }) 
   
    response.json()
    
}



searchBtn.addEventListener("click", searchContact)

async function searchContact () {
    const searchValue = searchFirstname.value
    try {
        const response = await fetch(`http://localhost:3000/api/users/${searchValue}`)
        const data = await response.json();
        
        searchPopupDiv.innerText = data.firstName + " finns i kontaktboken" + " med id: " + data.id
        console.log(data);}
        catch{
            searchPopupDiv.innerText = "Nähäädu, du har ingen kontakt som heter " + searchValue
            
        }

}

