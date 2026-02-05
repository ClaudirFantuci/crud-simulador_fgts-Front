import './App.css';
import { Routes, Route } from 'react-router-dom';
import FormSaqueAniversario from './pages/FormSaqueAniversario/FormSaqueAniversario';
import ListaSimulacoes from './pages/ListaSimulacoes/ListaSimulacoes';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validRoutes = ['/', '/simulacoes'];
    if (!validRoutes.includes(location.pathname)) {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<FormSaqueAniversario />} />
          <Route path="/simulacoes" element={<ListaSimulacoes />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;