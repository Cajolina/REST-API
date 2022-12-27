const express = require("express");
const app = express();
//const data = require("./users.json");
//filesystem för att kunna hantera filer, läsa skriva osv. Annars kan vi inte gör så mycket gentligen. Om vi vill hämta från jsonfil. Men om vi vill hämta från en array som är hårdkodad.
//Bara för att ta externa fikler och använda.
const fs = require("fs");

// const cors = require("cors")
//datan som skickas från post request. parser 
app.use(express.json());
//Hämta
app.get('/api/users', (req, res) =>{
    
    fs.readFile("./users.json", (err, data) => {
        if(err) {
            console.log(err);
            // res.status(404)
        }
        const users = JSON.parse(data)
        res.status(200).send(users)
        return;
    })
  
});

//Skapa. Skapa id
app.post('/api/users/add', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if(err) {
            console.log(err);
        }

        const users = JSON.parse(data)
        const newUser = req.body
        newUser.id = users.length +1;
        users.push(newUser);
         
         fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.log(err);
            }

         })
       
    })
      
    res.status(201).json(req.body);

});

//Ändra
app.put('/api/users/update/:id', (req, res) => {
    res.status(202).json(req.body)
});

//Ta bort
app.delete('/api/users/delete/:id', (req, res) => {
    res.status(202).json(req.body)
})

//Hämta ett specifikt id
app.get('/api/users/:id', (req, res) => {
    res.status(202).json(req.body)
})

app.listen(3000, () => console.log("Server är igång"));