import './App.css';
import { Routes, Route } from 'react-router-dom';
import FormSaqueAniversario from './pages/FormSaqueAniversario/FormSaqueAniversario';
import ListaSimulacoes from './pages/ListaSimulacoes/ListaSimulacoes';

function App() {
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