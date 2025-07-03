import React from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Container,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Usefetch from '../../hook/Usefetch';
import Loader from '../shared/Loader';

function Product() {
  const { Data, Erorr, Isloader } = Usefetch(`https://mytshop.runasp.net/api/products`);

  if (Erorr) return <p>Error: {Erorr.message}</p>;

  if (Isloader)
    return (
     <Loader/>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        🛍️ Product Categories
      </Typography>
      <Grid container spacing={3}>
        {Data.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
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
              <CardMedia
                component="img"
                image={product.mainImg || 'https://via.placeholder.com/300x200'}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  📦 {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a short description about the product.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/product/${product.id}`}
                >
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

export default Product;
