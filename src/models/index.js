const mongoose = require('../database/index')

const veiculoSchema = new mongoose.Schema({
    modelo: {
        type: String,
        require: true,
        lowercase: true
    },
    placa: {
        type: String,
        require: true,
        unique: true
    },
    horario: {
        type: Date,
        default: Date.now()
    }
})

const Veiculo = mongoose.model('Veiculo', veiculoSchema)

module.exports = Veiculo