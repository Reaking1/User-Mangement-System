const express = require('express');
const bodyParser = require("body-parser")
let users = [{}]
console.log(users);

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.static
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req,res) {
    res.render("home", {
        data: users
    })
})

app.post("/", (req, res) => {
    const inputUserName = req.body.userName;
    const inputUserEmail = req.body.userEmail;
    const inputUserAge = req.body.userAge;
    const inputUsersUniqueId = req.body.usersUniqueId; // corrected variable name

    users.push({
        userName: inputUserName,
        userEmail: inputUserEmail,
        userAge: inputUserAge,
        usersUniqueId: inputUsersUniqueId
    });

    res.render("home", {
        data: users
    });
});


app.post("/delete", (req,res) => {
    var requestedUsersUniqueId = req.body.usersUniqueId
    var j = 0
    users.forEach(user => {
        j = j + 1;
        if(user.usersUniqueId === requestedUsersUniqueId) {
            users.splice((j - 1), 1)
        }
    })
    res.render("home", {
        data: users
    })
});


app.post("/update", (req,res) => {
    const inputUserName = req.body.userName;
    const inputUserEmail = req.body.userEmail;
    const inputUserAge = req.body.userAge;
    const inputUsersUniqueId = req.body.usersUniqueId;
    
    let j = 0;

    users.forEach(user => {
        j = j + 1
        if(user.usersUniqueId === inputUsersUniqueId) {
            user.userName = inputUserName;
            user.userEmail = inputUserEmail;
            user.userAge = inputUserAge
        }
    })

   res.render("home", {
    data:users
   })
})


app.listen(3000, (req,res) => {
    console.log("Its working on port 3000")
})