import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Этот код выполняется при монтировании компонента
    console.log('Timer component mounted');
    
    // Создаем интервал для обновления счетчика каждую секунду
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    
    // Функция очистки выполняется при размонтировании компонента
    return () => {
      console.log('Timer component unmounted');
      clearInterval(interval);
    };
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании
  
  return (
    <Box sx={{ my: 2 }}>
      <Typography>
        Время на странице: {seconds} секунд
      </Typography>
    </Box>
  );
}

export default Timer;