const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const aricleSchema = {
    name: String,
    content: String
}

const Article = mongoose.model('articles', aricleSchema);

app.route("/articles")
    .get(function(req, res){
        Article.find({}, function(err, results){
            if(err){
                res.send(err);
            }else{
                res.send(results);
            }
        })
    })

    .post(function(req,res){

        const newArticle = new Article({
            name: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err){
            if(err){
                res.send(err);
            } else {
                res.send("Successfuly added new articles");
            }
        });
    })

    .delete(function(req, res){
        Article.deleteMany({}, function(err){
            if(err){
                res.send(err);
            }else{
                res.send("deleted all articles");
            }
        });
    });


app.route("/articles/:title")

    .get(function(req, res){

        const title = req.params.title; 

        Article.findOne({name: title}, function(err, results){
            if(err){
                res.send(err);
            } else if(results){
                res.send(results);
            } else{
                res.send("No results matches");
            }
        })
    })
    .put(function(req, res){
        Article.updateOne(
            {title: req.params.title},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("Success");
                }
            });
    })
    .patch(function(req, res){
        Article.updateOne(
            {title: req.params.title},
            {$set: req.body},
            function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("Success");
                }
            });
    })
    .delete(function(req, res){
        Article.deleteOne(
            {title: req.params.title},
            function(err){
                if(err){
                    res.send(err);
                }else{
                    res.setDefaultEncoding("Success");
                }
            });
    });





app.listen(3000, function(){
    console.log("server start on port 3000");
});