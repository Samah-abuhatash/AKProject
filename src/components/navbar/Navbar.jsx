import React, { useContext, useState } from "react";
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
  ListItemButton,
  ListItemText,
  Divider,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeContextCustom } from "../context/Themecontext";
import { Cartcontext } from "../context/Cartcontext";
import { Link, useNavigate } from "react-router-dom";
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

const sidebarSettings = [
  { name: "Info", path: "/profile/info" },
  { name: "Change Password", path: "/profile/change-password" },
  { name: "Orders", path: "/profile/orders" },
  { name: "Logout", action: "logout" },
];

export default function Navbar() {
  const { cartitem } = useContext(Cartcontext);
  const { mode, setMode, toggleTheme } = useContext(ThemeContextCustom);
  const isLogin = Boolean(localStorage.getItem("userToken"));
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    setIsSidebarOpen(false);
  };

  const handleSidebarNavigation = (item) => {
    if (item.action === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
      setIsSidebarOpen(false);
    }
  };

  const pages = isLogin ? authPages : guestPages;

  const handleThemeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#4FC4CA" }}>
        <Toolbar>
          {/* شعار الديسكتوب */}
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

          {/* أيقونة قائمة الموبايل */}
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

              {/* زر تبديل الثيم داخل الموبايل */}
              <MenuItem
                onClick={() => {
                  toggleTheme();
                  handleCloseNavMenu();
                }}
                sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
              >
                <Typography>
                  {mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                </Typography>
              </MenuItem>

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

          {/* شعار الموبايل */}
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

          {/* أزرار الديسكتوب + اختيار الثيم + دروار المستخدم */}
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

            {/* اختيار الثيم في الديسكتوب */}
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel sx={{ color: "white" }} id="theme-select-label">
                Theme
              </InputLabel>
              <Select
                labelId="theme-select-label"
                value={mode}
                label="Theme"
                onChange={handleThemeChange}
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  ".MuiSvgIcon-root": { color: "white" },
                }}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>

            {/* أيقونة دروار المستخدم */}
            {isLogin && (
              <Tooltip title="User Settings">
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

      {/* درّوار المستخدم */}
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
          {sidebarSettings.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => handleSidebarNavigation(item)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
