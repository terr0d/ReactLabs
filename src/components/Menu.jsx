import { List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';

function Menu({ labs }) {
  return (
    <Paper sx={{ width: 240, marginRight: 2, padding: 2 }}>
      <List>
        {labs.map((lab) => (
          <ListItem key={lab.id} disablePadding>
            <ListItemButton href={`#lab${lab.id}`}>
              <ListItemText primary={lab.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Menu;