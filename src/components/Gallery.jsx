import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Container, Typography, Grid, MenuItem, Alert } from '@mui/material';
import { AccountCircle, Lock, Image, Logout } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import config from '../config';

const Gallery = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Rooms');
  const [images, setImages] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching gallery from:', `${config.apiUrl}/api/gallery`);
        const response = await axios.get(`${config.apiUrl}/api/gallery`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Gallery API Response:', response.data);
        
        if (!response.data) {
          console.error('No data received from gallery API');
          setImages([]);
          return;
        }

        const imagesData = Array.isArray(response.data) ? response.data : 
                          response.data.images ? response.data.images : 
                          [];
        
        console.log('Processed gallery data:', imagesData);
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        console.error('Error response:', error.response?.data);
        setImages([]);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => setLoginSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

  // Admin Login Handler
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Check for default admin credentials
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('token', 'adminToken');
        setIsAdminLoggedIn(true);
        setLoginSuccess(true);
      } else {
        alert('Invalid credentials. Only admin can login!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdminLoggedIn(false);
    setLoginSuccess(false);
    setUsername('');
    setPassword('');
  };

  // Image Upload Handler
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', category);
    formData.append('description', `Image in ${category} category`);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        `${config.apiUrl}/api/gallery`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Refresh the images list
      const updatedImages = await axios.get(`${config.apiUrl}/api/gallery`);
      setImages(updatedImages.data);
      
      // Clear the form
      setFile(null);
      if (event.target.querySelector('input[type="file"]')) {
        event.target.querySelector('input[type="file"]').value = '';
      }
      
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
      if (err.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
        handleLogout();
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Image Gallery
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        (Only for admin access!)
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {!isAdminLoggedIn ? (
          <Grid item xs={12} sm={6}>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ p: 3, border: 1, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" align="center"> Admin Login</Typography>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        ) : (
          <>
            {loginSuccess && (
              <Grid item xs={12}>
                <Alert severity="success" sx={{ textAlign: 'center', mb: 2 }}>
                  Successful admin login✅
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h5" align="center" sx={{ mt: 3 }}>
                Welcome, Admin!
              </Typography>
            </Grid>

            {/* Logout Button */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Button variant="outlined" color="error" onClick={handleLogout} startIcon={<Logout />}>
                Logout
              </Button>
            </Grid>

            {/* Upload Image Section */}
            <Grid item xs={12} sm={6}>
              <Box component="form" noValidate onSubmit={handleUpload} sx={{ p: 3, border: 1, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6">Add Image</Typography>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  disabled={isLoading}
                  style={{ display: 'block', margin: '10px 0' }}
                />
                <TextField
                  fullWidth
                  label="Category"
                  select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  margin="normal"
                  required
                  disabled={isLoading}
                >
                  <MenuItem value="Rooms">Rooms</MenuItem>
                  <MenuItem value="Facilities">Facilities</MenuItem>
                  <MenuItem value="Events">Events</MenuItem>
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={isLoading}
                  sx={{ mt: 2 }}
                >
                  Upload
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>

      {/* Display Images */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
  {images.length === 0 ? (
    <Typography variant="h6" align="center" sx={{ width: '100%' }}>
      No images found⛔.
    </Typography>
  ) : (
    images.map((img, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Box
          sx={{
            p: 2,
            border: 1,
            borderColor: 'gray',
            borderRadius: 2,
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" align="center">{img.title}</Typography>
          <img
            src={img.imageUrl}
            alt={img.title}
            style={{
              width: '300px', 
              height: '300px', 
              objectFit : 'cover',
              borderRadius: '10px',
            }}
          />
        </Box>
      </Grid>
    ))
  )}
</Grid>
    </Container>
  );
};

export default Gallery;
