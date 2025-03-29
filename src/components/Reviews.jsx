import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Rating, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews from:', `${config.apiUrl}/api/reviews`);
      const response = await axios.get(`${config.apiUrl}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
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
    } catch (error) {
      console.error('Error fetching reviews:', error);
      console.error('Error response:', error.response?.data);
      setReviews([]);
      if (error.response?.status === 401) {
        navigate('/login');
      }
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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to submit a review');
      }

      const response = await axios.post(`${config.apiUrl}/api/reviews`, newReview, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setReviews(prev => [...prev, response.data]);
      setSuccessMessage('✅ Thank you for your review!');
      setTimeout(() => setSuccessMessage(''), 4000);
      setNewReview({ rating: 0, comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.response?.data?.message || error.message || 'Error submitting review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: {
          xs: "url('https://img.freepik.com/free-vector/organic-flat-feedback-concept-illustrated_23-2148951368.jpg?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid')",  // Mobile view
          sm: "url('https://wallpapers.com/images/hd/women-background-n9t5k0r03kw0qze3.jpg')"  // Tablet & Desktop
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: {
          xs: "scroll", // Mobile-friendly
          sm: "fixed"   // Desktop & Tablets
        },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(5px)", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            <img src="https://cdn-icons-png.freepik.com/256/2065/2065224.png" alt="Review Icon" width="40" height="40" style={{ verticalAlign: "middle", marginRight: "10px" }} />
            Review Us!
          </Typography>

          {successMessage && <Typography color="success" align="center" sx={{ mb: 2 }}>{successMessage}</Typography>}

          <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
            <Typography variant="h6" sx={{ mr: 1 }}>Overall:</Typography>
            <Rating value={parseFloat(calculateAverageRating())} readOnly precision={0.1} />
            <Typography variant="h6" sx={{ ml: 1 }}>({calculateAverageRating()})</Typography>
          </Box>

          {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}

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
