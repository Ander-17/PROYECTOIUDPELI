const Media = require('../models/Media');
const { request, response } = require('express');

const getMedia = async (req = request, res = response) => {
    try {
        const media = await Media.find()
            .populate('generoPrincipal', 'nombre estado')
            .populate('directorPrincipal', 'nombres estado')
            .populate('productora', 'nombre estado')
            .populate('tipo', 'nombre');
        
        res.status(200).json(media);
    } catch (error) {
        console.error('❌ Error al obtener media', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las producciones' });
    }
}

const createMedia = async (req = request, res = response) => {
    try {
        const { serial, titulo, sinopsis, url, imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo } = req.body;

        const mediaDB = await Media.findOne({ $or: [{ serial }, { url }] });
        if (mediaDB) {
            return res.status(400).json({ msg: `La producción con el serial "${serial}" o URL "${url}" ya existe.` });
        }

        const media = new Media({ serial, titulo, sinopsis, url, imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo });

        await media.save();
        res.status(201).json(media);

    } catch (error) {
        console.error('❌ Error al crear media', error);
        res.status(500).json({ msg: 'Ocurrió un error al crear la producción' });
    }
}

const updateMedia = async (req = request, res = response) => {
    try {
        const serialParam = req.params.serial; 
        
        const { titulo, sinopsis, url, imagen, anioEstreno, generoPrincipal, directorPrincipal, productora, tipo } = req.body;

        const data = {
            titulo,
            sinopsis,
            url,
            imagen,
            anioEstreno,
            generoPrincipal,
            directorPrincipal,
            productora,
            tipo,
            fechaActualizacion: new Date()
        };

        const mediaActualizada = await Media.findOneAndUpdate(
            { serial: serialParam }, 
            data, 
            { new: true } 
        );

        if (!mediaActualizada) {
            return res.status(404).json({ msg: `No se encontró la producción con serial "${serialParam}".` });
        }

        res.status(200).json(mediaActualizada);

    } catch (error) {
        console.error('❌ Error al actualizar media', error);
        res.status(500).json({ msg: 'Ocurrió un error al actualizar la producción' });
    }
}

const deleteMedia = async (req = request, res = response) => {
    try {
        const serialParam = req.params.serial;

        const mediaEliminada = await Media.findOneAndDelete({ serial: serialParam });

        if (!mediaEliminada) {
            return res.status(404).json({ msg: `No se encontró la producción con serial "${serialParam}".` });
        }

        res.status(200).json({ msg: 'Producción eliminada correctamente', media: mediaEliminada });

    } catch (error) {
        console.error('❌ Error al eliminar media', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar la producción' });
    }
}

module.exports = {
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia
}