import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Register from './components/Register';
import Login from './components/Login';
import Gallery from './components/Gallery';
import FoodMenu from './components/foodmenu'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#8e24aa',
    },
    secondary: {
      main: '#7b1fa2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/foodmenu" element={<FoodMenu />} /> {/* ✅ Added this route */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
