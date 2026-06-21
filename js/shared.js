/* ============================================
   PongPong — Shared JavaScript
   Navigation, i18n, scroll effects
   ============================================ */

// ── Navigation HTML Generator ──
function renderNav(activePage) {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="images/pongpongicon.jpg" alt="PongPong">
        <span>PongPong</span>
      </a>
      <ul class="nav-links" id="navLinks">
        <li><a href="features.html" data-i18n="nav_features" ${activePage==='features'?'class="active"':''}>功能</a></li>
        <li><a href="commands.html" data-i18n="nav_commands" ${activePage==='commands'?'class="active"':''}>指令</a></li>
        <li><a href="about.html" data-i18n="nav_about" ${activePage==='about'?'class="active"':''}>關於</a></li>
        <li><a href="support.html" data-i18n="nav_support" ${activePage==='support'?'class="active"':''}>支援</a></li>
      </ul>
      <div class="nav-right">
        <div class="lang-switcher">
          <button class="lang-btn" onclick="switchLang('zh')">中</button>
          <button class="lang-btn" onclick="switchLang('en')">EN</button>
          <button class="lang-btn" onclick="switchLang('ja')">日</button>
        </div>
        <a href="https://discord.com/oauth2/authorize?client_id=1303657098498977812&permissions=1194000&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener" class="nav-cta" data-i18n="nav_invite">✦ 邀請 Bot</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;

  // Mobile toggle
  document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('open');
  });
}

// ── Footer HTML Generator ──
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">
            <img src="images/pongpongicon.jpg" alt="PongPong">
            <span>PongPong</span>
          </a>
          <p data-i18n="footer_desc">跨越語言隔閡，您的 Discord 全能助理。由 Hijiri 獨立開發與維護。</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer_product">產品</h4>
          <ul>
            <li><a href="features.html" data-i18n="nav_features">功能</a></li>
            <li><a href="commands.html" data-i18n="nav_commands">指令</a></li>
            <li><a href="about.html" data-i18n="nav_about">關於</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer_resources">資源</h4>
          <ul>
            <li><a href="support.html" data-i18n="nav_support">支援</a></li>
            <li><a href="https://discord.gg/r8grruws" target="_blank" rel="noopener">Discord</a></li>
            <li><a href="https://github.com/james8976" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer_legal">法律</h4>
          <ul>
            <li><a href="terms.html" data-i18n="footer_terms">服務條款</a></li>
            <li><a href="privacy.html" data-i18n="footer_privacy">隱私權政策</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025–2026 PongPong. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="mailto:a34159@gmail.com">a34159@gmail.com</a>
        </div>
      </div>
    </div>`;
}

// ── Shared i18n Data ──
const sharedI18n = {
  zh: {
    nav_features:'功能', nav_commands:'指令', nav_about:'關於',
    nav_support:'支援', nav_invite:'✦ 邀請 Bot',
    footer_desc:'跨越語言隔閡，您的 Discord 全能助理。由 Hijiri 獨立開發與維護。',
    footer_product:'產品', footer_resources:'資源', footer_legal:'法律',
    footer_terms:'服務條款', footer_privacy:'隱私權政策',
  },
  en: {
    nav_features:'Features', nav_commands:'Commands', nav_about:'About',
    nav_support:'Support', nav_invite:'✦ Invite Bot',
    footer_desc:'Break language barriers — your all-in-one Discord assistant. Independently developed by Hijiri.',
    footer_product:'Product', footer_resources:'Resources', footer_legal:'Legal',
    footer_terms:'Terms of Service', footer_privacy:'Privacy Policy',
  },
  ja: {
    nav_features:'機能', nav_commands:'コマンド', nav_about:'概要',
    nav_support:'サポート', nav_invite:'✦ Botを招待',
    footer_desc:'言語の壁を越える、Discord多機能アシスタント。Hijiriが独自に開発・運営。',
    footer_product:'プロダクト', footer_resources:'リソース', footer_legal:'法的情報',
    footer_terms:'利用規約', footer_privacy:'プライバシーポリシー',
  }
};

// ── i18n Engine ──
let currentLang = localStorage.getItem('pongpong-lang') || 'zh';

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('pongpong-lang', lang);
  document.documentElement.lang = lang;

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`.lang-btn`).forEach(b => {
    const map = { '中': 'zh', 'EN': 'en', '日': 'ja' };
    if (map[b.textContent.trim()] === lang) b.classList.add('active');
  });

  // Merge shared + page i18n
  const merged = { ...(sharedI18n[lang] || {}), ...((window.pageI18n && window.pageI18n[lang]) || {}) };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (merged[key]) el.textContent = merged[key];
  });

  // Page title update
  if (window.pageTitles && window.pageTitles[lang]) {
    document.title = window.pageTitles[lang];
  }

  // Custom callback
  if (window.onLangSwitch) window.onLangSwitch(lang);
}

// ── Init ──
function initShared(activePage) {
  renderNav(activePage);
  renderFooter();
  switchLang(currentLang);

  // Navbar scroll effect
  const navbar = document.getElementById('site-nav');
  const btt = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
