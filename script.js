(() => {
  const PAGES = ['home', 'about', 'projects', 'ai-tools', 'whatsapp-bots', 'telegram-bots', 'downloads', 'contact'];

  const PROJECTS = [
    {
      title: 'MOHOMAD-XMD Multi-Device Core',
      category: 'Automation',
      stack: 'Node.js · Baileys MD · Express',
      summary: 'Modular WhatsApp Multi-Device bot with session recovery, group guard, and Express healthchecks.',
      repo: 'https://github.com/mohomadxmd/mohomad-xmd-wa',
      image: 'assets/images/project_whatsapp_bot.jpg',
    },
    {
      title: 'XMD Telegram Neural Webhook Hub',
      category: 'APIs',
      stack: 'Express.js · GrammY · Webhook TLS',
      summary: 'Zero-polling Telegram webhook server supporting inline keyboards and rate-limited commands.',
      repo: 'https://github.com/mohomadxmd/mohomad-xmd-tg',
      image: 'assets/images/project_telegram_ai.jpg',
    },
    {
      title: 'Obsidian Header & Payload Guard',
      category: 'Security',
      stack: 'Node.js · Security Middleware',
      summary: 'Defensive HTTP header hardening, sliding-window rate limiter, and payload sanitization.',
      repo: 'https://github.com/mohomadxmd/obsidian-guard',
      image: 'assets/images/hero_cyber_core.jpg',
    },
    {
      title: 'MOHOMAD XMD Cyber Portal',
      category: 'Web Platforms',
      stack: 'HTML · CSS · JavaScript · Express',
      summary: 'Full-stack obsidian, gold & silver portfolio with browser-native crypto utilities and Railway support.',
      repo: 'https://github.com/mohomadxmd/mohomad-xmd-web',
      image: 'assets/images/hero_cyber_core.jpg',
    },
  ];

  const WA_COMMANDS = [
    { cmd: '.menu', output: 'MOHOMAD XMD Bot Menu\nMode: Public · Prefix: .\nModules: Core, AI, Media, Admin' },
    { cmd: '.ping', output: 'MOHOMAD XMD Gateway\nResponse: 42 ms · Node.js 22 LTS' },
    { cmd: '.ai', output: 'AI Prompt Engine ready. Provide a query after .ai' },
    { cmd: '.antilink', output: 'Group Anti-Link Guard: ENABLED' },
    { cmd: '.owner', output: 'Developer: MOHOMAD XMD · Telegram: @mohomadxmd' },
  ];

  // Loading Screen
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPct = document.getElementById('loader-percent');
  const skipBtn = document.getElementById('skip-loader');
  let progress = 0;

  function finishLoader() {
    if (!loader) return;
    loader.style.opacity = '0';
    setTimeout(() => loader.classList.add('hidden'), 320);
  }

  const loaderTimer = setInterval(() => {
    progress = Math.min(100, progress + Math.floor(Math.random() * 20) + 16);
    if (loaderBar) loaderBar.style.width = `${progress}%`;
    if (loaderPct) loaderPct.textContent = `${progress}%`;
    if (progress >= 100) {
      clearInterval(loaderTimer);
      setTimeout(finishLoader, 180);
    }
  }, 90);

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearInterval(loaderTimer);
      finishLoader();
    });
  }

  // Live Digital Clock
  const timeEl = document.getElementById('live-time');
  const dateEl = document.getElementById('live-date');
  const yearEl = document.getElementById('year-now');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function updateClock() {
    const now = new Date();
    if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Animated Canvas Background
  const canvas = document.getElementById('cyber-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const nodes = Array.from({ length: w < 768 ? 24 : 46 }, (_, idx) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      gold: idx % 3 === 0,
    }));

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? 'rgba(212,175,55,0.55)' : 'rgba(196,202,212,0.35)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.gold || q.gold ? `rgba(212,175,55,${(1 - d / 135) * 0.14})` : `rgba(180,188,200,${(1 - d / 135) * 0.1})`;
            ctx.stroke();
          }
        }
      }
      if (!reduced && !document.hidden) requestAnimationFrame(draw);
    }
    draw();
  }

  // SPA Navigation
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  function navigateTo(pageId) {
    const target = PAGES.includes(pageId) ? pageId : 'home';
    document.querySelectorAll('.page-view').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `page-${target}`);
    });
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-nav') === target);
    });
    if (window.location.hash !== `#${target}`) {
      history.pushState(null, '', `#${target}`);
    }
    if (mobileDrawer) mobileDrawer.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.getAttribute('data-nav'));
    });
  });

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.toggle('hidden'));
  }

  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash.replace('#', ''));
  });
  navigateTo(window.location.hash.replace('#', '') || 'home');

  // Projects Filter & Search
  const projectsGrid = document.getElementById('projects-grid');
  const projectSearch = document.getElementById('project-search');
  let currentCat = 'All';

  function renderProjects() {
    if (!projectsGrid) return;
    const q = (projectSearch?.value || '').trim().toLowerCase();
    const list = PROJECTS.filter((p) => {
      const catOk = currentCat === 'All' || p.category === currentCat;
      const qOk = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      return catOk && qOk;
    });
    projectsGrid.innerHTML = list
      .map(
        (p) => `
      <article class="glass-panel" style="overflow:hidden;display:flex;flex-direction:column;">
        <div style="aspect-ratio:16/10;overflow:hidden;"><img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;" /></div>
        <div class="panel-pad">
          <p class="kicker">${p.category} · ${p.stack}</p>
          <h3 style="margin-top:6px;">${p.title}</h3>
          <p class="body-copy">${p.summary}</p>
          <div class="cta-row"><a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="btn-gold">Open Repository</a></div>
        </div>
      </article>`
      )
      .join('');
  }
  renderProjects();

  document.querySelectorAll('#project-filters .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#project-filters .seg-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat') || 'All';
      renderProjects();
    });
  });
  if (projectSearch) projectSearch.addEventListener('input', renderProjects);

  // AI Tools Tabs & Logic
  document.querySelectorAll('#tool-tabs .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tool');
      document.querySelectorAll('#tool-tabs .seg-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tool-pane').forEach((p) => p.classList.toggle('active', p.id === `tool-${target}`));
    });
  });

  const pRole = document.getElementById('p-role');
  const pFormat = document.getElementById('p-format');
  const pTask = document.getElementById('p-task');
  const pOut = document.getElementById('p-output');

  function updatePromptPreview() {
    if (!pOut) return;
    pOut.textContent = `Role: ${pRole.value}\n\nObjective:\n${pTask.value}\n\nOutput Format:\n${pFormat.value}`;
  }
  [pRole, pFormat, pTask].forEach((el) => el && el.addEventListener('input', updatePromptPreview));
  updatePromptPreview();

  document.getElementById('copy-prompt-btn')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(pOut.textContent);
  });

  document.getElementById('hash-btn')?.addEventListener('click', async () => {
    const val = document.getElementById('c-input').value;
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(val));
    const hex = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('c-output').textContent = `SHA-256:\n${hex}`;
  });

  document.getElementById('b64-enc-btn')?.addEventListener('click', () => {
    const val = document.getElementById('c-input').value;
    document.getElementById('c-output').textContent = btoa(unescape(encodeURIComponent(val)));
  });

  document.getElementById('b64-dec-btn')?.addEventListener('click', () => {
    try {
      const val = document.getElementById('c-input').value.trim();
      document.getElementById('c-output').textContent = decodeURIComponent(escape(atob(val)));
    } catch {
      document.getElementById('c-output').textContent = 'Invalid Base64 string.';
    }
  });

  document.getElementById('json-pretty-btn')?.addEventListener('click', () => {
    const box = document.getElementById('j-input');
    const status = document.getElementById('j-status');
    try {
      box.value = JSON.stringify(JSON.parse(box.value), null, 2);
      status.textContent = 'Valid JSON formatted.';
    } catch (e) {
      status.textContent = e.message;
    }
  });

  document.getElementById('json-min-btn')?.addEventListener('click', () => {
    const box = document.getElementById('j-input');
    const status = document.getElementById('j-status');
    try {
      box.value = JSON.stringify(JSON.parse(box.value));
      status.textContent = 'Valid JSON minified.';
    } catch (e) {
      status.textContent = e.message;
    }
  });

  document.getElementById('keygen-btn')?.addEventListener('click', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const arr = new Uint32Array(32);
    crypto.getRandomValues(arr);
    document.getElementById('k-output').textContent = 'XMD_' + Array.from(arr, (n) => chars[n % chars.length]).join('');
  });

  document.getElementById('copy-keygen-btn')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(document.getElementById('k-output').textContent);
  });

  // WhatsApp Bot Simulator & .env Generator
  const waCmdList = document.getElementById('wa-cmd-list');
  const waCmdOut = document.getElementById('wa-cmd-output');
  if (waCmdList && waCmdOut) {
    waCmdOut.textContent = WA_COMMANDS[0].output;
    WA_COMMANDS.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = idx === 0 ? 'btn-gold' : 'btn-silver';
      btn.textContent = item.cmd;
      btn.addEventListener('click', () => {
        waCmdOut.textContent = item.output;
      });
      waCmdList.appendChild(btn);
    });
  }

  function updateWaEnv() {
    const name = document.getElementById('wa-name')?.value || 'MOHOMAD-XMD';
    const owner = document.getElementById('wa-owner')?.value || '94700000000';
    const prefix = document.getElementById('wa-prefix')?.value || '.';
    const preview = document.getElementById('wa-env-preview');
    if (preview) {
      preview.textContent = `BOT_NAME="${name}"\nOWNER_NUMBER="${owner}"\nPREFIX="${prefix}"\nBOT_MODE="public"\nPORT=3000`;
    }
  }
  ['wa-name', 'wa-owner', 'wa-prefix'].forEach((id) => document.getElementById(id)?.addEventListener('input', updateWaEnv));
  updateWaEnv();

  function downloadTextFile(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  document.getElementById('wa-env-dl')?.addEventListener('click', () => {
    downloadTextFile('mohomad-xmd-wa.env', document.getElementById('wa-env-preview').textContent);
  });

  // Telegram Webhook Builder
  const tgMsg = document.getElementById('tg-msg');
  const tgCode = document.getElementById('tg-code');
  function updateTgCode() {
    if (!tgCode || !tgMsg) return;
    tgCode.textContent = `app.post('/telegram/webhook', async (req, res) => {\n  const chatId = req.body?.message?.chat?.id;\n  if (chatId) {\n    // Send reply: ${JSON.stringify(tgMsg.value)}\n  }\n  res.sendStatus(200);\n});`;
  }
  tgMsg?.addEventListener('input', updateTgCode);
  updateTgCode();

  document.getElementById('copy-tg-btn')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(tgCode.textContent);
  });

  // Downloads Page Buttons
  document.getElementById('dl-railway-env')?.addEventListener('click', () => {
    downloadTextFile('.env.example', 'PORT=3000\nNODE_ENV=production\nOWNER_WHATSAPP=94700000000\nOWNER_TELEGRAM=mohomadxmd\n');
  });

  document.getElementById('dl-bot-pkg')?.addEventListener('click', () => {
    downloadTextFile('bot-package.json', JSON.stringify({ name: 'mohomad-xmd-bot', version: '1.0.0', type: 'module', scripts: { start: 'node index.js' }, dependencies: { express: '^4.21.2', dotenv: '^16.4.7' } }, null, 2));
  });

  // Contact Form -> POST /api/contact
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactStatus.textContent = 'Sending inquiry...';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('f-name').value,
          email: document.getElementById('f-email').value,
          subject: document.getElementById('f-subject').value,
          message: document.getElementById('f-message').value,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      contactStatus.textContent = `${data.message} (Ref: ${data.referenceId})`;
      contactForm.reset();
    } catch (err) {
      contactStatus.textContent = err.message;
    }
  });

  // Global Search Modal
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('global-search-results');

  const SEARCH_INDEX = [
    { label: 'Home Page', page: 'home' },
    { label: 'About Me · Developer Profile', page: 'about' },
    { label: 'My Projects · Portfolio', page: 'projects' },
    { label: 'AI Tools · Prompt, SHA-256, JSON & Keygen', page: 'ai-tools' },
    { label: 'WhatsApp Bots · Command Simulator & .env', page: 'whatsapp-bots' },
    { label: 'Telegram Bots · Webhook Builder', page: 'telegram-bots' },
    { label: 'Downloads · Configs & Packages', page: 'downloads' },
    { label: 'Contact Me · Direct & Form', page: 'contact' },
  ];

  function renderSearch(q) {
    if (!searchResults) return;
    const term = (q || '').toLowerCase();
    const hits = SEARCH_INDEX.filter((item) => item.label.toLowerCase().includes(term));
    searchResults.innerHTML = '';
    hits.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-item';
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        navigateTo(item.page);
      });
      searchResults.appendChild(btn);
    });
  }

  function openSearch() {
    searchModal?.classList.remove('hidden');
    renderSearch('');
    setTimeout(() => searchInput?.focus(), 40);
  }

  document.getElementById('open-search-btn')?.addEventListener('click', openSearch);
  document.getElementById('hero-search-btn')?.addEventListener('click', openSearch);
  document.getElementById('close-search-btn')?.addEventListener('click', () => searchModal?.classList.add('hidden'));
  searchInput?.addEventListener('input', () => renderSearch(searchInput.value));
})();
