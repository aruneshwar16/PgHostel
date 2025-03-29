import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if server is reachable
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/test`);
      } catch (error) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running.');
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      // Handle successful login
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      {/* Login form */}
    </div>
  );
};

export default Login; 