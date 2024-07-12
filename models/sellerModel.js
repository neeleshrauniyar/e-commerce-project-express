const mongoose= require('mongoose');

const sellerSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    products: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
    pan: Number
})

module.exports= mongoose.model("sellers", sellerSchema)