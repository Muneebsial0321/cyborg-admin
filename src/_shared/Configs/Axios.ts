import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Logger
api.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, config);
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Logger
api.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[Response Error] ${error.response.status} ${error.response.config.url}`, error.response.data);
    } else {
      console.error('[Response Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
