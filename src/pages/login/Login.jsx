import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import style from './login.module.css';

import { AccountCircle, Lock, Email } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const loginUser = async (value) => {
    try {
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/Login`, value);
      console.log("Login successful:", response.data);
         localStorage.setItem("userToken", response.data.token);

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      component="form"
      className={style.formContainer}
      onSubmit={handleSubmit(loginUser)}
    >
      <TextField
        {...register('email', { required: 'Email is required' })}
        label="Email"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        {...register('password', { required: 'Password is required' })}
        label="Password"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined" type="submit">
        Login
      </Button>
      <Typography variant="body2">
              <Link
                component={Link} 
                to="/forgetpassworld"
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Forgot Password
              </Link>
            </Typography>
    </Box>
  );
}

export default Login;
