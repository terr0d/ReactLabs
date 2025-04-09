import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/counterSlice';

const CounterButton = ({ variant = 'contained', color = 'primary' }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  
  const handleIncrement = () => {
    dispatch(increment());
  };
  
  const handleDecrement = () => {
    dispatch(decrement());
  };
  
  return (
    <div>
      <div data-testid="counter-value">Счетчик: {count}</div>
      <Button 
        variant={variant} 
        color={color} 
        onClick={handleIncrement}
        data-testid="increment-button"
      >
        Увеличить
      </Button>
      <Button 
        variant={variant} 
        color="secondary" 
        onClick={handleDecrement}
        data-testid="decrement-button"
        sx={{ ml: 1 }}
      >
        Уменьшить
      </Button>
    </div>
  );
};

export default CounterButton;