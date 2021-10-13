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
router.get("/", (req, res) => {
    Entry.find({username: req.session.username}, (err, entries) => {
        console.log(entries)
      res.render("entries/index.ejs", {entries});
    });
  });

// NEW
router.get("/new", (req, res) => {
    res.render("entries/new.ejs")
})

// CREATE
router.post("/", (req, res) => {
    req.body.username = req.session.username
    Entry.create(req.body, (err, entry) => {
        res.redirect("/entries")
    })
})

// DELETE
router.delete("/entries/:indexOfEntriesArray", (req, res) => {
    entries.splice(req.params.indexOfEntriesArray, 1)
    res.redirect('/entries')
})

// EDIT
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Entry.findById(id, (err, entry) => {
        res.render("entries/edit.ejs", {entry})
    })
})

// UPDATE
router.put("/:id", (req, res) =>{
    const id = req.params.id
    Entry.findByIdAndUpdate(id, req.body, {new: true}, (err, entry) => {
        res.redirect("/entries")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Entry.findByIdAndRemove(id, (err, entry) => {
        res.redirect("/entries")
    })
})


// SHOW
router.get("/:id", (req, res) => {
    const id = req.params.id

    Entry.findById(id, (err, entry) => {
        res.render("entries/show.ejs", {entry})
    })
})

////////////////////////
// Export the Router
/////////////////////////

module.exports =  router