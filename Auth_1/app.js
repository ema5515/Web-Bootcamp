
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
//const encrypt = require('mongoose-encryption');
const md5 = require('md5');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


// userSchema.plugin(encrypt, {secret: process.env.SECRET, enryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res){
    res.render('home');
});

app.get("/login", function(req, res){
    res.render('login');
});

app.get("/register", function(req, res){
    res.render('register');
});

app.get("/logout", function(req, res){
    res.redirect("/");
});


app.post("/register", function(req, res){
    const newUSer = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    newUSer.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("secrets");
        }
    })
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne(
        {username: username},
        function(err, user){
            if(err){
                console.log(err);
            } else if(user){
                if(user.password === password){
                    res.render('secrets');
                } else{res.send("Wrong password");}
            } else {res.send("no user found");}
        });
});


app.listen(8080, function(){
    console.log("server start on port 8080");
});