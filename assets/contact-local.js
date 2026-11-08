/* Contact form for the offline copy (opened as file://).
   Wix Forms can't be reached from a local file, so this version checks the fields
   and opens the visitor's email app with the message ready to send. */
(function () {
  "use strict";
  if (location.protocol !== "file:") return;
  var root = document.getElementById("wix-form");
  if (!root) return;
  var TO = (window.SITE && window.SITE.links && window.SITE.links.email) || "Shadowalghamdii@gmail.com";
  var icon = window.SiteIcon ? window.SiteIcon("arrow") : "";
  var FIELDS = [
    { id: "name", label: "Name", type: "text", ph: "Your full name", auto: "name", full: false, check: function (v) { return v.trim() ? "" : "Enter your name."; } },
    { id: "email", label: "Email", type: "email", ph: "you@company.com", auto: "email", full: false, check: function (v) { return !v.trim() ? "Enter an email address." : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter an email address like example@mysite.com."); } },
    { id: "subject", label: "Subject", type: "text", ph: "What is this about?", full: true, check: function (v) { return v.trim() ? "" : "Enter a subject."; } },
    { id: "message", label: "Message", type: "textarea", ph: "Tell me about the opportunity, project or idea...", full: true, check: function (v) { return v.trim().length >= 10 ? "" : "Write at least 10 characters."; } }
  ];

  function render() {
    root.innerHTML = '<form class="wform" novalidate>' + FIELDS.map(function (f) {
      var ctl = f.type === "textarea"
        ? '<textarea id="f-' + f.id + '" name="' + f.id + '" rows="6" placeholder="' + f.ph + '" required aria-required="true" aria-describedby="e-' + f.id + '"></textarea>'
        : '<input id="f-' + f.id + '" name="' + f.id + '" type="' + f.type + '" placeholder="' + f.ph + '"' + (f.auto ? ' autocomplete="' + f.auto + '"' : "") + ' required aria-required="true" aria-describedby="e-' + f.id + '">';
      return '<div class="field' + (f.full ? " field--full" : "") + '"><label for="f-' + f.id + '">' + f.label + ' <span class="req" aria-hidden="true">*</span></label>' + ctl + '<p class="err" id="e-' + f.id + '" role="alert"></p></div>';
    }).join("") +
      '<div class="form-actions"><small>Fields marked * are required. Sending opens your email app.</small><button class="btn" type="submit">Send Message' + icon + "</button></div></form>";
    var form = root.querySelector("form");
    function validate(f) {
      var el = form.elements[f.id], msg = f.check(el.value);
      root.querySelector("#e-" + f.id).textContent = msg;
      if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
      return !msg;
    }
    form.addEventListener("focusout", function (e) { FIELDS.forEach(function (f) { if (e.target.name === f.id) validate(f); }); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      FIELDS.forEach(function (f) { if (!validate(f)) { ok = false; first = first || form.elements[f.id]; } });
      if (!ok) { first.focus(); return; }
      var v = function (k) { return form.elements[k].value.trim(); };
      var body = v("message") + "\n\n" + v("name") + " (" + v("email") + ")";
      location.href = "mailto:" + TO + "?subject=" + encodeURIComponent(v("subject")) + "&body=" + encodeURIComponent(body);
      root.innerHTML = '<div class="success" tabindex="-1"><div class="success__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h3>Your email is ready</h3><p>Your email app opened with the message filled in. Press Send there to deliver it.</p><button class="btn btn--ghost btn--sm" type="button" id="again">Write another message</button></div>';
      root.querySelector(".success").focus();
      root.querySelector("#again").addEventListener("click", render);
    });
  }
  render();
})();
