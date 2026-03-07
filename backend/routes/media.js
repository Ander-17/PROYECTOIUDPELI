const { Router } = require('express');
const { getMedia, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

const router = Router();

router.get('/', getMedia);

router.post('/', createMedia);

router.put('/:serial', updateMedia);

router.delete('/:serial', deleteMedia);

module.exports = router;