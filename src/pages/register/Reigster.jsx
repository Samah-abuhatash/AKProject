import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Lock,
  Email,
  Person,
  AccountCircle,
  CalendarToday,
} from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import myImagereg from '../../assets/images/register/regsiter.png';
//import logo from '../../assets/images/logo/logo.png';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (data) => {
    try {
      setLoading(true);
      await axios.post('https://mytshop.runasp.net/api/Account/register', data);
      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 3000,
        transition: Bounce,
        theme: 'dark',
      });
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed!', {
        position: 'top-right',
        autoClose: 3000,
        transition: Bounce,
        theme: 'dark',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <Box sx={{ minHeight: '100vh',
 }}>
      <Grid
        container
        sx={{
          minHeight: '100vh',
          //overflowX:'hidden',
         // background: 'linear-gradient(180deg, #6862A0 0%, #37345A 100%)',
          mt: 2,
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}
      >
        {/* Left Image Section */}
        <Grid
          item
           size={{ xs: 12, md: 12,lg:6}}
          
          sx={{
            backgroundImage: `url(${myImagereg})`,
            backgroundSize: 'cover',
            backgroundRepeat:"no-repeat",
            backgroundPosition: '10%',
           // objectFit:'contain',
           display:{
              xs: 'none', 
              sm: 'none', 
              md: 'none', 
              lg: 'block', 
              xl: 'block', 
           },
        
           // minHeight: { xs: '40vh', md: '80vh' },
          }}
        >
         
        </Grid>

        {/* Right Form Section */}
        <Grid
          item
           size={{ xs: 12, md: 12,lg:6, color:"white"}}
          sx={{ 
              padding: '0px 20px', 
          
                boxShadow: 3,
           }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(registerUser)}
             sx={{ width: '100%', }}
          >
            <Typography
              variant="h4"
              mb={3}
              fontWeight="bold"
              textAlign="center"
            >
             Create New Account
            </Typography>
            
            <Typography
              variant="p"
              mb={3}
              fontWeight="bold"
              textAlign="center"
            >
             Join us to track orders, save favorites, and get special offers.
            </Typography>

            {/* Social Buttons */}
            <Box
              sx={{
                display: 'flex',
                  flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',    
    },
                justifyContent: 'space-between',
                gap: 1,
                mb: 1,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                sx={{
                  flex: 1,
                  color: '#3b3b66',
                  borderColor: '#3b3b66',
                  textTransform: 'none',
                }}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  flex: 1,
                  color: '#3b3b66',
                  borderColor: '#3b3b66',
                  textTransform: 'none',
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{
                  flex: 1,
                  color: '#3b3b66',
                  borderColor: '#3b3b66',
                  textTransform: 'none',
                }}
              >
                AppleID
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography sx={{ mx: 2, color: '#999' }}>or</Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* First Name */}
            <TextField
              {...register('firstName', { required: 'First name is required' })}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            {/* Last Name */}
            <TextField
              {...register('lastName', { required: 'Last name is required' })}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            {/* Username */}
            <TextField
              {...register('userName', { required: 'Username is required' })}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email */}
            <TextField
              {...register('email', { required: 'Email is required' })}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              {...register('password', { required: 'Password is required' })}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              {...register('confirmPassword', { required: 'Confirm password is required' })}
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            {/* Birth Date */}
            <TextField
              {...register('birthOfDate')}
              label="Birth Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </Button>

            {/* Link to Login */}
            <Typography textAlign="center" mt={2}>
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#3b3b66' }}>
                Login here.
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
