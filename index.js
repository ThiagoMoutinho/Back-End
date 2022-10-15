const express = require('express');
const { default: mongoose } = require('mongoose');
const env = require('dotenv').config();
const app = express();
const Contato = require('./model/Contato');

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg: "Olá Campinho!" })
})

app.post('/contato', async (req, res)=>{
    const {nome, email, telefone, area, linkedin, idade} = req.body
    if(!nome){
        res.status(422).json({error: 'O nome é um campo obrigatório!'})
    }
    if(!email){
        res.status(422).json({error: 'O email é um campo obrigatório!'})
    }
    if(!telefone){
        res.status(422).json({error: 'O telefone é um campo obrigatório!'})
    }
    const pessoa = {
        nome,
        email,
        telefone,
        area,
        linkedin,
        idade,
       
    }
    try{
        await Contato.create(pessoa)
        res.status(201).json({msg: 'Novo contato inserido com sucesso!'})
    }catch(error){
        res.status(500).json({error: error})
    }
})

app.get('/contato', async (req, res) => {
    try {
        const pessoa = await Contato.find()
        res.status(200).json(pessoa)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

app.get('/contato/:id', async (req, res) => {
    const id = req.params.id

    try {
        const pessoa = await Contato.findOne({_id: id})
        if(!pessoa){
            res.status(422).json({error: 'Esse contato não exite!'})
            return
        }
        res.status(200).json(pessoa)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

app.delete('/contato/:id', async (req, res) => {
    const id = req.params.id
    const pessoa = await Contato.findOne({_id: id})
    if(!pessoa){
        res.status(422).json({error: 'Esse contato não exite!'})
    }
    try {
        await Contato.deleteOne({_id: id})
        res.status(200).json({msg: 'Contato removido com sucesso!'})
    } catch(error) {
        res.status(500).json({error: error})
    }
})

app.patch('/contato/:id', async (req, res)=>{
    const id = req.params.id

    const {nome, email, telefone, area, linkedin, idade} = req.body
    const pessoa = {
        nome,
        email,
        telefone,
        area,
        linkedin,
        idade,
       
    }
    try{
        const atualizarContato = await Contato.updateOne({_id:id}, pessoa)
        res.status(200).json(pessoa)
    }catch(error){
        res.status(500).json({error: error})
    }
})

app.listen(3000)
console.log('O meu app do campinho está no ar!')


const USER = process.env.USER
const SENHA = encodeURIComponent(process.env.SENHA)
mongoose.connect(`mongodb+srv://${USER}:${SENHA}@campinho.00xpbr0.mongodb.net/agendaCampinho?retryWrites=true&w=majority`)
.then(() => {
    console.log("Banco de dados foi conectado com sucesso!")
})
.catch((err) => console.log(err))




