const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { static } = require('express')
const Veiculo = require('../src/models/index')

// Configurando bibliotecas
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + 'views'))
app.use('/public', express.static('public'))

// Rotas
require('./controllers/authController')(app)

// Definindo conexão
app.listen(process.env.PORT || 8081, () => {
    console.log('Conectado com sucesso!')
})