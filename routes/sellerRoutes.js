const express = require('express');
const router = express.Router();
const sellerModel = require('../models/sellerModel')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/authMiddleware')
const generateToken = require('../utils/generateToken');
const upload = require('../middlewares/multerMiddleware');
require('dotenv').config()

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let { fullname, email, password } = req.body
        let seller = await sellerModel.findOne({ email: req.body.email })
        console.log(seller)
        if (seller) {
            return res.send("Seller wth the same email already exists")
        }
        const salt = 10
        bcrypt.hash(password, salt, async (err, hash) => {
            let newSeller = await sellerModel.create({
                fullname,
                email,
                password: hash
            })
            req.flash("error", "Seller created, Please login with the credentials")
            return res.redirect("/")
        })
    })

    router.post("/login", async (req, res) => {
        let { email, password } = req.body
        let seller = await sellerModel.findOne({ email: email })
        if (!seller) {
            req.flash("error", "Seller not registered with this email")
            return res.redirect("/")
        }
        bcrypt.compare(password, seller.password, (err, result) => {
            if (result) {
                let jwtToken = generateToken(seller)
                res.cookie("token", jwtToken)
                return res.render("admin")
            }
            req.flash("error", "Incorrect Password")
            return res.redirect("/")
        })
    })

    router.get("/logout", (req, res) => {
        res.clearCookie("token")
        req.flash("error", "Seller logged out")
        return res.redirect("/")
    })

    router.get("/admin", auth, async (req, res) => {
        await res.render("admin")
    })
}


module.exports = router

