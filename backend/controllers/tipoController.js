const Tipo = require('../models/Tipo');
const { request, response } = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.error('❌ Error al obtener tipos', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los tipos' });
    }
}

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const tipoDB = await Tipo.findOne({ nombre });
        if (tipoDB) {
            return res.status(400).json({ msg: `El tipo "${nombre}" ya existe.` });
        }

        const tipo = new Tipo({ nombre, descripcion });

        await tipo.save();
        res.status(201).json(tipo);

    } catch (error) {
        console.error('❌ Error al crear el tipo', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear el tipo' });
    }
}

const updateTipo = async (req = request, res = response) => {
    try {
        const nombreParam = req.params.nombre; 
        
        const { nombre, descripcion } = req.body;

        const data = {
            nombre,
            descripcion,
            fechaActualizacion: new Date()
        };

        const tipoActualizado = await Tipo.findOneAndUpdate(
            { nombre: nombreParam }, 
            data, 
            { new: true } 
        );

        if (!tipoActualizado) {
            return res.status(404).json({ msg: `No se encontró el tipo "${nombreParam}".` });
        }

        res.status(200).json(tipoActualizado);

    } catch (error) {
        console.error('❌ Error al actualizar el tipo', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar el tipo' });
    }
}

module.exports = {
    getTipos,
    createTipo,
    updateTipo
}