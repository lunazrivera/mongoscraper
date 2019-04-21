// Requiring dependencies for our mongo scraper.
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

//Requiring all models from the models folder.
// var models = require("./models");


// Setting PORT #
var PORT = process.env.PORT || 8000;

//If deployed use the deployed database. Otherwise use the local mongoScraper database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"

//Connecting to Mongo DB
mongoose.connect(db, function(error) {
     if (error) {
          console.log(error);
     } else {
          console.log("Moongose succesfully connected!");
     }
});

//Initializing express application instance.
var app = express();

//Initializing Express Router.
var router = express.Router();

//Requiring routes
require("./config/routes")(router);

//Below we'll be configuring middleware.
//Parse request body as json.
app.use (express.urlencoded({extended: true}));
app.use(express.json());
//Serving public static folder.
app.use(express.static("public"));

//Connecting handlebars to our express app.
app.engine("handlebars", exphbs({
     defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Have every request pass through our router middleware
app.use(router);

//Starting server
app.listen(PORT, function() {
     console.log("App running on port " + PORT + "!");
});