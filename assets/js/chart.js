/**
 * G&S CONTROL INDUSTRIAL SAC - GRÁFICA INTERACTIVA DE EFICIENCIA (Canvas 2D)
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('efficiencyChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const buttons = document.querySelectorAll('[data-chart-sector]');

  const datasets = {
    mineria: {
      label: 'Sector Minero (% Disponibilidad de Planta)',
      months: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
      before: [78, 79, 77, 80, 79, 81],
      after: [88, 92, 95, 97, 98.5, 99.4]
    },
    agro: {
      label: 'Agroindustria (% Ahorro Energético en Bombeo/Frio)',
      months: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
      before: [10, 11, 10, 12, 11, 12],
      after: [22, 26, 29, 32, 34, 36.5]
    },
    manufactura: {
      label: 'Manufactura (% OEE Eficiencia General de Equipos)',
      months: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
      before: [65, 66, 67, 65, 68, 67],
      after: [78, 83, 87, 90, 93, 95.2]
    }
  };

  let currentSector = 'mineria';

  function drawChart(sectorKey) {
    const data = datasets[sectorKey];
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padLeft = 48;
    const padRight = 24;
    const padTop = 45;
    const padBottom = 40;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    ctx.clearRect(0, 0, width, height);

    // Título interno del gráfico
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(data.label, padLeft, 24);

    // Líneas guía horizontales
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (chartH / 4) * i;
      const val = 100 - i * 25;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`${val}%`, 10, y + 4);
    }

    // Dibujar barras comparativas (Antes vs Con G&S Control Industrial)
    const stepX = chartW / data.months.length;
    const barW = Math.min(26, stepX * 0.32);

    data.months.forEach((month, idx) => {
      const centerX = padLeft + stepX * idx + stepX / 2;

      // Barra Estándar Previo
      const hBefore = (data.before[idx] / 100) * chartH;
      const yBefore = padTop + chartH - hBefore;
      ctx.fillStyle = '#334155';
      ctx.fillRect(centerX - barW - 3, yBefore, barW, hBefore);

      // Barra Optimizada G&S (#92D050)
      const hAfter = (data.after[idx] / 100) * chartH;
      const yAfter = padTop + chartH - hAfter;
      ctx.fillStyle = '#92D050';
      ctx.fillRect(centerX + 3, yAfter, barW, hAfter);

      // Valor encima de barra G&S
      ctx.fillStyle = '#92D050';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${data.after[idx]}%`, centerX + 3 + barW / 2, yAfter - 6);

      // Etiqueta de Mes
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(month, centerX, height - 14);
    });

    ctx.textAlign = 'left';
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentSector = btn.getAttribute('data-chart-sector');
      drawChart(currentSector);
    });
  });

  window.addEventListener('resize', () => drawChart(currentSector));
  drawChart(currentSector);
});