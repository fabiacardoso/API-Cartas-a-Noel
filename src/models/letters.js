const mongoose = require('mongoose')

const lettersSchema = new mongoose.Schema({
    name: {type: String},
    city: {type: String},
    state:{type: String},
    desire: {type: String},
    email:{type: String},
    whatsapp:{type: String},
    letter:{type: String}
})

const letters = mongoose.model('letters', lettersSchema)

module.exports = letters