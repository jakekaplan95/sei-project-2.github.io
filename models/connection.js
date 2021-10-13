////////////////////////////
// Import Dependencies
//////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")
const db = mongoose.connection;


///////////////////
//DATABASE
//////////////////
const MONGODB_URI = process.env.MONGODB_URI; // for heroku

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

module.exports = mongoose
