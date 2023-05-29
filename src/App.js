import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { Route,Routes } from 'react-router-dom';
import Pokemon from './pages/Pokemon';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/pokemon' element= {<Home />} />
        <Route path='/pokemon/:id' element= {<Pokemon />} />
      
      
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
