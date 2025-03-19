import { Button, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store';

function ReduxCounter() {
  // Получаем значение счетчика из Redux store
  const count = useSelector(state => state.counter);
  // Получаем dispatch для отправки действий
  const dispatch = useDispatch();
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
      <Button variant="contained" onClick={() => dispatch(decrement())}>-</Button>
      <Typography variant="h6">{count}</Typography>
      <Button variant="contained" onClick={() => dispatch(increment())}>+</Button>
    </Box>
  );
}

export default ReduxCounter;