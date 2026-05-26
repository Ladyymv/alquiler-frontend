# Alquiler de Vehículos — Frontend

Aplicación React para gestionar un sistema de alquiler de vehículos.

## Requisitos

- **Node.js** (v18+) y **npm**
- Backend corriendo en `http://localhost:8080` → ver https://github.com/Ladyymv/alquiler-vehiculos

## Cómo ejecutar

```bash
npm install
npm start
```

Abre http://localhost:3000

## Vistas

- **`/`** — Dashboard del empleado: métricas + accesos rápidos
- **`/vehiculos`** — Listar vehículos con filtros (estado, marca, ID, placa) y registrar alquileres
- **`/admin`** — Panel de administración: alquileres con filtros, crear vehículos, eliminar

## Estructura

```
src/
├── components/   # UI reutilizable
├── hooks/        # useVehiculos, useFiltrosVehiculos, useMensajes
├── pages/        # Home, ListaVehiculos, PanelAdmin
└── services/     # api.js (cliente axios)
```
