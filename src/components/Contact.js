import React from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Grid, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const founderImage = "/pg.6.png"; // Ensure this image is inside 'public'

const Contact = () => {
  return (
    <Box
      sx={{
        //backgroundImage: "url('https://img.freepik.com/free-vector/feminine-line-art-pink-background-vector_53876-171175.jpg')",
        backgroundImage:"url('https://img.freepik.com/free-photo/blue-fabric-textured-background-with-musk-rose_53876-167308.jpg?t=st=1741774916~exp=1741778516~hmac=cf276f60a1c1b7a34acae1455f63b55428550969bdfd3149f726416df3fbf04b&w=1380')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Full height of the viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4, // Added padding to ensure better spacing
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, backgroundColor: "rgba(255, 255, 255, 0.85)", borderRadius: 3 }}>
          {/* Hostel Name */}
          <Typography variant="h4" component="h1" gutterBottom>
            About Sai PG Women's Hostel
          </Typography>

          {/* Founder Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
            <Avatar src={founderImage} alt="Founder" sx={{ width: 200, height: 200, borderRadius: 0, mb: 2 }} />
            <Typography variant="h5">Mrs. Menaka Elankamban</Typography>
            <Typography variant="body1" color="textSecondary">
              Founder & Managing Director.
            </Typography>
          </Box>

          {/* Hostel Details */}
          <Typography variant="body1" sx={{ mt: 3 }}>
            We started our hostel in 2023 and have been successfully running it for over two years.
            Sai PG Women's Hostel provides safe, comfortable, and affordable accommodation for women.
            Located in a prime area of Tiruvannamalai, our hostel is equipped with modern amenities, ensuring security, convenience, 
            and a homely atmosphere for students and working women.
            <strong> Our hostel's slogan: "நீ மங்கையாய் பிறந்திடவே ஒரு மாதவம் செய்தாயோ!"</strong>
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Our hostel offers <strong>Homely rooms</strong>, <strong>Security</strong>, 
            <strong> Packed Food</strong>, <strong>Nutritious meals</strong>, and <strong>Easy access to public transportation</strong>.
          </Typography>
        </Paper>

        {/* Contact Details & Location */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Contact Information
            </Typography>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 2, color: '#8e24aa' }} />
                  <Box>
                    <Typography variant="h6">Address</Typography>
                    <Typography variant="body1">
                      No,92 Karikalan Street, Tiruvannamalai, Tamil Nadu 606-601
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: '#8e24aa' }} />
                  <Box>
                    <Typography variant="h6">Phone</Typography>
                    <Typography variant="body1">+91 9123536809</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ mr: 2, color: '#8e24aa' }} />
                  <Box>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="body1">sai.womens.pg@gmail.com</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Google Maps Embed */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Location
            </Typography>
            <Paper elevation={3} sx={{ p: 4, height: '300px', backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
              <iframe
                title="Hostel Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.883026350007!2d79.07486447581302!3d12.225562987856523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52a9dd3517bff7%3A0xe3f33a6cfb1582e5!2sSai%20PG%20Women%20Hostel!5e0!3m2!1sen!2sin!4v1710083581845!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="fast"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
