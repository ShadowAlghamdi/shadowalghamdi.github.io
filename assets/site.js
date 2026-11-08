/* Shared behaviour for every page. Content comes from assets/data.js (window.SITE). */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- icons ---------------- */
  var P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.2"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    github: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.4c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C5.8 1 4.7 1.3 4.7 1.3a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3.2 8.5c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.3V21"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    python: '<path d="M12 3c-4 0-4 1.8-4 3v2h4.5v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2.5c0-1.4 1.1-2.5 2.5-2.5h4c1.4 0 2.5-1.1 2.5-2.5V6c0-1.6-1.6-3-5.5-3z"/><path d="M12 21c4 0 4-1.8 4-3v-2h-4.5v-1H18c2 0 3-1.5 3-4"/><circle cx="10" cy="5.6" r=".6"/><circle cx="14" cy="18.4" r=".6"/>',
    java: '<path d="M7 17c2.5 1.2 7.5 1.2 10 0M8 20c2.5 1 5.5 1 8 0M10 3c2 2-2 3.5 0 6M14 5c1.5 1.5-1.5 2.5 0 4.5M6 13h11a2 2 0 0 1 0 4"/>',
    html: '<path d="M4 3l1.5 16L12 21l6.5-2L20 3z"/><path d="M15.5 7.5h-7l.3 3.5h6.4l-.4 4.5-2.8 1-2.8-1-.2-2"/>',
    js: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M11 9v6a2 2 0 0 1-3.5 1.3M17 9.5c-.4-.6-1-1-2-1-1.2 0-1.8.7-1.8 1.5 0 2 4 1.2 4 3.6 0 1-.8 1.9-2.2 1.9-1 0-1.8-.4-2.2-1.2"/>',
    board: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6V4M11 6V4M15 6V4M7 20v-2M11 20v-2M15 20v-2"/><circle cx="15.5" cy="12" r="2"/><path d="M7 11h4M7 13.5h3"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    mcu: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M4 7h3M4 11h3M4 15h3M17 7h3M17 11h3M17 15h3"/><circle cx="12" cy="7" r="1"/>',
    circuit: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 6h10M5 8v6a4 4 0 0 0 4 4h8M19 8v3h-6v3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    logic: '<path d="M4 8h4M4 16h4M8 5h4a7 7 0 0 1 0 14H8z"/><path d="M19 12h2"/>',
    signal: '<path d="M2 12h3l2-6 3 12 3-9 2 3h7"/>',
    puzzle: '<path d="M9 4h3.5a2 2 0 1 1 3 0H19v4a2 2 0 1 1 0 3v5h-4a2 2 0 1 0-3 0H8v-4a2 2 0 1 1 0-3V4z"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.8.6 1.5 1.6 1.5 2.6V17h4v-.5c0-1 .7-2 1.5-2.6A6 6 0 0 0 12 3z"/>',
    team: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.3"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15 14.5c3 0 5.5 1.7 5.5 4.5"/>',
    kanban: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16M5.5 8h1.5M11 8h2M11 11h2M17 8h1.5M17 11h1.5M17 14h1.5"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>'
  };
  P.ai = '<path d="M9.5 4A2.5 2.5 0 0 0 7 6.5 2.5 2.5 0 0 0 4.5 9a2.5 2.5 0 0 0 0 5A2.5 2.5 0 0 0 7 17.5 2.5 2.5 0 0 0 9.5 20H12V4z"/><path d="M14.5 4A2.5 2.5 0 0 1 17 6.5 2.5 2.5 0 0 1 19.5 9a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2.5 3.5 2.5 2.5 0 0 1-2.5 2.5H12V4z"/>';
  P.ml = '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7l3.5 3.5M7 17l3.5-3.5M13.5 10.5L17 7M13.5 13.5L17 17"/>';
  P.data = '<path d="M5 20V11M11 20V5M17 20v-7M3 20h18"/>';
  P.net = '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2h12v2"/>';
  P.git = '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M18 10c0 4-6 3-11 7"/>';
  P.vscode = '<path d="M17 3l4 2v14l-4 2L7.5 13 4 16l-2-1.5v-5L4 8l3.5 3L17 3zM17 8l-5 4 5 4z"/>';
  P.chat = '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>';
  P.power = '<path d="M12 3v8M6.3 7.5a8 8 0 1 0 11.4 0"/>';
  P.loop = '<path d="M4 12c0-2.2 1.8-4 4-4 4 0 4 8 8 8 2.2 0 4-1.8 4-4s-1.8-4-4-4c-4 0-4 8-8 8-2.2 0-4-1.8-4-4z"/>';

  function icon(name, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || "") + ">" + (P[name] || P.code) + "</svg>";
  }
  window.SiteIcon = icon;

  /* ---------------- generated project art ---------------- */
  function rng(seed) {
    var h = 2166136261;
    for (var i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () { h += 0x6D2B79F5; var t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function art(p, variant) {
    var r = rng(p.id + (variant || "")), W = 800, H = 500, g = "", i, j;
    var id = "g" + Math.floor(r() * 1e9);
    var defs = '<defs><linearGradient id="' + id + 'a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1E2640"/><stop offset="1" stop-color="#0B1329"/></linearGradient>' +
      '<radialGradient id="' + id + 'b" cx="' + (0.3 + r() * 0.4) + '" cy="' + (0.2 + r() * 0.4) + '" r=".7"><stop offset="0" stop-color="#3D4F68" stop-opacity=".9"/><stop offset="1" stop-color="#3D4F68" stop-opacity="0"/></radialGradient>' +
      '<pattern id="' + id + 'c" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#DDDFDB" stroke-opacity=".05"/></pattern></defs>';
    var bg = '<rect width="800" height="500" fill="url(#' + id + 'a)"/><rect width="800" height="500" fill="url(#' + id + 'b)"/><rect width="800" height="500" fill="url(#' + id + 'c)"/>';
    var c = p.category;
    if (c === "Embedded Systems") {
      for (i = 0; i < 16; i++) {
        var x = Math.round(r() * 20) * 40, y = Math.round(r() * 12) * 40, len = 80 + r() * 240, hz = r() > .5;
        var x2 = hz ? x + len : x, y2 = hz ? y : y + len * .6;
        var x3 = x2 + (r() > .5 ? 40 : -40), y3 = y2 + 40;
        g += '<path d="M' + x + ' ' + y + 'L' + x2 + ' ' + y2 + 'L' + x3 + ' ' + y3 + '" fill="none" stroke="#7F91AB" stroke-opacity="' + (.25 + r() * .5) + '" stroke-width="2"/><circle cx="' + x3 + '" cy="' + y3 + '" r="5" fill="#0B1329" stroke="#DDDFDB" stroke-opacity=".7" stroke-width="2"/>';
      }
      g += '<g transform="translate(320 170)"><rect width="160" height="160" rx="14" fill="#1E2640" stroke="#DDDFDB" stroke-opacity=".5" stroke-width="2"/><rect x="40" y="40" width="80" height="80" rx="8" fill="#3D4F68" fill-opacity=".6"/>';
      for (i = 0; i < 6; i++) { var o = 18 + i * 25; g += '<path d="M' + o + ' 0v-22M' + o + ' 160v22M0 ' + o + 'h-22M160 ' + o + 'h22" stroke="#DDDFDB" stroke-opacity=".6" stroke-width="3"/>'; }
      g += '<text x="80" y="86" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="14" fill="#DDDFDB" fill-opacity=".85">MCU</text></g>';
    } else if (c === "Artificial Intelligence") {
      var layers = [3, 5, 6, 5, 2], pts = [];
      for (i = 0; i < layers.length; i++) { pts.push([]); for (j = 0; j < layers[i]; j++) pts[i].push([130 + i * 135, 250 + (j - (layers[i] - 1) / 2) * 62]); }
      for (i = 0; i < layers.length - 1; i++) pts[i].forEach(function (a) { pts[i + 1].forEach(function (b) { g += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#7F91AB" stroke-opacity="' + (.08 + r() * .35) + '" stroke-width="1.4"/>'; }); });
      pts.forEach(function (L) { L.forEach(function (a) { g += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="11" fill="#1E2640" stroke="#DDDFDB" stroke-opacity=".8" stroke-width="2"/><circle cx="' + a[0] + '" cy="' + a[1] + '" r="4" fill="#DDDFDB" fill-opacity="' + (.3 + r() * .7) + '"/>'; }); });
    } else if (c === "Software Development") {
      g += '<g transform="translate(150 80)"><rect width="500" height="340" rx="16" fill="#0B1329" fill-opacity=".85" stroke="#DDDFDB" stroke-opacity=".25"/><path d="M0 44h500" stroke="#DDDFDB" stroke-opacity=".12"/>';
      g += '<circle cx="24" cy="22" r="6" fill="#3D4F68"/><circle cx="44" cy="22" r="6" fill="#3D4F68"/><circle cx="64" cy="22" r="6" fill="#7F91AB"/>';
      for (i = 0; i < 9; i++) { var ind = [0, 1, 2, 2, 1, 2, 3, 1, 0][i] * 24, w1 = 40 + r() * 80, w2 = 60 + r() * 170; g += '<text x="24" y="' + (82 + i * 28) + '" font-family="JetBrains Mono,monospace" font-size="12" fill="#DDDFDB" fill-opacity=".3">' + (i + 1) + '</text><rect x="' + (56 + ind) + '" y="' + (72 + i * 28) + '" width="' + w1 + '" height="10" rx="5" fill="#7F91AB" fill-opacity=".75"/><rect x="' + (64 + ind + w1) + '" y="' + (72 + i * 28) + '" width="' + w2 + '" height="10" rx="5" fill="#DDDFDB" fill-opacity="' + (.15 + r() * .3) + '"/>'; }
      g += '<rect x="56" y="324" width="10" height="16" fill="#DDDFDB"><animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/></rect></g>';
    } else if (c === "Data Science") {
      var base = 400, n = 14, bw = 30, prev = null, line = "";
      for (i = 0; i < n; i++) { var hgt = 60 + r() * 230, bx = 110 + i * 42; g += '<rect x="' + bx + '" y="' + (base - hgt) + '" width="' + bw + '" height="' + hgt + '" rx="5" fill="#3D4F68" fill-opacity="' + (.45 + r() * .4) + '"/>'; var ly = base - hgt - 30 - r() * 20; line += (i ? "L" : "M") + (bx + bw / 2) + " " + ly; prev = [bx + bw / 2, ly]; }
      g += '<path d="' + line + '" fill="none" stroke="#DDDFDB" stroke-width="2.5" stroke-linejoin="round"/><circle cx="' + prev[0] + '" cy="' + prev[1] + '" r="7" fill="#DDDFDB"/><path d="M90 ' + base + 'H720" stroke="#DDDFDB" stroke-opacity=".3"/>';
    } else {
      for (i = 0; i < 5; i++) for (j = 0; j < 8; j++) { var on = r() > .55; g += '<rect x="' + (110 + j * 74) + '" y="' + (70 + i * 74) + '" width="58" height="58" rx="10" fill="' + (on ? "#3D4F68" : "#1E2640") + '" fill-opacity="' + (on ? .9 : .6) + '" stroke="#DDDFDB" stroke-opacity="' + (on ? .5 : .12) + '"/>' + (on ? '<text x="' + (139 + j * 74) + '" y="' + (104 + i * 74) + '" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="15" fill="#DDDFDB" fill-opacity=".85">' + (r() > .5 ? "1" : "0") + "</text>" : ""); }
    }
    return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(p.title) + ' visual">' + defs + bg + g + "</svg>";
  }
  function media(p, variant) {
    if (!variant && p.image) return '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">';
    return art(p, variant);
  }

  /* ---------------- shared chrome ---------------- */
  function fillLinks() {
    var L = S.links || {};
    $$("[data-link]").forEach(function (a) {
      var k = a.getAttribute("data-link");
      if (k === "email") { a.href = "mailto:" + L.email; } else if (L[k]) { a.href = L[k]; a.target = "_blank"; a.rel = "noopener"; }
    });
    $$("[data-text]").forEach(function (el) { var k = el.getAttribute("data-text"); if (L[k]) el.textContent = L[k].replace(/^https?:\/\/(www\.)?/, ""); });
    $$("[data-cv]").forEach(function (a) {
      if (L.cv) { a.href = L.cv; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("download", ""); }
      else { a.href = "#"; a.addEventListener("click", function (e) { e.preventDefault(); toast("The CV will be available for download soon. Meanwhile, feel free to reach out through the contact page."); }); }
    });
    var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  }

  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 4200);
  }
  window.SiteToast = toast;

  function nav() {
    var navEl = $(".nav"), btn = $(".nav__toggle"), menu = $("#mobile-menu");
    var onScroll = function () { if (navEl) navEl.classList.toggle("is-scrolled", window.scrollY > 20); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    if (!btn || !menu) return;
    var set = function (open) {
      btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open); menu.setAttribute("aria-hidden", !open);
      document.body.style.overflow = open ? "hidden" : "";
      $$("a", menu).forEach(function (a) { a.tabIndex = open ? 0 : -1; });
    };
    set(false);
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) set(false); });
  }

  function toTop() {
    var b = $(".to-top"); if (!b) return;
    var c = $("circle.bar", b), len = 2 * Math.PI * 24;
    if (c) { c.style.strokeDasharray = len; }
    var on = function () {
      var max = document.documentElement.scrollHeight - innerHeight, pct = max > 0 ? scrollY / max : 0;
      b.classList.toggle("is-visible", scrollY > 500);
      if (c) c.style.strokeDashoffset = len * (1 - pct);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); var t = $("#main"); if (t) t.focus({ preventScroll: true }); });
  }

  var io;
  function reveal(root) {
    var els = $$(".reveal, .skcard, .tl", root || document);
    if (!("IntersectionObserver" in window) || reduced) { els.forEach(function (e) { e.classList.add("in-view"); }); return; }
    io = io || new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in-view"); io.unobserve(x.target); } }); }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function spotlight() {
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".skcard"); if (!c) return;
      var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ---------------- hero canvas: circuit network ---------------- */
  function heroCanvas() {
    var cv = $("#hero-canvas"); if (!cv) return;
    var ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), w, h, nodes = [], mouse = { x: -9999, y: -9999 }, raf;
    function size() {
      w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(110, (w * h) / 14000)); nodes = [];
      for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.6 + .6, p: Math.random() * 6.28 });
    }
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      var D = 140;
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        if (!reduced) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1; }
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
          if (d < D * D) {
            var al = (1 - Math.sqrt(d) / D) * .28;
            ctx.strokeStyle = "rgba(127,145,171," + al + ")"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y);
            if ((i + j) % 3 === 0) { ctx.lineTo(b.x, a.y); ctx.lineTo(b.x, b.y); } else ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        var md = Math.hypot(a.x - mouse.x, a.y - mouse.y), glow = md < 180 ? 1 - md / 180 : 0;
        var pulse = .45 + .35 * Math.sin(t / 900 + a.p);
        ctx.fillStyle = "rgba(221,223,219," + Math.min(1, pulse + glow) + ")";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r + glow * 2.2, 0, 6.283); ctx.fill();
        if (glow > 0) { ctx.strokeStyle = "rgba(221,223,219," + glow * .35 + ")"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    }
    size(); frame(0);
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); size(); frame(0); });
    cv.parentElement.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    cv.parentElement.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
    document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else if (!reduced) raf = requestAnimationFrame(frame); });
  }

  /* ---------------- hero background video ---------------- */
  function heroVideo() {
    var v = $(".hero__video"), b = $(".hero__pause"); if (!v) return;
    var set = function (paused) {
      if (!b) return;
      b.classList.toggle("is-paused", paused);
      b.setAttribute("aria-pressed", paused ? "true" : "false");
      b.setAttribute("aria-label", paused ? "Play background video" : "Pause background video");
      var t = b.querySelector(".lbl"); if (t) t.textContent = paused ? "Play" : "Pause";
    };
    var ready = function () { v.classList.add("is-ready"); };
    v.addEventListener("playing", ready);
    v.addEventListener("loadeddata", ready);
    if (reduced) { v.removeAttribute("autoplay"); v.pause(); set(true); }
    else { var pr = v.play(); if (pr && pr.catch) pr.catch(function () { set(true); }); }
    if (b) b.addEventListener("click", function () { if (v.paused) { v.play(); set(false); } else { v.pause(); set(true); } });
    document.addEventListener("visibilitychange", function () { if (document.hidden) v.pause(); else if (!b || !b.classList.contains("is-paused")) v.play(); });
  }
  /* ---------------- projects: 3D cube carousel ---------------- */
  function renderCube() {
    var cube = $("#cube"), bar = $("#filters"); if (!cube || !bar) return;
    var all = S.projects || [], list = all.slice(), idx = 0, angle = 0, busy = false, timer = null, userTook = false;
    var faces = $$(".cube__face", cube), stage = $("#cube-stage"), wrap = $("#cube-wrap");
    var dots = $("#cube-dots"), count = $("#cube-count"), live = $("#cube-live"), empty = $("#project-empty");
    var DUR = reduced ? 1 : 950;
    var mod = function (a, n) { return ((a % n) + n) % n; };
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var front = function () { return mod(Math.round(-angle / 90), 4); };
    var setT = function (a, anim) {
      cube.style.transition = anim ? "transform " + DUR + "ms cubic-bezier(.65,.05,.25,1)" : "none";
      cube.style.transform = "translateZ(calc(var(--half) * -1)) rotateY(" + a + "deg)";
    };
    function faceHTML(p) {
      if (!p) return "";
      if (p.locked) {
        var nl = list.indexOf(p) + 1;
        return '<article class="cface cface--locked"><div class="cface__media"><div class="lockart" aria-hidden="true">' +
          '<svg class="lockart__ecg" viewBox="0 0 400 120" preserveAspectRatio="none"><path pathLength="1" d="M0 70H110l10-18 12 36 16-78 16 96 12-36h40l8-10 8 10H260l10-18 12 36 16-78 16 96 12-36H400"/></svg>' +
          '<span class="lockart__ico">' + icon("lock") + '</span><span class="lockart__lbl">Locked · In development</span></div>' +
          '<span class="pcard__cat">' + esc(p.category) + '</span><span class="cface__num">' + pad(nl) + " / " + pad(list.length) + "</span></div>" +
          '<div class="cface__body"><p class="cface__meta">' + esc(p.year || "") + (p.role ? " · " + esc(p.role) : "") + "</p>" +
          "<h3>" + esc(p.title) + '</h3><p class="cface__sum">' + esc(p.summary) + "</p>" +
          '<ul class="tags">' + (p.tech || []).slice(0, 4).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          '<span class="btn btn--sm cface__cta cface__cta--locked" aria-disabled="true">' + icon("lock") + " " + esc(p.unlock || "Coming soon") + "</span></div></article>";
      }
      var n = list.indexOf(p) + 1;
      return '<article class="cface"><div class="cface__media">' + media(p) + '<span class="pcard__cat">' + esc(p.category) + '</span><span class="cface__num">' + pad(n) + " / " + pad(list.length) + "</span></div>" +
        '<div class="cface__body"><p class="cface__meta">' + esc(p.year || "") + (p.role ? " · " + esc(p.role) : "") + "</p>" +
        "<h3>" + esc(p.title) + '</h3><p class="cface__sum">' + esc(p.summary) + "</p>" +
        '<ul class="tags">' + (p.tech || []).slice(0, 4).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn btn--sm cface__cta" href="project.html?id=' + encodeURIComponent(p.id) + '">View Project ' + icon("arrow") + "</a></div></article>";
    }
    function fill(keepFront) {
      var f = front(), N = list.length;
      faces.forEach(function (el, k) {
        var off = mod(k - f, 4);
        if (keepFront && off === 0) return;
        var d = off === 3 ? -1 : off;
        el.innerHTML = N ? faceHTML(list[mod(idx + d, N)]) : "";
      });
    }
    function mark() {
      var f = front();
      faces.forEach(function (el, k) {
        var on = k === f;
        el.classList.toggle("is-front", on);
        el.setAttribute("aria-hidden", on ? "false" : "true");
        if ("inert" in el) el.inert = !on;
        $$("a", el).forEach(function (a) { a.tabIndex = on ? 0 : -1; });
      });
      count.textContent = pad(list.length ? idx + 1 : 0) + " / " + pad(list.length);
      $$("button", dots).forEach(function (b, i) { b.setAttribute("aria-current", i === idx ? "true" : "false"); });
      if (list[idx]) live.textContent = "Project " + (idx + 1) + " of " + list.length + ": " + list[idx].title;
      var one = list.length < 2;
      $("#cube-prev").disabled = one; $("#cube-next").disabled = one;
    }
    function go(target, dir) {
      var N = list.length; if (busy || N < 2) return;
      target = mod(target, N); if (target === idx) return;
      dir = dir || (mod(target - idx, N) <= N / 2 ? 1 : -1);
      var f = front();
      faces[mod(f + (dir > 0 ? 1 : 3), 4)].innerHTML = faceHTML(list[target]);
      busy = true; idx = target; angle -= dir * 90;
      stage.classList.add("is-turning");
      setT(angle, true); mark();
      setTimeout(function () { stage.classList.remove("is-turning"); }, DUR * 0.55);
      setTimeout(function () { busy = false; fill(true); mark(); }, DUR + 30);
    }
    function buildDots() {
      dots.innerHTML = list.map(function (p, i) { return '<button type="button" aria-label="Show ' + esc(p.title) + '"></button>'; }).join("");
    }
    dots.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; stop(); go($$("button", dots).indexOf(b)); });
    $("#cube-prev").addEventListener("click", function () { stop(); go(idx - 1, -1); });
    $("#cube-next").addEventListener("click", function () { stop(); go(idx + 1, 1); });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); stop(); go(idx + 1, 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); stop(); go(idx - 1, -1); }
    });

    /* drag / swipe */
    var sx = null, dx = 0, dragging = false, moved = false;
    stage.addEventListener("pointerdown", function (e) { if (busy || list.length < 2 || e.button > 0) return; sx = e.clientX; dx = 0; moved = false; dragging = true; });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return; dx = e.clientX - sx;
      if (Math.abs(dx) > 6) { moved = true; stop(); setT(angle + Math.max(-60, Math.min(60, dx * 0.22)), false); }
    });
    window.addEventListener("pointerup", function () {
      if (!dragging) return; dragging = false;
      if (!moved) return;
      if (Math.abs(dx) > 60) { var d = dx < 0 ? 1 : -1; setT(angle + Math.max(-60, Math.min(60, dx * 0.22)), false); void cube.offsetWidth; go(idx + d, d); }
      else setT(angle, true);
    });
    stage.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);

    /* gentle autoplay until the visitor takes over */
    function start() { if (reduced || userTook || timer || list.length < 2) return; timer = setInterval(function () { if (!document.hidden) go(idx + 1, 1); }, 5200); }
    function pause() { clearInterval(timer); timer = null; }
    function stop() { userTook = true; pause(); }
    wrap.addEventListener("pointerenter", pause);
    wrap.addEventListener("pointerleave", start);
    wrap.addEventListener("focusin", pause);

    /* filters */
    var CATS2 = ["Embedded Systems", "Software Development", "Artificial Intelligence", "Data Science", "Computer Engineering"];
    var cnt = function (c) { return c === "All" ? all.length : all.filter(function (p) { return p.category === c; }).length; };
    bar.innerHTML = ["All"].concat(CATS2).map(function (c) { return '<button type="button" class="chip" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + ' <span class="count">' + cnt(c) + "</span></button>"; }).join("");
    function apply(c, push) {
      $$(".chip", bar).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filter") === c); });
      list = c === "All" ? all.slice() : all.filter(function (p) { return p.category === c; });
      idx = 0;
      var has = list.length > 0;
      wrap.hidden = !has; if (empty) empty.hidden = has;
      buildDots(); fill(false); mark();
      if (has) { stage.classList.remove("is-pop"); void stage.offsetWidth; stage.classList.add("is-pop"); }
      var st = $("#filter-status"); if (st) st.textContent = list.length + " project" + (list.length === 1 ? "" : "s") + (c === "All" ? "" : " in " + c);
      if (push) { var u = new URL(location.href); if (c === "All") u.searchParams.delete("category"); else u.searchParams.set("category", c); try { history.replaceState(null, "", u); } catch (e) {} }
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (b && !busy) { stop(); apply(b.getAttribute("data-filter"), true); } });
    setT(angle, false);
    var initial = new URLSearchParams(location.search).get("category");
    apply(CATS2.indexOf(initial) > -1 ? initial : "All", false);
    start();
  }
  /* ---------------- gallery images + lightbox ---------------- */
  function wixImg(u, w, h, q) {
    return /static\.wixstatic\.com\/media\/[^\/]+$/.test(u) ? u + "/v1/fit/w_" + w + ",h_" + h + ",q_" + q + ",enc_auto/image.png" : u;
  }
  function lightbox() {
    var d = null, opener = null;
    function close() { if (d && d.open) d.close(); }
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".gal-item"); if (!b) return;
      e.preventDefault();
      if (!window.HTMLDialogElement) { window.open(b.getAttribute("data-full"), "_blank", "noopener"); return; }
      if (!d) {
        d = document.createElement("dialog"); d.className = "lightbox"; d.setAttribute("aria-label", "Enlarged image");
        d.innerHTML = '<button class="lightbox__close" type="button" aria-label="Close image">&times;</button><figure><img alt=""><figcaption></figcaption></figure>';
        document.body.appendChild(d);
        d.addEventListener("click", function (ev) { if (ev.target === d || ev.target.closest(".lightbox__close")) close(); });
        d.addEventListener("close", function () { if (opener) opener.focus(); });
      }
      opener = b;
      var img = d.querySelector("img"), alt = b.getAttribute("data-alt") || "";
      img.src = b.getAttribute("data-full"); img.alt = alt;
      d.querySelector("figcaption").textContent = alt;
      d.showModal();
    });
  }
  /* ---------------- skills circuit (Skills page) ---------------- */
  function renderCircuit() {
    var C = S.skillCircuit, board = $("#sc-board");
    if (!C || !board) return;
    var nodesEl = $("#sc-nodes"), svg = $("#sc-svg"), panel = $("#sc-panel");
    var cats = C.categories || [];
    var pad2 = function (n) { return String(n).padStart(2, "0"); };
    var total = cats.reduce(function (t, c) { return t + (c.skills || []).length; }, 0);

    var html = '<div class="sc-node sc-node--term sc-node--start"><span class="sc-term__ico">' + icon("power") + '</span><span class="sc-term__label">' + esc(C.start) + "</span></div>";
    cats.forEach(function (c, i) {
      html += '<div class="sc-node sc-node--cat ' + (i % 2 ? "is-right" : "is-left") + '">' +
        '<button type="button" class="sc-chip" data-cat="' + i + '" aria-pressed="false" aria-controls="sc-panel sc-inline-' + i + '">' +
        '<span class="sc-chip__pins" aria-hidden="true"></span>' +
        '<span class="sc-chip__ico">' + icon(c.icon) + "</span>" +
        '<span class="sc-chip__txt"><small>' + pad2(i + 1) + " · " + (c.skills || []).length + " skills</small><b>" + esc(c.title) + "</b></span></button>" +
        '<div class="sc-inline" id="sc-inline-' + i + '"></div></div>';
    });
    html += '<div class="sc-node sc-node--term sc-node--end"><span class="sc-term__ico">' + icon("loop") + '</span><span class="sc-term__label">' + esc(C.end) + "</span></div>";
    nodesEl.innerHTML = html;
    var nodes = $$(".sc-node", nodesEl);

    function catHTML(i) {
      var c = cats[i];
      return '<div class="sc-panel__in"><div class="sc-panel__head"><span class="sc-chip__ico">' + icon(c.icon) + "</span><div><small>Node " + pad2(i + 1) + " / " + pad2(cats.length) + "</small><h3>" + esc(c.title) + "</h3></div></div>" +
        (c.blurb ? '<p class="sc-panel__blurb">' + esc(c.blurb) + "</p>" : "") +
        '<ul class="sc-list">' + (c.skills || []).map(function (s, k) {
          return '<li data-skill="' + skillSlug(s.name) + '" style="--k:' + k + '"><span class="sc-list__dot" aria-hidden="true"></span><span class="sc-list__txt"><b>' + esc(s.name) + "</b>" + (s.note ? "<small>" + esc(s.note) + "</small>" : "") + "</span>" +
            (s.level ? '<span class="lvl lvl--' + esc(String(s.level).toLowerCase()) + '">' + esc(s.level) + "</span>" : "") + "</li>";
        }).join("") + "</ul></div>";
    }
    function endHTML() {
      return '<div class="sc-panel__in"><div class="sc-panel__head"><span class="sc-chip__ico">' + icon("loop") + "</span><div><small>Circuit complete</small><h3>" + esc(C.end) + "</h3></div></div>" +
        '<p class="sc-panel__blurb">Every node connected: ' + cats.length + " categories and " + total + " skills, and the board keeps growing with each project.</p>" +
        '<ul class="sc-list">' + cats.map(function (c, k) { return '<li style="--k:' + k + '"><span class="sc-list__dot" aria-hidden="true"></span><span class="sc-list__txt"><b>' + esc(c.title) + "</b><small>" + (c.skills || []).length + " skills</small></span></li>"; }).join("") + "</ul></div>";
    }

    /* ---- drawing: traces are computed from where the nodes actually sit, so they always fit ---- */
    function anchors() {
      var b = board.getBoundingClientRect();
      return nodes.map(function (n) {
        var r = (n.querySelector(".sc-chip") || n).getBoundingClientRect();
        return { x: Math.round(r.left - b.left + r.width / 2), top: Math.round(r.top - b.top), bot: Math.round(r.bottom - b.top), l: Math.round(r.left - b.left), r: Math.round(r.right - b.left), cy: Math.round(r.top - b.top + r.height / 2) };
      });
    }
    function seg(A, B) {
      var x1 = A.x, y1 = A.bot, x2 = B.x, y2 = B.top, my = Math.round((y1 + y2) / 2), dx = x2 - x1;
      if (Math.abs(dx) < 2) return "M" + x1 + " " + y1 + "V" + y2;
      var R = Math.max(2, Math.min(18, Math.abs(dx) / 2, (y2 - y1) / 4)), s = dx > 0 ? 1 : -1;
      return "M" + x1 + " " + y1 + "V" + (my - R) + "Q" + x1 + " " + my + " " + (x1 + s * R) + " " + my +
        "H" + (x2 - s * R) + "Q" + x2 + " " + my + " " + x2 + " " + (my + R) + "V" + y2;
    }
    function draw() {
      var A = anchors(), w = board.clientWidth, h = board.clientHeight;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.setAttribute("width", w); svg.setAttribute("height", h);
      var base = "", lit = "", flow = "", deco = "", pads = "";
      for (var i = 0; i < A.length - 1; i++) {
        var d = seg(A[i], A[i + 1]), my = Math.round((A[i].bot + A[i + 1].top) / 2);
        base += '<path class="sc-trace" d="' + d + '"/>';
        lit += '<path class="sc-lit" data-seg="' + i + '" pathLength="1" d="' + d + '"/>';
        flow += '<path class="sc-flow" data-seg="' + i + '" pathLength="1" d="' + d + '"/>';
        if (Math.abs(A[i + 1].x - A[i].x) > 120) {
          var bx = Math.round((A[i].x + A[i + 1].x) / 2), dn = i % 2 ? -1 : 1;
          deco += '<path class="sc-branch" d="M' + bx + " " + my + "v" + (dn * 18) + "l14 " + (dn * 14) + 'h22"/><circle class="sc-pad" cx="' + (bx + 36) + '" cy="' + (my + dn * 32) + '" r="3"/>';
          pads += '<circle class="sc-via" cx="' + bx + '" cy="' + my + '" r="2.6"/>';
        }
      }
      A.forEach(function (a, i) {
        pads += '<circle class="sc-node-pad" data-n="' + i + '" cx="' + a.x + '" cy="' + (i ? a.top : a.bot) + '" r="4.5"/>';
        if (i === 0 || i === A.length - 1) return;
        var left = nodes[i].classList.contains("is-left"), dir = left ? -1 : 1, ox = left ? a.l : a.r, ix = left ? a.r : a.l;
        deco += '<path class="sc-branch" d="M' + ox + " " + a.cy + "h" + (dir * 22) + "l" + (dir * 14) + ' 14v18"/><circle class="sc-pad" cx="' + (ox + dir * 36) + '" cy="' + (a.cy + 35) + '" r="3"/>';
        deco += '<path class="sc-branch" d="M' + ix + " " + (a.cy - 12) + "h" + (-dir * 30) + '"/><circle class="sc-pad" cx="' + (ix - dir * 33) + '" cy="' + (a.cy - 12) + '" r="3"/>';
      });
      svg.innerHTML = '<g class="sc-deco">' + deco + "</g><g>" + base + "</g><g>" + lit + "</g><g>" + flow + "</g><g>" + pads + "</g>";
      applyState();
    }

    /* ---- state ---- */
    var act = -1, endOn = false, user = false, timer = null, step = 0, running = false;
    function applyState() {
      $$(".sc-lit", svg).forEach(function (p) { p.classList.toggle("on", endOn || +p.getAttribute("data-seg") <= act); });
      $$(".sc-node-pad", svg).forEach(function (p) { p.classList.toggle("on", endOn || +p.getAttribute("data-n") <= act + 1); });
      $$(".sc-chip", nodesEl).forEach(function (b, k) {
        var on = k === act && !endOn;
        b.classList.toggle("is-active", on);
        b.classList.toggle("is-powered", endOn || k <= act);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      nodes[0].classList.add("is-on");
      nodes[nodes.length - 1].classList.toggle("is-on", endOn);
    }
    function flowSeg(j) {
      if (reduced) return;
      var p = svg.querySelector('.sc-flow[data-seg="' + j + '"]'); if (!p) return;
      p.classList.remove("go"); void p.getBoundingClientRect(); p.classList.add("go");
    }
    function show(i) {
      panel.innerHTML = catHTML(i);
      $$(".sc-inline", nodesEl).forEach(function (el, k) { el.innerHTML = k === i ? catHTML(i) : ""; });
    }
    function setActive(i, fromUser) {
      if (fromUser) { user = true; clearTimeout(timer); running = false; }
      if (i === act && !endOn) return;
      act = i; endOn = false;
      if (fromUser) flowSeg(i);
      applyState(); show(i);
    }
    function showEnd() {
      endOn = true; applyState(); panel.innerHTML = endHTML();
      $$(".sc-inline", nodesEl).forEach(function (el) { el.innerHTML = ""; });
    }
    function tick() {
      if (user) return;
      running = true;
      var j = step;
      flowSeg(j);
      timer = setTimeout(function () {
        if (user) return;
        if (j < cats.length) setActive(j, false); else showEnd();
        step = j + 1 > cats.length ? 0 : j + 1;
        timer = setTimeout(step === 0 ? function () { if (user) return; act = -1; endOn = false; applyState(); tick(); } : tick, step === 0 ? 3400 : 2700);
      }, 950);
    }

    nodesEl.addEventListener("click", function (e) { var b = e.target.closest(".sc-chip"); if (b) setActive(+b.getAttribute("data-cat"), true); });
    nodesEl.addEventListener("pointerover", function (e) { if (e.pointerType !== "mouse") return; var b = e.target.closest(".sc-chip"); if (b) setActive(+b.getAttribute("data-cat"), true); });
    nodesEl.addEventListener("focusin", function (e) { var b = e.target.closest(".sc-chip"); if (b && b.matches(":focus-visible")) setActive(+b.getAttribute("data-cat"), true); });

    draw();
    setActive(0, false); step = 1;
    function deep() {
      var m = /^#skill-(.+)$/.exec(location.hash || ""); if (!m) return;
      var slug = decodeURIComponent(m[1]);
      for (var i = 0; i < cats.length; i++) for (var k = 0; k < (cats[i].skills || []).length; k++) if (skillSlug(cats[i].skills[k].name) === slug) {
        setActive(i, true);
        setTimeout(function () {
          $$(".sc-list li.is-target").forEach(function (x) { x.classList.remove("is-target"); });
          var t = $$('.sc-list li[data-skill="' + slug + '"]').filter(function (x) { return x.offsetParent !== null; })[0];
          if (!t) return; t.classList.add("is-target");
          t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        }, 400);
        return;
      }
    }
    deep(); window.addEventListener("hashchange", deep);
    if ("ResizeObserver" in window) new ResizeObserver(function () { draw(); }).observe(board);
    else window.addEventListener("resize", draw);
    window.addEventListener("load", draw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);

    if (!reduced) {
      var start = function () { if (!running && !user) { clearTimeout(timer); timer = setTimeout(tick, 900); running = true; } };
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) start(); else if (!user) { clearTimeout(timer); running = false; } }); }, { threshold: 0.15 }).observe(board);
      } else start();
      document.addEventListener("visibilitychange", function () { if (document.hidden) { clearTimeout(timer); running = false; } else if (!user) start(); });
    }
  }

  /* ---------------- subtle PCB background (all pages) ---------------- */
  function pcbBackground() {
    if (!document.createElementNS) return;
    var NS = "http://www.w3.org/2000/svg", svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "pcb-bg"); svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
    document.body.insertBefore(svg, document.body.firstChild);
    function seeded(s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
    function nrm(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; }
    function offset(pts, o) {
      return pts.map(function (p, i) {
        var n1 = i ? nrm(pts[i - 1], p) : null, n2 = i < pts.length - 1 ? nrm(p, pts[i + 1]) : null;
        var n = n1 && n2 ? [n1[0] + n2[0], n1[1] + n2[1]] : (n1 || n2), l = Math.hypot(n[0], n[1]) || 1;
        n = [n[0] / l, n[1] / l];
        var k = n1 && n2 ? 1 / Math.max(0.5, n[0] * n1[0] + n[1] * n1[1]) : 1;
        return [p[0] + n[0] * o * k, p[1] + n[1] * o * k];
      });
    }
    var lastW = 0, lastH = 0;
    function build() {
      var W = window.innerWidth, H = window.innerHeight;
      if (Math.abs(W - lastW) < 40 && Math.abs(H - lastH) < 120) return;
      lastW = W; lastH = H;
      var rnd = seeded(20261109), out = "", cur = "";
      var sides = [
        { L: H, D: W * 0.3, map: function (x, y) { return [x, y]; } },
        { L: H, D: W * 0.3, map: function (x, y) { return [W - x, y]; } },
        { L: W, D: H * 0.22, map: function (x, y) { return [y, x]; } },
        { L: W, D: H * 0.22, map: function (x, y) { return [y, H - x]; } }
      ];
      sides.forEach(function (sd) {
        var count = Math.max(2, Math.round(sd.L / 175)), step = sd.L / count;
        for (var b = 0; b < count; b++) {
          var y0 = step * (b + 0.25 + rnd() * 0.5), n = 3 + Math.floor(rnd() * 5), gap = 6 + Math.round(rnd() * 2);
          var d1 = sd.D * (0.15 + rnd() * 0.35), t = 30 + rnd() * 90, s = rnd() < 0.5 ? -1 : 1, d3 = sd.D * (0.12 + rnd() * 0.3);
          var spine = [[-12, y0], [d1, y0], [d1 + t, y0 + s * t], [d1 + t + d3, y0 + s * t]];
          var hi = rnd() < 0.25;
          for (var j = 0; j < n; j++) {
            var pts = offset(spine, (j - (n - 1) / 2) * gap), last = pts[pts.length - 1], prev = pts[pts.length - 2];
            var trim = rnd() * 0.6, ex = last[0] - (last[0] - prev[0]) * trim, ey = last[1] - (last[1] - prev[1]) * trim;
            pts[pts.length - 1] = [ex, ey];
            var m = pts.map(function (p) { return sd.map(p[0], p[1]).map(function (v) { return Math.round(v * 10) / 10; }); });
            var dd = "M" + m.map(function (p) { return p.join(" "); }).join("L");
            out += '<path' + (hi && j === Math.floor(n / 2) ? ' class="hi"' : "") + ' d="' + dd + '"/>';
            if (j === Math.floor(n / 2) && rnd() < 0.6) { var sty = ' pathLength="1" style="--d:-' + (rnd() * 7).toFixed(2) + 's;--t:' + (3.6 + rnd() * 3.6).toFixed(2) + 's" d="' + dd + '"/>'; cur += '<path class="cur cur--halo"' + sty + '<path class="cur"' + sty; }
            var e = m[m.length - 1];
            out += '<circle cx="' + e[0] + '" cy="' + e[1] + '" r="2.2"/>';
          }
          if (rnd() < 0.3) {
            var c = sd.map(d1 + t + d3 + 26, y0 + s * t), cw = 14 + n * gap;
            out += '<rect x="' + Math.round(c[0] - cw / 2) + '" y="' + Math.round(c[1] - cw / 2) + '" width="' + cw + '" height="' + cw + '" rx="3"/>';
          }
        }
      });
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.innerHTML = out + '<g class="cur-g">' + cur + '</g>';
    }
    build();
    var tm; window.addEventListener("resize", function () { clearTimeout(tm); tm = setTimeout(build, 200); });
  }

  /* ---------------- renderers ---------------- */
  var CATS = ["Embedded Systems", "Software Development", "Artificial Intelligence", "Data Science", "Computer Engineering"];
  function card(p, n, delay) {
    return '<article class="pcard reveal" data-delay="' + (delay || 0) + '" data-cat="' + esc(p.category) + '">' +
      '<div class="pcard__media">' + media(p) + '<span class="pcard__cat">' + esc(p.category) + "</span></div>" +
      '<div class="pcard__body"><h3>' + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
      '<ul class="tags" aria-label="Technologies">' + (p.tech || []).slice(0, 4).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<div class="pcard__foot"><a class="link-arrow pcard__link" href="project.html?id=' + encodeURIComponent(p.id) + '">View Project ' + icon("arrow") + '</a><span class="pcard__num">' + String(n).padStart(2, "0") + "</span></div></div></article>";
  }

  function renderFeatured() {
    var el = $("#featured"); if (!el) return;
    var list = (S.projects || []).filter(function (p) { return p.featured; }).slice(0, 3);
    if (!list.length) list = (S.projects || []).filter(function (p) { return !p.locked; }).slice(0, 3);
    el.innerHTML = list.map(function (p, i) { return card(p, i + 1, i + 1); }).join("");
  }

  /* ---------------- home: interactive microcontroller (skills = pins) ---------------- */
  function skillSlug(n) { return String(n).toLowerCase().replace(/\+/g, "p").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function renderMCU() {
    var el = $("#mcu"); if (!el || !S.skillCircuit) return;
    var cats = S.skillCircuit.categories || [], ports = "ABCDEFGH", all = [];
    function side(list) {
      return list.map(function (ci) {
        var c = cats[ci]; if (!c) return "";
        return '<div class="mcu__port"><span class="mcu__plbl"><b>PORT ' + ports[ci] + "</b>" + esc(c.title) + "</span>" +
          (c.skills || []).map(function (s, k) {
            var i = all.length, code = "P" + ports[ci] + k;
            all.push({ s: s, c: c, code: code });
            return '<a class="pin" href="skills.html#skill-' + skillSlug(s.name) + '" data-i="' + i + '" style="--k:' + i + '" aria-label="' + esc(s.name) + ", " + esc(c.title) + ': open on the Skills page">' +
              '<span class="pin__lbl">' + esc(s.name) + '</span><span class="pin__code" aria-hidden="true">' + code + '</span><span class="pin__trace" aria-hidden="true"><i></i></span><span class="pin__leg" aria-hidden="true"></span></a>';
          }).join("") + "</div>";
      }).join("");
    }
    var half = Math.ceil(cats.length / 2), L = [], R = [];
    cats.forEach(function (c, i) { (i < half ? L : R).push(i); });
    var left = side(L), right = side(R);
    el.innerHTML = '<div class="mcu__side mcu__side--l">' + left + "</div>" +
      '<div class="mcu__chip" aria-hidden="true"><span class="mcu__notch"></span><span class="mcu__dot"></span>' +
      '<div class="mcu__brand"><img src="' + ($(".brand img") ? $(".brand img").getAttribute("src") : "") + '" alt=""><span>SG-2026<small>' + all.length + "-PIN SKILL MCU</small></span></div>" +
      '<div class="mcu__screen"><small class="mcu__code"></small><b class="mcu__name"></b><span class="mcu__cat"></span><span class="mcu__note"></span><em class="mcu__go">Click to open on Skills page</em></div>' +
      '<div class="mcu__foot">AUBH · COMPUTER ENGINEERING</div></div>' +
      '<div class="mcu__side mcu__side--r">' + right + "</div>";
    var pins = $$(".pin", el), scr = $(".mcu__screen", el), cur = -1, user = false, timer = null;
    function set(i) {
      if (i === cur) return; cur = i;
      var p = all[i];
      pins.forEach(function (a, k) { a.classList.toggle("is-on", k === i); });
      scr.classList.remove("swap"); void scr.offsetWidth; scr.classList.add("swap");
      $(".mcu__code", scr).textContent = p.code + " · " + (p.s.level || "Active");
      $(".mcu__name", scr).textContent = p.s.name;
      $(".mcu__cat", scr).textContent = p.c.title;
      $(".mcu__note", scr).textContent = p.s.note || "";
    }
    function stop() { user = true; clearTimeout(timer); }
    el.addEventListener("pointerover", function (e) { var a = e.target.closest(".pin"); if (a && e.pointerType === "mouse") { stop(); set(+a.getAttribute("data-i")); } });
    el.addEventListener("focusin", function (e) { var a = e.target.closest(".pin"); if (a) { stop(); set(+a.getAttribute("data-i")); } });
    set(0);
    if (reduced) return;
    function tick() { if (user) return; set((cur + 1) % all.length); timer = setTimeout(tick, 1900); }
    var running = false;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting && !running && !user) { running = true; timer = setTimeout(tick, 1400); } else if (!x.isIntersecting) { clearTimeout(timer); running = false; } }); }, { threshold: 0.25 }).observe(el);
    else timer = setTimeout(tick, 1400);
  }

  function renderSkillPreview() {
    var el = $("#skill-preview"); if (!el) return;
    var picks = [];
    if (S.skillCircuit && S.skillCircuit.categories) { var cats = S.skillCircuit.categories; for (var r = 0; r < 3; r++) cats.forEach(function (c) { if (c.skills[r]) picks.push(c.skills[r]); }); } else { Object.keys(S.skills || {}).forEach(function (g) { (S.skills[g].items || []).slice(0, g === "Other Skills" ? 2 : 4).forEach(function (s) { picks.push(s); }); }); }
    el.innerHTML = picks.slice(0, 10).map(function (s, i) { return '<a href="skills.html" class="sk-tile reveal" data-delay="' + (i % 5) + '"><span class="ico">' + icon(s.icon) + "</span><span>" + esc(s.name) + "</span></a>"; }).join("");
  }

  function renderProjects() {
    var grid = $("#project-grid"), bar = $("#filters"); if (!grid || !bar) return;
    var list = S.projects || [];
    grid.innerHTML = list.map(function (p, i) { return card(p, i + 1, (i % 3) + 1); }).join("");
    var count = function (c) { return c === "All" ? list.length : list.filter(function (p) { return p.category === c; }).length; };
    bar.innerHTML = ["All"].concat(CATS).map(function (c) { return '<button type="button" class="chip" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + ' <span class="count">' + count(c) + "</span></button>"; }).join("");
    var status = $("#filter-status"), empty = $("#project-empty");
    function apply(c, push) {
      $$(".chip", bar).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filter") === c); });
      var shown = 0;
      $$(".pcard", grid).forEach(function (el) {
        var ok = c === "All" || el.getAttribute("data-cat") === c;
        el.classList.toggle("is-hidden", !ok); el.classList.remove("is-entering");
        if (ok) { shown++; void el.offsetWidth; el.classList.add("is-entering", "in-view"); }
      });
      if (empty) empty.hidden = shown > 0;
      if (status) status.textContent = shown + " project" + (shown === 1 ? "" : "s") + (c === "All" ? "" : " in " + c);
      if (push) { var u = new URL(location.href); if (c === "All") u.searchParams.delete("category"); else u.searchParams.set("category", c); try { history.replaceState(null, "", u); } catch (e) {} }
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (b) apply(b.getAttribute("data-filter"), true); });
    var initial = new URLSearchParams(location.search).get("category");
    apply(CATS.indexOf(initial) > -1 ? initial : "All", false);
  }

  function renderProjectDetail() {
    var root = $("#project-detail"); if (!root) return;
    var list = (S.projects || []).filter(function (p) { return !p.locked; }), id = new URLSearchParams(location.search).get("id");
    var idx = list.findIndex(function (p) { return p.id === id; });
    if (idx < 0) {
      root.innerHTML = '<section class="detail-hero"><div class="wrap"><p class="eyebrow">404 · Project</p><h1>Project not found.</h1><p class="lead">The project you are looking for may have moved. Browse all projects instead.</p><p style="margin-top:2rem"><a class="btn" href="projects.html">All projects ' + icon("arrow") + "</a></p></div></section>";
      document.title = "Project not found | Shadow Alghamdi"; return;
    }
    var p = list[idx], prev = list[(idx - 1 + list.length) % list.length], next = list[(idx + 1) % list.length];
    document.title = p.title + " | Projects | Shadow Alghamdi";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", p.summary);
    var li = function (a) { return (a || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); };
    var gallery = (p.gallery && p.gallery.length ? p.gallery.map(function (g) { return '<figure><button type="button" class="gal-item" data-full="' + esc(wixImg(g.src || g, 2000, 2000, 90)) + '" data-alt="' + esc(g.caption || p.title) + '" aria-label="Enlarge image: ' + esc(g.caption || p.title) + '"><img src="' + esc(wixImg(g.src || g, 900, 700, 85)) + '" alt="' + esc(g.caption || p.title) + '" loading="lazy"></button>' + (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") + "</figure>"; }) :
      ["a", "b", "c"].map(function (v) { return "<figure>" + art(p, v) + "</figure>"; })).join("");
    var links = (p.repo ? '<a class="btn btn--sm" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + icon("github") + " Source code</a>" : "") +
      (p.demo ? '<a class="btn btn--ghost btn--sm" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Live demo ' + icon("ext") + "</a>" : "") +
      (p.report ? '<a class="btn btn--ghost btn--sm" href="' + esc(p.report) + '" target="_blank" rel="noopener">' + icon("doc") + " Report (PDF)</a>" : "") +
      (p.slides ? '<a class="btn btn--ghost btn--sm" href="' + esc(p.slides) + '" target="_blank" rel="noopener">' + icon("ext") + " Presentation</a>" : "");
    root.innerHTML =
      '<section class="detail-hero"><div class="wrap">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="projects.html">Projects</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(p.title) + "</span></nav>" +
      '<a class="eyebrow" href="projects.html?category=' + encodeURIComponent(p.category) + '">' + esc(p.category) + "</a>" +
      "<h1>" + esc(p.title) + '</h1><p class="lead">' + esc(p.summary) + "</p>" +
      '<div class="hero__actions" style="margin-top:2rem">' + links + "</div></div></section>" +
      '<section><div class="wrap"><div class="detail-media reveal">' + media(p) + "</div>" +
      '<div class="detail-grid"><div>' +
      '<div class="detail-block reveal"><h2>Overview</h2><div><p>' + esc(p.overview) + "</p></div></div>" +
      '<div class="detail-block reveal"><h2>The Problem</h2><div><p>' + esc(p.problem) + "</p></div></div>" +
      '<div class="detail-block reveal"><h2>Objectives</h2><ul class="checklist">' + li(p.objectives) + "</ul></div>" +
      '<div class="detail-block reveal"><h2>Technologies</h2><ul class="tags">' + li(p.tech) + "</ul></div>" +
      '<div class="detail-block reveal"><h2>Implementation</h2><ol class="steps">' + li(p.implementation) + "</ol></div>" +
      '<div class="detail-block reveal"><h2>Results</h2><ul class="checklist">' + li(p.results) + "</ul></div>" +
      '<div class="detail-block reveal"><h2>Gallery</h2><div class="gallery">' + gallery + "</div></div>" +
      "</div>" +
      '<aside class="detail-aside glass reveal" aria-label="Project facts"><dl style="margin:0;display:grid;gap:1.3rem">' +
      "<div><dt>Category</dt><dd>" + esc(p.category) + "</dd></div><div><dt>Year</dt><dd>" + esc(p.year || "-") + "</dd></div>" +
      "<div><dt>Stack</dt><dd>" + esc((p.tech || []).join(" · ")) + "</dd></div><div><dt>Role</dt><dd>" + esc(p.role || "Designer & Developer") + "</dd></div>" + (p.team ? "<div><dt>Team</dt><dd>" + esc(p.team) + "</dd></div>" : "") + "</dl>" +
      '<a class="btn btn--ghost btn--sm" href="contact.html">Discuss this project ' + icon("arrow") + "</a></aside></div>" +
      '<nav class="pager" aria-label="More projects"><a href="project.html?id=' + encodeURIComponent(prev.id) + '"><small>← Previous</small><b>' + esc(prev.title) + '</b></a><a href="project.html?id=' + encodeURIComponent(next.id) + '"><small>Next →</small><b>' + esc(next.title) + "</b></a></nav>" +
      "</div></section>";
  }

  function renderSkills() {
    var root = $("#skill-groups"); if (!root) return;
    var CTX = ["Coursework", "Projects", "Labs", "Personal"];
    root.innerHTML = Object.keys(S.skills || {}).map(function (g, gi) {
      var grp = S.skills[g];
      return '<section class="skill-group" aria-labelledby="sg' + gi + '"><div class="skill-group__head reveal"><span class="skill-group__num">0' + (gi + 1) + ' /</span><h2 id="sg' + gi + '">' + esc(g) + "</h2><p>" + esc(grp.blurb || "") + "</p></div>" +
        '<div class="grid grid--3">' + (grp.items || []).map(function (s) {
          var used = s.applied || [];
          return '<article class="skcard"><div class="skcard__top"><span class="ico">' + icon(s.icon) + "</span><h3>" + esc(s.name) + "</h3>" + (s.level ? '<span class="lvl lvl--' + esc(String(s.level).toLowerCase()) + '" title="Self-assessed level from my CV">' + esc(s.level) + "</span>" : "") + "</div><p>" + esc(s.note || "") + "</p>" +
            '<div class="applied"><div class="applied__label"><span>Applied in</span><span>' + used.length + "/4</span></div>" +
            '<div class="applied__bar" role="img" aria-label="Applied in ' + used.length + ' of 4 contexts">' + CTX.map(function (c, ci) { return '<i class="' + (ci < used.length ? "on" : "") + '"></i>'; }).join("") + "</div>" +
            '<div class="applied__ctx">' + used.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div></div></article>";
        }).join("") + "</div></section>";
    }).join("");
    var tl = $("#tools");
    if (tl) tl.innerHTML = (S.tools || []).map(function (t, i) { return '<span class="tool reveal" data-delay="' + (i % 5) + '"><b>' + esc(t.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()) + "</b>" + esc(t) + "</span>"; }).join("");
    var mq = $("#marquee");
    if (mq) { var words = []; Object.keys(S.skills).forEach(function (g) { S.skills[g].items.forEach(function (s) { words.push(s.name); }); }); var h = words.map(function (w) { return "<span>" + esc(w) + "</span>"; }).join(""); mq.innerHTML = h + h; }
  }

  function renderAbout() {
    ["#portrait", "#portrait-home"].forEach(function (sel) {
      var ph = $(sel);
      if (ph && S.photo) ph.innerHTML = '<img src="' + esc(S.photo) + '" alt="Portrait of ' + esc(S.name) + '">';
    });
    var tl = $("#timeline");
    if (tl) {
      tl.innerHTML = '<span class="timeline__progress" aria-hidden="true"></span>' + (S.timeline || []).map(function (t) { return '<li class="tl"><span class="tl__when">' + esc(t.when) + "</span><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></li>"; }).join("");
      var bar = $(".timeline__progress", tl);
      var upd = function () { var r = tl.getBoundingClientRect(), v = Math.min(Math.max((innerHeight * .65 - r.top) / r.height, 0), 1); bar.style.height = (v * (r.height - 12)) + "px"; };
      upd(); window.addEventListener("scroll", upd, { passive: true });
    }
    var ach = $("#achievements");
    if (ach) ach.innerHTML = (S.achievements || []).map(function (a, i) { return '<article class="ach reveal" data-delay="' + (i % 3) + '"><span class="ach__type">' + esc(a.type) + "</span><h3>" + esc(a.title) + "</h3><p>" + esc(a.text) + "</p></article>"; }).join("");
    var pc = $("#stat-projects"); if (pc) pc.textContent = (S.projects || []).filter(function (p) { return !p.locked; }).length;
    var sc = $("#stat-skills"); if (sc) { var k = 0; Object.keys(S.skills || {}).forEach(function (g) { k += S.skills[g].items.length; }); sc.textContent = k; }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    pcbBackground(); nav(); fillLinks(); toTop(); heroCanvas(); heroVideo(); lightbox();
    renderFeatured(); renderSkillPreview(); renderMCU(); renderProjects(); renderCube(); renderProjectDetail(); renderSkills(); renderCircuit(); renderAbout();
    reveal(); spotlight();
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) { var id = a.getAttribute("href"); if (id.length < 2) return; var t = document.querySelector(id); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); } });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();