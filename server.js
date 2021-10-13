
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
const MONGODB_URI = process.env.MONGODB_URI; // for heroku

// Connect to Mongo
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
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'));
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
  res.render('index.ejs');
});



//LISTENER
app.listen(PORT, () => console.log('listening', PORT));