import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        padding: 2, 
        backgroundColor: '#f5f5f5',
        marginTop: 'auto'
      }}
    >
      <Typography align="center">
        Галенко Михаил, 4.209-1
      </Typography>
    </Box>
  );
}

export default Footer;