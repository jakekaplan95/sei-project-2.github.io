// Import the connected mongoose object
mongoose = require("./connection")


//////////////////////
// Our model
/////////////////////
const {Schema, model} = mongoose

const entrySchema = new Schema({
    name: String,
    id: Number,
    purchaseDate: Date,
    purchasePrice: Number,
    soldDate: Date,
    soldPrice: Number,
    username: String
})

const Entry = model("Entry", entrySchema)

//export the model
module.exports = Entry