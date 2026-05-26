import React, { useState } from 'react';
import EstadoVehiculo from './EstadoVehiculo';
import { eliminarVehiculo, alquilarVehiculo } from '../services/api';

const TarjetaVehiculo = ({ vehiculo, onAlquilar, onEliminar, onError }) => {
    const [mostrarFormAlquilar, setMostrarFormAlquilar] = useState(false);
    const [nombreCliente, setNombreCliente] = useState('');

    const cerrarForm = () => {
        setMostrarFormAlquilar(false);
        setNombreCliente('');
    };

    const handleConfirmarAlquiler = () => {
        if (!nombreCliente.trim()) return;
        alquilarVehiculo({ vehiculoId: vehiculo.id, nombreCliente: nombreCliente.trim() })
            .then(() => {
                cerrarForm();
                onAlquilar && onAlquilar(vehiculo.id);
            })
            .catch(() => onError && onError('Error al registrar el alquiler'));
    };

    const handleEliminar = () => {
        if (!window.confirm(`¿Eliminar el vehículo ${vehiculo.marca} ${vehiculo.modelo}?`)) {
            return;
        }
        eliminarVehiculo(vehiculo.id)
            .then(() => onEliminar && onEliminar(vehiculo.id))
            .catch(() => onError && onError('Error al eliminar el vehículo'));
    };

    return (
        <div className="vehiculo-card">
            <div className="vehiculo-card-header">
                <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
                <EstadoVehiculo disponible={vehiculo.disponible} />
            </div>
            <div className="vehiculo-card-body">
                <p><strong>ID:</strong> {vehiculo.id}</p>
                <p><strong>Placa:</strong> {vehiculo.placa}</p>
            </div>

            {mostrarFormAlquilar ? (
                <div className="alquilar-form">
                    <input
                        type="text"
                        placeholder="Nombre del cliente"
                        value={nombreCliente}
                        onChange={e => setNombreCliente(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleConfirmarAlquiler()}
                        autoFocus
                    />
                    <div className="alquilar-form-acciones">
                        <button
                            className="boton-alquilar"
                            onClick={handleConfirmarAlquiler}
                            disabled={!nombreCliente.trim()}
                        >
                            Confirmar
                        </button>
                        <button className="boton-cancelar-form" onClick={cerrarForm}>
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (onAlquilar || onEliminar) && (
                <div className="vehiculo-card-footer">
                    {onAlquilar && vehiculo.disponible && (
                        <button
                            className="boton-alquilar"
                            onClick={() => setMostrarFormAlquilar(true)}
                        >
                            Alquilar
                        </button>
                    )}
                    {onEliminar && (
                        <button className="boton-eliminar" onClick={handleEliminar}>
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TarjetaVehiculo;
