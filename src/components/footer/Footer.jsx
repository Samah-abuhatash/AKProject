import React from 'react';
import { Box, Grid, Typography, IconButton, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#121212', color: '#eee', p: 4, mt: 6 }}>
      
      <Grid container spacing={4} sx={{ mb: 4, maxWidth: 1200, mx: 'auto' }}>
        
       
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton sx={{ border: '1px solid #40c4ff', color: '#40c4ff' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ border: '1px solid #40c4ff', color: '#40c4ff' }}>
              <PinterestIcon />
            </IconButton>
            <IconButton sx={{ border: '1px solid #40c4ff', color: '#40c4ff' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ border: '1px solid #40c4ff', color: '#40c4ff' }}>
              <EmailIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Our Product */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            Our Product
          </Typography>
          {['All Products', 'Laptops', 'Headphones', 'Smartphones', 'PlayStation', 'Smartwatch'].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 0.7, cursor: 'pointer', '&:hover': { color: '#40c4ff' } }}>
              {item}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            Links
          </Typography>
          {['Terms & Conditions', 'Privacy Policy', 'Refund & Return Policy'].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 0.7, cursor: 'pointer', '&:hover': { color: '#40c4ff' } }}>
              {item}
            </Typography>
          ))}
        </Grid>

   
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" gutterBottom>
            Site Pages
          </Typography>
          {['Homepage', 'About KA Store', 'Shop', 'Contact Us'].map((item) => (
            <Typography key={item} variant="body2" sx={{ mb: 0.7, cursor: 'pointer', '&:hover': { color: '#40c4ff' } }}>
              {item}
            </Typography>
          ))}
        </Grid>
      </Grid>

    
      <Box
        sx={{
          borderTop: '1px solid #444',
          pt: 2,
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 2, sm: 0 } }}>
          <Typography>
            Sunday to Thursday <br /> 09 AM — 07 PM
          </Typography>
          <IconButton sx={{ border: '1px solid #40c4ff', color: '#40c4ff', ml: 2 }}>
            <PhoneIcon />
          </IconButton>
          <IconButton sx={{ border: '1px solid #40c4ff', color: '#40c4ff' }}>
            <EmailIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<LocationOnIcon />}
            sx={{
              textTransform: 'none',
              ml: 1,
              bgcolor: '#40c4ff',
              '&:hover': { bgcolor: '#1e88e5' },
              borderRadius: 2,
              fontSize: 14,
            }}
          >
            Location
          </Button>
        </Box>

        
        <Typography sx={{ fontSize: 14, color: '#666' }}>
          KA Store © 2025 | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;

