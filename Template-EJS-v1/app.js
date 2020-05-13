const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Server stated on port 3000.");
});

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function(req, res) {
    let day = date.getDay();
    res.render("list", {dayKind: day, newListItems: items});
});

app.post("/", function(req, res){
    var item = req.body.newItem;
    if(item !== null && item !== ""){
        items.push(item);
    }
    res.redirect("/");
});


app.get("/about", function(req,res){
    res.render("about");
});
