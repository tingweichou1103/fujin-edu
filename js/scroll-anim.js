(function () {
  function initScrollAnim() {
    var elements = document.querySelectorAll(".scroll-anim");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      // Fallback for older browsers
      elements.forEach(function (el) {
        el.style.opacity = "1";
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var animClass = el.getAttribute("data-anim") || "animate__fadeInUp";
          var delay = el.getAttribute("data-delay");
          if (delay) {
            el.style.animationDelay = delay;
          }
          el.classList.add("animate__animated", animClass);
          el.style.opacity = "1";
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });

    elements.forEach(function (el) {
      observer.observe(el);
    });

    // Safety fallback: Ensure all elements become visible after 2 seconds
    // in case of any network delay, CDN script blocking, or browser edge case.
    setTimeout(function () {
      elements.forEach(function (el) {
        if (getComputedStyle(el).opacity === "0") {
          el.style.opacity = "1";
        }
      });
    }, 2000);

    initStatCounters();
  }

  function initStatCounters() {
    var statsWrap = document.querySelector(".ph-stats");
    var countEls = document.querySelectorAll("[data-count-to]");
    var charSeqEls = document.querySelectorAll("[data-char-seq]");
    if (!countEls.length && !charSeqEls.length) return;

    function runCounter(el, delayMs) {
      var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
      var suffix = el.getAttribute("data-count-suffix") || "";
      var item = el.closest(".ph-stat-item");
      var stepInterval = target > 8 ? 115 : 150;

      setTimeout(function () {
        var current = 1;
        el.textContent = current + suffix;

        var timer = setInterval(function () {
          current += 1;
          if (current <= target) {
            el.textContent = current + suffix;
            el.classList.remove("stat-tick");
            void el.offsetWidth;
            el.classList.add("stat-tick");
          }
          if (current >= target) {
            clearInterval(timer);
            el.textContent = target + suffix;
            if (item) item.classList.add("stat-done");
          }
        }, stepInterval);
      }, delayMs);
    }

    function runCharSeq(el, delayMs) {
      var chars = el.querySelectorAll(".stat-ch");
      var item = el.closest(".ph-stat-item");
      setTimeout(function () {
        chars.forEach(function (ch, idx) {
          setTimeout(function () {
            ch.classList.add("show");
            if (idx === chars.length - 1 && item) {
              item.classList.add("stat-done");
            }
          }, idx * 260);
        });
      }, delayMs);
    }

    var started = false;
    function startAllStats() {
      if (started) return;
      started = true;

      countEls.forEach(function (el, idx) {
        runCounter(el, 80 + idx * 140);
      });

      charSeqEls.forEach(function (el) {
        runCharSeq(el, 280);
      });
    }

    // 等整個 .ph-stats 區塊由下往上進場動畫結束、完全就定位後，再開始跑數字動畫
    if (statsWrap) {
      statsWrap.addEventListener("animationend", function onEnd(e) {
        if (e.target === statsWrap) {
          statsWrap.removeEventListener("animationend", onEnd);
          startAllStats();
        }
      });
      // 安全備援：若瀏覽器未觸發 animationend，於進場動畫預計結束時間後啟動
      setTimeout(startAllStats, 1450);
    } else {
      startAllStats();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollAnim);
  } else {
    initScrollAnim();
  }
})();
