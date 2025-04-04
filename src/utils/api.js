import axios from 'axios';
import config from '../config';

export const testConnection = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/test`, {
      timeout: 5000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('Backend connection test successful:', response.data);
    return true;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    }
    return false;
  }
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (!error.response) {
    // Network error
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.';
    }
    if (error.message === 'Network Error') {
      return 'Network error. Please check your internet connection and CORS settings.';
    }
    return 'Network error. Please check your internet connection.';
  }

  const status = error.response.status;
  const message = error.response.data?.message || error.message;

  switch (status) {
    case 401:
      return 'Please login to continue.';
    case 403:
      return 'Access denied. Please try logging in again.';
    case 404:
      return 'The requested resource was not found.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return message || 'An error occurred. Please try again.';
  }
}; 