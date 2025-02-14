import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_API_PORT || 3000}`, // Use import.meta.env para Vite
});


