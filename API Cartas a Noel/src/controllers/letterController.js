const { JsonWebTokenError} = require('jsonwebtoken')
const letters = require('../models/letters')
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')


const authorizeAndRun = (req, res, doAction) => {
    const authHeader = req.get('authorization')

    if(!authHeader) {
        return res.status(401).send('Authorization header missing')
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET, function(erro) {
        if(erro) {
            return res.status(403).send('Authorization is not valid')
        }

        doAction() 
    })
}

const buildRegex = word => {
    let regexString = word.replace(new RegExp(/a/g), '[aàáâãäå]')
    regexString = regexString.replace(new RegExp(/e/g), '[eèéêë]')
    regexString = regexString.replace(new RegExp(/i/g), '[iìíîï]')
    regexString = regexString.replace(new RegExp(/o/g), '[oòóôõö]')
    regexString = regexString.replace(new RegExp(/u/g), '[uùúûü]')
    regexString = regexString.replace(new RegExp(/ç/g), '[cç]')
    regexString = regexString.replace(new RegExp(/n/g), '[nñ]')
    return new RegExp(regexString, 'i')
    }



const getAll = (req, res) => {
    const searchParams = {}
    if (req.query.desire) {
        searchParams.desire = buildRegex(req.query.desire, 'i')
    }
    if(req.query.state) {
        searchParams.state = buildRegex(req.query.state, 'i')
    }
    if(req.query.city) {
        searchParams.city = buildRegex(req.query.city, 'i') 
    }
    if(req.query.name) {
        searchParams.name = buildRegex(req.query.name, 'i')
    }

    letters.find(searchParams, function(err, letters) {
        if(err) {
            res.status(500).send({ message:err.message})
        }
        res.status(200).send(letters)
    })
    
}

const postLetter = (req, res) => {
    authorizeAndRun(req, res, () => {
        let letter = new letters(req.body)

        letter.save(function(err){
            if(err) {
                res.status(500).send({ message: err.message })
            }
            res.status(201).send(letter.toJSON())
        })
    })
}

const deleteLetter = (req, res) => {
    authorizeAndRun(req, res, () => {
        const id = req.params.id

        letters.find({ _id: id }, function(err, letter) {
            if(letter.length > 0){
                letters.deleteMany({ _id: id }, function(err) {
                    if(err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FALHOU!"
                        })
                    }
                    res.status(200).send({
                        message: "Carta removida com sucesso!",
                        status:"SUCESSO"
                    })
                })
            } else {
                res.status(200).send({
                    message: "Nenhuma carta para ser removida!",
                    status: "VAZIO"
                })
            }
        })
    })
}

const putLetters = (req, res) => {
    authorizeAndRun(req, res, () => {
        const id = req.params.id
        
        letters.find({ _id: id }, function(err, letter) {
            console.log(id, err, band)
            if(letter.length > 0) {
                letters.updateMany({ _id: id }, { $set: req.body}, function(err) {
                    if(err) {
                        res.status(500).send ({ message: err.message})
                    }
                        res.status(200).send({ message: "Registro alterado com sucesso!"})
                })
            }else {
                res.status(200).send({ message: "Não há registro para atualizar com este id."})
            }
        })
    })
}


module.exports = { getAll, postLetter, deleteLetter, putLetters }