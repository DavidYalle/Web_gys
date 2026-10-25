/**
 * G&S CONTROL INDUSTRIAL SAC - CONTROLADOR GLOBAL DE INTERFAZ (ES6+)
 * Sincroniza Header, Footer, Redes Sociales Reales y Asistente Flotante de WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  syncUnifiedHeaderAndFooter();
  injectWhatsAppWidget();
  initLogoFallback();
  initMobileNav();
  initProjectFilters();
  initInteractiveMap();
  initWorldMapInteraction();
  initAboutPageInteractions();
});

/**
 * Inyecta y unifica el Header y Footer con Redes Sociales reales y WhatsApp
 */
function syncUnifiedHeaderAndFooter() {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const legacyTopBar = document.querySelector('.top-bar');
  if (legacyTopBar) legacyTopBar.remove();

  // 1. Encabezado unificado con enlaces reales a Redes Sociales
  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <div class="container">
        <div class="header-top-unified">
          <div class="top-bar-info">
            <span><i class="fa-solid fa-location-dot"></i> Lima, Perú</span>
            <a href="tel:+51962375309"><i class="fa-solid fa-phone"></i> +51 962 375 309</a>
            <a href="mailto:info@gyscontrol.com"><i class="fa-solid fa-envelope"></i> info@gyscontrol.com</a>
          </div>
          <div class="top-bar-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/51962375309" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        <div class="header-main-unified">
          <a href="index.html" class="brand-link" aria-label="G&S Control Industrial Inicio">
            <img src="assets/images/logo-3.png" alt="G&S Control Industrial Logo" class="gys-logo-img">
          </a>
          <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-label="Abrir menú">☰</button>
          <nav>
            <ul class="nav-menu" id="navMenu">
              <li><a href="index.html" class="nav-link ${path === 'index.html' || path === '' ? 'active' : ''}">INICIO</a></li>
              <li><a href="nosotros.html" class="nav-link ${path === 'nosotros.html' ? 'active' : ''}">NOSOTROS</a></li>
              <li><a href="servicios.html" class="nav-link ${path === 'servicios.html' ? 'active' : ''}">SERVICIOS</a></li>
              <li><a href="proyectos.html" class="nav-link ${path === 'proyectos.html' ? 'active' : ''}">PROYECTOS</a></li>
              <li><a href="noticias.html" class="nav-link ${path === 'noticias.html' ? 'active' : ''}">NOTICIAS</a></li>
              <li><a href="contactanos.html" class="nav-link ${path === 'contactanos.html' ? 'active' : ''}">CONTÁCTANOS</a></li>
              <li><a href="contactanos.html" class="btn btn--green">COTIZAR PROYECTO <i class="fa-solid fa-arrow-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>`;
  }

  // 2. Footer unificado con redes sociales completas y mapa interactivo
  const footer = document.querySelector('.site-footer');
  if (footer && !footer.querySelector('.footer-corp-grid')) {
    footer.innerHTML = `
      <div class="container footer-main">
        <div class="footer-corp-grid">
          <div>
            <h3 class="footer-heading">Contactamos</h3>
            <div class="footer-logo-box">
              <img src="assets/images/logo-3.png" alt="G&S Control Industrial Logo" class="gys-logo-img">
            </div>
            <div class="social-circles">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/51962375309" target="_blank" rel="noopener noreferrer" class="social-circle-btn" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
            <div class="footer-contact-info">
              <p>Contactanos: <a href="tel:+51962375309">+51 962 375 309</a></p>
              <p>Escríbenos: <a href="mailto:info@gyscontrol.com" class="email-bold">info@gyscontrol.com</a></p>
            </div>
          </div>

          <div>
            <h3 class="footer-heading">Proyectos Ejecutados</h3>
            <div class="projects-world-box">
              <div class="world-map-img-wrap" id="worldMapWrap">
                <img src="assets/images/mapa_gys.png" alt="Proyectos ejecutados en Perú, USA, Canadá y China" class="world-map-img" id="worldMapImg">
              </div>
              <ul class="country-stats-list">
                <li class="country-stat-item" data-country="peru"><span class="country-stat-icon"><i class="fa-solid fa-arrow-right"></i></span>+50 Perú</li>
                <li class="country-stat-item" data-country="usa"><span class="country-stat-icon"><i class="fa-solid fa-arrow-right"></i></span>+08 USA</li>
                <li class="country-stat-item" data-country="canada"><span class="country-stat-icon"><i class="fa-solid fa-arrow-right"></i></span>+01 Canada</li>
                <li class="country-stat-item" data-country="china"><span class="country-stat-icon"><i class="fa-solid fa-arrow-right"></i></span>+02 China</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 class="footer-heading">Blog Recientes</h3>
            <div class="recent-blog-list">
              <a href="noticias.html" class="recent-blog-card"><span>DÍA DEL TRABAJADOR 2017</span></a>
              <a href="noticias.html" class="recent-blog-card"><span>DÍA DEL TRABAJADOR 2019</span></a>
              <a href="noticias.html" class="recent-blog-card"><span>DÍA DE GYS – 2019</span></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom-bar">
        <div class="container footer-bottom-inner">
          <span>© 2026 GYS CONTROL INDUSTRIAL. All Rights Reserved.</span>
          <div class="footer-mini-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/51962375309" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
      </div>`;
    
    initWorldMapInteraction();
  }
}

