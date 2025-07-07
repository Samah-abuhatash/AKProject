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

const guestPages = ["Home", "Categories", "Products", "About Us", "Contact Us", "Login", "Register"];

const authPages = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/aboutus" },
  { name: "Contact Us", path: "/contactus" },
  { name: "Cart", path: "/cart" },
];

// Sidebar items بدون path
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

  // دالة للتنقل حسب اسم العنصر في السايدبار
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

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#4FC4CA" }}>
        <Toolbar>
          {/* Logo Desktop */}
          <Box component={Link} to="/" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", mr: 2 }}>
            <img src={logo} alt="Logo" style={{ height: 40, filter: "drop-shadow(0 0 3px rgba(0,0,0,0.5))" }} />
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
              {(isLogin ? authPages : guestPages).map((page, index) => (
                <MenuItem
                  key={typeof page === "string" ? page : page.name}
                  component={typeof page === "string" ? "div" : Link}
                  to={typeof page === "object" ? page.path : undefined}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    {typeof page === "object" && page.name === "Cart" ? `Cart (${cartitem})` : typeof page === "string" ? page : page.name}
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
          <Box component={Link} to="/" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "center", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 40, filter: "drop-shadow(0 0 3px rgba(0,0,0,0.5))" }} />
          </Box>

          {/* Desktop Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
            {(isLogin ? authPages : guestPages).map((page, index) => (
              <Button
                key={typeof page === "string" ? page : page.name}
                component={typeof page === "string" ? "div" : Link}
                to={typeof page === "object" ? page.path : undefined}
                sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}
              >
                {typeof page === "object" && page.name === "Cart" ? `Cart (${cartitem})` : typeof page === "string" ? page : page.name}
              </Button>
            ))}

            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{ color: "white", fontWeight: "bold", textTransform: "none", border: "1px solid white", ml: 1, "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" } }}
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
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" sx={{ width: 36, height: 36, border: "2px solid white", boxShadow: 3, cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        PaperProps={{ sx: { width: 250, bgcolor: "background.paper", boxShadow: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 2 }}>
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
