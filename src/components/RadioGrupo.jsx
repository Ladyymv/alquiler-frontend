import React from 'react';

const RadioGrupo = ({ titulo, opciones, valor, onChange, name }) => (
    <div className="filtros-grupo">
        {titulo && <span className="filtros-titulo">{titulo}</span>}
        {opciones.map(opt => (
            <label key={opt.value} className="filtro-opcion">
                <input
                    type="radio"
                    name={name}
                    value={opt.value}
                    checked={valor === opt.value}
                    onChange={() => onChange(opt.value)}
                />
                <span>{opt.label}</span>
            </label>
        ))}
    </div>
);

export default RadioGrupo;
