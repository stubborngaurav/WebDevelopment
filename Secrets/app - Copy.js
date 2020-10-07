require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

// connect to local databse
const url = "mongodb://localhost:27017";
const dbName = "secretsDB";

// connect to server database
const user = "gaurav-garg";
const password ="gaurav123";
const urlMongoServer = "mongodb+srv://" + user + ":" + password + "@cluster0-njxjv.mongodb.net";

mongoose.connect(url + "/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//user schema
const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

//console.log("secret key = " + process.env.SECRET_KEY);
//userSchema.plugin(encrypt, { secret: process.env.SECRET_KEY, encryptedFields: ["password"] });

// model
const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.route("/register")
  .get(function (req, res) {
    res.render("register");
  })
  .post(function (req, res) {
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
      if(err){
        console.log("not able to hash password - " + err);
      }
      else{
        var newUser = new User({
          email: req.body.username,
          password: hash
          //password: md5(req.body.password)
        });
    
        newUser.save(function (err) {
          if (!err) {
            res.render("secrets");
          } else {
            console.log(err);
          }
        });
      }
    });
  });

app.route("/login")
  .get(function (req, res) {
    res.render("login");
  })
  .post(function(req, res){
    User.findOne({email: req.body.username}, function(err, foundUser){
      if(foundUser){
        bcrypt.compare(req.body.password, foundUser.password, function(err, result){
          if(result === true){
            res.render("secrets");
          }
        });
        //if(foundUser.password === md5(req.body.password)){
          //res.render("secrets");
        //}
      }else{
        console.log("user not found : " + err);
      }
    })
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
