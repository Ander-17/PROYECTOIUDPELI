require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <--- NUEVO: Para configurar la conexión

const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

// --- NUEVO: Evita que la app se bloquee esperando a MongoDB en Vercel ---
mongoose.set('bufferCommands', false); //

app.use(cors()); 
app.use(express.json()); 

/* --- Routes ---*/
app.use('/api/generos', require('./routes/genero'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));

getConnection();

app.listen(port, () => {
    console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
});

module.exports = app; // <--- NUEVO: Requerido para que Vercel reconozca la API