const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const generateToken= require('../utils/generateToken')
require('dotenv').config()

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let { fullname, email, password } = req.body
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            req.flash("error", "User wth the same email already exists")
            return res.redirect("/")
        }
        const salt = 10
        bcrypt.hash(password, salt, async (err, hash) => {
            let newUser = await userModel.create({
                fullname,
                email,
                password: hash
            })
            req.flash("error", "User created, Please login with the credentials")
            return res.redirect("/")
        })
    })

    router.post("/login", async (req, res) => {
        let { email, password } = req.body
        let user = await userModel.findOne({ email: email })
        if (!user) {
            req.flash("error", "User not found")
            return res.redirect("/")
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let jwtToken= generateToken(user)
                res.cookie("token", jwtToken)
                return res.send("User Logged In")
            }
            return res.send("Incorrect password")
        })
    })

    router.get("/logout", (req, res) => {
        res.clearCookie("token")
        req.flash("error", "User logged out")
        return res.redirect("/")
    })

}

module.exports = router

