import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Grid,
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
import myImage from '../../assets/images/loginbackground/loginphoto.png';
import  logo from '../../assets/images/logo/logo.png';

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
        <Box
      sx={{
        minHeight: '100vh',
       backgroundColor: '#F2F2F2', 

      }}
    >

    <Grid
      container
      sx={{
        minHeight: '100vh',
         background: 'linear-gradient(180deg, #6862A0 0%, #37345A 100%)',
        mt:2, 
         textShadow: '0 0 10px rgba(0,0,0,0.7)',
      }}
    >
     
      <Grid
        item
       size={{xs:6,md:6}}
       sx={{
               backgroundImage: `url(${myImage})`,
               backgroundSize: 'cover',
               minHeight: { xs: '40vh', md: '80vh' },
        
             }}
      >
       
   <img src={logo} />
      </Grid>

    
      <Grid
        item
      size={{xs:6,md:6}}
        sx={{
          backgroundColor: 'white',
         
         
        }}
      >
       
      </Grid>
    </Grid>
    </Box>
  );
}

export default Login;
