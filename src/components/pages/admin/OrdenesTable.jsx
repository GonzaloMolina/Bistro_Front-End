// OrdenesTable.jsx
import React from 'react';
import './OrdenesTable.css';  // Asegúrate de ajustar la ruta de importación según la ubicación de tu archivo CSS

const OrdenesTable = ({ ordenes }) => {
  return (
    <table className="ordenes-table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Mes</th>
          <th>Año</th>
          <th>Orden ID</th>
          <th>Precio</th>
          <th>Costo</th>
          <th>Ganancia</th>
        </tr>
      </thead>
      <tbody>
        {ordenes.map((orden) => (
          <tr key={orden.id}>
            <td>{orden.date[2]}</td>
            <td>{orden.date[1]}</td>
            <td>{orden.date[0]}</td>
            <td>{orden.id}</td>
            <td>{orden.price}</td>
            <td>{orden.cost}</td>
            <td>{orden.price - orden.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdenesTable;