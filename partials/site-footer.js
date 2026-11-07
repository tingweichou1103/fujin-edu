/* 富錦文教 ── 共用網站頁尾（footer）
   用法：在 <body> 末端放置 <div id="site-footer"></div>，
   並於其後加入 <script src="partials/site-footer.js"></script>。 */
(function () {
  var HTML = `
<footer class="site-foot">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <a class="foot-brand-logo" href="index.html" aria-label="富錦文教首頁">
        <img src="assets/fujin-logo-white.png" alt="富錦文教">
      </a>
      <div class="foot-social">
        <a href="https://www.facebook.com/FujinEdu" target="_blank" rel="noopener" aria-label="Facebook">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/fujinedu/" target="_blank" rel="noopener" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
    <div class="foot-col">
      <h4>課程介紹</h4>
      <ul>
        <li><a href="senior.html">高中課程</a></li>
        <li><a href="junior.html">國中課程</a></li>
        <li><a href="tutor.html">個別輔導</a></li>
        <li><a href="cross.html">跨領域課程</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h4>品牌資訊</h4>
      <ul>
        <li><a href="news.html">最新消息</a></li>
        <li><a href="about.html">關於富錦</a></li>
        <li><a href="contact.html">聯絡我們</a></li>
      </ul>
    </div>
    <div class="foot-col foot-contact-col">
      <h4>聯絡資訊</h4>
      <ul>
        <li class="foot-info-text"><i class="fa-solid fa-phone"></i> <a href="tel:035963111">03-5963111</a></li>
        <li class="foot-info-text"><i class="fa-solid fa-location-dot"></i> <span>新竹縣竹東鎮健行路8號1樓</span></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <span class="foot-mark">富錦文教 Fujin Academy</span>
    <span>Copyright © 2026 富錦文教有限公司 All Rights Reserved.</span>
  </div>
</footer>`;

  var mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.insertAdjacentHTML('beforebegin', HTML);
  mount.remove();

  // 依目前頁面標記 active
  var page = decodeURIComponent((location.pathname.split('/').pop() || ''));
  document.querySelectorAll('.site-foot .foot-col a').forEach(function (a) {
    if (a.getAttribute('href') === page) {
      a.classList.add('active');
    }
  });

  // 自動加載共用預約試聽懸浮按鈕
  if (!document.querySelector('.float-booking-btn')) {
    var btnHTML = `
<a class="float-booking-btn" href="contact.html" aria-label="預約試聽">
  <span>預約</span>
  <span>試聽</span>
</a>`;
    document.body.insertAdjacentHTML('beforeend', btnHTML);
  }

  // 自動加載共用回到頂部懸浮按鈕
  if (!document.querySelector('.back-to-top-btn')) {
    var topBtnHTML = `
<button class="back-to-top-btn" id="backToTopBtn" aria-label="回到最上層">
  <i class="fa-solid fa-chevron-up"></i>
</button>`;
    document.body.insertAdjacentHTML('beforeend', topBtnHTML);

    var topBtn = document.getElementById('backToTopBtn');
    if (topBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          topBtn.classList.add('show');
        } else {
          topBtn.classList.remove('show');
        }
      });

      topBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
})();

