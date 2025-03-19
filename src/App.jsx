import { Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from "./components/Header"; 
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import labsData from "./data/labs.json";
import { ThemeProvider } from './ThemeContext';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="app">
            <Header />
            <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 130px)' }}>
              <Dashboard />
              <Box sx={{ display: 'flex', flex: 1 }}>
                <Menu labs={labsData.labs} />
                <Routes>
                  <Route path="/" element={<Content />} />
                  <Route path="/lab/:id" element={<Content />} />
                </Routes>
              </Box>
            </Container>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;