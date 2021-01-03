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
        for (let i in veiculos) {
            modelos.push(veiculos[i].modelo)
            placas.push(veiculos[i].placa)
            horarios.push(veiculos[i].horario)
        }

        let horarioFormat = []
        for (let i in horarios) {
            horarioFormat.push(`${horarios[i].getHours()}:${horarios[i].getMinutes()}`)
        }
        res.render('../views/home', { modelos: modelos, placas: placas, horarios: horarioFormat })
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