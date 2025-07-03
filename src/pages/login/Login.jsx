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
import { Lock, Email } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import myImagelogin from '../../assets/images/loginbackground/login.png';
//import logo from '../../assets/images/logo/logo.png';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (value) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://mytshop.runasp.net/api/Account/Login`,
        value
      );
      localStorage.setItem('userToken', response.data.token);
      navigate('/');
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        transition: Bounce,
        theme: 'dark',
      });
    } catch (error) {
      toast.error('Login failed!', {
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F2F2F2' }}>
      <Grid
        container
       
        sx={{
          minHeight: '100vh',
          mt: 2,
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}
      >
        {/* Left Image Section */}
        <Grid
          item
          size={{xs: 12, md: 12,lg:6 }}
          sx={{
            backgroundImage: `url(${myImagelogin})`,
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
        
           
          }}
        >
      
        </Grid>

        {/* Right Form Section */}
        <Grid
          item
          size={{xs: 12, md: 12,lg:6 }}
          sx={{ backgroundColor: 'white',
                 padding: '0px 20px',  // أو marginTop, marginRight, marginBottom
          boxShadow: 3,
           }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(loginUser)}
            sx={{ width: '100%', backgroundColor: 'white'}}
          >
            <Typography
              variant="h4"
              mb={3}
              fontWeight="bold"
              textAlign="center"
            >
              Login
            </Typography>
             <Typography
              variant="h5"
              mb={3}
             
              textAlign="center"
            >
              Good to see you again!
            </Typography>

            {/* Social Login Buttons */}
           
            <Box
  sx={{
     display: 'flex',
                  flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',    
    },
                justifyContent: 'space-between',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
  }}
>
  <Button
    variant="outlined"
    startIcon={<FacebookIcon />}
    sx={{
      minWidth: 120,
      color: '#3b3b66',
      borderColor: '#3b3b66',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        borderColor: '#3b3b66',
      },
    }}
  >
    Facebook
  </Button>

  <Button
    variant="outlined"
    startIcon={<GoogleIcon />}
    sx={{
      minWidth: 120,
      color: '#3b3b66',
      borderColor: '#3b3b66',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        borderColor: '#3b3b66',
      },
    }}
  >
    Google
  </Button>

  <Button
    variant="outlined"
    startIcon={<AppleIcon />}
    sx={{
      minWidth: 120,
      color: '#3b3b66',
      borderColor: '#3b3b66',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        borderColor: '#3b3b66',
      },
    }}
  >
    AppleID
  </Button>
</Box>


            {/* Divider */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                mb: 3,
                mt: 3,
              }}
            >
              <Divider sx={{ flex: 1 }} />
              <Typography sx={{ mx: 2, color: '#999' }}>or</Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Email Input */}
            <TextField
              {...register('email', { required: 'Email is required' })}
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Input */}
            <TextField
              {...register('password', { required: 'Password is required' })}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
              {/* Forgot Password */}
            <Typography textAlign="center" mt={2}>
              <Link to="/forgetpassworld" style={{ textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </Typography>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <Typography textAlign="center" mt={2}>
                         Don’t Have an Account?{' '}
                          <Link to="/register" style={{ textDecoration: 'none', color: '#3b3b66' }}>
                            Create Account
                          </Link>
                        </Typography>

          
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
