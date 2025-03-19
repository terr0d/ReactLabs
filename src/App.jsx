import { Container } from "@mui/material";
import Header from "./components/Header"; 
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import labsData from "./data/labs.json";
import { createRoot } from 'react-dom/client';

// Функция для получения выбранной лабораторной работы из хэша URL
function getSelectedLab() {
  const hash = location.hash;
  const labId = hash ? parseInt(hash.replace('#lab', '')) : null;
  return labId ? labsData.labs.find(lab => lab.id === labId) : null;
}

// Функция для рендеринга приложения
function renderApp() {
  const root = createRoot(document.getElementById('root'));
  const selectedLab = getSelectedLab();
  
  root.render(
    <div className="app">
      <Header />
      <Container sx={{ display: 'flex', minHeight: 'calc(100vh - 130px)' }}>
        <Menu labs={labsData.labs} />
        <Content selectedLab={selectedLab} />
      </Container>
      <Footer />
    </div>
  );
}

// Инициализация приложения
function App() {
  // При первом рендере добавляем обработчик события hashchange
  window.addEventListener('hashchange', renderApp);
  renderApp(); 
  
  return null;
}

export default App;