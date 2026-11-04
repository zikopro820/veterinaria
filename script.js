/* =========================================================
   HUELLITAS — Funciones del sitio
   Los productos, servicios, WhatsApp, dirección y horarios se
   editan desde el PANEL (si Firebase está conectado) o en datos.js.
   ========================================================= */
const D0 = window.DATOS || { ajustes: {}, servicios: [], productos: [], iconos: {} };
let AJ = { ...D0.ajustes };
let WHATSAPP = AJ.whatsapp || "51987654321";
const FB_CFG = window.FIREBASE_CONFIG || {};
const EN_VIVO = !!FB_CFG.apiKey && !FB_CFG.apiKey.startsWith("PEGA");
const FB_V = "10.12.2";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const soles = n => "S/ " + (+n).toFixed(2);
const precio = n => !+n ? "Consultar" : "S/ " + (Number.isInteger(+n) ? +n : (+n).toFixed(2));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const foto = (img, w = 600) => !img ? "" : (img.startsWith("http") || img.startsWith("data:")) ? img : `https://images.unsplash.com/photo-${img}?auto=format&fit=crop&w=${w}&q=80`;
const wa = txt => window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(txt), "_blank");
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const ICO = {
  plus: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  bag: '<svg class="ico" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
  paw: '<svg class="ico" viewBox="0 0 24 24"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><path d="M8 14c0-2 1.8-4 4-4s4 2 4 4c0 1.5 2 2.5 2 4.5S16.5 22 15 22c-1.2 0-2-.8-3-.8s-1.8.8-3 .8c-1.5 0-3-1.5-3-3.5S8 15.5 8 14z"/></svg>',
  arrow: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
const icono = k => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${(D0.iconos || {})[k] || (D0.iconos || {}).paw || ""}</svg>`;

/* ---------- Menú y animaciones ---------- */
const menu = $("#menu"), burger = $("#hamburger");
if (menu && burger) burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
let io = null;
function revealAll(root = document) {
  if (!io) { $$(".reveal", root).forEach(el => el.classList.add("visible")); return; }
  $$(".reveal:not(.visible)", root).forEach(el => io.observe(el));
}
if ("IntersectionObserver" in window) io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .08 });
revealAll();
if (EN_VIVO) $$(".demo-only").forEach(el => el.remove());

function toast(t) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.innerHTML = ICO.check + t; el.classList.add("show");
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

/* =========================================================
   DATOS: Firebase → panel en modo demo (mismo navegador) → datos.js
   ========================================================= */
const ordenar = l => l.slice().sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || String(a.n).localeCompare(String(b.n)));
let DATA = null;
async function cargarDatos() {
  if (DATA) return DATA;
  let prod = null, serv = null, aj = null;
  try {
    if (EN_VIVO) {
      let cache = null; try { cache = JSON.parse(sessionStorage.getItem("hv_cache")); } catch (e) {}
      if (cache && Date.now() - cache.t < 5 * 60 * 1000) ({ prod, serv, aj } = cache);
      else {
        const base = `https://www.gstatic.com/firebasejs/${FB_V}/`;
        const [app, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js")]);
        const db = fs.getFirestore(app.getApps().length ? app.getApp() : app.initializeApp(FB_CFG));
        const [p, s, a] = await Promise.all([fs.getDocs(fs.collection(db, "productos")), fs.getDocs(fs.collection(db, "servicios")), fs.getDoc(fs.doc(db, "ajustes", "general"))]);
        prod = p.docs.map(d => ({ ...d.data(), id: d.id })); serv = s.docs.map(d => ({ ...d.data(), id: d.id })); aj = a.exists() ? a.data() : null;
        try { sessionStorage.setItem("hv_cache", JSON.stringify({ t: Date.now(), prod, serv, aj })); } catch (e) {}
      }
    } else {
      const local = store.get("hv_db", null);   // datos del panel en MODO DEMO (mismo navegador)
      if (local) {
        if (local.productos) prod = Object.entries(local.productos).map(([id, x]) => ({ ...x, id }));
        if (local.servicios) serv = Object.entries(local.servicios).map(([id, x]) => ({ ...x, id }));
        if (local.ajustes) aj = local.ajustes;
      }
    }
  } catch (e) { console.warn("No se pudieron leer los datos; se usan los de ejemplo.", e); }
  // Si la base está vacía se muestran los datos de ejemplo (datos.js)
  DATA = {
    productos: ordenar(prod && prod.length ? prod : D0.productos).filter(x => x.visible !== false),
    servicios: ordenar(serv && serv.length ? serv : D0.servicios).filter(x => x.visible !== false),
    ajustes: { ...D0.ajustes, ...(aj || {}) },
  };
  return DATA;
}

