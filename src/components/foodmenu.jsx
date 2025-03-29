import React, { useState, useRef } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'lg',
  padding: theme.spacing(4),
}));

const FoodMenu = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const menuRef = useRef(null);

  const days = [
    { name: 'Monday', menu: { breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Dosa, Sambar, Chutney' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587067.png' },
    { name: 'Tuesday', menu: { breakfast: 'Vada, Sambar, Chutney', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Idli, Sambar, Chutney' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587076.png?ga=GA1.1.1199500948.1737623741' },
    { name: 'Wednesday', menu: { breakfast: 'Poori, Sambar', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Dosa, Sambar, Chutney' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587085.png?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid' },
    { name: 'Thursday', menu: { breakfast: 'Upma, Sambar', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Idli, Sambar, Chutney' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587091.png?ga=GA1.1.1199500948.1737623741' },
    { name: 'Friday', menu: { breakfast: 'Pongal, Sambar', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Dosa, Sambar, Chutney' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587098.png?ga=GA1.1.1199500948.1737623741' },
    { name: 'Saturday', menu: { breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Vada, Sambar, Chutney' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587106.png?ga=GA1.1.1199500948.1737623741' },
    { name: 'Sunday', menu: { breakfast: 'Poori, Sambar', lunch: 'Rice, Sambar, Rasam, Curd', dinner: 'Upma, Sambar' }, icon: 'https://cdn-icons-png.freepik.com/256/8587/8587114.png?ga=GA1.1.1199500948.1737623741' },
  ];

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh", // Full viewport height
        backgroundImage: 'url("https://img.freepik.com/free-photo/ingredients-near-pizza_23-2147772081.jpg?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Keeps it fixed for large screens
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4, // Ensures proper spacing
        overflow: "hidden", // Prevents unwanted scrolling

        // Responsive styles for mobile
        "@media (max-width: 600px)": {
          backgroundImage: 'url("https://img.freepik.com/free-photo/stir-fry-noodles-with-vegetables-chicken-with-bell-peppers-sauces-spring-roll-desk-against-black-background_23-2148093177.jpg?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid")',
          backgroundSize: "cover", // Ensures the background image covers the entire container
          backgroundAttachment: "scroll", // Avoids scroll issue on mobile
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" align="center" gutterBottom style={{ fontFamily: 'Cursive', color: 'white' }}>
          "Serving up homestyle happiness!"
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }} style={{ fontFamily: 'Cursive', color: '#ffcc00' }}>
        🍴Explore our weekly🍴South Indian menu and enjoy a variety of delicious meals
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {days.map((day, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: 4,
                  boxShadow: '0 4px 8px rgba(221, 28, 28, 0.1)',
                  cursor: 'pointer',
                  padding: 2
                }}
                onClick={() => {
                  setSelectedDay(day.name);
                  scrollToMenu();
                }}
              >
                <Typography variant="h5" component="h2" style={{ fontFamily: 'cursive', color: 'black' }}>
                  {day.name}
                </Typography>
                <img
                  src={day.icon}
                  alt={day.name}
                  style={{ width: 50, height: 50 }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>


        {selectedDay && (
          <Box ref={menuRef} sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Cursive', color: '#ffcc00' }}>
              {selectedDay}'s Menu
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <img
                      src="https://cdn-icons-png.freepik.com/256/5014/5014944.png?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid"
                      alt="Breakfast"
                      style={{ width: 50, height: 50, marginBottom: 16 }}
                    />
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Cursive', color: 'black' }}>
                      Breakfast
                    </Typography>
                    <Typography variant="body1" color="text.secondary" style={{ fontFamily: 'Cursive', color: 'black' }}>
                      {days.find(d => d.name === selectedDay).menu.breakfast}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/8736/8736033.png"
                      alt="Lunch"
                      style={{ width: 50, height: 50, marginBottom: 16 }}
                    />
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Cursive', color: 'black' }}>
                      Lunch
                    </Typography>
                    <Typography variant="body1" color="text.secondary" style={{ fontFamily: 'Cursive', color: 'black' }}>
                      {days.find(d => d.name === selectedDay).menu.lunch}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <img
                      src="https://cdn-icons-png.freepik.com/256/17559/17559557.png?ga=GA1.1.1199500948.1737623741"
                      alt="Dinner"
                      style={{ width: 50, height: 50, marginBottom: 16 }}
                    />
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Cursive', color: 'black' }}>
                      Dinner
                    </Typography>
                    <Typography variant="body1" color="text.secondary" style={{ fontFamily: 'Cursive', color: 'black' }}>
                      {days.find(d => d.name === selectedDay).menu.dinner}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FoodMenu;