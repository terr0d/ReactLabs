import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

function Counter() {
  // Использование useState для хранения значения счетчика
  const [count, setCount] = useState(0);
  
  // Функции для увеличения и уменьшения счетчика
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
      <Button variant="contained" onClick={decrement}>-</Button>
      <Typography variant="h6">{count}</Typography>
      <Button variant="contained" onClick={increment}>+</Button>
    </Box>
  );
}

export default Counter;