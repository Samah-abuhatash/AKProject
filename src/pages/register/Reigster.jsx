import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import style from './register.module.css';

// أيقونات MUI
import { AccountCircle, Email, Lock, CalendarToday, Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
  const { register, handleSubmit } = useForm();

  const registeruser =  async(value) => {
    const response= await axios.post(`https://mytshop.runasp.net/api/Account/register`,value);
    console.log(response);
  };

  return (
    <Box
      component="form"
      className={style.formContainer}
      onSubmit={handleSubmit(registeruser)}
    >
      <TextField
        {...register('firstName')}
        label="First Name"
        type="text"
        fullWidth
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('lastName')}
        label="Last Name"
        type="text"
        fullWidth
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('userName')}
        label="Username"
        type="text"
        fullWidth
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
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
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('confirmPassword')}
        label="Confirm Password"
        type="password"
        fullWidth
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('birthOfDate')}
        label="Birth Date"
        type="date"
        fullWidth
        sx={{ m: 1 }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarToday />
            </InputAdornment>
          ),
        }}
      />

      <Button variant="outlined" type="submit">
        Register
      </Button>
    </Box>
  );
}

export default Register;
