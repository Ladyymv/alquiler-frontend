import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarraNavegacion from './components/BarraNavegacion';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListaVehiculos from './pages/ListaVehiculos';
import PanelAdmin from './pages/PanelAdmin';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <BarraNavegacion />
        <div className="contenido">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehiculos" element={<ListaVehiculos />} />
            <Route path="/admin" element={<PanelAdmin />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
