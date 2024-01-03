const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express(); // Create an Express application

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database'); 
const db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };

    
    const User = mongoose.model('User', {
        name: String,
        age: Number,
        email: String,
        phno: String,
        gender: String,
        password: String
    });

    const newUser = new User(data);

    
    newUser.save()
        .then(() => {
            console.log("Record Inserted Successfully");
    })
    .catch((err) => {
        throw err;
});

});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-origin": '*'
    });
    res.redirect('index.html');
});

const PORT = 3032;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
