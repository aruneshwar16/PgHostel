import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

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
        const apiUrl = `${config.apiUrl}/api/auth/register`;
        console.log('Attempting to register with:', {
          url: apiUrl,
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          }
        });
  
        const response = await axios.post(apiUrl, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log('Registration successful:', response.data);
  
        // Store the token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        // ✅ Show success message in GREEN before redirecting
        setSubmitError('✅ Registration successful! Redirecting to login...');
  
        // Delay before redirecting
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2-second delay
  
      } catch (error) {
        console.error('Registration error:', error);
        console.error('Error response:', error.response?.data);
        
        if (error.response?.status === 405) {
          setSubmitError('❌ Registration endpoint is not available. Please try again later.');
        } else if (error.response) {
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
          xs: "url('https://img.freepik.com/premium-photo/unity-strength-women-silhouettes-purplepink-wash_818261-31543.jpg?semt=ais_hybrid')",  // Mobile view (empty or add a mobile URL)
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

<Container maxWidth="xs">
  <Paper
    elevation={3}
    sx={{
      p: 3, // Reduced padding
      mt: 3, // Reduced margin
      backgroundColor: "rgba(255, 255, 255, 0.36)", 
      backdropFilter: "blur(1px)", 
      borderRadius: "10px", 
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", 
      width: "100%", // Reduced width
      maxWidth: "350px" // Limits max width
    }}
  ><Box display="flex" flexDirection="column" alignItems="center" gap={1}>
  <video autoPlay loop muted playsInline style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
    <source src="https://cdn-icons-mp4.freepik.com/128/18986/18986443.mp4?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <Typography variant="h4" component="h1" gutterBottom>
    Register
  </Typography>
</Box>


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
