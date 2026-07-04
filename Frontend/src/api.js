import axios from 'axios';

const api = axios.create({
  baseURL: 'https://web-development-project-shzj.onrender.com',
});

export default api;
