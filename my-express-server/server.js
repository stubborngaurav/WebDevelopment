const express = require("express");
const app = express();

app.listen(3000, function(){
    console.log("Server stated on port 3000.");
});

// call to get to home root, and get the response
app.get("/", function(req, res) {
    //console.log(req);
    res.send("<h1> Hello,Gaurav! </h1>");
});

// contact page
app.get("/contact", function(req, res) {
    res.send("<h1> Contact me at Gauravgarg.com </h1>");
});

// about poge
app.get("/about", function(req, res) {
    //console.log(req);
    res.send("<h1> Hello,My name is Gaurav Garg ! </h1>");
});
