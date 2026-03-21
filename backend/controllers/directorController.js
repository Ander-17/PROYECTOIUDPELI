const Director = require('../models/Director');
const { request, response } = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('❌ Error al obtener directores', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los directores' });
    }
}

const createDirector = async (req = request, res = response) => {
    try {
        const { nombres, estado } = req.body;

        const directorDB = await Director.findOne({ nombres });
        if (directorDB) {
            return res.status(400).json({ msg: `El director "${nombres}" ya existe.` });
        }

        const director = new Director({ nombres, estado });

        await director.save();
        res.status(201).json(director);

    } catch (error) {
        console.error('❌ Error al crear el director', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el director' });
    }
}

const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombres, estado } = req.body; // Cambiado a nombres

        const data = { nombres, estado, fechaActualizacion: new Date() };

        const directorActualizado = await Director.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(directorActualizado);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar' });
    }
}

module.exports = {
    getDirectores,
    createDirector,
    updateDirector
}