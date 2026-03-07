const { Schema, model } = require('mongoose');

const productoraSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la productora es obligatorio'],
        trim: true,
        unique: true
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
    },
    slogan: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = model('Productora', productoraSchema);