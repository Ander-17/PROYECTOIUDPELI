const { Schema, model } = require('mongoose');

const mediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    sinopsis: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: [true, 'La URL de la película es obligatoria'],
        unique: true,
        trim: true
    },
    imagen: {
        type: String, 
        required: [true, 'La imagen de portada es obligatoria']
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
    anioEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
    },

    // Relaciones con los demás módulos //

    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
});

module.exports = model('Media', mediaSchema);