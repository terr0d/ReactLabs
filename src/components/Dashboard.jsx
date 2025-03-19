import { useState } from 'react';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import Counter from './Counter';
import Timer from './Timer';
import ReduxCounter from './ReduxCounter';

function Dashboard() {
  const [showTimer, setShowTimer] = useState(true);
  
  return (
    <Paper sx={{ padding: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>useState, useEffect и Redux</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="subtitle1">Локальный счетчик:</Typography>
          <Counter />
        </Box>
        
        <Box>
          <Typography variant="subtitle1">Redux счетчик:</Typography>
          <ReduxCounter />
        </Box>
        
        <Box>
          <Typography variant="subtitle1">Таймер:</Typography>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => setShowTimer(!showTimer)}
            sx={{ mb: 1 }}
          >
            {showTimer ? "Скрыть таймер (размонтировать)" : "Показать таймер (монтировать)"}
          </Button>
          
          {showTimer && <Timer />}
        </Box>
      </Box>
    </Paper>
  );
}

export default Dashboard;