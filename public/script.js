const main = document.querySelector("main");
const contactContainerDiv = document.querySelector(".contact_container");
const submitBtn = document.querySelector("#submit_btn");
const form = document.querySelector(".form_con");

async function getAllContacts() {
    try{
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json();
        // console.log(data)
        renderAllContacts(data)
    } catch {
        console.log("error")
    }
}

getAllContacts()



function renderAllContacts (contacts) {
    //Hämta users från json
    // console.log(contacts)
    //loopa igenom json filen och skapa div för varje kontakt kort
    contactContainerDiv.innerHTML = ""
    for(const contact of contacts) {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contactCard")

        const contactId = document.createElement("p");
        contactId.innerText = "Id: " + contact.id
        const contactUserName = document.createElement("p");
        contactUserName.innerText = "Username: " + contact.userName
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
        contactCard.appendChild(contactUserName);
        contactCard.appendChild(contactFirstName);
        contactCard.appendChild(contactLastName);
        contactCard.appendChild(updateBtn);
        updateBtn.insertAdjacentElement("afterBegin", updateIcon);
        updateBtn.setAttribute('id', contact.id)
        updateBtn.addEventListener('click', (e) => {
            console.log(e.target.id);
            const updatetarget = e.target.id
            updateContact(updatetarget)
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
    // console.log([...formData])
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


async function updateContact (updatetarget) {
    const response = await fetch(`http://localhost:3000/api/users/${updatetarget}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatetarget)
    })
    response.json()
}