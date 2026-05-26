import React from 'react';
import { Link } from 'react-router-dom';

const BarraNavegacion = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                🚗 Alquiler de Vehículos
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/vehiculos">Vehículos</Link></li>
                <li><Link to="/admin">Administración</Link></li>
            </ul>
        </nav>
    );
};

export default BarraNavegacion;