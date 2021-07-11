const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//next so e chamado quando o usuario esta pronto p/ ir p/ o controller
module.exports = (req, res, next) => {
    //buscando header de autorizacao dentro da requisicao
    const authHeader = req.headers.authorization;

    // se o token nao for informado
    if(!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }

    //token esta no formato certo? (ex: Bearer fd6h46gj4432, ou Bearer "hash", ou Bearer token)
    //primeiro vou separar a palavra "Bearer" do hash
    const parts = authHeader.split(' ');

    //temos duas partes? "Bearer" e "token"
    if(!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
    }

    //usando desestruturação para que a palavra "bearer" va para "scheme" e o token para "token"
    const [ scheme, token ] = parts;

    //verificando se a string comeca com "Bearer", 
    //' / ': comecando e terminando a Regex
    //' ^ ': inicio da verificacao
    //' $ ': final da verificacao
    //' i ': case-sensitive
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    //verifica se o token da requsicao bate
    //decoded.id: id do usuario caso tudo de certo
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        //se nao bateu, entao
        if (err) {
            return res.status(401).send({ error: "Token invalid" });
        }

        req.userId = decoded.id;

        return next();
    });
};