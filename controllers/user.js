////////////////////////
// DEPENDENCIES
////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

///////////////////////
// Create Router
///////////////////////
const router = express.Router();

// SIGNUP ROUTE
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    User.create(req.body, (err, user) => {
        req.session.username = req.body.username
        req.session.loggedIn = true
        res.redirect("/entries");
    })
})

// LOGIN ROUTE
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
   const {username, password} = req.body
   User.findOne({username}, (err, user) => {
       if (!user){
           res.send("user doesnt exist")
       }else{
           const result = bcrypt.compareSync(password, user.password);
           if (result) {
            req.session.username = username
            req.session.loggedIn = true
            res.redirect("/entries");
        }else{
                res.send("wrong password");
            }
       }
   });
});

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

////////////////////////
// Export Router
////////////////////////
module.exports = router;