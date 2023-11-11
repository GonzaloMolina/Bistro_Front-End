// OrdenesChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const OrdenesChart = ({ ordenes, selectedDate, onDateChange }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Agrupar las ganancias por día
    const gananciasPorDia = ordenes.reduce((acc, orden) => {
      const fecha = `${orden.date[2]}/${orden.date[1]}/${orden.date[0]}`;
      acc[fecha] = (acc[fecha] || 0) + (orden.price - orden.cost);
      return acc;
    }, {});

    const fechas = Object.keys(gananciasPorDia);
    const ganancias = Object.values(gananciasPorDia);

    // Destruir el gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line', // Cambiado a tipo de gráfico line
      data: {
        labels: fechas,
        datasets: [{
          label: 'Ganancia por día',
          data: ganancias,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false, // No rellenar debajo de la línea para un gráfico de líneas
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        },
      }
    });

    // Limpiar el gráfico al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [ordenes]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    onDateChange(selectedDate);
  };

  return (
    <div style={{ maxWidth: '50%', marginLeft: '200px', marginTop: '50px' }}>
      <div>
        <label>Seleccione una fecha:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <h2>Ganancia por día</h2>
      <canvas ref={chartRef} maxWidth={400} maxHeight={200}></canvas>
    </div>
  );
};

export default OrdenesChart;
