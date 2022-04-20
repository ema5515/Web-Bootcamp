//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(express.static('/public/'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.get('/CSS/style.css', function(req, res){
    res.sendFile(__dirname + "/CSS/style.css")
});

app.post('/', function(req, res){

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var sum = num1 + num2;

    res.send("the results is: " + sum);
});



app.get('/bmi', function(req, res){
    res.sendFile(__dirname + "/bmi_calculator.html")
});

app.post('/bmi', function(req, res){

    var height = Number(req.body.alt);
    var weight = Number(req.body.pes);

    var bmi = weight/((height*height)/10000);

    res.send("your BMI is: " + bmi);
    
});

app.listen(8080, function(){});
