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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ThemeContextCustom } from "../context/Themecontext";
import { Cartcontext } from "../context/Cartcontext";
import logo from "../../assets/images/logo/logo1.png";

// ✅ كلا القائمتين بصيغة name + path
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

// Sidebar items
const sidebarSettings = [
  { name: "Info" },
  { name: "Change Password" },
  { name: "Orders" },
  { name: "Logout" },
];

export default function Navbar() {
  const { cartitem } = useContext(Cartcontext);
  const { toggleTheme, mode } = useContext(ThemeContextCustom);
  const isLogin = Boolean(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSidebarNavigation = (name) => {
    switch (name) {
      case "Info":
        navigate("/profile/info");
        break;
      case "Change Password":
        navigate("/profile/change-password");
        break;
      case "Orders":
        navigate("/profile/orders");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
    setIsSidebarOpen(false);
  };

  const pages = isLogin ? authPages : guestPages;

  return (
    <>
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
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              {pages.map(({ name, path }) => (
                <MenuItem key={name} component={Link} to={path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {name === "Cart" ? `Cart (${cartitem})` : name}
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
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                component={Link}
                to={path}
                sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}
              >
                {name === "Cart" ? `Cart (${cartitem})` : name}
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
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                Logout
              </Button>
            )}

            <Tooltip title="Toggle Theme">
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === "light" ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Tooltip>

            {isLogin && (
              <Tooltip title="Open settings">
                <IconButton onClick={toggleSidebar} sx={{ p: 0, ml: 1 }}>
                  <Avatar
                    alt="User"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 36,
                      height: 36,
                      border: "2px solid white",
                      boxShadow: 3,
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        PaperProps={{
          sx: { width: 250, bgcolor: "background.paper", boxShadow: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 2,
          }}
        >
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={() => setIsSidebarOpen(false)} sx={{ fontSize: 20 }}>
            ✖
          </IconButton>
        </Box>
        <Divider />
        <List>
          {sidebarSettings.map(({ name }) => (
            <ListItem button key={name} onClick={() => handleSidebarNavigation(name)}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