/* ---------- Ajustes: WhatsApp, dirección, horarios ---------- */
function aplicarAjustes(a) {
  AJ = a; WHATSAPP = String(a.whatsapp || WHATSAPP).replace(/\D/g, "");
  $$(".wa-link").forEach(x => x.href = "https://wa.me/" + WHATSAPP);
  const t = {
    telefono: a.telefono, direccion: a.direccion, correo: a.correo,
    horario: `Lun a Sáb ${a.abre} – ${a.cierra} · Dom ` + (a.domingoCierra ? `${a.abre} – ${a.domingoCierra}` : "cerrado"),
    horarioLS: `${a.abre} – ${a.cierra}`, horarioDom: a.domingoCierra ? `${a.abre} – ${a.domingoCierra}` : "Cerrado",
    deliveryTxt: +a.deliveryGratis ? `Delivery gratis desde S/ ${a.deliveryGratis}` : "Delivery a todo Lima",
  };
  $$("[data-aj]").forEach(x => { const v = t[x.dataset.aj]; if (v != null && v !== "") x.textContent = v; });
  const m = $("#mapa"); if (m && a.direccion) { const src = "https://www.google.com/maps?q=" + encodeURIComponent(a.direccion) + "&output=embed"; if (m.src !== src) m.src = src; }
}

/* =========================================================
   SERVICIOS
   ========================================================= */
function svcCard(x) {
  return `<article class="svc reveal">
    <div class="svc-img">${x.img ? `<img src="${esc(foto(x.img, 700))}" alt="${esc(x.n)}" loading="lazy" onerror="this.remove()">` : ""}<span class="ic">${icono(x.icon)}</span></div>
    <div class="svc-body"><h3>${esc(x.n)}</h3><p>${esc(x.d)}</p>
      <div class="svc-foot"><div class="price"><small>${+x.p ? "Desde" : "Precio"}</small><b>${precio(x.p)}</b></div>
      ${x.reservable !== false ? `<a href="citas?servicio=${encodeURIComponent(x.id)}" class="btn btn-light btn-sm">Reservar ${ICO.arrow}</a>` : `<a href="contacto" class="btn btn-light btn-sm">Consultar ${ICO.arrow}</a>`}</div>
    </div></article>`;
}
function pintarServicios(list) {
  const main = $$("#svcMain"), mini = $("#svcMini");
  main.forEach(el => { const lim = +el.dataset.limit || 99; el.innerHTML = list.filter(x => x.tipo !== "adicional").slice(0, lim).map(svcCard).join(""); revealAll(el); });
  if (mini) { mini.innerHTML = list.filter(x => x.tipo === "adicional").map(x => `<div class="svc-mini reveal"><i>${icono(x.icon)}</i><div><b>${esc(x.n)}</b><span>${esc(x.d)}${+x.p ? " · desde " + precio(x.p) : ""}</span></div></div>`).join(""); revealAll(mini); }
}

/* =========================================================
   CARRITO Y TIENDA
   ========================================================= */
