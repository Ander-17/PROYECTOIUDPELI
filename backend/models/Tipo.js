const { Schema, model } = require('mongoose');

const tipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del tipo es obligatorio'],
        trim: true,
        unique: true
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = model('Tipo', tipoSchema);