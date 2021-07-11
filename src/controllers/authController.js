//Controller de autenticacao

const express = require('express'); // pois iremos trabalhar com rotas

//encriptador de senha
const bcrypt = require('bcryptjs');

//pacote oficial do node para json web token
const jwt = require('jsonwebtoken');

//hash de criptografia
const authConfig = require('../config/auth');

// model. usaremos para login e cadastro de usuário
const User = require('../models/user');

//para definir as rotas do usuário
const router = express.Router();

//params = { id: user.id }
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        //token expira em um dia, ou 86400 segundos
        expiresIn: 86400,

    });
}

//router de cadastro ou registro
router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        //para que tenhamos uma mensagem para a falha de insercao por email ja existir
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        //cria um novo usuário quando essa rota é chamada. 
        //User é o objeto do mongoose do diretório '../models/user', ali de cima
        //ta pegando todos os parametros que o usuário ta enviando e passando pro
        //"create". todos parametros estão dentro de "req.body"
        //"await": esperar a ação ser executada para continuar
        const user = await User.create(req.body);

        //para não retornar a senha, mesmo que criptografada
        user.password = undefined;

        //em caso de aplicacao que confirma email antes, nao precisa de token no cadastro
        return res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: "Registration failed" });
    }
});

//rota de autenticação
router.post('/authenticate', async (req, res) => {

    //recebemos do usuário a senha e o email
    const { email, password } = req.body;

    //busca esse usuário no banco de dados e sua senha
    //para driblar a opcao 'select' definida em 'user.js', usa-se '.select'
    const user = await User.findOne({ email }).select('+password');

    //usuário existe no banco de dados?
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    //as senhas nao batem
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    //gerando nosso token
    //campo unico do usuario como primeiro parametro , id
    //hash unico (que nenhuma aplicacao tem igual) como segundo parametro, auth.secret
    //hash foi gerado usando MD5 com texto aleatorio
    //a cada requisicao temos um token diferente retornado, pois gera-se em funcao do tempo

    res.send({ 
        user, 
        token: generateToken({ id: user.id}), 
    });
});

//recuperando app (aplicação) do index.js e retornando router para o app, com o prefixo 'auth'.
//quando usuário acessar '/auth', ele chama esse 'router'.
//todas as rotas que forem definidas usando a variavel router, serão prefixadas com
//o "/auth". exemplo '/auth/register'.
module.exports = app => app.use('/auth', router);
