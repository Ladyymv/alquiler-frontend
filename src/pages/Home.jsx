import React from 'react';
import { Link } from 'react-router-dom';
import useVehiculos from '../hooks/useVehiculos';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';

const Home = () => {
    const { vehiculos, loading, error } = useVehiculos();

    const total = vehiculos.length;
    const disponibles = vehiculos.filter(v => v.disponible).length;
    const alquilados = total - disponibles;

    return (
        <div className="dashboard">
            <section className="dashboard-header">
                <h1>Inicio</h1>
                <p className="dashboard-subtitulo">
                    Vista general de la flota y accesos rápidos a las operaciones del día.
                </p>
            </section>

            {error && <MensajeError mensaje={error} />}
            {loading ? (
                <Cargando />
            ) : (
                <section className="metricas">
                    <div className="metrica metrica-total">
                        <span className="metrica-label">Total de vehículos</span>
                        <span className="metrica-valor">{total}</span>
                    </div>
                    <div className="metrica metrica-disponibles">
                        <span className="metrica-label">Disponibles</span>
                        <span className="metrica-valor">{disponibles}</span>
                    </div>
                    <div className="metrica metrica-alquilados">
                        <span className="metrica-label">En alquiler</span>
                        <span className="metrica-valor">{alquilados}</span>
                    </div>
                </section>
            )}

            <section className="accesos-rapidos">
                <h2>Accesos rápidos</h2>
                <div className="accesos-grid">
                    <Link to="/vehiculos" className="acceso-card">
                        <h3>Registrar alquiler</h3>
                        <p>Consulta la flota y registra un nuevo alquiler a nombre del cliente.</p>
                        <span className="acceso-cta">Ir a vehículos →</span>
                    </Link>
                    <Link to="/admin" className="acceso-card">
                        <h3>Administrar flota</h3>
                        <p>Crea, elimina vehículos y gestiona los alquileres activos.</p>
                        <span className="acceso-cta">Ir al panel admin →</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
