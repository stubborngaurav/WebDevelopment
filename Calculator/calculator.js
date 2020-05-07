const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server stated on port 3000.");
});

app.get("/", function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var num1 = Number(req.body.n1);
    var num2 = Number(req.body.n2);
    res.send("the total is " + (num1+num2));
});