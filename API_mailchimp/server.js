const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const { send } = require("process");

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
    var requestCode;

    console.log(firstName);
    console.log(lastName);
    console.log(email);

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }] 
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/fb089f6e20"; //list ID

    const options = {
        method: "POST",
        auth: "ema5515:", //INSERIRE API KEY
    }

    const mailchimpRequest = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
            requestCode = response.statusCode;
            requestStatus(requestCode);
        })
    });

    mailchimpRequest.write(jsonData);
    mailchimpRequest.end();

    function requestStatus (a){
        if(a === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    };
    
});


app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("server run on port 3000");
});

//ID
//fb089f6e20
