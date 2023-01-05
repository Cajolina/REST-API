const express = require("express");
const app = express();
var path = require('path');
const fs = require("fs");

app.use(express.static(path.join(__dirname, 'public')));
const cors = require("cors")//behövs om frontend är i annat projekt
app.use(cors());
app.use(express.json());

//Hämta all data
app.get('/api/users', (req, res) =>{
    fs.readFile("./users.json", (err, data) => {
        if(err) {
            res.status(404).send("Couldn't get users")
        }
        const users = JSON.parse(data)
        res.status(200).send(users)
        return;
    })
  
});

//Hämta ett specifikt id

app.get('/api/users/:firstName', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        const users = JSON.parse(data)
        const user = users.find((user) => user.firstName == req.params.firstName);

        if (!user) {
            res.status(404).send("User with id was not found");

        }else {
            res.status(200).send(user)
        }
        
        
    })
})



//Skapa.
app.post('/api/users', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if(err) {
             res.status(404).send("Couldn't get users")
        }
        
        const users = JSON.parse(data)
        const newUser = {
            id: Math.floor(Math.random() * 1000),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        } 
        users.push(newUser);
         
         fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.log(err);
                 res.status(404).send("Couldn't add users")
            }
            res.status(201).send(users);
         })
       
    })
   
});


//Uppdatera
app.put('/api/users/:id', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        const users = JSON.parse(data)
        const user = users.find((user) => user.id == req.params.id);
        if (!user) {
            res.status(404).send("User with id was not found");

        }else{
            users.find((user) => {
            if(user.id == req.params.id) {
                user.email = req.body.email,
                user.firstName = req.body.firstName,
                user.lastName = req.body.lastName
            } 
          
        });
  
         fs.writeFile("users.json", JSON.stringify(users, null, 2), () => {
           res.status(202).send(users);
         })
        }
    })
    
});



//Ta bort
app.delete('/api/users/:id', (req, res) => {
    fs.readFile("users.json", (err,data) => {
        if(err) {
            res.status(404).send("Couldn't delete user")
        }else {
            const users = JSON.parse(data);
            const userId = users.find((user) => user.id == req.params.id);
            const index = users.indexOf(userId);
    
    if(index >= 0) {
        users.splice(index, 1)
    }else {
        res.status(404).send("Couldn't find id and delete user!")
    }
    
    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
        if(err) {
            req.status(404).send("errrrooorrrrr")
        }
        res.status(200).send(users)
    })
       
        }
    
    })
})



app.listen(3000, () => console.log("Server är igång"));