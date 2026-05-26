import React from 'react';
import RadioGrupo from './RadioGrupo';
import { OPCIONES_FILTRO } from '../hooks/useFiltrosVehiculos';

const FiltrosVehiculos = ({
    tipoFiltro,
    filtroBusqueda,
    setFiltroBusqueda,
    cambiarFiltro,
    nombreGrupo = 'tipoFiltro',
}) => (
    <div className="filtros">
        <RadioGrupo
            titulo="Mostrar:"
            opciones={OPCIONES_FILTRO}
            valor={tipoFiltro}
            onChange={cambiarFiltro}
            name={nombreGrupo}
        />
        <input
            type="text"
            placeholder="Buscar por marca, ID o placa"
            value={filtroBusqueda}
            onChange={e => setFiltroBusqueda(e.target.value)}
        />
    </div>
);

export default FiltrosVehiculos;
