import React, { useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, CardMedia, Button } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LunchDining from '@mui/icons-material/LunchDining';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/FoodMenu"); // Redirect to Food Menu page
    }, 2000);
  };

  const features = [
  {
    title: 'High-Speed Network',
    description: 'High-speed Network of 4G and 5G for work and entertainment',
    icon: <WifiIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://telecomtalk.info/wp-content/uploads/2022/12/know-the-differences-between-4g-and-5g-1200x900.jpg '
  },
  {
    title: 'Safe-Secure',
    description: 'Safe Place for Women with All ladies Working Staffs ',
    icon: <SecurityIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://img.freepik.com/free-vector/realtor-assistance-illustration_52683-46786.jpg?ga=GA1.1.1199500948.1737623741&w=740'
  },
  {
    title: 'Protected & Peaceful Living',
    description: '24/7 surveillance and women-only staff ensure peace of mind and complete safety.',
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://img.freepik.com/free-vector/flat-background-safer-internet-day_23-2151127506.jpg?ga=GA1.1.1199500948.1737623741&w=740'
  },
  {
    title: 'Stronger Women, Stronger Society',
    description: 'Every womans success strengthens us all,Lets uplift and support working women!',
    icon: <SecurityIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://m.media-amazon.com/images/S/pv-target-images/e25ada89898c20fe2448bd1952de096f175cb4ab99927826efb0490f45592971.jpg'
  },
  {
    title: 'Home-Made Foods',
    description: 'Nutritious and delicious meals served three times a day',
    icon: <LocalDiningIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://i.pinimg.com/564x/f3/cb/96/f3cb9614e35b516f510c65db2304aeda.jpg ',
    button: {
      text: 'View Our Foods',
      action: handleNavigate
    }
  },
  {
    title: 'Laundry Service',
    description: 'Laundry and ironing services available',
    icon: <LocalLaundryServiceIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://static.vecteezy.com/system/resources/thumbnails/050/897/891/small_2x/basket-with-clean-folded-laundry-near-a-washing-machine-in-a-laundry-room-photo.jpeg '
  },
  {
    title: 'Housekeeping',
    description: 'Regular cleaning and maintenance of rooms and common areas',
    icon: <CleaningServicesIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://img.freepik.com/free-photo/hands-holding-cleaning-tools-solutions_53876-148192.jpg '
  },
  {
    title: 'Packed Lunch Available',
    description: 'Daily packed meals are available',
    icon: <LunchDining sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://t4.ftcdn.net/jpg/08/06/21/93/360_F_806219362_LiOsUcCtWAA9nlb4PyiA83bHFSHG1wGJ.jpg '
  },
  {
    title: 'SheCares Health Connect',
    description: 'Secure virtual platform connecting women to expert lady doctors during urgent health needs.',
    icon: <MedicalServicesIcon sx={{ fontSize: 40, color: '#8e24aa' }} />,
    image: 'https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1783.jpg?ga=GA1.1.1199500948.1737623741&w=740'
  }
];


  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Our Amenities
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
        Experience comfort and convenience with our premium amenities
      </Typography>

      
       
 
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h5" component="h2" sx={{ ml: 2 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                  {feature.button && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={feature.button.action}
                      >
                        {feature.button.text}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      

      {/* Room Types Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Room Types
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image="https://t4.ftcdn.net/jpg/06/32/19/51/360_F_632195151_xTnjr4xGYG3oGyHiSWeCLLdWTKIVCpfY.jpg "
                alt="Double-Sharing Room"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>Double-Sharing Room</Typography>
                <Typography variant="body1" color="text.secondary">
                  Perfect for those who prefer privacy and personal space. Includes a single bed, study table, and wardrobe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image="https://mccoymart.com/post/wp-content/webp-express/webp-images/uploads/15-July-24-Indian-bedroom-design.jpg.webp "
                alt="Triple-Sharing Room"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>Triple-Sharing Room</Typography>
                <Typography variant="body1" color="text.secondary">
                  Shared room with two single beds, ideal for those who prefer company and affordability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image="https://www.creativecampus.co.in/assets/images/subcategory_gallery/3/WhatsApp_Image_2021-07-17_at_18_10_19__6).jpeg "
                alt="Four-Sharing Room"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>Four-Sharing Room</Typography>
                <Typography variant="body1" color="text.secondary">
                  Spacious room with four single beds, perfect for a group of friends wanting to stay together.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Features;
