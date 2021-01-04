const mongoose = require('../database/index')

const veiculoSchema = new mongoose.Schema({
    modelo: {
        type: String,
        require: true,
        uppercase: true
    },
    placa: {
        type: String,
        require: true,
        unique: true,
        uppercase: true
    },
    horario: {
        type: String
    }
})

const Veiculo = mongoose.model('Veiculo', veiculoSchema)

module.exports = Veiculo