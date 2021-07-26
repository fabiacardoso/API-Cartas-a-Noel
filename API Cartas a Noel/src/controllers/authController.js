const letterUser = require('../models/letterUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

const validatePassword = (password) => {
    const re = /[a-z]\d|\d[a-z]/i
    return re.test(password) && password.length >= 6
}

const signup = (req, res) => {

    if(!validateEmail(req.body.email)) {
        return res.status(400).send("E-mail inválido!")
    }

    if(!validatePassword(req.body.password)) {
        return res.status(400).send("Senha inválida!")
    } 

    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = passwordHash
    let letter = new latterUser(req.body)
    letter.save(function(err){
        if(err) {
            res.status(500).send({ message: err.message })
        }
            res.status(201).send(letter.toJSON());
    })
}

const login = (req, res) => {
    letterUser.findOne({email:req.body.email}, function(error, letter){
        if(!letter) {
            return res.status(404).send(`Email não cadastrado ${req.body.email}`)
        }
        const validPassword = bcrypt.compareSync(req.body.password, letter.password)

        if(!validPassword) {
            return res.status(403).send("Senha inválida!")
        }

        const token = jwt.sign({ email: req.body.email}, SECRET)

        return res.status(200).send(token)
    })
}

module.exports = { signup, login }