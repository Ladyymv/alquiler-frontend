import React from 'react';
import MensajeError from './MensajeError';

const Mensajes = ({ error, exito }) => (
    <>
        {error && <MensajeError mensaje={error} />}
        {exito && <p className="mensaje">{exito}</p>}
    </>
);

export default Mensajes;
