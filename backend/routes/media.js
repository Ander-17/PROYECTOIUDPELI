const { Router } = require('express');
const { getMedia, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

router.get('/', getMedia);

router.post('/', verificarToken, createMedia);
router.put('/:serial', verificarToken, updateMedia);
router.delete('/:serial', verificarToken, deleteMedia);

module.exports = router;