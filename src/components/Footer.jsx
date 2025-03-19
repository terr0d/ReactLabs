import { Box, Typography, useTheme, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%'
        }}
      >
        {/* Пустой блок для баланса */}
        <Box sx={{ flex: 1 }}></Box>
        
        {/* Центральный блок с ссылкой */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <MuiLink 
            component={RouterLink} 
            to="/feedback" 
            color="primary" 
            sx={{ 
              textDecoration: 'none', 
              '&:hover': { textDecoration: 'underline' },
              fontSize: '1rem'
            }}
          >
            Обратная связь
          </MuiLink>
        </Box>
        
        {/* Правый блок с текстом */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography>
            Галенко Михаил, 4.209-1
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;