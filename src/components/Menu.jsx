import { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Paper, 
  Collapse, 
} from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Menu({ labs }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Paper sx={{ width: 240, marginRight: 2, padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ flexGrow: 1 }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Лабораторные работы" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {labs.map((lab) => (
              <ListItem key={lab.id} disablePadding>
                <ListItemButton component={Link} to={`/lab/${lab.id}`} sx={{ pl: 4 }}>
                  <ListItemText primary={lab.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Paper>
  );
}

export default Menu;