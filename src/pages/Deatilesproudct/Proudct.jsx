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
  TextField,
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
      const prod = response.data?.data || response.data;
      setProduct(prod);
      const imgs = prod.images || [];
      setSelectedImage(imgs.length > 0 ? imgs[0] : prod.mainImg);
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

  useEffect(() => {
    getProduct();
  }, [id]);

  const noop = () => {};

  if (isLoading) return <Loader />;

  if (!product) {
    return (
      <Typography color="error" align="center" mt={5}>
        ❌ Failed to load product.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={4} sx={{ mb: 6, mt: 4, px: 2, maxWidth: 900, mx: 'auto' }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {product.name || "Unnamed Product"}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3} sx={{ lineHeight: 1.6 }}>
            {product.description || "No description available."}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Typography mr={1} fontWeight="bold">Rate</Typography>
            <Rating
              name="rating"
              value={product.rating ?? 4}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography ml={1} color="text.secondary">
              {product.rating ?? 4} (
              {Array.isArray(product.reviews) ? product.reviews.length : 0} reviews
              )
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
            Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <Button variant="outlined" onClick={noop} sx={{ minWidth: 36 }}>–</Button>
            <Typography>{quantity}</Typography>
            <Button variant="outlined" onClick={noop} sx={{ minWidth: 36 }}>+</Button>

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
            Quantity in stock: {product.quantity ?? 0}
          </Typography>

          {product.discount > 0 && (
            <Typography variant="body2" color="secondary" mt={1}>
              Discount: {product.discount}%
            </Typography>
          )}

          {/* ✅ عرض المراجعات */}
          {Array.isArray(product.reviews) && product.reviews.length > 0 && (
            <>
              <Typography variant="h6" fontWeight="bold" mt={5} mb={2}>
                Customer Reviews
              </Typography>
              {product.reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                  <Typography fontWeight="bold">{review.reviewerName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </Typography>
                  <Rating value={review.rate} precision={0.5} readOnly size="small" />
                  <Typography mt={1}>{review.comment}</Typography>
                </Box>
              ))}
            </>
          )}

          {/* ✅ نموذج إضافة مراجعة */}
          <AddReview productId={product.id} onReviewAdded={getProduct} />
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

// ✅ مكون إضافة مراجعة (بعد التعديل لمنع التكرار)
function AddReview({ productId, onReviewAdded }) {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userReviewed, setUserReviewed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    const checkIfReviewed = async () => {
      try {
        const res = await axiosaut.get(`products/${productId}`);
        const product = res.data?.data || res.data;
        const reviews = product.reviews || [];
        const userId = JSON.parse(atob(token.split('.')[1]))["nameid"]; // أو حسب اسم الـ claim
        const alreadyReviewed = reviews.some((r) => r.reviewerId === userId);
        setUserReviewed(alreadyReviewed);
      } catch (err) {
        console.error("Error checking review status", err);
      }
    };

    checkIfReviewed();
  }, [productId]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Please login to add a review.");
      return;
    }

    if (userReviewed) {
      setError("You have already reviewed this product.");
      return;
    }

    if (rate === 0 || comment.trim() === '') {
      setError("Please add a rating and a comment.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axiosaut.post(
        `products/${productId}/Reviews/Create`,
        { Rate: rate, Comment: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("✅ Review submitted successfully!");
      setRate(0);
      setComment('');
      setUserReviewed(true);
      onReviewAdded(); // لتحديث العرض
    } catch (err) {
      console.error("Review error:", err);
      setError("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={5}>
      {userReviewed ? (
        <Typography variant="body1" color="primary" mt={2}>
          ✅ You have already reviewed this product.
        </Typography>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Add a Review
          </Typography>

          {error && <Typography color="error" mt={1}>{error}</Typography>}
          {success && <Typography color="success.main" mt={1}>{success}</Typography>}

          <Box mt={2}>
            <Rating
              value={rate}
              onChange={(e, newValue) => setRate(newValue)}
              precision={1}
            />
          </Box>

          <TextField
            label="Your comment"
            multiline
            fullWidth
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </>
      )}
    </Box>
  );
}

export default Product;
