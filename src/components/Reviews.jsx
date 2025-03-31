import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Rating, Card, CardContent, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { testConnection, handleApiError } from '../utils/api';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsConnecting(true);
      const isConnected = await testConnection();
      if (!isConnected) {
        setConnectionError('Unable to connect to the server. Please check your internet connection and try again.');
        return;
      }

      const token = localStorage.getItem('token');
      console.log('Current token:', token ? 'Present' : 'Missing');
      
      const apiUrl = `${config.apiUrl}/api/reviews`;
      console.log('Fetching reviews from:', apiUrl);
      
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Request headers:', headers);

      const response = await axios.get(apiUrl, {
        headers,
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      });
      
      console.log('Reviews API Response:', response.data);
      
      if (!response.data) {
        console.error('No data received from reviews API');
        setReviews([]);
        return;
      }

      const reviewsData = Array.isArray(response.data) ? response.data : 
                         response.data.reviews ? response.data.reviews : 
                         [];
      
      console.log('Processed reviews data:', reviewsData);
      setReviews(reviewsData);
      setConnectionError(null);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request URL:', error.config?.url);
      console.error('Request headers:', error.config?.headers);
      console.error('Error message:', error.message);
      
      setConnectionError(handleApiError(error));
      setReviews([]);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleRatingChange = (_, newValue) => {
    setNewReview(prev => ({ ...prev, rating: newValue || 0 }));
  };

  const calculateAverageRating = () => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => {
      const rating = Number(review.rating) || 0;
      return sum + rating;
    }, 0);
    return (total / reviews.length).toFixed(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isConnected = await testConnection();
      if (!isConnected) {
        setConnectionError('Unable to connect to the server. Please check your internet connection and try again.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to submit a review');
      }

      const apiUrl = `${config.apiUrl}/api/reviews`;
      console.log('Submitting review to:', apiUrl);
      console.log('Review data:', newReview);
      
      const headers = { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      console.log('Request headers:', headers);

      const response = await axios.post(apiUrl, newReview, {
        headers,
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      });

      console.log('Review submission response:', response.data);
    
      setSuccessMessage('✅ Thank you for your review!');
      setTimeout(() => setSuccessMessage(''), 4000);
      setNewReview({ rating: 0, comment: '' });
      setConnectionError(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Request URL:', error.config?.url);
      console.error('Request headers:', error.config?.headers);
      console.error('Error message:', error.message);
      
      setConnectionError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://img.freepik.com/free-vector/abstract-wavy-background_53876-99232.jpg?ga=GA1.1.1199500948.1737623741')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          pt: { xs: 3, md: 5 },
          pb: { xs: 3, md: 5 }
        }}
      >
        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(5px)", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            <img src="https://cdn-icons-png.freepik.com/256/2065/2065224.png" alt="Review Icon" width="40" height="40" style={{ verticalAlign: "middle", marginRight: "10px" }} />
            Review Us!
          </Typography>

          {successMessage && <Typography color="success" align="center" sx={{ mb: 2 }}>{successMessage}</Typography>}

          {isConnecting ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <CircularProgress />
            </Box>
          ) : connectionError ? (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                '& .MuiAlert-message': {
                  width: '100%',
                  textAlign: 'center'
                }
              }}
            >
              {connectionError}
            </Alert>
          ) : null}

          <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
            <Typography variant="h6" sx={{ mr: 1 }}>Overall:</Typography>
            <Rating value={parseFloat(calculateAverageRating())} readOnly precision={0.1} />
            <Typography variant="h6" sx={{ ml: 1 }}>({calculateAverageRating()})</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="legend">Rating</Typography>
              <Rating name="rating" value={newReview.rating} onChange={handleRatingChange} size="large" disabled={isLoading} />
            </Box>
            <TextField fullWidth label="Your Review" name="comment" value={newReview.comment} onChange={handleChange} multiline rows={4} margin="normal" required disabled={isLoading} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#8e24aa' }} disabled={isLoading || !newReview.rating}>{isLoading ? 'Submitting...' : 'Submit Review'}</Button>
          </Box>
        </Paper>

        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", mt: 4, mb: 3 }}>Recent Reviews</Typography>
        {reviews.length === 0 ? (
          <Typography align="center" color="textSecondary">No reviews yet. Be the first to review!</Typography>
        ) : (
          reviews.map((review, index) => (
            <Card key={review._id || index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={Number(review.rating) || 0} readOnly size="small" />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black', ml: 1 }}>by {review.user?.name || 'Anonymous'}</Typography>
                </Box>
                <Typography variant="body1">{review.comment}</Typography>
                <Typography variant="caption" color="textSecondary">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Reviews;
