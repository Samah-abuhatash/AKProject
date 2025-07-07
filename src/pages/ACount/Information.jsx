import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';

function Information() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          setError('No token found, please login first.');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://mytshop.runasp.net/api/Account/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Typography color="error" align="center" mt={5}>
      {error}
    </Typography>
  );

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        User Information
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar sx={{ width: 80, height: 80 }}>
          <PersonIcon sx={{ fontSize: 60 }} />
        </Avatar>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon color="primary" />
          <Typography fontWeight={600}>Username:</Typography>
        </Box>
        <Typography ml={4}>{userData.userName}</Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <EmailIcon color="primary" />
          <Typography fontWeight={600}>Email:</Typography>
        </Box>
        <Typography ml={4}>{userData.email}</Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <CakeIcon color="primary" />
          <Typography fontWeight={600}>Birth Date:</Typography>
        </Box>
        <Typography ml={4}>
          {new Date(userData.birthOfDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <WcIcon color="primary" />
          <Typography fontWeight={600}>Gender:</Typography>
        </Box>
        <Typography ml={4}>{userData.gender}</Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon color="primary" />
          <Typography fontWeight={600}>First Name:</Typography>
        </Box>
        <Typography ml={4}>{userData.firstName}</Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon color="primary" />
          <Typography fontWeight={600}>Last Name:</Typography>
        </Box>
        <Typography ml={4}>{userData.lastName}</Typography>
      </Stack>
    </Box>
  );
}

export default Information;
