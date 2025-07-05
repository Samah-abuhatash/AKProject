import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  IconButton,
  Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Cartcontext } from '../../components/context/Cartcontext.jsx';
import axiosaut from '../../api/AxoisAuth';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = ['#fff', '#000', '#e53935', '#fbc02d', '#303f9f'];

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState(false);

  const { cartitem, setcartitem } = useContext(Cartcontext);

  const getProduct = async () => {
    try {
      const response = await axiosaut.get(`products/${id}`);
      setProduct(response.data);

      const imgs = response.data.images || [];
      setSelectedImage(imgs.length > 0 ? imgs[0] : response.data.mainImg);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const addtocart = async () => {
    if (!product) return;

    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      toast.info("Please login to add items to your cart.");
      return;
    }

    try {
      await axiosaut.post(
        `Carts/${product.id}`,
        { quantity, color: selectedColor }
      );

      setcartitem((prev) => prev + quantity);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      toast.error("Failed to add to cart.");
    }
  };

  // دوال فارغة لأزرار الزيادة والنقصان (لعدم التغيير فعلياً)
  const noop = () => {};

  useEffect(() => {
    getProduct();
  }, [id]);

  if (isLoading) return <Loader />;

  if (!product) {
    return <Typography color="error">Failed to load product.</Typography>;
  }

  return (
    <>
      <Grid container spacing={4} sx={{ mb: 6, mt: 4, px: 2, maxWidth: 900, mx: 'auto' }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3} sx={{ lineHeight: 1.6 }}>
            {product.description}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Typography mr={1} fontWeight="bold">
              Rate
            </Typography>
            <Rating
              name="rating"
              value={product.rating ?? 4}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography ml={1} color="text.secondary">
              {product.rating ?? 4} ({product.reviews ?? 100} reviews)
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography fontWeight="bold" mb={1}>
              Colours
            </Typography>
            <Stack direction="row" spacing={1}>
              {colors.map((color) => (
                <Box
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: color,
                    borderRadius: '50%',
                    border: selectedColor === color ? '2px solid #4db6ac' : '1px solid #ccc',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Typography variant="h6" fontWeight="bold" mb={3}>
            Price: ${product.price.toFixed(2)}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            {/* أزرار + و – فقط للعرض */}
            <Button variant="outlined" onClick={noop} sx={{ minWidth: 36 }}>
              –
            </Button>
            <Typography>{quantity}</Typography>
            <Button variant="outlined" onClick={noop} sx={{ minWidth: 36 }}>
              +
            </Button>

            <Button
              variant="contained"
              sx={{ flexGrow: 1, borderRadius: 3 }}
              startIcon={<ShoppingCartIcon />}
              onClick={addtocart}
              disabled={product.quantity === 0}
            >
              {product.quantity === 0 ? 'Out of Stock' : 'Buy'}
            </Button>

            <IconButton onClick={() => setFav(!fav)} color="error">
              {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Quantity in stock: {product.quantity}
          </Typography>

          {product.discount > 0 && (
            <Typography variant="body2" color="secondary" mt={1}>
              Discount: {product.discount}%
            </Typography>
          )}
        </Grid>
      </Grid>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Product;