/**
 * Inyecta el Botón Flotante de WhatsApp en la esquina inferior derecha
 */
function injectWhatsAppWidget() {
  if (document.getElementById('gysWhatsAppWidget')) return;

  const waWidget = document.createElement('div');
  waWidget.id = 'gysWhatsAppWidget';
  waWidget.className = 'gys-wa-container';
  waWidget.innerHTML = `
    <div class="gys-wa-tooltip">
      <span>¡Hola! ¿Necesitas cotizar un proyecto industrial? Hablemos</span>
    </div>
    <a href="https://wa.me/51962375309?text=Hola%20G%26S%20Control%20Industrial,%20deseo%20solicitar%20información%20sobre%20sus%20servicios%20de%20ingeniería." 
       target="_blank" 
       rel="noopener noreferrer" 
       class="gys-wa-button" 
       aria-label="Abrir chat de WhatsApp">
      <i class="fa-brands fa-whatsapp"></i>
      <span class="gys-wa-pulse"></span>
    </a>`;
  document.body.appendChild(waWidget);
}

function initWorldMapInteraction() {
  const mapImg = document.getElementById('worldMapImg');
  const countryItems = document.querySelectorAll('.country-stat-item');
  if (!mapImg || !countryItems.length) return;

  countryItems.forEach((item) => {
    item.style.cursor = 'pointer';
    item.addEventListener('mouseenter', () => {
      countryItems.forEach((ci) => ci.classList.remove('active-country'));
      item.classList.add('active-country');
      mapImg.classList.add('map-highlight');
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('active-country');
      mapImg.classList.remove('map-highlight');
    });
  });
}

function initAboutPageInteractions() {
  // 1. Interacción en la nueva Franja Bicolor (Hitos 01 - 04)
  const arsCards = document.querySelectorAll('.ars-card');
  arsCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      arsCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // 2. Interacción en las 3 tarjetas (Historia, Misión, Visión)
  const pillars = document.querySelectorAll('.about-pillar-card');
  pillars.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      pillars.forEach((c) => c.classList.remove('active-pillar'));
      card.classList.add('active-pillar');
    });
  });

  // 3. Interacción en los 5 medallones de Nuestros Valores (Con título corto)
  const valueCards = document.querySelectorAll('.value-circle-card');
  const vibTitle = document.getElementById('vibTitle');
  const vibText = document.getElementById('vibText');

  valueCards.forEach((vc) => {
    vc.addEventListener('mouseenter', () => {
      valueCards.forEach((item) => item.classList.remove('active'));
      vc.classList.add('active');

      const shortTitle = vc.getAttribute('data-value-title');
      const detail = vc.getAttribute('data-value-detail');
      if (vibTitle && shortTitle && detail) {
        vibTitle.textContent = shortTitle;
        vibText.textContent = detail;
      }
    });
  });
}

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
      if (img.src !== encodedSvg) img.src = encodedSvg;
    });
  });
}

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
        card.style.display = target === 'all' || category === target ? 'flex' : 'none';
      });
    });
  });
}

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
      title: 'Corredor Minero & Energético Sur (Arequipa - Ilo)',
      desc: 'Instrumentación de procesos, telemetría industrial, variadores de media tensión y paradas de planta.',
      coords: 'Cobertura: Arequipa, Moquegua (Ilo), Tacna, Cusco • Homologación Minera'
    }
  };

  zoneButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      zoneButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const info = zonesData[btn.getAttribute('data-zone')];
      if (info) {
        zoneTitle.textContent = info.title;
        zoneDesc.textContent = info.desc;
        zoneCoords.textContent = info.coords;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initServiceFilters();
});

function initServiceFilters() {
  const filterBtns = document.querySelectorAll('[data-service-filter]');
  const serviceCards = document.querySelectorAll('.service-detail-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-service-filter');

      serviceCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}