import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ThemeContextCustom } from "../context/Themecontext";
import { Cartcontext } from "../context/Cartcontext";
import logo from "../../assets/images/logo/logo1.png";

const guestPages = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/aboutus" },
  { name: "Contact Us", path: "/contactus" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const authPages = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/aboutus" },
  { name: "Contact Us", path: "/contactus" },
  { name: "Cart", path: "/cart" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const { cartitem } = useContext(Cartcontext);
  const { toggleTheme, mode } = useContext(ThemeContextCustom);
  const isLogin = Boolean(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4FC4CA" }}>
      <Toolbar>
        {/* Logo Desktop */}
        <Box
          component={Link}
          to="/"
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", mr: 2 }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: 40, filter: "drop-shadow(0 0 3px rgba(0,0,0,0.5))" }}
          />
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            keepMounted
          >
            {(isLogin ? authPages : guestPages).map((page) => (
              <MenuItem
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">
                  {page.name === "Cart" ? `Cart (${cartitem})` : page.name}
                </Typography>
              </MenuItem>
            ))}

            {isLogin && (
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>

        {/* Logo Mobile */}
        <Box
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: 40, filter: "drop-shadow(0 0 3px rgba(0,0,0,0.5))" }}
          />
        </Box>

        {/* Desktop Buttons */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          {(isLogin ? authPages : guestPages).map((page) => (
            <Button
              key={page.name}
              component={Link}
              to={page.path}
              sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}
            >
              {page.name === "Cart" ? `Cart (${cartitem})` : page.name}
            </Button>
          ))}

          {isLogin && (
            <Button
              onClick={handleLogout}
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                border: "1px solid white",
                ml: 1,
              }}
            >
              Logout
            </Button>
          )}

          {/* Theme Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>

          {/* User Avatar */}
          {isLogin && (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{ mt: "45px" }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === "Logout") handleLogout();
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
