const mongoose = require('mongoose');
const debug= require('debug')('developmnet:databaseConnection');
const config = require('config');

mongoose.connect(`${config.get("MONGOOSE_URI")}/ecommerce`)
    .then(() => {
        debug("database connected")
    })
    .catch((err) => {
        debug(err)
    })

module.exports = mongoose.connection