import axios from 'axios';

const api = axios.create({
  baseURL: 'https://easy-ong-homolog.herokuapp.com/api/',
});

export default api;
