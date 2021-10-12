
//DEPENDENCIES
require('dotenv').config()
const express = require('express');
const morgan = require("morgan")
const methodOverride = require('method-override');
const EntryRouter = require("./controllers/entry")
const UserRouter = require("./controllers/user")
const mongoose = require ('mongoose');
const db = mongoose.connection;
const session = require("express-session")
const MongoStore = require("connect-mongo")

const app = express();


//PORT
const PORT = process.env.PORT || 3000;

//DATABASE
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongodb connected'));
db.on('disconnected', () => console.log('mongodb disconnected'));

///////////////////////
//MIDDLEWARE
///////////////////////
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"))
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false
}))

app.use("/entries", EntryRouter)
app.use("/user", UserRouter)


// ROUTES
app.get('/' , (req, res) => {
  res.send('Yay! the app works');
});



//LISTENER
app.listen(PORT, () => console.log('listening', PORT));