let PRODS = [];
let cart = store.get("hv_cart", []).map(i => ({ ...i, id: String(i.id) }));
const P = id => PRODS.find(p => String(p.id) === String(id));
const disponible = p => p && p.stock !== "agotado";
function saveCart() { store.set("hv_cart", cart); drawCart(); }
function addToCart(id) {
  if (!disponible(P(id))) return toast("Producto agotado");
  const it = cart.find(i => i.id === String(id));
  it ? it.q++ : cart.push({ id: String(id), q: 1 });
  saveCart(); toast("Agregado al carrito");
}
function drawCart() {
  cart = cart.filter(i => disponible(P(i.id)));
  const n = cart.reduce((a, i) => a + i.q, 0);
  $$(".cart-count").forEach(c => { c.textContent = n || ""; c.dataset.n = n; });
  const box = $("#cartItems"); if (!box) return;
  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">${ICO.bag}<b>Tu carrito está vacío</b><p>Agrega alimento, accesorios o medicamentos para tu mascota.</p></div>`;
    $("#cartFoot").style.display = "none"; return;
  }
  $("#cartFoot").style.display = "";
  box.innerHTML = cart.map(i => { const p = P(i.id); return `
    <div class="ci"><div class="ci-img">${p.img ? `<img src="${esc(foto(p.img, 160))}" alt="">` : ""}</div>
      <div class="ci-info"><b>${esc(p.n)}</b><small>${soles(p.p)} c/u</small></div>
      <div class="qty"><button data-q="-1" data-id="${esc(p.id)}" aria-label="Quitar uno">−</button><span>${i.q}</span><button data-q="1" data-id="${esc(p.id)}" aria-label="Agregar uno">+</button></div>
    </div>`; }).join("");
  const sub = cart.reduce((a, i) => a + P(i.id).p * i.q, 0);
  const gratis = +AJ.deliveryGratis || 0, costo = +AJ.delivery || 0;
  const del = $("input[name=entrega]:checked")?.value === "Delivery" ? (gratis && sub >= gratis ? 0 : costo) : 0;
  $("#cSub").textContent = soles(sub);
  $("#cDel").textContent = del ? soles(del) : "Gratis";
  $("#cTot").textContent = soles(sub + del);
  $("#cHint").textContent = !gratis ? "" : sub < gratis ? `Te faltan ${soles(gratis - sub)} para delivery gratis` : "¡Tienes delivery gratis!";
}
const panel = $("#cart");
if (panel) {
  $$(".cart-btn").forEach(b => b.addEventListener("click", () => panel.classList.add("open")));
  $$("[data-close]", panel).forEach(b => b.addEventListener("click", () => panel.classList.remove("open")));
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("[data-q]"); if (!b) return;
    const it = cart.find(i => i.id === b.dataset.id); it.q += +b.dataset.q;
    if (it.q <= 0) cart = cart.filter(i => i !== it);
    saveCart();
  });
  $$("input[name=entrega]").forEach(r => r.addEventListener("change", () => { $("#cAddr").style.display = r.value === "Delivery" && r.checked ? "" : "none"; drawCart(); }));
  $("#cartSend").addEventListener("click", () => {
    const name = $("#cName"), addr = $("#cAddr"), ent = $("input[name=entrega]:checked").value;
    [name, addr].forEach(x => x.classList.remove("error"));
    if (!name.value.trim()) { name.classList.add("error"); name.focus(); return; }
    if (ent === "Delivery" && !addr.value.trim()) { addr.classList.add("error"); addr.focus(); return; }
    const lines = ["Hola, quiero hacer este pedido:", ""];
    cart.forEach(i => { const p = P(i.id); lines.push(`• ${i.q} x ${p.n} — ${soles(p.p * i.q)}`); });
    lines.push("", `Subtotal: ${$("#cSub").textContent}`, `Entrega: ${ent}${ent === "Delivery" ? " (" + $("#cDel").textContent + ")" : ""}`, `*Total: ${$("#cTot").textContent}*`, "", "Nombre: " + name.value.trim());
    if (ent === "Delivery") lines.push("Dirección: " + addr.value.trim());
    wa(lines.join("\n"));
  });
}

