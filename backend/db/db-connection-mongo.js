
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;
        
        await mongoose.connect(url);
        
        console.log('✅ Conexión a MongoDB Atlas (Nube) exitosa');
    } catch (error) {
        console.log('❌ Error al conectar con MongoDB:', error.message);
    }
}

module.exports = { getConnection };