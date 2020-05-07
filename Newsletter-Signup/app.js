const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server for Newsletter stated on port 3000.");
});

app.get("/", function (req, res){
    res.send("Server responding successfully");
});

app.get("/signup", function(req, res) {
    res.sendfile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
    res.redirect("/signup");
});

app.post("/signup", function(req, res){

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    // javascript object
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    // convert to json
    var jsonData = JSON.stringify(data);

    var listId = "b055aa7087";
    var url = "https://us8.api.mailchimp.com/3.0/lists/" + listId;
    var APIKey = "c36c6dfc325c01448f68e021c9c2736d-us8";
    var options = {
        method: "POST",
        auth: "gaurav:"+APIKey
    };

    // request to API
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendfile(__dirname + "/success.html");
        }
        else{
            res.sendfile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});