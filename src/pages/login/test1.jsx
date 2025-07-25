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

function Forgetpassworld() {
  

  const [loading, setLoading] = useState(false);
const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const forgetpassworldUser = async (value) => {
    try {
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/ForgotPassword`, value);
      if (response.status === 200) {
        toast.success("Recovery code sent successfully!", {
          position: 'top-right',
          autoClose: 3000,
          transition: Bounce,
          theme: 'dark',
        });
        navigate("/restcode");
      }
    } catch (error) {
      toast.error("Failed to send recovery code!", {
        position: 'top-right',
        autoClose: 3000,
        transition: Bounce,
        theme: 'dark',
      });
    }
    finally {
      setLoading(false);
    }
  };

  
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
                    backgroundImage: `url(${})`,
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
                onSubmit={handleSubmit(forgetpassworldUser)}
                sx={{
                  maxWidth: 400,
                  mx: 'auto',
                  mt: 8,
                  p: 4,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 3,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
                  Step 1: Forget Password
                </Typography>
          
                <Typography variant="body1" mb={3} textAlign="center">
                  Please enter your email and we’ll send you a recovery code.
                </Typography>
          
                <TextField
                  {...register('email', { required: 'Email is required' })}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
          
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#4a3f87', '&:hover': { backgroundColor: '#392f6e' } }}
                >
                  Send Code
                </Button>
          
                <Typography variant="body2" mt={3} textAlign="center">
                  Remembered your password?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#4a3f87' }}>
                    Login here
                  </Link>
                </Typography>
              </Box>
        </Grid>
      </Grid>
    </Box>
  );


export default Forgetpassworld;
