import { useState } from 'react';

export const OPCIONES_FILTRO = [
    { value: 'todos', label: 'Todos' },
    { value: 'disponibles', label: 'Solo disponibles' },
    { value: 'alquilados', label: 'Solo alquilados' },
];

const aplicarTipoFiltro = (lista, tipoFiltro) => {
    if (tipoFiltro === 'disponibles') return lista.filter(v => v.disponible);
    if (tipoFiltro === 'alquilados') return lista.filter(v => !v.disponible);
    return lista;
};

const aplicarBusqueda = (lista, busqueda) => {
    const valor = busqueda.trim().toLowerCase();
    if (!valor) return lista;
    if (/^\d+$/.test(valor)) {
        return lista.filter(v => String(v.id) === valor);
    }
    return lista.filter(v =>
        (v.marca && v.marca.toLowerCase().includes(valor)) ||
        (v.placa && v.placa.toLowerCase().includes(valor))
    );
};

export const useFiltrosVehiculos = (vehiculosBase = []) => {
    const [tipoFiltro, setTipoFiltro] = useState('todos');
    const [filtroBusqueda, setFiltroBusqueda] = useState('');

    const resultados = aplicarBusqueda(
        aplicarTipoFiltro(vehiculosBase, tipoFiltro),
        filtroBusqueda
    );

    const cambiarFiltro = (nuevo) => setTipoFiltro(nuevo);

    return {
        tipoFiltro,
        filtroBusqueda,
        setFiltroBusqueda,
        cambiarFiltro,
        resultados,
    };
};

export default useFiltrosVehiculos;
