import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import style from './login.module.css';

import { AccountCircle, Lock, Email } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { toast,Slide , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* mode:'onChange'} هاي معناها انا اجواها اعطني ايرور &&blur يس اخلص اعطني ايرور */
/*valdtion  {...register('email', { required: 'Email is required' })}
ايرور يظهر ممكن طريقتين :
a-        helperText={errors.email?.message}
b- {errors.email?<p>
        Email is required
      </p>:null}

 */
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({mode:'onChange'} );
  const[loading ,setloading]=useState(false);
const navgate=useNavigate();
  const loginUser = async (value) => {
    try {
      setloading(true);
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/Login`, value);
      console.log("Login successful:", response.data);
         localStorage.setItem("userToken", response.data.token);
         navgate('/');
toast.success('Login successful:', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error('Login failed:', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});
    }
    finally{
      setloading(false);
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
       
      <Button variant="outlined" type="submit" disabled={loading}>
        {loading ? 'loading ...' :'login'} 
      
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