const GRAD = ["#c9bcff,#ffc7b8", "#b8ecd7,#c9bcff", "#ffd9a8,#ffb8a8", "#bfe3ff,#d8c9ff"];
const hash = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 9973; return h; };
function card(p) {
  const ag = !disponible(p);
  const tag = ag ? `<span class="tag out">Agotado</span>` : p.tag ? `<span class="tag ${p.tag === "Nuevo" ? "new" : p.tag === "Recomendado" ? "vet" : ""}">${p.tag === "Recomendado" ? "Recomendado por el vet" : esc(p.tag)}</span>` : "";
  return `<article class="prod${ag ? " sold" : ""}">${tag}
    <div class="prod-img" style="background:linear-gradient(135deg,${GRAD[hash(p.id) % 4]})"><span class="ph">${ICO.paw}</span>
      ${p.img ? `<img src="${esc(foto(p.img))}" alt="${esc(p.n)}" loading="lazy" onerror="this.remove()">` : ""}</div>
    <div class="prod-body"><span class="cat">${esc(p.cat)} · ${p.esp === "ambos" ? "Perro y gato" : p.esp === "perro" ? "Perro" : "Gato"}</span>
      <h3>${esc(p.n)}</h3><p class="desc">${esc(p.d)}</p>
      <div class="prod-foot"><div class="p"><b>${soles(p.p)}</b>${+p.old > +p.p ? `<s>${soles(p.old)}</s>` : ""}</div>
        <button class="add" data-add="${esc(p.id)}" aria-label="Agregar ${esc(p.n)} al carrito" ${ag ? "disabled" : ""}>${ICO.plus}</button></div>
    </div></article>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if (!b || b.disabled) return;
  addToCart(b.dataset.add); b.classList.add("done"); b.innerHTML = ICO.check;
  setTimeout(() => { b.classList.remove("done"); b.innerHTML = ICO.plus; }, 1200);
});
function pintarTienda() {
  const feat = $("#featured");
  if (feat) { const d = PRODS.filter(p => p.destacado && disponible(p)); feat.innerHTML = (d.length ? d : PRODS.filter(disponible)).slice(0, 4).map(card).join(""); }
  const grid = $("#shopGrid"); if (!grid) return;
  let fCat = "Todos", fEsp = "todos", q = "";
  const draw = () => {
    const list = PRODS.filter(p => (fCat === "Todos" || p.cat === fCat) && (fEsp === "todos" || p.esp === fEsp || p.esp === "ambos") && (p.n + " " + (p.d || "")).toLowerCase().includes(q))
      .sort((a, b) => disponible(b) - disponible(a));
    grid.innerHTML = list.length ? list.map(card).join("") : `<p class="empty">No encontramos productos con ese filtro. Escríbenos por WhatsApp y te lo conseguimos.</p>`;
    $("#shopCount").textContent = list.length + (list.length === 1 ? " producto" : " productos");
  };
  $$("[data-cat]").forEach(c => c.addEventListener("click", () => { $$("[data-cat]").forEach(x => x.classList.remove("on")); c.classList.add("on"); fCat = c.dataset.cat; draw(); }));
  $$("[data-esp]").forEach(c => c.addEventListener("click", () => { $$("[data-esp]").forEach(x => x.classList.remove("on")); c.classList.add("on"); fEsp = c.dataset.esp; draw(); }));
  $("#shopSearch").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); draw(); });
  const pc = new URLSearchParams(location.search).get("cat");
  if (pc) { const c = $(`[data-cat="${pc}"]`); if (c) c.click(); else draw(); } else draw();
}

/* =========================================================
   RESERVA DE CITAS
   ========================================================= */
function iniciarCitas(servicios) {
  const book = $("#bookForm"); if (!book) return;
  const opts = $("#svcOpts"), res = servicios.filter(x => x.reservable !== false);
  if (opts && res.length) opts.innerHTML = res.map((x, i) => `<label class="opt"><input type="radio" name="servicio" value="${esc(x.n)}" data-key="${esc(x.id)}" data-price="${+x.p ? "Desde " + precio(x.p) : "Consultar"}" required${i === 0 ? " checked" : ""}><span>${icono(x.icon)}${esc(x.n)}<small>${+x.p ? "desde " + precio(x.p) : "a consultar"}</small></span></label>`).join("");
  const dateIn = $("[name=fecha]", book), slotsBox = $("#slots");
  const pad = n => String(n).padStart(2, "0");
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  dateIn.min = iso(new Date());
  const max = new Date(); max.setDate(max.getDate() + 45); dateIn.max = iso(max);
  let slot = "";
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const nice = s => { const d = new Date(s + "T12:00"); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  const min = t => { const [h, m] = String(t || "0:00").split(":").map(Number); return h * 60 + (m || 0); };
  // Demo: algunos horarios aparecen ocupados (en la versión real vendrían de la agenda del panel)
  const busy = (s, h) => { let x = 0; for (const c of s + h) x = (x * 31 + c.charCodeAt(0)) % 997; return x % 3 === 0; };
  function drawSlots() {
    slot = ""; updateSum();
    if (!dateIn.value) { slotsBox.innerHTML = `<p class="slots-msg">Primero elige una fecha para ver los horarios disponibles.</p>`; return; }
    const d = new Date(dateIn.value + "T12:00"), sun = d.getDay() === 0;
    if (sun && !AJ.domingoCierra) { slotsBox.innerHTML = `<p class="slots-msg">Los domingos no atendemos citas. Para emergencias escríbenos por WhatsApp.</p>`; return; }
    const hours = []; for (let t = min(AJ.abre); t + 30 <= min(sun ? AJ.domingoCierra : AJ.cierra); t += 30) hours.push(pad(Math.floor(t / 60)) + ":" + pad(t % 60));
    const now = new Date(), isToday = dateIn.value === iso(now);
    slotsBox.innerHTML = hours.map(h => {
      const past = isToday && min(h) <= now.getHours() * 60 + now.getMinutes() + 30;
      return `<button type="button" class="slot" data-h="${h}" ${past || busy(dateIn.value, h) ? "disabled" : ""}>${h}</button>`;
    }).join("") + (sun ? `<p class="slots-msg">Domingos atendemos de ${esc(AJ.abre)} a ${esc(AJ.domingoCierra)}. Emergencias las 24 horas.</p>` : "");
  }
  slotsBox.addEventListener("click", e => {
    const b = e.target.closest(".slot"); if (!b || b.disabled) return;
    $$(".slot", slotsBox).forEach(x => x.classList.remove("on")); b.classList.add("on"); slot = b.dataset.h; updateSum();
  });
  dateIn.addEventListener("change", drawSlots);
  function updateSum() {
    const s = $("input[name=servicio]:checked", book), e = $("input[name=especie]:checked", book);
    $("#sServ").textContent = s ? s.value : "—";
    $("#sPet").textContent = ($("[name=mascota]", book).value.trim() || "—") + (e ? " · " + e.value : "");
    $("#sDate").textContent = dateIn.value ? nice(dateIn.value) : "—";
    $("#sHour").textContent = slot || "—";
    $("#sPrice").textContent = s ? s.dataset.price : "—";
  }
  book.addEventListener("input", updateSum); book.addEventListener("change", updateSum);
  const ps = new URLSearchParams(location.search);
  if (ps.get("servicio")) { const r = $$("input[name=servicio]", book).find(x => x.dataset.key === ps.get("servicio")); if (r) r.checked = true; }
  if (ps.get("codigo")) $("[name=codigo]", book).value = ps.get("codigo").toUpperCase();
  drawSlots();

  book.addEventListener("submit", e => {
    e.preventDefault();
    const msg = $(".f-msg", book);
    $$(".error", book).forEach(x => x.classList.remove("error"));
    const bad = $$("[required]", book).filter(x => !x.checkValidity());
    const tel = $("[name=celular]", book); if (tel.value.replace(/\D/g, "").length < 9) bad.push(tel);
    if (!slot) bad.push(slotsBox);
    if (bad.length) {
      bad.forEach(x => x.classList.add("error"));
      msg.className = "f-msg err";
      msg.textContent = !slot && bad.length === 1 ? "Elige un horario disponible." : "Completa los campos obligatorios (*) y elige un horario.";
      (bad[0].focus ? bad[0] : slotsBox).focus?.(); return;
    }
    const v = n => ($(`[name="${n}"]`, book)?.value || "").trim();
    const lines = ["Hola, quiero reservar una cita:", "",
      "• Servicio: " + $("input[name=servicio]:checked", book).value,
      "• Fecha: " + nice(dateIn.value), "• Hora: " + slot, "",
      "• Mascota: " + v("mascota") + " (" + $("input[name=especie]:checked", book).value + ")"];
    if (v("raza")) lines.push("• Raza / edad: " + v("raza"));
    lines.push("• Dueño(a): " + v("nombre"), "• Celular: " + v("celular"));
    if (v("codigo")) lines.push("• Código de cliente: " + v("codigo").toUpperCase());
    if (v("motivo")) lines.push("• Motivo: " + v("motivo"));
    wa(lines.join("\n"));
    msg.className = "f-msg ok";
    msg.textContent = "¡Listo! Se abrió WhatsApp con tu reserva. Envía el mensaje y te confirmamos en minutos.";
  });
}

/* ---------- Arranque ---------- */
aplicarAjustes(AJ);
cargarDatos().then(d => {
  aplicarAjustes(d.ajustes);
  PRODS = d.productos; drawCart(); pintarTienda();
  pintarServicios(d.servicios);
  iniciarCitas(d.servicios);
});

/* =========================================================
   PORTAL MI MASCOTA
   (Demo: los datos están aquí. En la versión real se leen
    de una base de datos como Firebase.)
   ========================================================= */
const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
const CLIENTES = {
  "HV-1024": { dueño: "María López", celular: "987 654 321", mascotas: [
    { nombre: "Rocky", especie: "Perro", raza: "Labrador Retriever", sexo: "Macho", nac: day(-4 * 365 - 40), peso: "31.5 kg", chip: "604 0981 2234", alergias: "Alergia al pollo",
      foto: "1581958485706-3c6f6eb4c1bf",
      prox: { servicio: "Vacuna Antirrábica anual", fecha: day(2), hora: "10:30", vet: "Dra. Carla Méndez", sede: "Sede Miraflores · Consultorio 2" },
      vacunas: [ { n: "Antirrábica", ult: day(-363), prox: day(2) }, { n: "Séxtuple (DHPPI+L)", ult: day(-200), prox: day(165) }, { n: "Bordetella (tos de las perreras)", ult: day(-340), prox: day(25) } ],
      historial: [
        { f: day(-18), t: "Baño medicado y corte", d: "Piel en buen estado. Se recomienda shampoo hipoalergénico.", vet: "Grooming · Luis R." },
        { f: day(-45), t: "Consulta dermatológica", d: "Dermatitis leve por alergia alimentaria. Se cambió a alimento hipoalergénico.", vet: "Dra. Carla Méndez" },
        { f: day(-120), t: "Desparasitación interna", d: "Tableta según peso (31 kg). Próxima en 3 meses.", vet: "Dr. Andrés Salas" },
        { f: day(-200), t: "Vacuna Séxtuple + control anual", d: "Peso 30.8 kg. Corazón y articulaciones sin hallazgos.", vet: "Dra. Carla Méndez" } ],
      rec: [ { i: "pill", t: "Desparasitación", f: day(3) }, { i: "bath", t: "Próximo baño", f: day(12) }, { i: "food", t: "Recompra de alimento", f: day(6) } ] },
    { nombre: "Luna", especie: "Gato", raza: "Mestiza", sexo: "Hembra (esterilizada)", nac: day(-2 * 365 - 100), peso: "4.2 kg", chip: "604 0981 5521", alergias: "Ninguna",
      foto: "1592194996308-7b43878e84a6",
      prox: { servicio: "Control post esterilización", fecha: day(9), hora: "16:00", vet: "Dr. Andrés Salas", sede: "Sede Miraflores · Consultorio 1" },
      vacunas: [ { n: "Triple Felina", ult: day(-380), prox: day(-15) }, { n: "Leucemia Felina", ult: day(-300), prox: day(65) }, { n: "Antirrábica", ult: day(-100), prox: day(265) } ],
      historial: [
        { f: day(-21), t: "Esterilización (OVH)", d: "Cirugía sin complicaciones. Retiro de puntos realizado.", vet: "Dr. Andrés Salas" },
        { f: day(-100), t: "Vacuna Antirrábica", d: "Aplicada sin reacciones.", vet: "Dra. Carla Méndez" } ],
      rec: [ { i: "pill", t: "Desparasitación", f: day(20) }, { i: "food", t: "Arena sanitaria", f: day(4) }, { i: "steth", t: "Chequeo general", f: day(150) } ] } ] },
  "HV-2048": { dueño: "Jorge Ramos", celular: "912 345 678", mascotas: [
    { nombre: "Max", especie: "Perro", raza: "Bulldog Francés", sexo: "Macho", nac: day(-365 - 80), peso: "11.8 kg", chip: "604 0981 7710", alergias: "Ninguna",
      foto: "1746483966037-c3c9e6374e08",
      prox: { servicio: "Limpieza dental con ultrasonido", fecha: day(5), hora: "09:00", vet: "Dr. Andrés Salas", sede: "Sede Miraflores · Sala de procedimientos" },
      vacunas: [ { n: "Séxtuple (DHPPI+L)", ult: day(-340), prox: day(25) }, { n: "Antirrábica", ult: day(-300), prox: day(65) } ],
      historial: [
        { f: day(-30), t: "Consulta general", d: "Sarro moderado. Se programa limpieza dental en ayunas de 12 h.", vet: "Dr. Andrés Salas" },
        { f: day(-90), t: "Baño y corte de uñas", d: "Sin observaciones.", vet: "Grooming · Luis R." } ],
      rec: [ { i: "alert", t: "Ayuno 12 h antes de la limpieza", f: day(4) }, { i: "pill", t: "Pipeta antipulgas", f: day(8) }, { i: "bath", t: "Próximo baño", f: day(20) } ] } ] },
};
const portal = $("#portal");
if (portal) {
  const R_ICO = {
    pill: '<path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/>',
    bath: '<path d="M4 12h16a1 1 0 0 1 1 1v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2a1 1 0 0 1 1-1zM6 12V5a2 2 0 0 1 4 0M6 20l-1 2M18 20l1 2"/>',
    food: '<path d="M3 11h18l-2 9H5zM8 11V7a4 4 0 0 1 8 0v4"/>',
    steth: '<path d="M6 3v6a6 6 0 0 0 12 0V3M12 15v2a4 4 0 0 0 8 0v-3"/><circle cx="20" cy="12" r="2"/>',
    alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
  };
  const ic = k => `<svg class="ico" viewBox="0 0 24 24">${R_ICO[k]}</svg>`;
  const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const fmt = d => `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()}`;
  const diff = d => Math.round((d - day(0)) / 864e5);
  const edad = d => { const m = Math.floor((Date.now() - d) / (30.44 * 864e5)); return m >= 12 ? `${Math.floor(m / 12)} año${m >= 24 ? "s" : ""}${m % 12 ? " y " + (m % 12) + " m" : ""}` : `${m} meses`; };
  const enDias = n => n === 0 ? "Hoy" : n === 1 ? "Mañana" : n < 0 ? `Hace ${-n} días` : `En ${n} días`;
  let cli = null, code = "", idx = 0, timer = null;

  const E = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fotoSrc = f => !f ? "" : f.startsWith("data:") ? f : foto(f, 700);

  /* ---- Lee los datos: Firebase (si está configurado) → panel en modo demo → ejemplos ---- */
  const CFG = window.FIREBASE_CONFIG || {};
  const LIVE = CFG.apiKey && !CFG.apiKey.startsWith("PEGA");
  const toD = s => { if (!s) return null; if (s instanceof Date) return s; const [y, mo, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(y, mo - 1, d); };
  function normal(c, mascotas) {   // convierte el formato del panel al de esta página
    return { dueño: c.dueno || c.dueño || "", mascotas: mascotas.map(m => ({ ...m,
      nac: toD(m.nac),
      prox: m.prox && m.prox.fecha ? { ...m.prox, servicio: m.prox.detalle ? `${m.prox.servicio} · ${m.prox.detalle}` : m.prox.servicio, fecha: toD(m.prox.fecha) } : null,
      vacunas: (m.vacunas || []).map(v => ({ ...v, ult: toD(v.ult), prox: toD(v.prox) })),
      historial: (m.historial || []).map(h => ({ ...h, f: toD(h.f) })).sort((a, b) => b.f - a.f),
      rec: (m.rec || []).map(r => ({ ...r, f: toD(r.f) })).filter(r => diff(r.f) >= -7).sort((a, b) => a.f - b.f) })) };
  }
  async function buscar(c) {
    if (LIVE) {
      const base = "https://www.gstatic.com/firebasejs/10.12.2/";
      const [app, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js")]);
      const db = fs.getFirestore(app.getApps().length ? app.getApp() : app.initializeApp(CFG));
      const s = await fs.getDoc(fs.doc(db, "clientes", c)); if (!s.exists()) return null;
      const ms = await fs.getDocs(fs.collection(db, "clientes", c, "mascotas"));
      return normal(s.data(), ms.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    let local = null; try { local = JSON.parse(localStorage.getItem("hv_db")); } catch (e) {}
    if (local && local.clientes && local.clientes[c]) { const x = local.clientes[c]; return normal(x, Object.entries(x.mascotas || {}).map(([id, m]) => ({ id, ...m }))); }
    return CLIENTES[c] || null;
  }

  async function login(c) {
    c = c.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^HV[A-Z0-9]+$/.test(c)) c = "HV-" + c.slice(2);
    const err = $("#loginErr"), btn = $("#codeForm button");
    err.textContent = ""; btn.disabled = true;
    let r = null;
    try { r = await buscar(c); } catch (e) { console.error(e); err.textContent = "No pudimos conectar. Revisa tu internet e intenta otra vez."; btn.disabled = false; return; }
    btn.disabled = false;
    if (!r) { err.textContent = "Código no encontrado. Revisa tu código o escríbenos por WhatsApp."; $("#codeIn").classList.add("error"); try { sessionStorage.removeItem("hv_code"); } catch (e) {} return; }
    if (!r.mascotas.length) { err.textContent = "Tu código aún no tiene mascotas registradas. Consulta en la veterinaria."; return; }
    cli = r; code = c; idx = 0;
    try { sessionStorage.setItem("hv_code", c); } catch (e) {}
    $("#login").style.display = "none"; $("#dash").classList.add("show");
    render(); window.scrollTo({ top: portal.offsetTop - 90, behavior: "smooth" });
  }
  function logout() {
    try { sessionStorage.removeItem("hv_code"); } catch (e) {}
    clearInterval(timer); $("#dash").classList.remove("show"); $("#login").style.display = ""; $("#codeIn").value = "";
  }
  function render() {
    const m = cli.mascotas[idx];
    $("#dHello").textContent = `Hola, ${(cli.dueño || "").split(" ")[0]}`;
    $("#dCode").textContent = code;
    $("#petTabs").innerHTML = cli.mascotas.length > 1 ? cli.mascotas.map((p, i) => `<button class="pet-tab ${i === idx ? "on" : ""}" data-i="${i}"><span class="av">${p.foto ? `<img src="${E(fotoSrc(p.foto))}" alt="" onerror="this.remove()">` : ""}</span>${E(p.nombre)}</button>`).join("") : "";
    const vencidas = m.vacunas.filter(v => diff(v.prox) < 0);
    $("#petCard").innerHTML = `
      <div class="pet-photo">${m.foto ? `<img src="${E(fotoSrc(m.foto))}" alt="Foto de ${E(m.nombre)}" onerror="this.remove()">` : ""}<span class="badge">${E(m.especie)}</span></div>
      <div class="pet-info"><h2>${E(m.nombre)}</h2><span>${E([m.raza, m.sexo].filter(Boolean).join(" · "))}</span>
        <div class="facts">
          <div><small>Edad</small><b>${m.nac ? edad(m.nac) : "—"}</b></div><div><small>Peso</small><b>${E(m.peso || "—")}</b></div>
          <div><small>Microchip</small><b>${E(m.chip || "—")}</b></div><div><small>Alergias</small><b>${E(m.alergias || "—")}</b></div>
        </div>
        ${vencidas.length ? `<div class="alert-box">${ic("alert")}<span><b>Vacuna vencida:</b> ${E(vencidas.map(v => v.n).join(", "))}. Agenda su refuerzo.</span></div>` : ""}
      </div>`;
    clearInterval(timer);
    const pr = m.prox && diff(m.prox.fecha) >= 0 ? m.prox : null;
    if (pr) {
      const d = pr.fecha;
      $("#nextBox").innerHTML = `
        <div><small>PRÓXIMA CITA · ${enDias(diff(d)).toUpperCase()}</small><h3>${E(pr.servicio)}</h3>
          <p>${DIA[d.getDay()]} ${fmt(d)} · <b>${E(pr.hora)} h</b><br>${E([pr.vet, pr.sede].filter(Boolean).join(" · "))}</p></div>
        <div class="countdown" id="cd"></div>
        <div class="next-actions">
          <button class="btn btn-white" data-act="confirmar">Confirmar asistencia</button>
          <button class="btn btn-glass" data-act="reprogramar">Reprogramar</button>
          <a class="btn btn-glass" href="citas?codigo=${code}">Agendar otra cita</a>
        </div>`;
      const [hh, mm] = (pr.hora || "00:00").split(":"); const target = new Date(d); target.setHours(+hh, +mm);
      const tick = () => {
        let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
        const D = Math.floor(s / 86400); s %= 86400; const H = Math.floor(s / 3600); s %= 3600; const M = Math.floor(s / 60);
        $("#cd").innerHTML = `<div><b>${D}</b><span>días</span></div><div><b>${H}</b><span>horas</span></div><div><b>${M}</b><span>min</span></div>`;
      };
      tick(); timer = setInterval(tick, 30000);
    } else {
      $("#nextBox").innerHTML = `<div><small>PRÓXIMA CITA</small><h3>${E(m.nombre)} no tiene citas programadas</h3><p>Reserva su próximo control, baño o vacuna en menos de un minuto.</p></div>
        <div class="next-actions"><a class="btn btn-white" href="citas?codigo=${code}">Reservar cita</a></div>`;
    }
    $("#vacs").innerHTML = m.vacunas.length ? m.vacunas.slice().sort((a, b) => a.prox - b.prox).map(v => { const n = diff(v.prox);
      const st = n < 0 ? `<span class="st bad">Vencida</span>` : n <= 30 ? `<span class="st warn">Vence ${enDias(n).toLowerCase()}</span>` : `<span class="st ok">Al día</span>`;
      return `<div class="vac"><div><b>${E(v.n)}</b><small>Aplicada: ${fmt(v.ult)} · Próxima: ${fmt(v.prox)}</small></div>${st}</div>`; }).join("")
      : `<p style="color:var(--muted)">Aún no hay vacunas registradas.</p>`;
    $("#timeline").innerHTML = (pr ? `<li class="upcoming"><span class="t-date">${fmt(pr.fecha)} · ${E(pr.hora)} h · Programada</span><b>${E(pr.servicio)}</b><span class="vet">${E(pr.vet || "")}</span></li>` : "") +
      m.historial.map(h => `<li><span class="t-date">${fmt(h.f)}</span><b>${E(h.t)}</b>${h.d ? `<p>${E(h.d)}</p>` : ""}<span class="vet">${E(h.vet || "")}</span></li>`).join("")
      || `<p style="color:var(--muted)">Aún no hay atenciones registradas.</p>`;
    $("#rems").innerHTML = m.rec.length ? m.rec.map(r => `<div class="rem"><i>${ic(R_ICO[r.i] ? r.i : "pill")}</i><b>${E(r.t)}</b><small>${enDias(diff(r.f))} · ${fmt(r.f)}</small></div>`).join("")
      : `<p style="color:var(--muted)">Sin recordatorios por ahora.</p>`;
  }
  portal.addEventListener("click", e => {
    const t = e.target.closest("[data-i]"); if (t) { idx = +t.dataset.i; render(); }
    const a = e.target.closest("[data-act]"); if (!a) return;
    const m = cli.mascotas[idx], pr = m.prox; if (!pr) return;
    const base = `${pr.servicio} de ${m.nombre} el ${fmt(pr.fecha)} a las ${pr.hora} h (código ${code})`;
    if (a.dataset.act === "confirmar") wa(`Hola Huellitas, confirmo la cita: ${base}. ¡Gracias!`);
    if (a.dataset.act === "reprogramar") wa(`Hola Huellitas, necesito reprogramar la cita: ${base}. ¿Qué otros horarios tienen?`);
  });
  $("#codeForm").addEventListener("submit", e => { e.preventDefault(); $("#codeIn").classList.remove("error"); login($("#codeIn").value); });
  $$("[data-code]").forEach(b => b.addEventListener("click", () => { $("#codeIn").value = b.dataset.code; login(b.dataset.code); }));
  $("#logout").addEventListener("click", logout);
  $("#printBtn").addEventListener("click", () => window.print());
  const pc = new URLSearchParams(location.search).get("codigo");
  let saved = null; try { saved = sessionStorage.getItem("hv_code"); } catch (e) {}
  if (pc || saved) login(pc || saved);
}

/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */
const cf = $("#contactForm");
if (cf) cf.addEventListener("submit", e => {
  e.preventDefault();
  const msg = $(".f-msg", cf);
  $$(".error", cf).forEach(x => x.classList.remove("error"));
  const bad = $$("[required]", cf).filter(x => !x.checkValidity());
  const tel = $("[name=celular]", cf); if (tel.value.replace(/\D/g, "").length < 9) bad.push(tel);
  if (bad.length) { bad.forEach(x => x.classList.add("error")); msg.className = "f-msg err"; msg.textContent = "Completa los campos obligatorios (*)."; bad[0].focus(); return; }
  const v = n => $(`[name="${n}"]`, cf).value.trim();
  wa(["Hola Huellitas:", "", "• Nombre: " + v("nombre"), "• Celular: " + v("celular"), "• Asunto: " + v("asunto"), "• Mensaje: " + v("mensaje")].join("\n"));
  msg.className = "f-msg ok"; msg.textContent = "¡Listo! Se abrió WhatsApp con tu mensaje.";
});
