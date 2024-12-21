import { notification } from 'antd';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
});

httpClient.interceptors.request.use(
  (config) => {
    // Tambahkan Authorization token jika diperlukan
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status } = response;

      // Check for specific error codes
      if (status === 401) {
        // Handle unauthorized access
        notification.error({
          message: 'Authentication Required',
          description: 'You must log in to continue.',
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('name');

        window.location.replace('/');
      } else if (status === 403) {
        // Handle forbidden access
        notification.error({
          message: 'Forbidden',
          description: 'You do not have permission to access this resource.',
          showProgress: true,
        });
      } else {
        // Handle other errors
        notification.error({
          message: `Error ${status}`,
          description:
            response?.data?.message || 'An unexpected error occurred.',
          showProgress: true,
        });
      }
    } else {
      // Handle network or other errors (e.g., no response object)
      notification.error({
        message: 'Network Error',
        description:
          'An error occurred while trying to connect. Please try again later.',
        showProgress: true,
      });
    }

    console.error('HTTP Error:', error);
    return Promise.reject(error);
  }
);

export default httpClient;
