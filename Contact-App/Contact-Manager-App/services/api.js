// services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://681cdf97f74de1d219ae142b.mockapi.io/api/v1', // Replace this with your fake API endpoint
});
