import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://proyectoiudpeliback.vercel.app/api'
});

export default apiClient;