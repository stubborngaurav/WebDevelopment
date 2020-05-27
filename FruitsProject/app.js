const mongoose = require('mongoose');

const url = "mongodb://localhost:27017";
const dbName = "FruitsDB";
mongoose.connect(url + "/" + dbName, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// schema with validations
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//creating a table name "fruits" in database.
// mongoose use lodash package to change the name
// we provide in this case "Fruits" to "fruits" in database.
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
    name: "Banana",
    rating: 10,
    review: "Favourite fruit."
});
//fruit.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Kiwi fruit in NZ."
});

//kiwi.save();



// another schema and collection
const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// this will generate a table "people" in database
const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: "John",
    age: 37
});
//person.save();



// to save  many items use
// Person.insertMany([person1, person2, person3], function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("saved success !!");
//     }
// });



// reading from database using mongoose
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }
    else{
        //console.log(fruits);
        fruits.forEach(fruit => console.log(fruit.name));
        
        // to close the connection, avoid to use ^c
        mongoose.connection.close();
    }
})


// update from database
// Fruit.updateOne({_id: "someid"}, {name:"banana"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("delete success !!");
//     }
// }



// delete from database
// Fruit.deleteOne({name:"banana"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("delete success !!");
//     }
// })