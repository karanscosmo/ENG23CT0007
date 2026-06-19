import axios from 'axios';
import { Log } from '../utils/logger';

// Create and export an axios instance for API requests
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    Log('api', 'info', 'apiClient', `Starting request to ${config.url}`);
    return config;
  },
  (error) => {
    Log('api', 'error', 'apiClient', `Request error: ${error.message}`);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    Log('api', 'info', 'apiClient', `Successful response from ${response.config.url}`);
    return response;
  },
  (error) => {
    Log('api', 'error', 'apiClient', `Response error from ${error.config?.url}: ${error.message}`);
    return Promise.reject(error);
  }
);

// API helper functions go here
