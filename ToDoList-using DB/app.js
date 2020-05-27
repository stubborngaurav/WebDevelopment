const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require('mongoose');

// connect to local databse
const url = "mongodb://localhost:27017";
const dbName = "ToDoDB";

// connect to server database
const user = "gaurav-garg";
const password ="gaurav123";
const urlMongoServer = "mongodb+srv://" + user + ":" + password + "@cluster0-njxjv.mongodb.net";

mongoose.connect(urlMongoServer + "/" + dbName, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connect to local
app.listen(3000, function(){
    console.log("Server stated on port 3000.");
});


// create default items list
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
// create model using itemSchema with single collection name.
// mongoose will create table named "items"
const Item = mongoose.model("Item", itemSchema);
var item1 = new Item( { name: "Buying Food" });
var item2 = new Item( { name: "Cooking Food" });
var item3 = new Item( { name: "Eating Food" });


// create list schema for generic pages
const ListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    items: [itemSchema]
});
const List = mongoose.model("List", ListSchema);



app.get("/", function(req, res) {
    
    Item.find(function(err, items){
        if(err){
            console.log(err);
        }
        else{

            if(items.length === 0){
                Item.insertMany([item1, item2, item3], function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                       console.log("Default item list added !!");
                    } 
                });
            }
            
            //console.log(items);
            res.render("list", {pageTitle: "Today", newListItems: items});
        }
    })
});

// generic custom list
app.get("/:customListName", function(req,res){
    var customListName = req.params.customListName;

    List.findOne({name: customListName}, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: customListName,
                    items: [item1, item2, item3]
                });

                list.save();
                res.redirect("/" + customListName);
            }
            else{
                res.render("list", {pageTitle: foundList.name, newListItems: foundList.items});
            }
        }
    });
})


app.post("/", function(req, res){
    var newItem = req.body.newItem;
    var pageTitle = req.body.listTitle;

    if(newItem === null && newItem === ""){
        res.redirect("/");
        return;
    }

    var item = new Item( { name: newItem });

    if(pageTitle === "Today"){
        item.save();
        res.redirect("/");
    }
    else{
        List.findOne({name: pageTitle}, function(err, foundList){
            if(!err){
                foundList.items.push(item);
                foundList.save();
                res.redirect("/"+pageTitle);
            }
        });
    }

    
});

app.post("/delete", function(req, res){

    var itemIdToDelete = req.body.checkbox;
    var pageTitle = req.body.title;

    if(pageTitle === "Today"){
        Item.findByIdAndRemove(itemIdToDelete, function(err){
            if(!err){
                console.log("Successfully Deleted !!");
                res.redirect("/");
            }
        });
    }
    else{
        List.findOneAndUpdate({name: pageTitle}, {$pull: {items: {_id: itemIdToDelete}}}, function(err, foundList){
            if(!err){
                res.redirect("/"+pageTitle);
            }
        });
    }
});


app.get("/about", function(req,res){
    res.render("about");
});
