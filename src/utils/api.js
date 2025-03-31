import axios from 'axios';
import config from '../config';

export const testConnection = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/test`, {
      timeout: 5000 // 5 second timeout for connection test
    });
    console.log('Backend connection test successful:', response.data);
    return true;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }
  
  if (!error.response) {
    return 'Network error. Please check your internet connection.';
  }
  
  switch (error.response.status) {
    case 401:
      return 'Please login to continue.';
    case 403:
      return 'Access denied. Please try logging in again.';
    case 404:
      return 'Resource not found. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return error.response.data?.message || 'An error occurred. Please try again.';
  }
}; 