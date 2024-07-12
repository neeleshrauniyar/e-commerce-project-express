const express = require("express")
const app = express()

const debug= require('debug')('developmnet:app')

const db= require('./config/databaseConnection')

const sellerRouter= require('./routes/sellerRoutes')
const userRouter= require('./routes/userRoutes')
const productRouter= require('./routes/productRoutes')

const cookieParser= require('cookie-parser')
const path= require('path')

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(cookieParser)
// app.use(express.static(path.join(__dirname, 'public')))
// app.set("view engine", "ejs")

app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/sellers", sellerRouter)

app.listen(8000, () => {
    debug("server started")
})


