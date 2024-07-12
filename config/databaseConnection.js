const mongoose = require('mongoose');
const debug= require('debug')('developmnet:databaseConnection');

mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => {
        debug("database connected")
    })
    .catch((err) => {
        debug(err)
    })

module.exports = mongoose.connection