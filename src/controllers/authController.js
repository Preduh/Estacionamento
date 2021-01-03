const express = require('express')
const Veiculo = require('../models/index')
const router = express.Router()

router.post('/home', async (req, res) => {
    const { placa } = req.body

    try {
        if (await Veiculo.findOne({ placa })) {
            return res.redirect('/home')
        }

        const veiculo = await Veiculo.create(req.body)
        res.redirect('/home')
    } catch (err) {
        return res.send('Registro falhou!')
    }
})

module.exports = app => app.use(router)