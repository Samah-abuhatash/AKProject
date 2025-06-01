import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React from 'react';
// أيقونات MUI
import { AccountCircle, Email, Lock, CalendarToday, Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import NumbersIcon from '@mui/icons-material/Numbers';
function Restcode() {
  const { register, handleSubmit } = useForm();

  const sendcoduser =  async(value) => {
    try{
    const response= await axios.post(`http//:mytshop.runasp.net/api/Account/SendCode`,value);
    
    console.log("sucesscode");
  }
    catch(e){
      console.log(console.e);
      
    }
    
  };

  return (
    <Box
      component="form"
     
      onSubmit={handleSubmit(sendcoduser)}
    >
     


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
        {...register('code')}
        label="code"
        type="text"
        fullWidth
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NumbersIcon/>
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
        {...register('ConfirmPassword')}
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


      <Button variant="outlined" type="submit">
      sentcode
      </Button>
    </Box>
  );
}

export default Restcode;
