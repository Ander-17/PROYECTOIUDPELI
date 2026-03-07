const { Schema, model } = require('mongoose');

const directorSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios'],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
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
    }
});

module.exports = model('Director', directorSchema);