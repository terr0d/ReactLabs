import { Box, Typography, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        padding: 2, 
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
        color: theme.palette.text.primary,
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