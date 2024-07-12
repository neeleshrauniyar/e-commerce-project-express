const express = require('express');
const router = express.Router();
const sellerModel = require('../models/sellerModel')

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let { fullname, email, password } = req.body
        let seller = await sellerModel.findOne({ email: req.body.email })
        console.log(seller)
        if (seller) {
            return res.send("Seller wth the same email already exists")
        }
        let newSeller = await sellerModel.create({
            fullname,
            email,
            password
        })
        return res.json(newSeller)
    })
}


module.exports = router

