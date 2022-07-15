//const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
//const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'fruitsDB';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('fruits');

//   const insert =  await collection.insertMany([
//         {name: "apple", score: 8, review: "great fruit"},
//         {name: "orange", score: 6, review: "kinda sour"},
//         {name: "banana", score: 9, review: "great stuff!"}
//     ])

//     console.log(insert);

//     const findResult = await collection.find({}).toArray();
//     console.log('Found documents =>', findResult);

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB');


const fruitsSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitsSchema
});

const Fruits = mongoose.model("Fruits", fruitsSchema);

const People = mongoose.model("People", peopleSchema);

const pineapple = new Fruits({
  name: "pineapple",
  rating: 5,
  review: "so bad"
}) 

const people = new People({
  name: "manu",
  age: 22,
  favFruit: pineapple
});

pineapple.save();
people.save();


console.log(pineapple);

// Fruits.insertMany([kiwi, banana, orange], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("successfuly saved all the fruits to fruitsDB");
//   }
// });

Fruits.find(function(err, fruits){
  if(err){
    console.log(err);
  } else{

    mongoose.connection.close();

    fruits.forEach(e => {
      console.log(e.name);
    });
  }
});