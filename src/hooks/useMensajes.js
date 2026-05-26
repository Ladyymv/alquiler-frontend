import { useState, useEffect } from 'react';

export const useMensajes = (timeoutMs = 4000) => {
    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');

    useEffect(() => {
        if (!mensajeError && !mensajeExito) return;
        const t = setTimeout(() => {
            setMensajeError('');
            setMensajeExito('');
        }, timeoutMs);
        return () => clearTimeout(t);
    }, [mensajeError, mensajeExito, timeoutMs]);

    const limpiar = () => {
        setMensajeError('');
        setMensajeExito('');
    };

    return { mensajeError, setMensajeError, mensajeExito, setMensajeExito, limpiar };
};

export default useMensajes;
