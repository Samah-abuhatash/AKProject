import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Container,
} from '@mui/material';

function Catgorey() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://mytshop.runasp.net/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        🛍️ Categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 4,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  📦 {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a short description about the category. You can customize it.
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      

    </Container>
    
  );
}

export default Catgorey;
