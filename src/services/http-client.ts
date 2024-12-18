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
    // Penanganan error global
    console.error('HTTP Error:', error);
    return Promise.reject(error);
  }
);

export default httpClient;
