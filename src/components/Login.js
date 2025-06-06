import React, { useState, useRef, useEffect } from "react";
import { Container, Paper, TextField, Button, Typography, Box, Link, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Clear error when user types
    setShowError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowError(false);
    setIsLoading(true);
  
    try {
      console.log("Login attempted:", formData);
      const response = await axios.post("https://pg-sai-backend.onrender.com/api/auth/login", formData);
  
      // Store the token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("isAdmin", response.data.isAdmin); // Store isAdmin flag
  
      // Show success message
      setSuccess(true);
  
      // Redirect based on user role
      timerRef.current = setTimeout(() => {
        setSuccess(false);
        if (response.data.isAdmin) {
          navigate("/admin-dashboard"); // Redirect admin to admin dashboard
        } else {
          navigate("/reviews"); // Redirect regular user to reviews page
        }
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setShowError(true);
      timerRef.current = setTimeout(() => {
        setShowError(false);
        setError("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
  sx={{
    backgroundImage: {
      xs: "url('https://img.freepik.com/free-vector/follow-news-stay-home-covid-9-awareness-vector_53876-167999.jpg?t=st=1743431112~exp=1743434712~hmac=313a37f516d083ee69a13b99fe64d670b8f46395227d2a3f9c512ed530ed5f3c&w=740')",  // Mobile view (empty or add a mobile URL)
      sm: "url('https://t3.ftcdn.net/jpg/06/46/82/48/360_F_646824853_Ofj7OmU84JIIhqilkumCbz2AdZpudRMY.jpg')"  // Desktop view
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
      backgroundColor: "rgba(255, 255, 255, 0.31)", // Semi-transparent white
      backdropFilter: "blur(1px)", // Adds blur effect for better readability
      borderRadius: "10px", // Rounded corners
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Soft shadow
    }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <video autoPlay loop muted playsInline style={{ width: "60px", height: "60px", borderRadius: "70%" }}>
        <source src="  https://cdn-icons-mp4.flaticon.com/512/15911/15911098.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      {/* Success Message */}
      {success && (
        <Alert severity="success" sx={{ mb: 2, fontWeight: 600 }}>
          Login successful! Redirecting...
        </Alert>
      )}
      {/* Error Message */}
      {showError && error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
    </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
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
              required
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#8e24aa" }}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {/* New user link to register page */}
            <Typography align="center" sx={{ mt: 2 }}>
              New user?{" "}
              <Link 
                component="button"
                onClick={() => navigate("/register")}
                sx={{ color: "#8e24aa", textDecoration: "underline" }}
              >
                 Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;