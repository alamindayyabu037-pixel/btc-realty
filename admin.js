/* ══════════════════════════════════════
   BTC REALTY — admin.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. LOGIN ── */
  const loginScreen = document.getElementById('loginScreen');
  const dashboard   = document.getElementById('dashboard');
  const loginBtn    = document.getElementById('loginBtn');
  const loginError  = document.getElementById('loginError');
  const loginUser   = document.getElementById('loginUser');
  const loginPass   = document.getElementById('loginPass');

  loginBtn.addEventListener('click', () => {
    const user = loginUser.value.trim();
    const pass = loginPass.value.trim();

    if (user === 'admin' && pass === 'admin123') {
      loginScreen.classList.add('hidden');
      dashboard.classList.remove('hidden');
      loginError.classList.remove('show');
      animateKPIs();
    } else {
      loginError.classList.add('show');
      loginPass.value = '';
      loginPass.focus();
    }
  });

  /* Login on Enter key */
  [loginUser, loginPass].forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') loginBtn.click();
    });
  });

  /* Password toggle */
  const pwToggle = document.getElementById('pwToggle');
  pwToggle.addEventListener('click', () => {
    const type = loginPass.type === 'password' ? 'text' : 'password';
    loginPass.type = type;
    document.getElementById('eyeIcon').style.opacity =
      type === 'text' ? '0.5' : '1';
  });

  /* ── 2. LOGOUT ── */
  document.getElementById('logoutBtn').addEventListener('click', () => {
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    loginUser.value = '';
    loginPass.value = '';
  });

  /* ── 3. SIDEBAR NAVIGATION ── */
  const sbLinks  = document.querySelectorAll('.sb-link');
  const pages    = document.querySelectorAll('.page');
  const topTitle = document.getElementById('topbarTitle');

  function goToPage(pageName) {
    sbLinks.forEach(l => l.classList.remove('active'));
    pages.forEach(p  => p.classList.remove('active'));

    const targetLink = document.querySelector(`.sb-link[data-page="${pageName}"]`);
    const targetPage = document.getElementById(`page-${pageName}`);

    if (targetLink) targetLink.classList.add('active');
    if (targetPage) targetPage.classList.add('active');

    topTitle.textContent =
      pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  sbLinks.forEach(link => {
    link.addEventListener('click', () => {
      goToPage(link.dataset.page);
      /* Close sidebar on mobile */
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  /* "View All" button on overview goes to inquiries */
  document.querySelectorAll('.dash-link[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => goToPage(btn.dataset.goto));
  });

  /* ── 4. MOBILE SIDEBAR TOGGLE ── */
  const sidebar       = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  /* ── 5. KPI COUNTER ANIMATION ── */
  function animateKPIs() {
    document.querySelectorAll('.kpi-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = prefix + current.toLocaleString() + suffix;
      }, 20);
    });
  }

  /* ── 6. ADD PROPERTY FORM ── */
  const addPropBtn  = document.getElementById('addPropBtn');
  const addPropForm = document.getElementById('addPropForm');
  const cancelProp  = document.getElementById('cancelProp');
  const savePropBtn = document.getElementById('savePropBtn');
  const propTableBody = document.getElementById('propTableBody');
  let   propCount   = propTableBody.querySelectorAll('tr').length;

  addPropBtn.addEventListener('click', () => {
    addPropForm.classList.toggle('hidden');
  });

  cancelProp.addEventListener('click', () => {
    addPropForm.classList.add('hidden');
  });

  savePropBtn.addEventListener('click', () => {
    const title    = document.getElementById('propTitle').value.trim();
    const location = document.getElementById('propLocation').value.trim();
    const price    = document.getElementById('propPrice').value.trim();
    const type     = document.getElementById('propType').value;
    const beds     = document.getElementById('propBeds').value || '—';
    const baths    = document.getElementById('propBaths').value || '—';

    if (!title || !location || !price || !type) {
      savePropBtn.textContent = '⚠ Fill all required fields';
      savePropBtn.style.background = '#c0392b';
      setTimeout(() => {
        savePropBtn.textContent = 'Save Property';
        savePropBtn.style.background = '';
      }, 2500);
      return;
    }

    propCount++;
    const badgeClass = type === 'For Sale' ? 'done'
                     : type === 'For Rent'  ? 'read'
                     : 'new';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${propCount}</td>
      <td><strong>${title}</strong></td>
      <td>${location}</td>
      <td class="gold">₦${price}</td>
      <td><span class="badge-status ${badgeClass}">${type}</span></td>
      <td>${beds}</td>
      <td class="action-cell">
        <button class="tbl-btn edit">Edit</button>
        <button class="tbl-btn del">Delete</button>
      </td>
    `;

    propTableBody.prepend(row);
    bindRowActions(row);

    /* Reset form */
    ['propTitle','propLocation','propPrice','propBeds','propBaths']
      .forEach(id => document.getElementById(id).value = '');
    document.getElementById('propType').selectedIndex = 0;

    addPropForm.classList.add('hidden');
    savePropBtn.textContent = '✓ Saved!';
    savePropBtn.style.background = '#1a6b3a';
    setTimeout(() => {
      savePropBtn.textContent = 'Save Property';
      savePropBtn.style.background = '';
    }, 2000);
  });

  /* ── 7. TABLE ROW ACTIONS (Delete) ── */
  function bindRowActions(scope) {
    scope.querySelectorAll('.tbl-btn.del').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        row.style.opacity = '0';
        row.style.transition = 'opacity 0.3s';
        setTimeout(() => row.remove(), 300);
      });
    });
  }

  /* Bind existing rows */
  document.querySelectorAll('.dash-table tbody tr').forEach(row => {
    bindRowActions(row);
  });

  /* ── 8. INQUIRY FILTERS ── */
  const inqFilters   = document.querySelectorAll('.inq-filter');
  const inqTableBody = document.getElementById('inqTableBody');

  inqFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      inqFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      inqTableBody.querySelectorAll('tr').forEach(row => {
        const status = row.dataset.status;
        row.style.display =
          (filter === 'all' || status === filter) ? '' : 'none';
      });
    });
  });

});