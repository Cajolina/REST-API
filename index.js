const express = require("express");
const app = express();
//const data = require("./users.json");
//filesystem för att kunna hantera filer, läsa skriva osv. Annars kan vi inte gör så mycket gentligen. Om vi vill hämta från jsonfil. Men om vi vill hämta från en array som är hårdkodad.
//Bara för att ta externa fikler och använda.
const fs = require("fs");
const users = require("./users.json")

// const cors = require("cors")
//datan som skickas från post request. parser 
app.use(express.json());

//Get all data
app.get('/api/users', (req, res) =>{
    // res.send(users)
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
app.get('/api/users/:id', (req, res) => {
    const user = users.find((user) => user.id == req.params.id);
        if (!user) res.status(404).send("User with id was not found");
        res.send(user);

    // fs.readFile("users.json", (err, data) => {
    //     if(err) {
    //         console.log(err);
    //         //res.status(404).send("Couldn't get specific user")
    //     }
    //     const users = JSON.parse(data)
    //     const specificUser = users.filter(user => user.id == req.params.id)

    //   res.status(200).send(specificUser)  
    // })
    
})

//Skapa. Skapa id
app.post('/api/users/add', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if(err) {
             res.status(404).send("Couldn't get users")
        }

        const users = JSON.parse(data)
        const newUser = {
            id: users.length +1,
            userName: req.body.userName,
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



//Update
app.put('/api/users/update/:id', (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if(err) {
            res.status(404).send("Couldn't update users")
            return
        }else {
            const users = JSON.parse(data)
            users.find((user) => {
            if(user.id == req.params.id) {
                user.userName = req.body.userName,
                user.firstName = req.body.firstName,
                user.lastName = req.body.lastName
            } else{
                res.status(404).send("Couldn't find id and update users")
            }
        });
        //  const users = JSON.parse(data);
        //  const specificUser = users.filter(user => user.id == req.params.id)
        //  if(specificUser) {
        //     {
        //         specificUser.userName = req.body.userName,
        //         specificUser.firstName = req.body.firstName,
        //         specificUser.lastName = req.body.lastName
        //      }
        //     // users.push(specificUser);
        //  }
         fs.writeFile("users.json", JSON.stringify(users, null, 2), () => {
            // if(err) {
            //     res.status(400).send("Can not update");
            // }
           res.status(202).send(users);
         })
        }
        
          
    })
    
});



//Ta bort
app.delete('/api/users/delete/:id', (req, res) => {
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