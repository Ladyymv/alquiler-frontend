import React from 'react';
import TarjetaVehiculo from '../components/TarjetaVehiculo';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import Mensajes from '../components/Mensajes';
import FiltrosVehiculos from '../components/FiltrosVehiculos';
import useVehiculos from '../hooks/useVehiculos';
import useFiltrosVehiculos from '../hooks/useFiltrosVehiculos';
import useMensajes from '../hooks/useMensajes';

const ListaVehiculos = () => {
    const { vehiculos, loading, error, refrescar } = useVehiculos();
    const filtros = useFiltrosVehiculos(vehiculos);
    const { mensajeError, setMensajeError, mensajeExito, setMensajeExito } = useMensajes();

    const handleAlquilar = () => {
        setMensajeExito('Alquiler registrado correctamente');
        refrescar();
    };

    if (loading) return <Cargando />;
    if (error) return <MensajeError mensaje={error} />;

    return (
        <div className="lista-vehiculos">
            <h1>Vehículos</h1>

            <Mensajes error={mensajeError} exito={mensajeExito} />

            <FiltrosVehiculos {...filtros} />

            {filtros.resultados.length === 0 ? (
                <p className="vacio">No se encontraron vehículos.</p>
            ) : (
                <div className="vehiculos-grid">
                    {filtros.resultados.map(v => (
                        <TarjetaVehiculo
                            key={v.id}
                            vehiculo={v}
                            onAlquilar={handleAlquilar}
                            onError={setMensajeError}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListaVehiculos;
