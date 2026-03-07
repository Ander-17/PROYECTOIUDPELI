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
        const nombresParam = req.params.nombres; 
        
        const { nombres, estado } = req.body;

        const data = {
            nombres,
            estado,
            fechaActualizacion: new Date()
        };

        const directorActualizado = await Director.findOneAndUpdate(
            { nombres: nombresParam }, 
            data, 
            { new: true } 
        );

        if (!directorActualizado) {
            return res.status(404).json({ msg: `No se encontró el director "${nombresParam}".` });
        }

        res.status(200).json(directorActualizado);

    } catch (error) {
        console.error('❌ Error al actualizar el director', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el director' });
    }
}

module.exports = {
    getDirectores,
    createDirector,
    updateDirector
}