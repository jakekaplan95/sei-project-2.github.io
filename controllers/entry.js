///////////////////////////////
// Import Dependencies
////////////////////////////////
const express = require("express")
const Entry = require("../models/entry")

/////////////////////////
// Create Router
////////////////////////
const router = express.Router()

///////////////////////////////////////
// Router Middleware
///////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    }else{
        res.redirect("/user/login")
    }
})


////////////////////////
// Routes
////////////////////////

router.get("/seed", (req, res) => {
    const beginEntry = [
        { name: "Mutant Cat", id: "001", purchaseDate: "10/07/2021", purchasePrice: ".1", soldDate: "10/11/2021", soldPrice: ".77"  },
        { name: "Fox Fam", id: "002", purchaseDate: "10/04/2021", purchasePrice: ".22", soldDate: "10/09/2021", soldPrice: ".27"  },
        { name: "Peaceful Groupies", id: "003", purchaseDate: "09/28/2021", purchasePrice: ".18", soldDate: "10/11/2021", soldPrice: "1.1"  },
        { name: "Rebel Seals", id: "004", purchaseDate: "10/09/2021", purchasePrice: ".22", soldDate: "10/09/2021", soldPrice: ".25"  },
      ]

// Delete Entries + repopulate and add new entry
Entry.remove({}, (err, data) => {
    Entry.create(beginEntry, (err, data) => {
        res.json(data)
    })
})
})

// INDEX
app.get("/", (req, res) => {
    Entry.find({username: req.session.username}, (err, entries) => {
      res.render("entries/index.ejs", {entries});
    });
  });

// NEW
app.get("/new", (req, res) => {
    res.render("entries/new.ejs")
})

// CREATE
app.post("/", (req, res) => {
    req.body.username = req.session.username
    Entry.create(req.body, (err, fruit) => {
        res.redirect("/entries")
    })
})

// EDIT
app.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Entry.findById(id, (err, entry) => {
        res.render("entries/edit.ejs", {entry})
    })
})

// UPDATE
router.put("/:id", (req, res) =>{
    // get the id param
    const id = req.params.id// convert readyToEat to true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    //update the fruit
    Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        // redirect back to main page
        res.redirect("/fruits")
    })
})