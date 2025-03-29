import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, Grid, Card, CardContent, IconButton, Link, TextField,CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

// // Image Slider
const ImageSlider = styled(Box)({
  position: "relative",
  height: "70vh",
  overflow: "hidden",
});

const SlideImage = styled("div")(({ image }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "opacity 0.5s ease-in-out",
}));

// Ticker Container (Below Image Slider)
const TickerContainer = styled(Box)({
  width: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  backgroundColor: "#8e24aa",
  color: "white",
  padding: "8px 0",
  textAlign: "center",
});

const TickerText = styled("div")({
  display: "inline-block",
  paddingLeft: "100%",
  animation: "tickerAnimation 14s linear infinite",
  fontWeight: "bold",
  fontSize: "16px",
});

// Keyframes for ticker animation
const tickerAnimation = `
  @keyframes tickerAnimation {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;
// Social Media Icons
const SocialIcons = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
  gap: 20,
});

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    "https://content.jdmagicbox.com/comp/coimbatore/t9/0422px422.x422.180531090829.i7t9/catalogue/baby-doll-women-s-hostel-keeranatham-coimbatore-hostels-7xjejehvj6.jpg",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3",
    "https://www.thetulips.in/wp-content/uploads/2016/06/Room-20-1024x683.jpg",
    "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/center_caption_photo/photo/624e836f0b80f700015c6af3/07.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  //Contact Form
  const { register, reset, handleSubmit } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = "e3a1eef2-4fd0-456d-a449-203b6254e970";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: "Sai PG Women's Hostel",
      subject: "New Contact Message from Website",
    },
    onSuccess: (msg) => {
      setIsSuccess(true);
      setResult(msg);
      reset();
    },
    onError: (msg) => {
      setIsSuccess(false);
      setResult(msg);
    },
  });

  return (
    <Box>
      {/* Add ticker animation style */}
      <style>{tickerAnimation}</style>

      {/* IMAGE SLIDER */}
      <ImageSlider>
        {slides.map((slide, index) => (
          <SlideImage key={index} image={slide} sx={{ opacity: currentSlide === index ? 1 : 0 }} />
        ))}
        <Container maxWidth="md" sx={{ position: "relative", height: "100%", zIndex: 1, display: "flex", alignItems: "center", color: "white" }}>
          <Box sx={{ backgroundColor: "rgba(0,0,0,0.5)", padding: 4, borderRadius: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Sai PG Women's Hostel
            </Typography>
            <Typography variant="h5" paragraph>
              Experience The Comfort Of Home!🏠
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2, backgroundColor: "#8e24aa" }}
              onClick={() => window.open("https://wa.me/919123536809?text=Hello! I am interested in booking a stay at Sai PG,Let me know the Details!", "_blank")}
            >
              Book Now!
            </Button>
          </Box>
        </Container>
      </ImageSlider>

      {/* TICKER BELOW IMAGE SLIDER */}
      <TickerContainer>
  <TickerText>
    <span>Sai PG Hostel Tiruvannamalai - Starting price is only ₹4000/-! 🔖 Book Now..!🚀</span>
    <span>4.5+ ⭐⭐⭐⭐ stars in Google Reviews.</span>
  </TickerText>
</TickerContainer>





      {/* WHY CHOOSE US SECTION */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
  <Typography variant="h3" component="h2" align="center" gutterBottom>
    Why Choose Us?
  </Typography>
  <Grid container spacing={4} sx={{ mt: 4 }}>
    {[
      {
        title: "Safe & Secure",
        description: "Safe and Trusted Place for women in Tiruvannamalai.",
        iconUrl: "https://cdn-icons-png.freepik.com/256/3046/3046012.png?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid",
      },
      {
        title: "Modern Amenities",
        description: "Rooms with modern facilities, comfort, and hygiene.",
        iconUrl: "https://cdn-icons-png.freepik.com/256/5133/5133567.png?ga=GA1.1.1199500948.1737623741&semt=ais_hybrid",
      },
      {
        title: "Prime Location",
        description: "Conveniently located near the temple and city center.",
        iconUrl: "https://cdn-icons-png.freepik.com/256/854/854930.png?ga=GA1.1.1199500948.1737623741",
        link: "https://maps.app.goo.gl/pN9BBAMtkJCbJDWL7",
      },
    ].map((feature, index) => (
      <Grid item xs={12} md={4} key={index}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: 2,
            backgroundColor: index === 0 || index === 1 || index === 2 ? "pink" : "white",
            cursor: feature.link ? "pointer" : "default", // Change cursor for clickable card
          }}
          onClick={() => feature.link && window.open(feature.link, "_blank")}
        >
          <CardMedia
            component="img"
            image={feature.iconUrl}
            alt={feature.title}
            sx={{ width: 80, height: 80, mt: 2 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>
{/* SOCIAL MEDIA ICONS */}
<Container maxWidth="lg">
  <Box display="flex" justifyContent="center" gap={2} mt={3}>
    {/* WhatsApp */}
    <IconButton
      sx={{ backgroundColor: "#25D366", color: "white" }}
      onClick={() =>
        window.open(
          "https://wa.me/919123536809?text=Hello!⭐ I am interested To Book a Stay at Sai PG Hostel📍",
          "_blank"
        )
      }
    >
      <WhatsAppIcon fontSize="large" />
    </IconButton>

    {/* Instagram */}
    <IconButton
      sx={{ backgroundColor: "#E4405F", color: "white" }}
      onClick={() => window.open("https://www.instagram.com/sai.ladies.pg_hostel", "_blank")}
    >
      <InstagramIcon fontSize="large" />
    </IconButton>

    {/* Google Maps */}
    <IconButton
      sx={{ backgroundColor: "#4285F4", color: "white" }}
      onClick={() => window.open("https://maps.app.goo.gl/pN9BBAMtkJCbJDWL7", "_blank")}
    >
      <LocationOnIcon fontSize="large" />
    </IconButton>
  </Box>
</Container>

     
     
     
      {/* CONTACT FORM */}
      <Container maxWidth="xs" sx={{ mt: 5, mb: 5 ,
  
    backgroundImage:  "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.34)),url('https://img.freepik.com/free-vector/hand-drawn-woman-portrait-illustration_23-2150174062.jpg?ga=GA1.1.1199500948.1737623741')", 
    backgroundSize: "cover",  // Ensures full image fits
    backgroundPosition: "center",  // Centers the image
    backgroundRepeat: "no-repeat", // Prevents repetition
    padding: 5, 
    borderRadius: 3
  }}
>
<Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 3,color: "#000000", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <img 
    src="https://cdn-icons-png.freepik.com/256/2016/2016399.png?ga=GA1.1.1199500948.1737623741" 
    alt="Contact Icon" 
    style={{ width: 50, height: 50, marginRight: 20 }} 
  />
  Contact Us!
</Typography>


  <form onSubmit={handleSubmit(onSubmit)}>
    <TextField label="Name*" fullWidth {...register("name", { required: true })} sx={{ mb: 2 }} InputLabelProps={{ sx: { fontWeight: "bold", color: "black" } }}/>
    <TextField label="Email*" fullWidth {...register("email", { required: true })} sx={{ mb: 2 }} InputLabelProps={{ sx: { fontWeight: "bold", color: "black" } }}/>
    <TextField label="Message*" fullWidth multiline rows={4} {...register("message", { required: true })} sx={{ mb: 2 }}InputLabelProps={{ sx: { fontWeight: "bold", color: "black" } }}/>
    <Button type="submit" variant="contained" sx={{ backgroundColor: "brown", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#6a1b9a" } }}>
      Submit
    </Button>
  </form>
</Container> 

    </Box>
  );
};

export default Home;
