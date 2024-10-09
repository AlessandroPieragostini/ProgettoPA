import axios from 'axios';

// Configura l'istanza di Axios
const axiosClient = axios.create({
  baseURL: process.env.BACKEND1_URL || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
