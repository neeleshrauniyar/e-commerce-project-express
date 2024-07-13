const express = require("express")
const app = express()

const debug= require('debug')('developmnet:app')

const db= require('./config/databaseConnection')

const sellerRouter= require('./routes/sellerRoutes')
const userRouter= require('./routes/userRoutes')
const productRouter= require('./routes/productRoutes')

const cookieParser= require('cookie-parser')
const path= require('path')

const flash= require('connect-flash')
const session= require('express-session')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

app.get("/", (req, res) => {
    let error= req.flash("error")
    res.render("index", {error})
})

app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/sellers", sellerRouter)

app.listen(8000, () => {
    debug("server started")
})


