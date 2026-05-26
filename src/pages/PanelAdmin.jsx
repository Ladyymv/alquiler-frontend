import React, { useState, useEffect } from 'react';
import { crearVehiculo, getAlquileres, cancelarAlquiler } from '../services/api';
import useVehiculos from '../hooks/useVehiculos';
import useFiltrosVehiculos from '../hooks/useFiltrosVehiculos';
import useMensajes from '../hooks/useMensajes';
import TarjetaVehiculo from '../components/TarjetaVehiculo';
import Cargando from '../components/Cargando';
import Mensajes from '../components/Mensajes';
import FiltrosVehiculos from '../components/FiltrosVehiculos';
import RadioGrupo from '../components/RadioGrupo';

const OPCIONES_ESTADO = [
    { value: 'todos', label: 'Todos' },
    { value: 'ACTIVO', label: 'Activos' },
    { value: 'CANCELADO', label: 'Cancelados' },
];

const PanelAdmin = () => {
    const { vehiculos, loading, refrescar } = useVehiculos();
    const filtros = useFiltrosVehiculos(vehiculos);
    const { mensajeError, setMensajeError, mensajeExito, setMensajeExito, limpiar } = useMensajes();

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [alquileres, setAlquileres] = useState([]);
    const [filtroAlquiler, setFiltroAlquiler] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [cargandoAlquileres, setCargandoAlquileres] = useState(true);

    const cargarAlquileres = () => {
        setCargandoAlquileres(true);
        getAlquileres()
            .then(res => setAlquileres(res.data))
            .catch(() => setMensajeError('Error al cargar alquileres'))
            .finally(() => setCargandoAlquileres(false));
    };

    useEffect(() => {
        cargarAlquileres();
    }, []);

    const handleCrear = () => {
        limpiar();
        if (!marca || !modelo || !placa) {
            setMensajeError('Completa todos los campos');
            return;
        }
        crearVehiculo({ marca, modelo, placa, disponible: true })
            .then(() => {
                setMensajeExito('Vehículo creado correctamente');
                setMarca('');
                setModelo('');
                setPlaca('');
                refrescar();
            })
            .catch(() => setMensajeError('Error al crear el vehículo'));
    };

    const handleEliminar = () => {
        limpiar();
        setMensajeExito('Vehículo eliminado correctamente');
        refrescar();
    };

    const handleCancelar = (id) => {
        limpiar();
        cancelarAlquiler(id)
            .then(() => {
                setMensajeExito('Alquiler cancelado correctamente');
                cargarAlquileres();
                refrescar();
            })
            .catch(() => setMensajeError('Error al cancelar alquiler'));
    };

    const busqueda = filtroAlquiler.trim().toLowerCase();
    const alquileresFiltrados = alquileres
        .filter(a => filtroEstado === 'todos' || a.estado === filtroEstado)
        .filter(a => !busqueda ||
            a.nombreCliente.toLowerCase().includes(busqueda) ||
            String(a.vehiculoId) === busqueda
        );

    return (
        <div className="panel-admin">
            <h1>Panel de Administración</h1>

            <Mensajes error={mensajeError} exito={mensajeExito} />

            <div className="seccion-alquileres">
                <h2>Alquileres</h2>

                <div className="filtros-alquileres">
                    <RadioGrupo
                        titulo="Estado:"
                        opciones={OPCIONES_ESTADO}
                        valor={filtroEstado}
                        onChange={setFiltroEstado}
                        name="filtroEstadoAlquiler"
                    />
                    <input
                        type="text"
                        placeholder="Filtrar por cliente o ID del vehículo"
                        value={filtroAlquiler}
                        onChange={e => setFiltroAlquiler(e.target.value)}
                    />
                </div>

                {cargandoAlquileres ? (
                    <Cargando />
                ) : alquileresFiltrados.length === 0 ? (
                    <p className="vacio">No se encontraron alquileres.</p>
                ) : (
                    <table className="tabla-alquileres">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vehículo ID</th>
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alquileresFiltrados.map(a => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.vehiculoId}</td>
                                    <td>{a.nombreCliente}</td>
                                    <td>{a.estado}</td>
                                    <td>
                                        {a.estado === 'ACTIVO' && (
                                            <button
                                                className="boton-cancelar"
                                                onClick={() => handleCancelar(a.id)}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <h2>Registrar nuevo vehículo</h2>
            <div className="formulario-crear">
                <input
                    type="text"
                    placeholder="Marca"
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Placa"
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />
                <button className="boton-crear" onClick={handleCrear}>
                    Crear vehículo
                </button>
            </div>

            <h2>Vehículos registrados</h2>
            <FiltrosVehiculos {...filtros} nombreGrupo="tipoFiltroAdmin" />
            {loading ? <Cargando /> : (
                filtros.resultados.length === 0 ? (
                    <p className="vacio">No se encontraron vehículos.</p>
                ) : (
                    <div className="vehiculos-grid">
                        {filtros.resultados.map(v => (
                            <TarjetaVehiculo
                                key={v.id}
                                vehiculo={v}
                                onEliminar={handleEliminar}
                                onError={setMensajeError}
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default PanelAdmin;
