import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Cartcontext } from '../context/Cartcontext'; 
import { DarkMode, LightMode } from '@mui/icons-material';
import { ThemeContextCustom } from '../context/Themecontext';
import logo from '../../assets/images/logo/logo1.png';

const pagesGuest = ['login', 'register'];
const pagesAuth = ['cart'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navbar() {
  const { cartitem } = useContext(Cartcontext);
  const { toggleTheme, mode } = useContext(ThemeContextCustom);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isLogin = Boolean(localStorage.getItem('userToken'));
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4FC4CA' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo Desktop */}
          <Box
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: 40, filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
            />
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {(isLogin ? [...pagesAuth, 'logout'] : pagesGuest).map((page) => {
                if (page === 'logout') {
                  return (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleLogout();
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  );
                }
                const path = `/${page}`;
                return (
                  <MenuItem key={page} component={Link} to={path} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {page === 'cart' ? `Cart (${cartitem})` : page.charAt(0).toUpperCase() + page.slice(1)}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Logo Mobile */}
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: 40, filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
            />
          </Box>

          {/* Desktop Buttons (Login/Register or Cart/Logout) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
            {!isLogin ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: '#4FC4CA',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#e0f7f9' },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'white', color: '#4FC4CA' },
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/cart"
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white', textTransform: 'none', fontWeight: 'bold' }}
                >
                  Cart ({cartitem})
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white', textTransform: 'none', fontWeight: 'bold' }}
                >
                  Logout
                </Button>
              </>
            )}

            {/* Theme Toggle */}
            <Tooltip title="Toggle Theme">
              <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Tooltip>

            {/* User Avatar and Menu */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: '45px' }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === 'Logout') handleLogout();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
