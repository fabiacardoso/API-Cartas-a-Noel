const mongoose = require('../database');
const bcrypt = require('bcryptjs');

//campos que iremos ter no nosso banco de dados da nossa tabela "usuários"
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    whatsapp: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, //oculta essa informação em uma busca de usuários no banco de dados
    },
    titulo: {
        type: String,
        required: true,
    },
    carta: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//antes de salvar
UserSchema.pre('save', async function(next) {
    //this: objeto que está sendo salvo
    //10: vezes que o hash será gerado, numero de rounds, encriptacao
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

//definindo o model. Passando o nome do model e o Schema dele
const User = mongoose.model('User', UserSchema);

module.exports = User;