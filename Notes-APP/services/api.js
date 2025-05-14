// services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.12.73.116:3001',
});
