/* SG boot screen: circuit activation → logo reveal → "SYSTEM INITIALIZED".
   Plays once per browser session, never blocks the page: if anything fails, it removes itself. */
(function () {
  "use strict";
  var d = document, root = d.documentElement, body = d.body;
  if (!body || !window.requestAnimationFrame) return;
  var KEY = "sg-boot-played";
  try { if (sessionStorage.getItem(KEY)) return; sessionStorage.setItem(KEY, "1"); } catch (e) { /* storage blocked: play once for this page */ }

  var LOGO = window.SG_LOGO_URL || "https://static.wixstatic.com/media/fe76b3_2dfbbeb259314991b0611ea9b7662c35~mv2.png/v1/fill/w_900,h_900,al_c,q_88,enc_auto/sg-logo.png";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var el, done = false, timers = [];

  function finish(fast) {
    if (done) return; done = true;
    timers.forEach(clearTimeout);
    root.classList.remove("sg-booting");
    if (!el) return;
    el.classList.add("is-leaving");
    setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); }, fast ? 260 : 620);
  }

  try {
    /* Circuit traces for the left side; the other three sides are rotated copies.
       Units: chip centre is (0,0); the logo image is 960 units wide; pin tips sit at r≈252,
       pin offsets 0, ±53, ±105. Traces start off-screen and run inward to the pins. */
    var T = [
      ["M-2600 0H-252", 160, [[-560, 0]]],
      ["M-2600 -220H-640L-475 -53H-252", 230, [[-640, -220], [-475, -53]]],
      ["M-2600 220H-640L-475 53H-252", 230, [[-640, 220], [-475, 53]]],
      ["M-2600 -470H-900L-535 -105H-252", 320, [[-900, -470], [-535, -105]]],
      ["M-2600 470H-900L-535 105H-252", 320, [[-900, 470], [-535, 105]]],
      ["M-2600 -760H-1350L-1100 -510H-760", 420, [[-760, -510]]],
      ["M-2600 760H-1350L-1100 510H-760", 420, [[-760, 510]]]
    ];
    var side = "", i;
    for (i = 0; i < T.length; i++) {
      var t = T[i], dl = t[1], pin = i < 5;
      side += '<path class="sg-trace" pathLength="1" style="--d:' + dl + 'ms" d="' + t[0] + '"/>' +
        '<path class="sg-current" pathLength="1" style="--d:' + (dl + 260) + 'ms" d="' + t[0] + '"/>';
      for (var k = 0; k < t[2].length; k++) side += '<circle class="sg-node" style="--d:' + (dl + 420 + k * 120) + 'ms" cx="' + t[2][k][0] + '" cy="' + t[2][k][1] + '" r="5.5"/>';
      if (pin) { var y = t[0].match(/(-?\d+)H-252$/); side += '<circle class="sg-node sg-node--pin" style="--d:' + (dl + 760) + 'ms" cx="-252" cy="' + (y ? y[1] : 0) + '" r="4"/>'; }
    }
    var sides = "";
    [0, 90, 180, 270].forEach(function (a) { sides += '<g transform="rotate(' + a + ')">' + side + "</g>"; });
    var oct = "M-160 -191H160L191 -160V160L160 191H-160L-191 160V-160Z";
    var ring = "M0 -262H232Q262 -262 262 -232V232Q262 262 232 262H-232Q-262 262 -262 232V-232Q-262 -262 -232 -262Z";

    el = d.createElement("div");
    el.className = "sg-boot" + (reduced ? " sg-boot--still" : "");
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    el.innerHTML =
      '<svg class="sg-boot__circuit" viewBox="-1000 -1000 2000 2000" aria-hidden="true" focusable="false">' +
        '<defs><filter id="sgGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter><filter id="sgTint" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues="0 0.141 0.22 0.561 0.867"/><feFuncG type="table" tableValues="0 0.18 0.314 0.639 0.875"/><feFuncB type="table" tableValues="0 0.29 0.42 0.745 0.859"/></feComponentTransfer></filter></defs>' +
        sides +
        '<path class="sg-edge" d="' + oct + '" filter="url(#sgGlow)"/>' +
        '<path class="sg-ring" pathLength="1" d="' + ring + '"/>' +
      "</svg>" +
      '<div class="sg-boot__chip" aria-hidden="true"><span class="sg-boot__die"></span><img class="sg-boot__logo" alt="" src="' + LOGO + '" decoding="async"></div>' +
      '<div class="sg-boot__text"><span class="sg-boot__label">System initialized</span><span class="sg-boot__bar"><i></i></span></div>' +
      '<span class="sr-only">Loading Shadow Alghamdi’s portfolio</span>';

    root.classList.add("sg-booting");
    body.insertBefore(el, body.firstChild);

    var img = el.querySelector(".sg-boot__logo");
    img.addEventListener("error", function () { el.classList.add("no-logo"); });
    var ok = function () { el.classList.add("logo-ok"); };
    if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok);

    var total = reduced ? 1100 : 2750;
    timers.push(setTimeout(function () { finish(false); }, total));
    timers.push(setTimeout(function () { finish(true); }, 5000));
    el.addEventListener("click", function () { finish(true); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish(true); }, { once: true });
  } catch (err) {
    finish(true);
  }
})();