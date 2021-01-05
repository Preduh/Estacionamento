const express = require('express')
const Veiculo = require('../models/index')
const router = express.Router()

router.get('/home', async (req, res) => {
    res.render('../views/home')
})

router.get('/estacionamento', (req, res) => {
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
        res.render('../views/estacionamento', { ids: ids, modelos: modelos, placas: placas, horarios: horarios })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/estacionamento', async (req, res) => {
    const { placa } = req.body

    try {
        if (await Veiculo.findOne({ placa })) {
            return res.redirect('/estacionamento')
        }

        let now = new Date
        let horas = now.getHours()
        let minutos = now.getMinutes()
        let horario = `${horas}:${minutos}`

        if (minutos < 10) {
            horario = `${horas}:0${minutos}`
        }

        const veiculo = await Veiculo.create({
            modelo: req.body.modelo,
            placa: req.body.placa,
            horario: horario
        })
        res.redirect('/estacionamento')
    } catch (err) {
        return res.send('Registro falhou!')
    }
})

router.get('/estacionamento/:search', (req, res) => {
    const search = req.params.search.toUpperCase()
    Veiculo.find({ placa: new RegExp(search, 'i') }).then(veiculos => {
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
        res.render('../views/estacionamento', { ids: ids, modelos: modelos, placas: placas, horarios: horarios })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/search', async (req, res) => {
    const search = req.body.search
    res.redirect('/estacionamento/'+ search)
})

router.post('/finalizar/:id', async (req, res) => {
    const idDelete = req.params.id
    const veiculoAtual = []
    try { 
        await Veiculo.findById(idDelete).then(veiculo => {
            veiculoAtual.push(veiculo.modelo, veiculo.placa)
        })
    } catch {

    }
    return res.render('../views/pagamento', { idDelete: idDelete, veiculoAtual: veiculoAtual })
})

router.post('/pagamento/:id', async (req, res) => {
    try {
        await Veiculo.findByIdAndDelete(req.params.id)
    } catch (err) {
        return res.send('Erro ao apagar')
    }
    res.redirect('/estacionamento')
})

module.exports = app => app.use(router)