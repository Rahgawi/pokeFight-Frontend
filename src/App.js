import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import { Routes, Route } from 'react-router-dom';
import Pokefight from './pages/Pokefight';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/pokemon" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/pokemon/pokefight" element={<Pokefight />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
