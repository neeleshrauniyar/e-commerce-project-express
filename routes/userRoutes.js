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
            return res.send("User wth the same email already exists")
        }
        const salt = 10
        bcrypt.hash(password, salt, async (err, hash) => {
            let newUser = await userModel.create({
                fullname,
                email,
                password: hash
            })
            return res.json({ "msg": "new user created", newUser })
        })
    })

    router.post("/login", async (req, res) => {
        let { email, password } = req.body
        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.send("user not found")
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let jwtToken= generateToken(user)
                res.cookie("token", jwtToken)
                return res.send("User logged In")
            }
            return res.send("Password incorrect")
        })
    })

}

module.exports = router

