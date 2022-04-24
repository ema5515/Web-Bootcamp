const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){

    const apiKey = "3rLbBrDdM7LxJ7ijFfUHtLr4Tu3rDP";
    const from = req.body.first;
    const to = req.body.second;
    const amount = req.body.amount;
    var query = "&from=" + from +"&to=" + to + "&amount=" + amount;
    const url = "https://www.amdoren.com/api/currency.php?api_key=" + apiKey + query;

    https.get(url, function(response){
        console.log(response.statusCode);
        console.log(url);

        response.on("data", function(data){
            const convertedData = JSON.parse(data);
            const  convertedAmount = convertedData.amount;

            res.write("<h1>" + from + ": " + amount + "</h1>");
            res.write("<h1>" + to + ": " + convertedAmount + "</h1>");
            res.write("Powered by <a href='https://www.amdoren.com'>Amdoren</a>");
            res.send();
        }); 
    });
});

app.listen(8080, function(){
    console.log("server is running on localhost port 8080");
})