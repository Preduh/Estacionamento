const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { static } = require('express')
const Veiculo = require('../src/models/index')

// Configurando bibliotecas
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

// Rotas
app.get('/home', (req, res) => {
    Veiculo.find().then(veiculos => {
        let modelos = []
        let placas = []
        let horarios = []
        let ids = []
        for (let i in veiculos) {
            modelos.push(veiculos[i].modelo)
            placas.push(veiculos[i].placa)
            horarios.push(veiculos[i].horario)
            ids.push(veiculos[i]._id)
        }
        res.render('../views/home', { ids: ids, modelos: modelos, placas: placas, horarios: horarios })
    }).catch(err => {
        console.log(err)
    })
})

require('./controllers/authController')(app)

// Definindo conexão
const port = 8081
app.listen(port, () => {
    console.log('Conectado com sucesso!')
})