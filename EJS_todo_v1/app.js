const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public/"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemsSchema = {
    name: {
        type: String,
        required: true
    },
    done: Boolean
};

const listSchema = {
    name: {
        type: String,
        required: true
    },
    items: [itemsSchema]
};

const Item = mongoose.model("item", itemsSchema);
const List = mongoose.model("list", listSchema);



// const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("success!");
//     }
// })


app.get('/', function(req, res){

    var day = date.getDate();

    Item.find({done: 0}, function(err, result){
        if(err){
            console.log(err);
        } else{
            res.render("list", {listTitle: day,
                                items: result,
                                });
        };
    });
    
  
});


app.get('/about', function(req, res){
    res.render("about");
});

app.get('/:newList', function(req,res){

    const listName = _.capitalize(req.params.newList);

    List.findOne({name: listName}, function(err, results){
        if(!err){
            if(!results){

                const list = new List({
                    name: listName,
                    items: []
                }); 

                list.save();
                res.redirect("/" + listName);
            } else{
            res.render("list", {listTitle: listName,
                                items: results.items
                                });
                            }
        };
    });  
});   

app.post('/', function(req, res){
    var newItem = req.body.addToDo;
    var listTitle = req.body.list;
    var day = date.getDate();

    const item = new Item({
        name: newItem,
        done: 0
    });

    if(listTitle === day){
        item.save();
        res.redirect("/");
    } else{
        List.findOne({name: listTitle}, function(err, data){
            data.items.push(item);
            data.save();
            res.redirect("/" + listTitle);
        });
    };
      
});

app.post('/delete', function(req,res){
    const checkbox = req.body.checkbox;
    var listTitle = req.body.list;
    var day = date.getDate();

    if(listTitle === day){

    Item.findByIdAndRemove(checkbox, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("remove succesfully");
            res.redirect("/");
        }
    })
    } else{
        List.findOneAndUpdate({name: listTitle}, {$pull: {items: {_id: checkbox}}}, function(err, results){
            if(!err){
                res.redirect("/" + listTitle);
            }
        });
    }   
});



app.listen(8080, function(){
    console.log("server start on port 8080");
});
