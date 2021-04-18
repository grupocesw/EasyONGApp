import axios from 'axios';

const api = axios.create({
  baseURL: 'http://easy-ong-homolog.herokuapp.com/api/',
});

export default api;
