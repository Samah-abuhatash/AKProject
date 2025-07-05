import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Usefetch from '../../hook/Usefetch';
import Loader from '../shared/Loader';

function Product() {
  const { Data, Erorr, Isloader } = Usefetch(`https://mytshop.runasp.net/api/products`);

  if (Erorr) return <p>Error: {Erorr.message}</p>;
  if (Isloader) return <Loader />;

  // ناخذ أول نوعين فقط
  const productsToShow = Data.slice(0, 2);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        📱 Featured Mobile Phones
      </Typography>
      <Grid container spacing={6}>
        {productsToShow.map((product) => (
          <Grid
            item
            xs={12}
            md={6}
            key={product.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                maxWidth: 450,
                width: '100%',
                borderRadius: 5,
                boxShadow:
                  '0 8px 24px rgba(0, 0, 0, 0.15), 0 16px 48px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow:
                    '0 12px 36px rgba(0, 0, 0, 0.25), 0 24px 64px rgba(0, 0, 0, 0.15)',
                },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                image={product.mainImg || 'https://via.placeholder.com/400x300'}
                alt={product.name}
                sx={{
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  height: 300,
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1, px: 4, py: 3 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ letterSpacing: 1 }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {product.description ||
                    'Discover the features and elegance of this amazing mobile phone.'}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  ${product.price ? product.price.toFixed(2) : 'N/A'}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 4, pb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  component={Link}
                  to={`/product/${product.id}`}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    '&:hover': {
                      boxShadow: '0 8px 28px rgba(25, 118, 210, 0.7)',
                    },
                  }}
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
