import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Rating, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/reviews', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview(prev => ({
      ...prev,
      rating: newValue
    }));
  };
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Rounded to 1 decimal place
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('New review:', newReview);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Please login to submit a review');
      }

      const response = await axios.post('http://localhost:5002/api/reviews', newReview, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Add new review to the list
      setReviews(prev => [...prev, response.data]);

      // ✅ Show success message
      setSuccessMessage('✅ Thank you for your review!');

      // Clear the message after 4 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);

      // Clear form
      setNewReview({
        rating: 0,
        comment: ''
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || error.message || 'Error submitting review');
      }
    } finally {
      setIsLoading(false);
    }
  }; // ✅ Corrected closing brace

  return (
    <Box
      sx={{
        backgroundImage: {
          xs: "url('https://i.pinimg.com/736x/2b/2e/93/2b2e9395661517e3732a228067d7ac7c.jpg')",
          sm: "url('https://wallpapers.com/images/hd/women-background-n9t5k0r03kw0qze3.jpg')"
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",  // ✅ Keeps background in place
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" // Ensures content stacks properly
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
  <img
    src="https://cdn-icons-png.freepik.com/256/2065/2065224.png"
    alt="Review Icon"
    width="40"
    height="40"
    style={{ verticalAlign: "middle", marginRight: "10px" }}
  />
  Review Us!
</Typography>
          {successMessage && (
            <Typography color="success" align="center" sx={{ mb: 2 }}>
              {successMessage}
            </Typography>
          )}
          {/* ✅ Display Average Rating */}
<Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
  <Typography variant="h6" sx={{ mr: 1 }}>Overall:</Typography>
  <Rating value={parseFloat(calculateAverageRating())} readOnly precision={0.1} />
  <Typography variant="h6" sx={{ ml: 1 }}>({calculateAverageRating()})</Typography>
</Box>


          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={newReview.rating}
                onChange={handleRatingChange}
                size="large"
                disabled={isLoading}
              />
            </Box>
            <TextField
              fullWidth
              label="Your Review"
              name="comment"
              value={newReview.comment}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              required
              disabled={isLoading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: '#8e24aa' }}
              disabled={isLoading || !newReview.rating}
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Box>
        </Paper>

        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", mt: 4, mb: 3 }}>
          Recent Reviews
        </Typography>

        {reviews.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No reviews yet. Be the first to review!
          </Typography>
        ) : (
          reviews.map((review, index) => (
            <Card key={review._id || index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={Number(review.rating) || 0} readOnly size="small" />
                  <Typography 
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: 'black', ml: 1 }}
                  >
                    by {review.user?.username || 'Anonymous'}
                  </Typography>
                </Box>
                <Typography variant="body1">{review.comment}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Reviews;


