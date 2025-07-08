import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cybermind-1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;