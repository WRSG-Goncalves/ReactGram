import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bex-ms.azurewebsites.net'
});

export default api;
