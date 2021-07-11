const express = require('express');
const bodyParser = require('body-parser');

//aplicação. variavel unica, caso contrario teriamos mais de uma aplicacao rodando
const app = express();

//indicando que vai usar o body-parser
//pra poder enviar requisições em json pra API
app.use(bodyParser.json());

//para decodificar parametros URL
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

//cria um servidor que "ouve" a porta passada como parâmetro
app.listen(3000);