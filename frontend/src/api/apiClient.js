import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api' // Cambia el 4000 si tu backend usa otro puerto
});

export default apiClient;