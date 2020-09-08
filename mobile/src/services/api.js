import axios from 'axios';
import utils from './utils';

const api = axios.create({
  baseURL: utils.serverURL()
});

export default api;