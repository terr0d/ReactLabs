import { Box, Typography, Paper, Container, Stack, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={2} sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            О себе
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h6">
                Галенко Михаил
              </Typography>
              <Typography color="text.secondary">
                Группа 4.209-1
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/terr0d"
              target="_blank"
              rel="noopener"
              sx={{ whiteSpace: 'nowrap' }}
            >
              GitHub профиль
            </Button>
          </Stack>

          <Typography variant="body1">
            Это страница "О себе".
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutPage;