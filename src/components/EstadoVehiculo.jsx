import React from 'react';

const EstadoVehiculo = ({ disponible }) => {
    return (
        <span className={`estado ${disponible ? 'estado-disponible' : 'estado-ocupado'}`}>
            {disponible ? 'Disponible' : 'No disponible'}
        </span>
    );
};

export default EstadoVehiculo;