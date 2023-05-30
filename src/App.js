import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/pokemon" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
