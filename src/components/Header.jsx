import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Avatar, Menu as MuiMenu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ isLoggedIn, onLogout, toggleMenu, menuOpen }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector(state => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width:480px)');
  
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
    <AppBar 
      position="static"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn && (
            <Tooltip title={menuOpen ? "Закрыть меню" : "Открыть меню"}>
              <IconButton 
                color="inherit" 
                edge="start" 
                sx={{ mr: 2 }} 
                onClick={toggleMenu}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
          )}
          
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              display: isExtraSmall ? 'none' : 'block'
            }}
          >
            Лабораторные работы
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Главная">
            <IconButton 
              component={Link} 
              to="/" 
              color="inherit"
              size={isExtraSmall ? "medium" : "large"}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="О себе">
            <IconButton 
              component={Link} 
              to="/about" 
              color="inherit"
              size={isExtraSmall ? "medium" : "large"}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
          
          {isLoggedIn && (
            <Tooltip title="Обратная связь">
              <IconButton 
                component={Link} 
                to="/feedback" 
                color="inherit"
                size={isExtraSmall ? "medium" : "large"}
              >
                <FeedbackIcon />
              </IconButton>
            </Tooltip>
          )}
          
          <Tooltip title={isDarkMode ? "Светлая тема" : "Темная тема"}>
            <IconButton 
              color="inherit" 
              onClick={toggleTheme}
              size={isExtraSmall ? "medium" : "large"}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          
          {isLoggedIn && (
            <Box sx={{ ml: isExtraSmall ? 0.5 : 2 }}>
              <IconButton 
                onClick={handleMenuOpen}
                size="small"
                aria-controls="profile-menu"
                aria-haspopup="true"
              >
                <Avatar sx={{ width: isExtraSmall ? 28 : 32, height: isExtraSmall ? 28 : 32 }}>
                  {user?.username ? user.username[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              <MuiMenu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  {user?.email}
                </MenuItem>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  Редактировать профиль
                </MenuItem>
                {isMobile && (
                  <>
                    <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                      <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                      Главная
                    </MenuItem>
                    <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
                      <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                      О себе
                    </MenuItem>
                    <MenuItem component={Link} to="/feedback" onClick={handleMenuClose}>
                      <FeedbackIcon fontSize="small" sx={{ mr: 1 }} />
                      Обратная связь
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </MuiMenu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;