import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const logoUrl = "/Screenshot 2025-02-10 153358.png"; // Path inside the public folder
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Features", path: "/features" },
    { text: "Reviews", path: "/reviews" },
    { text: "About", path: "/contact" },
    { text: "Register", path: "/register" },
    { text: "Login", path: "/login" },
    { text: "Gallery", path: "/gallery" } // ✅ Changed "/Gallery" to "/gallery"
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#8e24aa' }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={logoUrl} alt="Sai PG Logo" sx={{ width: 60, height: 60, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Sai Women's PG
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path} sx={{ mx: 1 }}>
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 200,
            backgroundImage: "url('/pg5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },
        }}
      >
        <List sx={{ width: "100%", color: "brown" }}> {/* ✅ Fixed text color */}
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
