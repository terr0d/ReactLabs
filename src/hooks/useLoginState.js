import { useState, useEffect } from 'react';

function useLoginState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Проверяем localStorage при инициализации
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  // Функция для логина
  const login = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
  };
  
  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };
  
  // Получение данных пользователя
  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };
  
  return { isLoggedIn, login, logout, getUserData };
}

export default useLoginState;