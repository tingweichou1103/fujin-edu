/* 富錦文教 ── 共用網站頁首（header）
   用法：在 <body> 內放置 <div id="site-header"></div>，
   並於其後加入 <script src="partials/site-header.js"></script>。
   會自動依目前檔名標記 active 選單項目。 */
(function () {
  var HTML = `
<header class="site-head nav-gold">
  <input type="checkbox" id="navtog" class="nav-tog-input">
  <div class="head-inner">
    <a class="brand" href="index.html"><img src="assets/fujin-logo.png" alt="富錦文教"></a>
    
    <label for="navtog" class="nav-toggle" aria-label="開關選單">
      <span class="nav-btn-circle">
        <span class="hb-box">
          <span class="hb-line hb-1"></span>
          <span class="hb-line hb-2"></span>
          <span class="hb-line hb-3"></span>
        </span>
      </span>
    </label>

    <nav class="menu">
      <div class="menu-mobile-head">
        <a class="menu-mobile-brand" href="index.html">
          <img src="assets/fujin-logo-white.png" alt="富錦文教">
        </a>
        <a class="menu-cta-btn" href="contact.html">
          <span class="menu-cta-left">
          <i class="fa-solid fa-chalkboard-user"></i>
            預約試聽
          </span>
          <span class="menu-cta-arrow">
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        </a>
      </div>

      <div class="menu-links">
        <a href="news.html">最新消息</a>
        <a href="about.html">關於富錦</a>
        <div class="has-sub">
          <a href="senior.html">課程介紹<span class="caret"></span></a>
          <div class="submenu">
            <a href="senior.html">高中課程</a>
            <a href="junior.html">國中課程</a>
            <a href="tutor.html">個別輔導</a>
            <a href="cross.html">跨領域課程</a>
          </div>
        </div>
        <a href="faculty.html">強棒師資</a>
        <a href="contact.html">聯絡資訊</a>
      </div>
    </nav>
    
  </div>
</header>`;

  var mount = document.getElementById('site-header');
  if (!mount) return;
  mount.insertAdjacentHTML('beforebegin', HTML);
  mount.remove();

  // 依目前頁面標記 active
  var page = decodeURIComponent((location.pathname.split('/').pop() || ''));
  var courses = ['senior.html', 'junior.html', 'tutor.html', 'cross.html'];

  document.querySelectorAll('.site-head .menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) {
      a.classList.add('active');
    }
  });

  if (courses.indexOf(page) !== -1) {
    var parent = document.querySelector('.site-head .has-sub > a');
    if (parent) parent.classList.add('active');
  }

  if (!document.querySelector('link[href*="font-awesome"]')) {
    var faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(faLink);
  }
})();
