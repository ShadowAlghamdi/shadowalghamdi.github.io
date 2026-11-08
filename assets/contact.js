// Contact form: rendered from the live Wix Forms schema and submitted through Wix Forms.
import { createFormStore, FORM_ERROR } from "/js/wix/form-store.js";

const FORM_ID = "aab58278-7248-47ec-8ccf-b992aab95aa7";
const root = document.getElementById("wix-form");
const esc = (v) => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const typeOf = (c) => ({ email: "email", url: "url", phone: "tel", password: "password", number: "number", date: "date", time: "time", datetime: "datetime-local" }[c] || "text");
const icon = (n) => (window.SiteIcon ? window.SiteIcon(n) : "");

const store = createFormStore({ formId: FORM_ID });
let built = false;
let formEl = null;

function control(f, v) {
  const common = `id="f-${f.target}" name="${f.target}"${f.required ? " required aria-required=\"true\"" : ""}${f.readOnly ? " disabled" : ""} aria-describedby="e-${f.target}"`;
  const ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : "";
  if (f.control === "textarea") {
    const max = f.validation && f.validation.maxLength ? ` maxlength="${f.validation.maxLength}"` : "";
    return `<textarea ${common}${ph}${max} rows="6">${esc(v || "")}</textarea>`;
  }
  if (f.control === "select") {
    return `<select ${common}><option value="">Select…</option>${(f.choices || []).map((c) => `<option value="${esc(c.value)}"${v === c.value ? " selected" : ""}>${esc(c.label)}</option>`).join("")}</select>`;
  }
  if (f.control === "checkbox") return `<input type="checkbox" ${common}${v === true ? " checked" : ""}>`;
  if (["payment", "appointment", "unknown", "file", "signature", "address"].includes(f.control)) return `<p class="help">This field can be completed by contacting me directly.</p>`;
  const auto = f.control === "email" ? ' autocomplete="email"' : /name/i.test(f.label) ? ' autocomplete="name"' : "";
  return `<input type="${typeOf(f.control)}" ${common}${ph}${auto} value="${esc(v || "")}">`;
}

function build(s) {
  const f = s.form;
  const fields = f.fields;
  const short = fields.filter((x) => x.control !== "textarea");
  const mark = (x) => (x.required && f.requiredIndicator !== "NONE" ? ` <span class="req" aria-hidden="true">${f.requiredIndicator === "TEXT" ? "(required)" : "*"}</span>` : "");
  const html = fields.map((x) => {
    const full = x.control === "textarea" || (short.length % 2 === 1 && x === short[short.length - 1]);
    return `<div class="field${full ? " field--full" : ""}">
      <label for="f-${x.target}"${x.showLabel === false ? ' class="sr-only"' : ""}>${esc(x.label)}${mark(x)}</label>
      ${control(x, s.values[x.target])}
      ${x.description ? `<p class="help">${esc(x.description)}</p>` : ""}
      <p class="err" id="e-${x.target}" role="alert"></p>
    </div>`;
  }).join("");
  root.innerHTML = `<form class="wform" novalidate>
      ${html}
      <div class="alert alert--err" id="form-error" role="alert"></div>
      <div class="form-actions">
        <small>Fields marked * are required.</small>
        <button class="btn" type="submit" id="send-btn"><span class="lbl">${esc(f.submitText || "Send Message")}</span>${icon("arrow")}</button>
      </div>
    </form>`;
  formEl = root.querySelector("form");
  formEl.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.name) return;
    store.setValue(t.name, t.type === "checkbox" ? t.checked : t.value);
  });
  formEl.addEventListener("focusout", (e) => { if (e.target.name) store.validate(e.target.name); });
  formEl.addEventListener("submit", (e) => {
    const st = store.getState();
    if (st.form && st.step < st.form.steps.length - 1) store.next(e);
    else store.submit(e);
  });
  built = true;
}

function update(s) {
  s.form.fields.forEach((x) => {
    const err = s.errors[x.target];
    const el = formEl.querySelector(`[name="${CSS.escape(x.target)}"]`);
    const msg = formEl.querySelector(`#e-${CSS.escape(x.target)}`);
    if (el) { if (err) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid"); }
    if (msg) msg.textContent = (err || "").replace("Enter a first name.", "Enter your name.");
  });
  const fe = formEl.querySelector("#form-error");
  fe.textContent = s.errors[FORM_ERROR] || "";
  const btn = formEl.querySelector("#send-btn");
  btn.disabled = !!s.loading;
  btn.setAttribute("aria-busy", s.loading ? "true" : "false");
  btn.querySelector(".lbl").textContent = s.loading ? "Sending…" : (s.form.submitText || "Send Message");
}

function success(s) {
  const o = s.outcome;
  if (o.url) { if (o.newTab) window.open(o.url, "_blank", "noopener"); else location.assign(o.url); return; }
  const lines = (o.message || "Thank you for reaching out! I'll get back to you as soon as possible.").split("\n").filter(Boolean);
  root.innerHTML = `<div class="success" tabindex="-1">
      <div class="success__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <h3>Message sent successfully</h3>
      ${lines.map((l) => `<p>${esc(l)}</p>`).join("")}
      <button class="btn btn--ghost btn--sm" type="button" id="again">Send another message</button>
    </div>`;
  root.querySelector(".success").focus();
  root.querySelector("#again").addEventListener("click", () => { built = false; store.reset(); render(store.getState()); });
  if (o.durationSeconds) setTimeout(() => { built = false; store.reset(); render(store.getState()); }, o.durationSeconds * 1000);
}

function render(s) {
  if (s.outcome) { built = false; return success(s); }
  if (s.closed) {
    built = false;
    root.innerHTML = `<div class="alert alert--err" style="display:flex">${esc((s.form && s.form.disabledMessage) || "The contact form is not accepting messages right now. Please email me directly instead.")}</div>`;
    return;
  }
  if (!s.form) {
    built = false;
    if (s.errors[FORM_ERROR]) {
      root.innerHTML = `<div class="alert alert--err" style="display:flex">The form could not load (${esc(s.errors[FORM_ERROR])}). Please email me directly instead.</div>`;
    } else {
      root.innerHTML = `<div class="wform" aria-busy="true"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton field--full"></div><div class="skeleton field--full" style="height:160px"></div></div>`;
    }
    return;
  }
  if (!built) build(s);
  update(s);
}

store.subscribe(render);
render(store.getState());
store.start();