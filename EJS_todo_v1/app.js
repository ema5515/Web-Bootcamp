const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public/"));
app.set("view engine", "ejs");

var items = [];
var workItems = [];

app.get('/', function(req, res){

    var day = date.getDate();
    
    res.render("list", {listTitle: day,
                        items: items,
                        });
});

app.get('/work', function(req, res){
    res.render("list", {listTitle: "Work",
                        items: workItems,
                        }); 
});

app.get('/about', function(req, res){
    res.render("about");
});


app.post('/', function(req, res){
    var newItem = req.body.addToDo;

     console.log(req.body.list);

    if(req.body.list === "Work"){
        workItems.push(newItem);
        res.redirect("/work");
        console.log(workItems);
    } else {
        items.push(newItem);
        res.redirect("/");
        console.log(items);
    }
      
});



app.listen(8080, function(){
    console.log("server start on port 8080");
});
