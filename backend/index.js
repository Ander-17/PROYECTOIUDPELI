require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { getConnection } = require('./db/db-connection-mongo');

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permite peticiones sin origin (como Postman, curl o mismo origen) o dentro de la lista permitida
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

/* --- Routes ---*/
app.use('/api/auth', require('./routes/auth'));
app.use('/api/generos', require('./routes/genero'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/media', require('./routes/media'));

getConnection();

app.listen(port, () => {
  console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
});