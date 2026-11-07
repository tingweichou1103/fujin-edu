/* 富錦文教 ── 共用預約試聽懸浮按鈕組件（Booking Widget）
   用法：可在頁面引入 <script src="partials/booking-widget.js"></script>，
   或由 site-footer.js 自動載入呈現。 */
(function () {
  if (document.querySelector('.float-booking-btn')) return;

  var HTML = `
<a class="float-booking-btn" href="contact.html" aria-label="預約試聽">
  <span>預約</span>
  <span>試聽</span>
</a>`;

  document.body.insertAdjacentHTML('beforeend', HTML);
})();
