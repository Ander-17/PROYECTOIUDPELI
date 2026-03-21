const Productora = require('../models/Productora');
const { request, response } = require('express');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('❌ Error al obtener productoras', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las productoras' });
    }
}

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;

        const productoraDB = await Productora.findOne({ nombre });
        if (productoraDB) {
            return res.status(400).json({ msg: `La productora "${nombre}" ya existe.` });
        }

        const productora = new Productora({ nombre, estado, slogan, descripcion });

        await productora.save();
        res.status(201).json(productora);

    } catch (error) {
        console.error('❌ Error al crear la productora', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la productora' });
    }
}

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, slogan, estado } = req.body;

        const data = {
            nombre,
            slogan,
            estado,
            fechaActualizacion: new Date()
        };

        const actualizada = await Productora.findByIdAndUpdate(id, data, { new: true });

        if (!actualizada) {
            return res.status(404).json({ msg: "Productora no encontrada" });
        }

        res.status(200).json(actualizada);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar' });
    }
}

module.exports = {
    getProductoras,
    createProductora,
    updateProductora
}