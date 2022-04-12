const express = require("express");
const app = express();

app.get('/', function(req, res){
    console.log(req);
    res.send("Hello");
});

app.get('/contact', function(req, res){
    console.log(req);
    res.send("../../CSex.htjhgfjgfml");
} )

app.listen(8080, function(){
    console.log("my first server start on port 8080")
});