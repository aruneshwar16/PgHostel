import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography, Box,Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Login attempted:", formData);
      const response = await axios.post("http://localhost:5002/api/auth/login", formData);
      
      // Store the token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      
      // Redirect to reviews page
      navigate("/reviews");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
  sx={{
    backgroundImage: {
      xs: "url('https://img.freepik.com/free-vector/women-s-day-pattern-with-women-faces_23-2148403753.jpg')",  // Mobile view (empty or add a mobile URL)
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
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white
      backdropFilter: "blur(5px)", // Adds blur effect for better readability
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
