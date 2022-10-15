const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

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

app.listen(3000)
console.log('O meu app do campinho está no ar!')

mongoose.connect('mongodb+srv://Thiago:ocANk4bksapPjvf6@campinho.00xpbr0.mongodb.net/agendaCampinho?retryWrites=true&w=majority')
.then(() => {
    console.log("Banco de dados foi conectado com sucesso!")
})
.catch((err) => console.log(err))




