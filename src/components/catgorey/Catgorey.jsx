import React, { useRef } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PhoneIphone,
  LaptopMac,
  Face,
  MenuBook,
  SportsSoccer,
  Category,
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import Usefetch from '../../hook/Usefetch';
import Loader from '../shared/Loader';

const getCategoryIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('mobile')) return <PhoneIphone fontSize="large" color="primary" />;
  if (lowerName.includes('laptop')) return <LaptopMac fontSize="large" color="primary" />;
  if (lowerName.includes('beauty')) return <Face fontSize="large" color="secondary" />;
  if (lowerName.includes('book')) return <MenuBook fontSize="large" color="action" />;
  if (lowerName.includes('sport')) return <SportsSoccer fontSize="large" color="success" />;
  return <Category fontSize="large" color="disabled" />;
};

function Catgorey() {
  const { Data, Erorr, Isloader } = Usefetch(`https://mytshop.runasp.net/api/categories`);

  const scrollRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (Erorr) return <p>Error: {Erorr.message}</p>;
  if (Isloader) return <Loader />;

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    if (isSmallScreen) {
      scrollRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    if (isSmallScreen) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        🗂️ Browse Categories
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
        <Button variant="outlined" onClick={scrollPrev} startIcon={<ArrowBackIos />}>
          Prev
        </Button>
        <Button variant="outlined" onClick={scrollNext} endIcon={<ArrowForwardIos />}>
          Next
        </Button>
      </Stack>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          overflowX: { xs: 'hidden', sm: 'auto' },
          overflowY: { xs: 'auto', sm: 'hidden' },
          gap: 2,
          py: 2,
          maxHeight: { xs: 400, sm: 'none' },
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {Data.map((category) => (
          <Card
            key={category.id}
            sx={{
              minWidth: 280,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              boxShadow: 6,
              p: 2,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 10,
              },
              width: { xs: '100%', sm: 280 },
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              {getCategoryIcon(category.name)}
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {category.name}
              </Typography>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Discover our best products under {category.name}. Quality guaranteed.
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default Catgorey;
