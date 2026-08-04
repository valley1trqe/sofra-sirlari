/* ============================================================
   Sofra Sırları — Ortak site scripti
   Header/footer enjeksiyonu, favoriler, arama, kart render
   ============================================================ */

/* ═══════════════════════════════════════════════════════════
   ADSTERRA REKLAM AYARI — Onay geldikten sonra SADECE burayı doldurun.
   Adsterra panelinde her banner boyutu için bir "reklam birimi"
   oluşturursunuz ve size bir KEY verir (32 karakterlik bir dizi).
   O key'leri aşağıdaki ilgili boyutun karşısına yapıştırın.
   Boş bırakılan boyutlar "REKLAM ALANI" yer tutucusu olarak kalır.

   Hangi alan hangi boyutu kullanıyor:
     • Header altı & liste içi  → 728x90   (leaderboard)
     • Tarif içi bloklar        → 300x250  (rectangle)
     • Yan panel (masaüstü)     → 300x600  (halfpage)
     • Mobil yapışkan alt       → 320x50   (mobile)
   ═══════════════════════════════════════════════════════════ */
  window.ADSTERRA_KEYS = {
    "728x90":  "a7f84dcfb29deecb92c60581e7154d15",
    "300x250": "7f227c97af9fce8b6692d2824ceedf4f",
    "300x600": "",
    "320x50":  "5681ec6cb115e9ead9de1196a8a033ab"
  };

