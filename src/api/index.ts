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
    Log('API Request', 'info', 'apiClient', `Starting request to ${config.url}`);
    return config;
  },
  (error) => {
    Log('API Request Error', 'error', 'apiClient', `Request error: ${error.message}`);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    Log('API Response', 'info', 'apiClient', `Successful response from ${response.config.url}`);
    return response;
  },
  (error) => {
    Log('API Response Error', 'error', 'apiClient', `Response error from ${error.config?.url}: ${error.message}`);
    return Promise.reject(error);
  }
);

// API helper functions go here
