
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';


import { AccountCircle, Lock, Email } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

function Forgetpassworld() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navgate=useNavigate();

  const forgetpassworldUser = async (value) => {
    try {
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/ForgotPassword`, value);
    console.log(response);
      if(response.status==200){
        navgate("/restcode");

      }
      console.log("forgetpassworld sent   successful:", response.data);
    } catch (error) {
      console.error("forgetpassworld sent failed:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(forgetpassworldUser)}
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
    
      <Button variant="outlined" type="submit">
        reset
      </Button>
      
    </Box>
  );
}

export default Forgetpassworld;
