import { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Collapse, 
  Drawer,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Menu({ labs, open, setOpen }) {
  const [expandLabs, setExpandLabs] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    setExpandLabs(!expandLabs);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuContent = (
    <List sx={{ width: 240, overflowX: 'hidden' }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText 
          primary="Лабораторные работы" 
          primaryTypographyProps={{ 
            noWrap: true,
            textOverflow: 'ellipsis'
          }}
        />
        {expandLabs ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={expandLabs} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {labs.map((lab) => (
            <ListItem key={lab.id} disablePadding>
              <ListItemButton 
                component={Link} 
                to={`/lab/${lab.id}`} 
                sx={{ pl: 4 }} 
                onClick={isMobile ? handleClose : undefined}
              >
                <ListItemText 
                  primary={lab.title} 
                  primaryTypographyProps={{ 
                    noWrap: true,
                    textOverflow: 'ellipsis'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      variant={isMobile ? "temporary" : "persistent"}
      sx={{
        width: open ? 240 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          paddingTop: '64px',
          height: 'auto',
          bottom: 'auto',
          position: 'fixed',
          overflowX: 'hidden'
        },
      }}
    >
      {menuContent}
    </Drawer>
  );
}

export default Menu;