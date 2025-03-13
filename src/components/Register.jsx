import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box,Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZmeHrBOns9nS3HmGr2bJsRvU3y5U2uo_OughaKC3Sysl0D5ZKmwEZ5zTUJVM-SP3S-SQ&usqp=CAU')";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setSubmitError(''); // Clear submit error when user makes changes
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Email is not valid';
    tempErrors.phone = /^\d{10}$/.test(formData.phone) ? '' : 'Phone number must be 10 digits';
    tempErrors.password = formData.password.length >= 6 ? '' : 'Password must be at least 6 characters';
    tempErrors.confirmPassword = formData.password === formData.confirmPassword ? '' : 'Passwords do not match';

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsLoading(true);
  
    if (validateForm()) {
      try {
        // Check if server is reachable
        try {
          await axios.get('http://localhost:5002/test');
        } catch (error) {
          throw new Error('Cannot connect to server. Please make sure the backend server is running.');
        }
  
        console.log('Attempting to register with:', {
          username: formData.name,
          email: formData.email,
          password: formData.password
        });
  
        const response = await axios.post('http://localhost:5002/api/auth/register', {
          username: formData.name,
          email: formData.email,
          password: formData.password
        });
  
        console.log('Registration successful:', response.data);
  
        // Store the token
        localStorage.setItem('token', response.data.token);
  
        // ✅ Show success message in GREEN before redirecting
        setSubmitError('✅ Registration successful! Redirecting to login...');
  
        // Delay before redirecting
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2-second delay
  
      } catch (error) {
        console.error('Registration error:', error);
        if (error.response) {
          setSubmitError(error.response.data.message || '❌ Registration failed. Please try again.');
        } else if (error.request) {
          setSubmitError('❌ Cannot connect to server. Please try again later.');
        } else {
          setSubmitError(error.message || '❌ An error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        backgroundImage: {
          xs: "url('https://img.freepik.com/free-vector/women-s-day-pattern-with-women-faces_23-2148403753.jpg')",  // Mobile view (empty or add a mobile URL)
          sm: "url('https://media.licdn.com/dms/image/v2/D5612AQEU1rJZDBlwfg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1692244308608?e=2147483647&v=beta&t=PRg4fKEYMOwXmrCNrvyOv5ziOYKVzcskUR-emz9EfLY')"
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

<Container maxWidth="sm">
  <Paper
    elevation={3}
    sx={{
      p: 4,
      mt: 4,
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white
      backdropFilter: "blur(5px)", // Blur effect for readability
      borderRadius: "10px", // Smooth rounded corners
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Soft shadow
    }}
  >
    <Typography variant="h4" component="h1" align="center" gutterBottom>
      Register
    </Typography>
    
    {submitError && (
      <Typography color="error" align="center" sx={{ mb: 2 }}>
        {submitError}
      </Typography>
    )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
              required
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              required
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
              required
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              required
              disabled={isLoading}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#8e24aa' }}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            {/* Existing user link to login page */}
            <Typography align="center" sx={{ mt: 2 }}>
              Have an account?{" "}
              <Link 
                component="button"
                onClick={() => navigate("/login")}
                sx={{ color: "#8e24aa", textDecoration: "underline" }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
