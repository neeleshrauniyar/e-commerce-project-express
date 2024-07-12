const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (user) => {
    const token = jwt.sign({ email: user.email, fullname: user.fullname }, process.env.JWT_KEY)
    return token
}

module.exports = generateToken