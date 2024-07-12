const express = require('express');
const router = express.Router();
const sellerModel = require('../models/sellerModel')
const bcrypt = require('bcrypt')

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
            return res.json({"msg": "new seller created", newSeller})
        })
    })
}


module.exports = router

