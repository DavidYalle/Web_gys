/**
 * G&S CONTROL INDUSTRIAL SAC - MAIN UI CONTROLLER (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLogoFallback();
  initMobileNav();
  initProjectFilters();
  initInteractiveMap();
});

/**
 * Genera el logotipo exacto (logo-3.png) en SVG Data-URI si el archivo físico
 * aún no ha sido copiado a assets/images/logo-3.png
 */
function initLogoFallback() {
  const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 76" width="330" height="76">
    <rect x="0" y="0" width="108" height="76" fill="#92D050"/>
    <text x="54" y="53" font-family="Arial, Helvetica, sans-serif" font-weight="900" text-anchor="middle" fill="#ffffff">
      <tspan font-size="40">G</tspan><tspan font-size="26" dy="-7">y</tspan><tspan font-size="40" dy="7">S</tspan>
    </text>
    <rect x="108" y="0" width="222" height="76" fill="#000000" stroke="#92D050" stroke-width="2"/>
    <polygon points="122,26 122,50 140,38" fill="#92D050"/>
    <text x="148" y="35" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="22" fill="#ffffff" letter-spacing="1.5">CONTROL</text>
    <text x="148" y="58" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="20" fill="#ffffff" letter-spacing="1.2">INDUSTRIAL</text>
  </svg>`;

  const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgLogo)}`;

  document.querySelectorAll('.gys-logo-img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.src !== encodedSvg) {
        img.src = encodedSvg;
      }
    });
  });
}

/**
 * Controla el menú hamburguesa en dispositivos móviles
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('open');
  });
}

/**
 * Filtrado interactivo en la galería de proyectos (proyectos.html)
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('[data-project-category]');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-project-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-project-category');
        if (target === 'all' || category === target) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Controla los estados del mapa operativo en contactanos.html
 */
function initInteractiveMap() {
  const zoneButtons = document.querySelectorAll('[data-zone]');
  const zoneTitle = document.getElementById('mapZoneTitle');
  const zoneDesc = document.getElementById('mapZoneDesc');
  const zoneCoords = document.getElementById('mapZoneCoords');

  if (!zoneButtons.length || !zoneTitle) return;

  const zonesData = {
    lima: {
      title: 'Sede Central & Planta de Integración - Lima',
      desc: 'Centro de ingeniería, diseño de tableros eléctricos, pruebas FAT y soporte SCADA 24/7.',
      coords: 'Lat: -12.0464° S | Lon: -77.0428° W • Atención Inmediata'
    },
    norte: {
      title: 'Corredor Industrial Norte (Trujillo - Piura)',
      desc: 'Especialistas en automatización agroindustrial, plantas pesqueras y subestaciones de media tensión.',
      coords: 'Cobertura: La Libertad, Lambayeque, Piura • Brigada Móvil'
    },
    sur: {
      title: 'Corredor Minero & Energético Sur (Arequipa - Moquegua)',
      desc: 'Instrumentación de procesos, telemetría industrial, variadores de media tensión y paradas de planta.',
      coords: 'Cobertura: Arequipa, Moquegua, Tacna, Cusco • Homologación Minera'
    }
  };

  zoneButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      zoneButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-zone');
      const info = zonesData[key];
      if (info) {
        zoneTitle.textContent = info.title;
        zoneDesc.textContent = info.desc;
        zoneCoords.textContent = info.coords;
      }
    });
  });
}