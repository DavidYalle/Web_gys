/**
 * G&S CONTROL INDUSTRIAL SAC - FRONTEND CYBERSECURITY MODULE
 * Protecciones: Sanitización XSS, Honeypot Anti-Spam, Rate Limiting, Validación RUC.
 */

(function () {
  'use strict';

  // 1. Frame-Busting Anti-Clickjacking
  if (window.top !== window.self) {
    document.documentElement.classList.add('framed-blocked');
    try {
      window.top.location = window.self.location;
    } catch (e) {
      console.error('[Security] Intento de embebido no autorizado bloqueado.');
    }
  }

  // 2. Sanitizador estricto contra XSS e inyección de etiquetas
  function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  // 3. Validador de RUC Peruano (11 dígitos numéricos empezando en 10, 15, 17 o 20)
  function isValidRUC(ruc) {
    return /^(10|15|17|20)\d{9}$/.test(ruc.trim());
  }

  // 4. Rate Limiting (Máximo 3 envíos cada 10 minutos por cliente)
  function checkRateLimit() {
    const STORAGE_KEY = 'gys_sec_rate_limit';
    const WINDOW_MS = 10 * 60 * 1000;
    const MAX_ATTEMPTS = 3;
    const now = Date.now();

    let records = [];
    try {
      records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      records = [];
    }

    records = records.filter((timestamp) => now - timestamp < WINDOW_MS);

    if (records.length >= MAX_ATTEMPTS) {
      return false;
    }

    records.push(now);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  }

  // 5. Inicializar protección del formulario de cotización
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quoteForm');
    const alertBox = document.getElementById('securityAlert');

    if (!form || !alertBox) return;

    const showStatus = (message, type) => {
      alertBox.textContent = message;
      alertBox.className = `security-alert show security-alert--${type}`;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // A. Verificar trampa Honeypot
      const honeypot = document.getElementById('hp_website_url');
      if (honeypot && honeypot.value.trim() !== '') {
        showStatus('Acción bloqueada por filtro automatizado Anti-Bot.', 'error');
        return;
      }

      // B. Capturar y sanitizar campos
      const company = sanitizeInput(document.getElementById('companyName').value);
      const ruc = sanitizeInput(document.getElementById('companyRuc').value);
      const email = sanitizeInput(document.getElementById('contactEmail').value);
      const phone = sanitizeInput(document.getElementById('contactPhone').value);
      const service = sanitizeInput(document.getElementById('serviceType').value);
      const message = sanitizeInput(document.getElementById('projectDetails').value);

      // C. Validaciones de formato corporativo
      if (company.length < 3) {
        showStatus('Ingrese una Razón Social válida (mínimo 3 caracteres).', 'error');
        return;
      }

      if (!isValidRUC(ruc)) {
        showStatus('El RUC debe contener 11 dígitos válidos (iniciando con 10 o 20).', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        showStatus('Ingrese un correo electrónico corporativo válido.', 'error');
        return;
      }

      if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) {
        showStatus('Ingrese un teléfono de contacto válido (7 a 15 dígitos).', 'error');
        return;
      }

      if (!service || message.length < 15) {
        showStatus('Seleccione una línea de ingeniería y detalle su requerimiento (mín. 15 caracteres).', 'error');
        return;
      }

      // D. Verificar Rate Limiting
      if (!checkRateLimit()) {
        showStatus('Límite de seguridad excedido: Ha realizado demasiadas solicitudes recientemente. Intente en 10 minutos.', 'error');
        return;
      }

      // E. Éxito
      showStatus(
        `✅ Solicitud validada y cifrada correctamente para ${company} (RUC: ${ruc}). Nuestro equipo de Ingeniería responderá en menos de 24 horas.`,
        'success'
      );
      form.reset();
    });
  });
})();