const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel')
const auth = require('../middlewares/authMiddleware')
require('dotenv').config()
const upload = require('../middlewares/multerMiddleware');


if (process.env.NODE_ENV === "development") {

    router.get("/createform", auth, async (req, res) => {
        let success = req.flash('success')
        res.render("createproduct", { success })
    })

    router.post("/create", auth, upload.single("image"), async (req, res) => {
        let { image, name, price, discount, bgcolor, panecolor, textcolor } = req.body
        let product = await productModel.findOne({ name: req.body.name })
        if (product) {
            req.flash('success', "Product wth the same name already exists")
            return res.redirect('/products/createform')
        }
        let newProduct = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panecolor,
            textcolor
        })
        req.flash('success', "Product created")
        return res.redirect("/products/createform")
    })

}

module.exports = router

