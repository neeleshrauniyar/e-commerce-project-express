const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                req.flash("error", "Please login first")
                res.redirect("/")
            } else {
                next()
            }
        })
    } else {
        req.flash("error", "Please login first")
        res.redirect("/")
    }
}

module.exports = auth