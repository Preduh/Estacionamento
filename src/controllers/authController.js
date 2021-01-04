const express = require('express')
const Veiculo = require('../models/index')
const router = express.Router()

router.get('/home', async (req, res) => {
    res.render('../views/home')
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

router.post('/search', async (req, res) => {
    const search = req.body.search
    res.redirect('/estacionamento/'+ search)
})

router.post('/finalizar/:id', async (req, res) => {
    try {
        await Veiculo.findByIdAndDelete(req.params.id)
    } catch (err) {
        return res.send('Erro ao apagar')
    }

    return res.redirect('/estacionamento')
})

module.exports = app => app.use(router)