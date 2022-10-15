const mongoose = require('mongoose')
const Contato = mongoose.model('Pessoa', {
    nome: String,
    email: String,
    telefone: Number,
    area: String,
    linkedin: String,
    idade: Number,
})

module.exports = Contato