var superheroes = require("superheroes");
var supervillains = require("supervillains");

var mySuperheroesName = superheroes.random();
var mySupervillainsName = supervillains.random();

console.log(mySuperheroesName + " vs " + mySupervillainsName);