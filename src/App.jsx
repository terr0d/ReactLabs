import { Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from "./components/Header"; 
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Feedback from "./components/Feedback";
import ProfileEdit from "./components/ProfileEdit";
import AdminLayout from "./components/Admin/AdminLayout";
import labsData from "./data/labs.json";
import { ThemeProvider } from './ThemeContext';
import store from './store/index.js';
import { logoutUser, fetchUserProfile } from './store/authSlice';
import { useTheme, useMediaQuery } from "@mui/material";

function AppContent() {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Закрыть меню при изменении размера экрана на мобильный
  useEffect(() => {
    if (isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  // Загрузка профиля пользователя после успешного входа
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      dispatch(fetchUserProfile());
    }
  }, [isLoggedIn, user?.email, dispatch]);
  
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);
  
  const switchToRegister = useCallback(() => {
    setShowLoginForm(false);
  }, []);
  
  const switchToLogin = useCallback(() => {
    setShowLoginForm(true);
  }, []);
  
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);
  
  // Проверка, является ли пользователь администратором
  const isAdmin = user?.role === 'admin';
  
  return (
    <Router>
      <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout} 
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          isAdmin={isAdmin}
        />
        
        <Box sx={{ 
          display: 'flex', 
          flex: 1,
          marginLeft: !isMobile && menuOpen ? '240px' : 0,
          transition: theme => theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}>
          {isLoggedIn && (
            <Menu 
              labs={labsData.labs} 
              open={menuOpen} 
              setOpen={setMenuOpen} 
              isAdmin={isAdmin}
            />
          )}
          
          <Container sx={{ 
            py: 3, 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column'
          }}>
            {isLoggedIn ? (
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/lab/:id" element={<Content />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/profile" element={<ProfileEdit />} />
                {isAdmin && <Route path="/admin/*" element={<AdminLayout />} />}
              </Routes>
            ) : (
              showLoginForm ? (
                <LoginForm onSwitchToRegister={switchToRegister} />
              ) : (
                <RegisterForm onSwitchToLogin={switchToLogin} />
              )
            )}
          </Container>
        </Box>
        
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
