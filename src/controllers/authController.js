const express = require('express')
const Veiculo = require('../models/index')
const router = express.Router()

router.post('/home', async (req, res) => {
    const { placa } = req.body

    try {
        if (await Veiculo.findOne({ placa })) {
            return res.redirect('/home')
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
        res.redirect('/home')
    } catch (err) {
        return res.send('Registro falhou!')
    }
})

router.post('/finalizar/:id', async (req, res) => {
    try {
        await Veiculo.findByIdAndDelete(req.params.id)
    } catch (err) {
        return res.send('Erro ao apagar')
    }

    return res.redirect('/home')
})

module.exports = app => app.use(router)