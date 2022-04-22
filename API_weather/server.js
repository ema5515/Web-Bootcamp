const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res){ 
    const apiKey = "9ec866592e4aee28e01bef6bb5ed651f";
    const city = req.body.city;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city + "&units=" + units;
    
   
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            const location = weather.name;
            var dimension = "2x";
            const iconUrl =  "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@" + dimension + ".png";

            res.type("text/html");
            res.write("<h1>in " + location + " the weather is " + description + " with " + temp + "°</h1>");
            res.write("<img src=" + iconUrl + ">")
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("server is running on port 3000");
})