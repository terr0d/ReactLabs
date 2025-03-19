import { Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState, useCallback } from 'react';
import Header from "./components/Header"; 
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Feedback from "./components/Feedback";
import useLoginState from "./hooks/useLoginState";
import labsData from "./data/labs.json";
import { ThemeProvider } from './ThemeContext';
import store from './store';

function App() {
  const { isLoggedIn, login, logout } = useLoginState();
  const [showLoginForm, setShowLoginForm] = useState(true);
  
  const handleLogin = useCallback((data) => {
    login(data);
  }, [login]);
  
  const handleRegister = useCallback((data) => {
    login(data);
  }, [login]);
  
  const switchToRegister = useCallback(() => {
    setShowLoginForm(false);
  }, []);
  
  const switchToLogin = useCallback(() => {
    setShowLoginForm(true);
  }, []);
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header isLoggedIn={isLoggedIn} onLogout={logout} />
            <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 130px)' }}>
              {isLoggedIn ? (
                <>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <Menu labs={labsData.labs} />
                    <Routes>
                      <Route path="/" element={<Content />} />
                      <Route path="/lab/:id" element={<Content />} />
                      <Route path="/feedback" element={<Feedback />} />
                    </Routes>
                  </Box>
                </>
              ) : (
                showLoginForm ? (
                  <LoginForm 
                    onSubmit={handleLogin} 
                    onSwitchToRegister={switchToRegister} 
                  />
                ) : (
                  <RegisterForm 
                    onSubmit={handleRegister} 
                    onSwitchToLogin={switchToLogin} 
                  />
                )
              )}
            </Container>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;