import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };
 const addtocart = async (id) => {
  alert(id);

  // احضر التوكن من التخزين المحلي
  const userToken = localStorage.getItem("userToken");
  console.log(userToken);

  try {
    const response = await axios.post(
      `https://mytshop.runasp.net/api/Carts/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken}` // الصيغة الصحيحة
        }
      }
    );

    console.log(response);
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data || error.message);
  }
};

  useEffect(() => {
    getProduct();
  }, [id]); // Re-fetch if ID changes

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <Typography color="error">Failed to load product.</Typography>;
  }

 // const imageUrl = `http://mytshop.runasp.net/images/${product.mainImg}`;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="300"
            image={product.mainImg}

          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" mt={2}>
            Price: {product.price} ₪
          </Typography>
          {product.discount > 0 && (
            <Typography variant="body2" color="secondary">
              Discount: {product.discount}%
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Quantity in stock: {product.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>addtocart(product.id)} variant="contained" color="primary" fullWidth>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Product;
