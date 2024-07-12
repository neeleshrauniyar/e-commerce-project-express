const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panecolor: String,
    textcolor: String
})

const products = mongoose.model("products", productSchema)

module.exports = products
