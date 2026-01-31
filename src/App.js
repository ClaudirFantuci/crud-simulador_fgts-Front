import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
