import { createContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Создаем контекст
export const ThemeContext = createContext();

// Создаем темы
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Создаем провайдер
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  // Выбираем текущую тему
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}