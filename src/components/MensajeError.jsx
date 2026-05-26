import React from 'react';

const MensajeError = ({ mensaje }) => {
    return (
        <div className="mensaje-error">
            <p>⚠️ {mensaje}</p>
        </div>
    );
};

export default MensajeError;