import axios from "axios";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 20000,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error)
  })
  return axiosInstance;
};
export default createAxiosInstance;
