import { AppBar, Toolbar, Typography, IconButton, Box, Button, Avatar, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import useLoginState from '../hooks/useLoginState';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { getUserData } = useLoginState();
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = getUserData();
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1}}>
          Лабораторные работы
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        
        {isLoggedIn && (
          <Box sx={{ ml: 2 }}>
            <IconButton 
              onClick={handleMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {userData?.name ? userData.name[0].toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>
                {userData?.email}
              </MenuItem>
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;