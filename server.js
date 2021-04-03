const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");

const app = express();

//bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;
// console.log("Hello World");

//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; //process.env.port is heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port}! this is changed`));