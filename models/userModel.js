const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/ecommerce");

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart:{
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
})

const users= mongoose.model("users", userSchema);

module.exports= users;