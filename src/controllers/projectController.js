//nesse controller o usuario precisa estar logado para efetuar as requisicoes

const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    //req.userId = decoded.id; la em middlewares/auth.js, entao temos acesso ao 
    //id do usuario apos a autenticacao
    res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use('/projects', router);