const mongoose = require('mongoose')

const letterUserSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String}
})

const letterUser = mongoose.model('letterUser', letterUserSchema)

module.exports = letterUser