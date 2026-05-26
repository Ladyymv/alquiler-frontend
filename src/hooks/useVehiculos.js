import { useState, useEffect } from 'react';
import { getVehiculos } from '../services/api';

export const useVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargar = () => {
        setLoading(true);
        getVehiculos()
            .then(res => {
                setVehiculos(res.data);
                setError(null);
            })
            .catch(() => setError('Error al cargar los vehículos'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        cargar();
    }, []);

    return { vehiculos, loading, error, refrescar: cargar };
};

export default useVehiculos;
