import { Box, Typography, useTheme, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function Footer({ sx = {} }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        padding: 2, 
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
        color: theme.palette.text.primary,
        width: '100%',
        ...sx
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        <Box sx={{ flex: 1, mb: isMobile ? 1 : 0 }}>
          <Typography variant="body2">
            © 2025, Лабораторные работы
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center',
            gap: 2,
            mb: isMobile ? 1 : 0
          }}
        >
          <Tooltip title="Обратная связь">
            <IconButton 
              component={RouterLink} 
              to="/feedback" 
              color="primary"
              size="small"
            >
              <FeedbackIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="GitHub">
            <IconButton 
              component="a" 
              href="https://github.com/terr0d/ReactLabs" 
              target="_blank"
              color="primary"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Написать email">
            <IconButton 
              component="a" 
              href="mailto:terrod29@gmail.com"
              color="primary"
              size="small"
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="body2">
            Галенко Михаил, 4.209-1
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;