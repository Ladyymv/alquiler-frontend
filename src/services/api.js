import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
});

// Vehículos
export const getVehiculos = () => api.get('/vehiculos');
export const getVehiculoPorId = (id) => api.get(`/vehiculos/${id}`);
export const crearVehiculo = (vehiculo) => api.post('/vehiculos', vehiculo);
export const eliminarVehiculo = (id) => api.delete(`/vehiculos/${id}`);

// Operaciones
export const alquilarVehiculo = (alquiler) => api.post('/operaciones/alquilar', alquiler);
export const cancelarAlquiler = (id) => api.put(`/operaciones/cancelar/${id}`);
export const getAlquileres = () => api.get('/operaciones');
