const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
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