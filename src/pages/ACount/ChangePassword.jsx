import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('No token found, please login first.');
        setLoading(false);
        return;
      }

      await axios.patch(
        'https://mytshop.runasp.net/api/Account/ChangePassword',
        {
          OldPassword: oldPassword,
          NewPassword: newPassword,
          ConfirmNewPassword: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to change password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
      component={Paper}
    >
      <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
        Change Password
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
        />

        <TextField
          label="New Password"
          type="password"
          fullWidth
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          required
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Change Password'}
        </Button>
      </form>

     
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}

export default ChangePassword;