(function () {
  // Vercel Web Analytics (düz HTML/statik site yöntemi)
  (function loadVercelAnalytics() {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    var s = document.createElement("script");
    s.defer = true;
    s.src = "/_vercel/insights/script.js";
    document.head.appendChild(s);
  })();

  // Bir reklam kutusuna Adsterra banner'ı yerleştirir (iframe izolasyonuyla)
  function placeAdsterra(slot, size) {
    var key = (window.ADSTERRA_KEYS || {})[size];
    if (!key) return false; // key yoksa yer tutucu kalsın
    var dims = size.split("x");
    var w = parseInt(dims[0], 10), h = parseInt(dims[1], 10);
    // Her banner kendi iframe'inde çalışır (Adsterra script'leri çakışmasın)
    var iframe = document.createElement("iframe");
    iframe.style.width = w + "px";
    iframe.style.height = h + "px";
    iframe.style.border = "0";
    iframe.style.overflow = "hidden";
    iframe.scrolling = "no";
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("marginheight", "0");
    slot.innerHTML = "";
    slot.appendChild(iframe);
    var doc = iframe.contentWindow.document;
    doc.open();
    doc.write(
      '<body style="margin:0">' +
      '<script type="text/javascript">' +
      'atOptions={"key":"' + key + '","format":"iframe","height":' + h + ',"width":' + w + ',"params":{}};' +
      '<\/script>' +
      '<script src="//www.highperformanceformat.com/' + key + '/invoke.js"><\/script>' +
      '</body>'
    );
    doc.close();
    return true;
  }
  window._placeAdsterra = placeAdsterra;

  // Sayfa köküne göre yol öneki (alt klasörlerde ../)
  const ROOT = (function () {
    const path = location.pathname;
    if (/\/(tarifler|kategori|blog)\//.test(path)) return "../";
    return "";
  })();

  const CAT_LIST = [
    ["ana-yemekler", "Ana Yemekler"],
    ["corbalar", "Çorbalar"],
    ["tatlilar", "Tatlılar"],
    ["hamur-isleri", "Hamur İşleri"],
    ["kahvaltilik", "Kahvaltılıklar"],
    ["salata-meze", "Salatalar"],
  ];

  /* ---------- Header ---------- */
  function buildHeader() {
    const catLinks = CAT_LIST.map(
      ([slug, name]) => `<a href="${ROOT}kategori/${slug}.html">${name}</a>`
    ).join("");

    return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="${ROOT}index.html" class="logo">
          <span class="logo-mark">🍴</span>Sofra<em>Sırları</em>
        </a>
        <button class="nav-toggle" aria-label="Menüyü aç" id="navToggle"><span></span></button>
        <nav class="main-nav" id="mainNav">
          <a href="${ROOT}index.html">Ana Sayfa</a>
          <a href="${ROOT}tarifler.html">Tarifler</a>
          <div class="has-drop">
            <a href="${ROOT}tarifler.html">Kategoriler ▾</a>
            <div class="dropdown">${catLinks}</div>
          </div>
          <a href="${ROOT}tarifler.html?filter=pratik">Pratik Tarifler</a>
          <a href="${ROOT}blog.html">Blog</a>
          <a href="${ROOT}hakkimizda.html">Hakkımızda</a>
          <a href="${ROOT}iletisim.html">İletişim</a>
          <a href="${ROOT}favoriler.html" title="Favorilerim">❤️</a>
        </nav>
      </div>
    </header>`;
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    const catLinks = CAT_LIST.map(
      ([slug, name]) => `<a href="${ROOT}kategori/${slug}.html">${name}</a>`
    ).join("");
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${ROOT}index.html" class="logo"><span class="logo-mark">🍴</span>Sofra Sırları</a>
            <p>Evinizde kolayca hazırlayabileceğiniz pratik, ekonomik ve lezzetli tarifleri bir araya getiren bağımsız yemek platformu.</p>
            <div class="social-row">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="TikTok">🎵</a>
              <a href="#" aria-label="YouTube">▶️</a>
              <a href="#" aria-label="Pinterest">📌</a>
              <a href="#" aria-label="Facebook">👍</a>
            </div>
          </div>
          <div>
            <h4>Kategoriler</h4>
            ${catLinks}
          </div>
          <div>
            <h4>Keşfet</h4>
            <a href="${ROOT}tarifler.html">Tüm Tarifler</a>
            <a href="${ROOT}tarifler.html?filter=populer">Popüler Tarifler</a>
            <a href="${ROOT}tarifler.html?filter=yeni">En Yeni Tarifler</a>
            <a href="${ROOT}blog.html">Blog Yazıları</a>
            <a href="${ROOT}favoriler.html">Favorilerim</a>
          </div>
          <div>
            <h4>Kurumsal</h4>
            <a href="${ROOT}hakkimizda.html">Hakkımızda</a>
            <a href="${ROOT}iletisim.html">İletişim</a>
            <a href="${ROOT}gizlilik.html">Gizlilik Politikası</a>
            <a href="${ROOT}kullanim-kosullari.html">Kullanım Koşulları</a>
            <a href="${ROOT}cerez-politikasi.html">Çerez Politikası</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Sofra Sırları. Tüm hakları saklıdır.</span>
          <span>İş birliği: isbirligi@sofrasirlari.com.tr</span>
        </div>
      </div>
    </footer>
    <div class="ad-slot ad-sticky-mobile">REKLAM ALANI<small>Mobil yapışkan reklam · 320×50</small></div>
    <div class="toast" id="toast"></div>`;
  }

  /* ---------- Favoriler (bellek içi + oturum) ---------- */
  const FAV_KEY = "ld_favorites";
  function getFavs() {
    try {
      return JSON.parse(sessionStorage.getItem(FAV_KEY) || "[]");
    } catch (e) {
      return window.__favs || [];
    }
  }
  function setFavs(arr) {
    window.__favs = arr;
    try {
      sessionStorage.setItem(FAV_KEY, JSON.stringify(arr));
    } catch (e) {}
  }
  function isFav(slug) {
    return getFavs().indexOf(slug) !== -1;
  }
  function toggleFav(slug, name) {
    const favs = getFavs();
    const i = favs.indexOf(slug);
    if (i === -1) {
      favs.push(slug);
      toast(`"${name}" favorilere eklendi ❤️`);
    } else {
      favs.splice(i, 1);
      toast(`"${name}" favorilerden çıkarıldı`);
    }
    setFavs(favs);
    return i === -1;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------- Tarif kartı HTML ---------- */
  function recipeCard(r) {
    const favActive = isFav(r.slug) ? "active" : "";
    const emoji = (window.CATEGORIES && window.CATEGORIES[r.category] && window.CATEGORIES[r.category].emoji) || "🍽️";
    return `
    <article class="recipe-card" data-slug="${r.slug}">
      <a href="${ROOT}tarifler/${r.slug}.html" class="thumb" data-emoji="${emoji}">
        <img src="${ROOT}images/${r.slug}.webp" alt="${r.name}" loading="lazy" onerror="this.remove()">
        <span class="cat-tag">${r.categoryName}</span>
      </a>
      <button class="fav-btn ${favActive}" data-fav="${r.slug}" data-name="${r.name}" aria-label="Favorilere ekle">❤</button>
      <div class="body">
        <h3><a href="${ROOT}tarifler/${r.slug}.html">${r.name}</a></h3>
        <p class="desc">${r.shortDescription}</p>
        <div class="meta">
          <span class="rating">★ ${r.rating.toFixed(1)}</span>
          <span>⏱ ${r.totalTime} dk</span>
          <span>🔥 ${r.difficulty}</span>
        </div>
      </div>
    </article>`;
  }

  /* Reklam aralı grid: her 6 karttan sonra inline reklam (doküman bölüm 19) */
  function renderGridWithAds(container, list) {
    let html = "";
    list.forEach((r, i) => {
      html += recipeCard(r);
      if ((i + 1) % 6 === 0 && i !== list.length - 1) {
        html += `<div class="ad-slot ad-inline ad-grid-full">REKLAM ALANI<small>Liste içi reklam · 728×90</small></div>`;
      }
    });
    container.innerHTML = html;
  }

  /* ---------- Arama önerisi ---------- */
  function attachSearch(input, resultsBox) {
    if (!input) return;
    input.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      if (!resultsBox) return;
      if (q.length < 2) {
        resultsBox.style.display = "none";
        return;
      }
      const matches = (window.RECIPES || [])
        .filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.categoryName.toLowerCase().includes(q) ||
            r.ingredients.join(" ").toLowerCase().includes(q)
        )
        .slice(0, 6);
      resultsBox.innerHTML = matches.length
        ? matches
            .map(
              (r) =>
                `<a href="${ROOT}tarifler/${r.slug}.html" style="display:block;padding:10px 14px;border-bottom:1px solid var(--color-border);font-size:14px;">${r.name} <span style="color:var(--color-muted);font-size:12px;">· ${r.categoryName}</span></a>`
            )
            .join("")
        : `<div style="padding:12px 14px;color:var(--color-muted);font-size:14px;">Sonuç bulunamadı</div>`;
      resultsBox.style.display = "block";
    });
    document.addEventListener("click", (e) => {
      if (resultsBox && !input.contains(e.target) && !resultsBox.contains(e.target))
        resultsBox.style.display = "none";
    });
  }

  /* ---------- Global olaylar ---------- */
  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const favBtn = e.target.closest("[data-fav]");
      if (favBtn) {
        e.preventDefault();
        const active = toggleFav(favBtn.dataset.fav, favBtn.dataset.name);
        favBtn.classList.toggle("active", active);
      }
    });
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => nav.classList.toggle("open"));
    }
    // hero / genel arama formu yönlendirme
    document.querySelectorAll("[data-search-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = form.querySelector("input").value.trim();
        location.href = `${ROOT}tarifler.html?q=${encodeURIComponent(val)}`;
      });
    });
    // newsletter & iletişim formları (demo)
    document.querySelectorAll("[data-demo-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        toast(form.dataset.demoForm || "Talebiniz alındı, teşekkürler!");
        form.reset();
      });
    });
  }

  /* ---------- Dışa aç ---------- */
  window.LD = {
    ROOT,
    recipeCard,
    renderGridWithAds,
    attachSearch,
    getFavs,
    isFav,
    toggleFav,
    toast,
    CAT_LIST,
  };

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    const h = document.getElementById("site-header-mount");
    const f = document.getElementById("site-footer-mount");
    if (h) h.innerHTML = buildHeader();
    if (f) f.innerHTML = buildFooter();
    bindGlobal();
    // aktif menü işareti
    const here = location.pathname.split("/").pop();
    document.querySelectorAll(".main-nav a").forEach((a) => {
      if (a.getAttribute("href") && a.getAttribute("href").endsWith(here) && here)
        a.classList.add("active");
    });
    if (typeof window.pageInit === "function") window.pageInit();
    activateAds();
  });

  // Kimlik girildiyse .ad-slot yer tutucularını gerçek AdSense birimine çevir
  function activateAds() {
    var keys = window.ADSTERRA_KEYS || {};
    var hasAny = keys["728x90"] || keys["300x250"] || keys["300x600"] || keys["320x50"];
    if (!hasAny) return; // hiç key yoksa yer tutucular kalsın
    document.querySelectorAll(".ad-slot").forEach(function (slot) {
      if (slot.dataset.adDone) return;
      // Boyutu belirle: önce kutudaki metin (small), sonra sınıf
      var size = "728x90";
      var txt = slot.textContent || "";
      if (/300\D?250/.test(txt)) size = "300x250";
      else if (/300\D?600/.test(txt)) size = "300x600";
      else if (/320\D?50/.test(txt)) size = "320x50";
      else if (slot.classList.contains("ad-sidebar")) size = "300x600";
      else if (slot.classList.contains("ad-sticky-mobile")) size = "320x50";
      // Key varsa yerleştir
      if (window._placeAdsterra(slot, size)) {
        slot.dataset.adDone = "1";
        slot.classList.add("ad-live");
      }
    });
  }
})();
