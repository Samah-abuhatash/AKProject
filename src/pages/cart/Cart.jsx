import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Grid, Typography, Card, CardContent, CardMedia,
  IconButton, Button
} from '@mui/material';
import { Remove, AddCircle, Delete } from '@mui/icons-material';
import { Link } from 'react-router';
import { Cartcontext } from '../../components/context/Cartcontext';

function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartitem, setcartitem } = useContext(Cartcontext);

  // ✅ جلب محتويات السلة وتحديث العدد والسعر
  const fetchCart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        'https://mytshop.runasp.net/api/Carts',
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      );

      const cartItems = response.data.cartResponse || [];
      setProducts(cartItems);
      setTotalPrice(response.data.totalPrice);

      const totalItemCount = cartItems.reduce((sum, item) => sum + item.count, 0);
      setcartitem(totalItemCount); 

    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // ✅ زيادة الكمية
  const increasqunt = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.patch(
        `https://mytshop.runasp.net/api/Carts/increaseCount/${id}`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchCart();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // ✅ نقصان الكمية أو حذف المنتج إذا كانت الكمية 1
  const decqunt = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const product = products.find(p => p.id === id);
      if (!product) return;

      if (product.count > 1) {
        await axios.patch(
          `https://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,
          {},
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      } else {
        await axios.delete(
          `https://mytshop.runasp.net/api/Carts/${id}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      }
      fetchCart();
    } catch (error) {
      console.error("Error decreasing quantity or deleting item:", error);
    }
  };

  // ✅ حذف منتج بشكل كامل من السلة
  const deleteProduct = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(
        `https://mytshop.runasp.net/api/Carts/${id}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchCart(); // لا داعي لتعديل cartitem يدوياً، لأنه يتم تحديثه من fetchCart
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // ✅ مسح السلة كاملة
  const clearCart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(
        'https://mytshop.runasp.net/api/Carts/clearCart',
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      alert("Cart cleared successfully!");
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error.message);
      alert("Failed to clear cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {products.length === 0 && (
            <Typography variant="h6" color="textSecondary">Your cart is empty</Typography>
          )}

          {products.map((product) => (
            <Card key={product.id} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
              <CardMedia
                component="img"
                image={`https://mytshop.runasp.net/images/${product.mainImg || "placeholder.png"}`}
                alt={product.name}
                sx={{ width: 100, height: 100, borderRadius: 2, mr: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6'>{product.name}</Typography>
                <Typography variant='body1' color='primary'>${product.price}</Typography>
              </CardContent>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => decqunt(product.id)}><Remove /></IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => increasqunt(product.id)}><AddCircle /></IconButton>
                <IconButton onClick={() => deleteProduct(product.id)}><Delete /></IconButton>
              </Box>
            </Card>
          ))}

          {products.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={clearCart}
              sx={{ mt: 2 }}
            >
              Clear Cart
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant='h5' gutterBottom>Order Summary</Typography>
            <Typography variant='body1'>
              Total: ${totalPrice}
            </Typography>
            <Typography variant='body1'>
              Number of items: {cartitem}
            </Typography>
          </Card>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/checkout"
            sx={{ mt: 2 }}
          >
            Check Out
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
