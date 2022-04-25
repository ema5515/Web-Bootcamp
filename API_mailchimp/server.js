const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public/"));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    console.log(firstName);
    console.log(lastName);
    console.log(email);

});

app.listen(3000, function(){
    console.log("server run on port 3000");
});

//3d9acac86e841b1d89376e8cad02e5ca-us14

//ID
//fb089f6e20
