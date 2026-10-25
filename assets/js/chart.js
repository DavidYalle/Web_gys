/**
 * G&S CONTROL INDUSTRIAL SAC - GRÁFICA INTERACTIVA DE EFICIENCIA
 * Incluye: Hover con mira láser, Tooltip flotante, selector de periodo y vínculo con tarjetas KPI.
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('efficiencyChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const titleEl = document.getElementById('chartDynamicTitle');
  const subEl = document.getElementById('chartDynamicSub');
  const peakEl = document.getElementById('metricPeak');
  const gainEl = document.getElementById('metricGain');

  const chartDatasets = {
    hoy: {
      title: 'Eficiencia de Proyectos (Tiempo Real)',
      sub: 'Monitoreo SCADA/OEE de disponibilidad operativa por hora',
      labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      gys: [64, 78, 72, 86, 81, 93, 98.4],
      base: [48, 52, 50, 56, 58, 62, 65],
      peak: '98.4%',
      gain: '+33.4%'
    },
    mes: {
      title: 'Rendimiento Mensual de Planta',
      sub: 'Evolución de eficiencia tras comisionamiento PLC/SCADA',
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Actual'],
      gys: [70, 76, 84, 88, 92, 95, 97.8],
      base: [60, 61, 63, 62, 65, 66, 68],
      peak: '97.8%',
      gain: '+29.8%'
    },
    anual: {
      title: 'Desempeño Anual & Ahorro Energético',
      sub: 'Disponibilidad acumulada en proyectos de Minería e Industria',
      labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      gys: [75, 82, 87, 91, 94, 96.8, 99.2],
      base: [62, 64, 65, 67, 68, 70, 72],
      peak: '99.2%',
      gain: '+27.2%'
    },
    proyectos: {
      title: 'Eficiencia en 87 Proyectos Ejecutados',
      sub: 'Cumplimiento de entregables FAT/SAT y puesta en marcha',
      labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      gys: [64, 78, 72, 86, 81, 93, 98.4],
      base: [48, 52, 50, 56, 58, 62, 65],
      peak: '98.4%',
      gain: '+33.4%'
    },
    clientes: {
      title: 'Índice de Satisfacción (25 Clientes Corporativos)',
      sub: 'Continuidad operativa y reducción de paradas no programadas',
      labels: ['Lote 1', 'Lote 2', 'Lote 3', 'Lote 4', 'Lote 5', 'Lote 6', 'Actual'],
      gys: [78, 84, 89, 91, 95, 97, 99.0],
      base: [58, 60, 62, 64, 65, 67, 69],
      peak: '99.0%',
      gain: '+30.0%'
    },
    oficinas: {
      title: 'Capacidad de Respuesta (3 Oficinas Operativas)',
      sub: 'Cobertura técnica inmediata en Lima, Arequipa e Ilo',
      labels: ['Zona 1', 'Zona 2', 'Zona 3', 'Zona 4', 'Zona 5', 'Zona 6', 'Total'],
      gys: [72, 80, 85, 90, 94, 96, 98.6],
      base: [50, 54, 55, 58, 60, 63, 65],
      peak: '98.6%',
      gain: '+33.6%'
    },
    especialistas: {
      title: 'Productividad de Ingeniería (38 Especialistas)',
      sub: ' Horas de ingeniería certificada en automatización y potencia',
      labels: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6', 'Cierre'],
      gys: [68, 79, 86, 92, 95, 97.5, 99.4],
      base: [52, 55, 58, 60, 63, 66, 68],
      peak: '99.4%',
      gain: '+31.4%'
    }
  };

  let activeKey = 'hoy';
  let hoverIndex = -1;

  function drawInteractiveChart() {
    const data = chartDatasets[activeKey] || chartDatasets.hoy;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padL = 34;
    const padR = 16;
    const padT = 18;
    const padB = 26;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    ctx.clearRect(0, 0, w, h);

    // 1. Grilla horizontal y etiquetas Y
    const ySteps = [100, 80, 60, 40, 20, 0];
    ctx.font = '600 10px Inter, sans-serif';

    ySteps.forEach((val, idx) => {
      const y = padT + (plotH / (ySteps.length - 1)) * idx;
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${val}%`, 2, y + 3);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
    });

    // 2. Etiquetas X
    const count = data.labels.length;
    const stepX = plotW / (count - 1);

    data.labels.forEach((lbl, i) => {
      const x = padL + stepX * i;
      ctx.fillStyle = i === hoverIndex ? '#92D050' : '#94a3b8';
      ctx.font = i === hoverIndex ? '700 10px Inter, sans-serif' : '500 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lbl, x, h - 7);
    });
    ctx.textAlign = 'left';

    // Coordenadas de ambas curvas
    const gysPoints = data.gys.map((v, i) => ({
      x: padL + stepX * i,
      y: padT + plotH - (v / 100) * plotH,
      val: v
    }));

    const basePoints = data.base.map((v, i) => ({
      x: padL + stepX * i,
      y: padT + plotH - (v / 100) * plotH,
      val: v
    }));

    // 3. Dibujar línea base (gris punteada)
    ctx.save();
    ctx.beginPath();
    basePoints.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else {
        const prev = basePoints[i - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, p.y, p.x, p.y);
      }
    });
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.restore();

    // 4. Relleno degradado bajo la curva G&S (#92D050)
    const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
    grad.addColorStop(0, 'rgba(146, 208, 80, 0.45)');
    grad.addColorStop(0.75, 'rgba(146, 208, 80, 0.08)');
    grad.addColorStop(1, 'rgba(146, 208, 80, 0.0)');

    ctx.beginPath();
    ctx.moveTo(gysPoints[0].x, padT + plotH);
    gysPoints.forEach((p, i) => {
      if (i === 0) ctx.lineTo(p.x, p.y);
      else {
        const prev = gysPoints[i - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, p.y, p.x, p.y);
      }
    });
    ctx.lineTo(gysPoints[gysPoints.length - 1].x, padT + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 5. Trazo principal verde neón con brillo
    ctx.save();
    ctx.beginPath();
    gysPoints.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else {
        const prev = gysPoints[i - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, p.y, p.x, p.y);
      }
    });
    ctx.strokeStyle = '#92D050';
    ctx.lineWidth = 2.8;
    ctx.shadowColor = 'rgba(146, 208, 80, 0.65)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.restore();

    // 6. Nodos sobre la curva y efecto Hover interactivo
    gysPoints.forEach((p, i) => {
      const isHovered = i === hoverIndex;

      if (isHovered) {
        // Línea láser vertical
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p.x, padT);
        ctx.lineTo(p.x, padT + plotH);
        ctx.strokeStyle = 'rgba(146, 208, 80, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.restore();

        // Halo exterior
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(146, 208, 80, 0.28)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, isHovered ? 5 : 3.2, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : '#92D050';
      ctx.strokeStyle = '#0b0f14';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    });

    // 7. Tooltip flotante cuando el usuario pasa el mouse
    if (hoverIndex >= 0 && hoverIndex < gysPoints.length) {
      const pt = gysPoints[hoverIndex];
      const baseVal = basePoints[hoverIndex].val;
      const label = data.labels[hoverIndex];

      const boxW = 132;
      const boxH = 48;
      let boxX = pt.x - boxW / 2;
      if (boxX < padL) boxX = padL;
      if (boxX + boxW > w - padR) boxX = w - padR - boxW;
      const boxY = Math.max(padT + 2, pt.y - boxH - 12);

      ctx.fillStyle = 'rgba(10, 14, 20, 0.94)';
      ctx.strokeStyle = '#92D050';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#92D050';
      ctx.font = '800 11px Inter, sans-serif';
      ctx.fillText(`${label} • Eficiencia: ${pt.val}%`, boxX + 8, boxY + 18);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 10px Inter, sans-serif';
      ctx.fillText(`Base: ${baseVal}% (+${(pt.val - baseVal).toFixed(1)}%)`, boxX + 8, boxY + 35);
    }
  }

  function updateDataset(key) {
    if (!chartDatasets[key]) return;
    activeKey = key;
    const d = chartDatasets[key];
    if (titleEl) titleEl.textContent = d.title;
    if (subEl) subEl.textContent = d.sub;
    if (peakEl) peakEl.textContent = d.peak;
    if (gainEl) gainEl.textContent = d.gain;
    drawInteractiveChart();
  }

  // Eventos de movimiento del mouse sobre el Canvas
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const padL = 34;
    const padR = 16;
    const plotW = rect.width - padL - padR;
    const data = chartDatasets[activeKey] || chartDatasets.hoy;
    const stepX = plotW / (data.labels.length - 1);

    let closest = Math.round((mouseX - padL) / stepX);
    closest = Math.max(0, Math.min(data.labels.length - 1, closest));

    if (hoverIndex !== closest) {
      hoverIndex = closest;
      drawInteractiveChart();
    }
  });

  canvas.addEventListener('mouseleave', () => {
    hoverIndex = -1;
    drawInteractiveChart();
  });

  // Botones de periodo (Hoy / Mes / Anual)
  document.querySelectorAll('.period-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.period-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateDataset(btn.getAttribute('data-period'));
    });
  });

  // Interacción al pasar el mouse por las 4 tarjetas KPI (87, 25, 3, 38)
  document.querySelectorAll('.kpi-box').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.kpi-box').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const mode = card.getAttribute('data-kpi-mode');
      updateDataset(mode);
    });
  });

  window.addEventListener('resize', drawInteractiveChart);
  drawInteractiveChart();
});