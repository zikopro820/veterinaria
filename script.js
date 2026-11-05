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
let FBX = null;   // { fs, db } cuando Firebase está conectado
async function fb() {
  if (FBX) return FBX;
  const base = `https://www.gstatic.com/firebasejs/${FB_V}/`;
  const [app, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js")]);
  FBX = { fs, db: fs.getFirestore(app.getApps().length ? app.getApp() : app.initializeApp(FB_CFG)) };
  return FBX;
}
const localDB = () => store.get("hv_db", null);
const mezclar = (a, b) => { const o = { ...a }; for (const k in (b || {})) o[k] = (b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a && a[k]) ? { ...a[k], ...b[k] } : b[k]; return o; };
let DATA = null;
async function cargarDatos() {
  if (DATA) return DATA;
  let prod = null, serv = null, aj = null, web = null;
  try {
    if (EN_VIVO) {
      let cache = null; try { cache = JSON.parse(sessionStorage.getItem("hv_cache")); } catch (e) {}
      if (cache && cache.v === 2 && Date.now() - cache.t < 3 * 60 * 1000) ({ prod, serv, aj, web } = cache);
      else {
        const { fs, db } = await fb();
        const [p, s, a, w] = await Promise.all([fs.getDocs(fs.collection(db, "productos")), fs.getDocs(fs.collection(db, "servicios")),
          fs.getDoc(fs.doc(db, "ajustes", "general")), fs.getDoc(fs.doc(db, "ajustes", "web"))]);
        prod = p.docs.map(d => ({ ...d.data(), id: d.id })); serv = s.docs.map(d => ({ ...d.data(), id: d.id }));
        aj = a.exists() ? a.data() : null; web = w.exists() ? w.data() : null;
        try { sessionStorage.setItem("hv_cache", JSON.stringify({ v: 2, t: Date.now(), prod, serv, aj, web })); } catch (e) {}
      }
    } else {
      const local = localDB();
      if (local) {
        if (local.productos) prod = Object.entries(local.productos).map(([id, x]) => ({ ...x, id }));
        if (local.servicios) serv = Object.entries(local.servicios).map(([id, x]) => ({ ...x, id }));
        aj = local.ajustes || null; web = local.web || null;
      }
    }
  } catch (e) { console.warn("No se pudieron leer los datos; se usan los de ejemplo.", e); }
  DATA = {
    productos: ordenar(prod && prod.length ? prod : D0.productos).filter(x => x.visible !== false),
    servicios: ordenar(serv && serv.length ? serv : D0.servicios).filter(x => x.visible !== false),
    ajustes: { ...D0.ajustes, ...(aj || {}) },
    web: mezclar(D0.web || {}, web),
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
   PERSONALIZACIÓN (logo, nombre, colores, portada, nosotros...)
   ========================================================= */
let NOMBRE = "Huellitas";
function hexMix(hex, to, p) {   // mezcla un color con blanco/negro para crear tonos
  const h = String(hex || "").replace("#", ""); if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const c = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)), t = to === "w" ? 255 : 0;
  return "#" + c.map(v => Math.round(v + (t - v) * p).toString(16).padStart(2, "0")).join("");
}
const iniciales = n => String(n || "").replace(/^(Dra?\.)\s*/i, "").split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
function aplicarWeb(w) {
  const m = w.marca || {};
  NOMBRE = ((m.nombre1 || "") + (m.nombre2 || "")).trim() || NOMBRE;
  const logo = m.logo ? `<span class="paw logo-img"><img src="${esc(foto(m.logo, 200))}" alt="Logo ${esc(NOMBRE)}"></span>` : `<span class="paw">${$(".brand .paw svg")?.outerHTML || ""}</span>`;
  $$("[data-brand]").forEach(b => { b.innerHTML = `${logo}<span>${esc(m.nombre1 || "")}<b>${esc(m.nombre2 || "")}</b><small>${esc(m.eslogan || "")}</small></span>`; b.setAttribute("aria-label", NOMBRE + " inicio"); });
  $$("[data-nombre]").forEach(x => x.textContent = NOMBRE);
  $$("[data-eslogan]").forEach(x => x.textContent = m.eslogan || "");
  document.title = document.title.replace(/Huellitas/g, NOMBRE);
  const r = document.documentElement.style, c1 = m.color1, c2 = m.color2;
  if (hexMix(c1, "w", 0)) { r.setProperty("--pri", c1); r.setProperty("--pri-2", hexMix(c1, "w", .25)); r.setProperty("--pri-soft", hexMix(c1, "w", .9)); $('meta[name="theme-color"]')?.setAttribute("content", c1); }
  if (hexMix(c2, "w", 0)) { r.setProperty("--coral", c2); r.setProperty("--coral-2", hexMix(c2, "w", .2)); }
  const p = w.portada || {};
  if ($("#hTitle")) {
    $("#hTag").textContent = p.etiqueta || ""; $("#hText").textContent = p.texto || "";
    $("#hTitle").innerHTML = `${esc(p.titulo || "")} <span>${esc(p.tituloColor || "")}</span>`;
    if (p.foto) { const im = $("#hPhoto img"); const src = foto(p.foto, 1000); if (!im) $("#hPhoto").innerHTML = `<img src="${esc(src)}" alt="">`; else if (im.getAttribute("src") !== src) im.src = src; }
    (p.cifras || []).forEach((c, i) => { const d = $$("#hCifras > div")[i]; if (d) { const t = d.querySelector("div"); t.innerHTML = `<b>${esc(c.n)}</b>${esc(c.t)}`; d.style.display = c.n ? "" : "none"; } });
  }
  const n = w.nosotros || {};
  if ($("#nTitle")) {
    $("#nTitle").innerHTML = `${esc(n.titulo || "")} <span class="c-pri">${esc(n.tituloColor || "")}</span>`;
    $("#nText").textContent = n.texto || "";
    $("#nPuntos").innerHTML = (n.puntos || []).filter(Boolean).map(x => `<li>${esc(x)}</li>`).join("");
    if (n.foto) $("#nPhoto").innerHTML = `<img src="${esc(foto(n.foto, 900))}" alt="">`;
  }
  if ($("#team") && w.equipo) { $("#team").innerHTML = w.equipo.map(x => `<div class="doc reveal"><div class="av">${x.foto ? `<img src="${esc(foto(x.foto, 300))}" alt="">` : esc(iniciales(x.n))}</div><h3>${esc(x.n)}</h3><span>${esc(x.cargo)}</span><p>${esc(x.d)}</p></div>`).join(""); revealAll($("#team")); }
  if (w.testimonios) $$("[data-testis]").forEach(t => { t.innerHTML = w.testimonios.map(x => `<figure class="testi reveal"><div class="stars">★★★★★</div><blockquote>"${esc(x.q)}"</blockquote><figcaption class="testi-who"><span class="av">${esc(iniciales(x.n))}</span><div><b>${esc(x.n)}</b><span>${esc(x.r)}</span></div></figcaption></figure>`).join(""); revealAll(t); });
  const rd = w.redes || {};
  $$("[data-red]").forEach(a => { const u = rd[a.dataset.red]; if (u) { a.href = /^https?:/.test(u) ? u : "https://" + u; a.style.display = ""; } else a.style.display = "none"; });
  $$(".socials").forEach(s => s.style.display = Object.values(rd).some(Boolean) ? "" : "none");
  $$("[data-emerg]").forEach(x => x.style.display = w.emergencias === false ? "none" : "");
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
   AGENDA: horarios libres reales y reserva
   turnos/{fecha_hora_n}  → lugar ocupado (sin datos personales)
   citas/{mismo id}       → la cita completa (solo la ve el panel)
   clientes/{código}/agenda/{id} → copia que ve el cliente en Mi Mascota
   ========================================================= */
const pad2 = n => String(n).padStart(2, "0");
const isoD = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const aMin = t => { const [h, m] = String(t || "0:00").split(":").map(Number); return h * 60 + (m || 0); };
const aHora = m => pad2(Math.floor(m / 60)) + ":" + pad2(m % 60);
function horasDelDia(fecha) {
  const d = new Date(fecha + "T12:00"), dom = d.getDay() === 0;
  const fin = dom ? AJ.domingoCierra : AJ.cierra; if (!fin) return [];
  const paso = +AJ.turno || 30, out = [];
  for (let t = aMin(AJ.abre); t + paso <= aMin(fin); t += paso) out.push(aHora(t));
  return out;
}
async function ocupadosDe(fecha) {   // { "10:30": 2, ... }
  const cnt = {};
  if (EN_VIVO) {
    const { fs, db } = await fb();
    const s = await fs.getDocs(fs.query(fs.collection(db, "turnos"), fs.where("fecha", "==", fecha)));
    s.docs.forEach(d => { const h = d.data().hora; cnt[h] = (cnt[h] || 0) + 1; });
  } else {
    Object.values((localDB() || {}).turnos || {}).forEach(t => { if (t.fecha === fecha) cnt[t.hora] = (cnt[t.hora] || 0) + 1; });
  }
  return cnt;
}
async function buscarCliente(code) {   // → { dueno, mascotas:[{id,nombre,especie,raza}] } | null
  if (EN_VIVO) {
    const { fs, db } = await fb();
    const c = await fs.getDoc(fs.doc(db, "clientes", code)); if (!c.exists()) return null;
    const ms = await fs.getDocs(fs.collection(db, "clientes", code, "mascotas"));
    return { dueno: c.data().dueno || "", mascotas: ms.docs.map(d => ({ id: d.id, ...d.data() })) };
  }
  const c = ((localDB() || {}).clientes || {})[code]; if (!c) return null;
  return { dueno: c.dueno, mascotas: Object.entries(c.mascotas || {}).map(([id, m]) => ({ id, ...m })) };
}
async function reservar(base) {   // intenta ocupar un lugar libre del horario; devuelve el id de la cita
  const cap = Math.max(1, +AJ.capacidad || 1), pub = base.code && base.mascotaId;
  const agenda = { fecha: base.fecha, hora: base.hora, servicio: base.servicio, precio: base.precio, mascota: base.mascota, mascotaId: base.mascotaId, total: base.precio, pagado: 0, estadoPago: "pendiente", estado: "confirmada", creado: base.creado };
  for (let k = 1; k <= cap; k++) {
    const id = `${base.fecha}_${base.hora}_${k}`;
    if (EN_VIVO) {
      const { fs, db } = await fb();
      try {
        const b = fs.writeBatch(db);
        b.set(fs.doc(db, "turnos", id), { fecha: base.fecha, hora: base.hora, k, creado: base.creado });
        b.set(fs.doc(db, "citas", id), { ...base, k });
        if (pub) b.set(fs.doc(db, "clientes", base.code, "agenda", id), agenda);
        await b.commit(); return id;
      } catch (e) { if (!/permission|exists/i.test(e.code || e.message)) throw e; }   // ese lugar ya se ocupó: probamos el siguiente
    } else {
      const d = localDB() || { clientes: {} }; d.turnos = d.turnos || {}; d.citas = d.citas || {};
      if (d.turnos[id]) continue;
      d.turnos[id] = { fecha: base.fecha, hora: base.hora, k, creado: base.creado };
      d.citas[id] = { ...base, k };
      store.set("hv_db", d); return id;
    }
  }
  return null;
}

function iniciarCitas(servicios) {
  const book = $("#bookForm"); if (!book) return;
  const opts = $("#svcOpts"), res = servicios.filter(x => x.reservable !== false);
  if (opts && res.length) opts.innerHTML = res.map((x, i) => `<label class="opt"><input type="radio" name="servicio" value="${esc(x.n)}" data-key="${esc(x.id)}" data-p="${+x.p || 0}" data-price="${+x.p ? "Desde " + precio(x.p) : "Consultar"}" required${i === 0 ? " checked" : ""}><span>${icono(x.icon)}${esc(x.n)}<small>${+x.p ? "desde " + precio(x.p) : "a consultar"}</small></span></label>`).join("");
  const dateIn = $("[name=fecha]", book), slotsBox = $("#slots");
  dateIn.min = isoD(new Date());
  const max = new Date(); max.setDate(max.getDate() + 60); dateIn.max = isoD(max);
  let slot = "", cliente = null;
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const nice = s => { const d = new Date(s + "T12:00"); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  let pedido = 0;
  async function drawSlots() {
    slot = ""; updateSum();
    if (!dateIn.value) { slotsBox.innerHTML = `<p class="slots-msg">Primero elige una fecha para ver los horarios disponibles.</p>`; return; }
    const fecha = dateIn.value, horas = horasDelDia(fecha), n = ++pedido;
    if (!horas.length) { slotsBox.innerHTML = `<p class="slots-msg">Ese día no atendemos citas. Para emergencias escríbenos por WhatsApp.</p>`; return; }
    slotsBox.innerHTML = `<p class="slots-msg">Buscando horarios disponibles…</p>`;
    let occ = {}; try { occ = await ocupadosDe(fecha); } catch (e) { console.warn(e); }
    if (n !== pedido) return;
    const cap = Math.max(1, +AJ.capacidad || 1), now = new Date(), hoy = fecha === isoD(now);
    const libres = horas.filter(h => (occ[h] || 0) < cap && !(hoy && aMin(h) <= now.getHours() * 60 + now.getMinutes() + 30));
    slotsBox.innerHTML = libres.length ? libres.map(h => `<button type="button" class="slot" data-h="${h}">${h}${cap > 1 ? `<small>${cap - (occ[h] || 0)} libre${cap - (occ[h] || 0) > 1 ? "s" : ""}</small>` : ""}</button>`).join("")
      : `<p class="slots-msg">No quedan horarios libres este día. Prueba con otra fecha.</p>`;
  }
  slotsBox.addEventListener("click", e => {
    const b = e.target.closest(".slot"); if (!b) return;
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

  /* ---- ¿Ya es cliente? busca sus mascotas con el código ---- */
  const codeIn = $("[name=codigo]", book), msgC = $("#codeMsg"), pick = $("#petPick");
  const normCode = c => { c = String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); return /^[A-Z]{2}[A-Z0-9]+$/.test(c) ? c.slice(0, 2) + "-" + c.slice(2) : c; };
  async function verCodigo() {
    const c = normCode(codeIn.value); cliente = null; pick.innerHTML = ""; $("[name=mascotaId]", book).value = "";
    if (!c) { msgC.textContent = ""; return; }
    msgC.className = "code-msg"; msgC.textContent = "Buscando…";
    try { cliente = await buscarCliente(c); } catch (e) { cliente = null; }
    if (!cliente) { msgC.className = "code-msg err"; msgC.textContent = "No encontramos ese código. Puedes reservar igual como cliente nuevo."; return; }
    cliente.code = c; codeIn.value = c;
    msgC.className = "code-msg ok"; msgC.textContent = `¡Hola, ${cliente.dueno.split(" ")[0]}! Elige a tu mascota:`;
    const nom = $("[name=nombre]", book); if (!nom.value) nom.value = cliente.dueno;
    pick.innerHTML = cliente.mascotas.map(m => `<button type="button" class="pp" data-pid="${esc(m.id)}">${m.foto ? `<img src="${esc(foto(m.foto, 120))}" alt="">` : ICO.paw}${esc(m.nombre)}</button>`).join("") + `<button type="button" class="pp" data-pid="">+ Otra mascota</button>`;
  }
  $("#codeBtn").addEventListener("click", verCodigo);
  codeIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); verCodigo(); } });
  codeIn.addEventListener("change", verCodigo);
  pick.addEventListener("click", e => {
    const b = e.target.closest(".pp"); if (!b) return;
    $$(".pp", pick).forEach(x => x.classList.remove("on")); b.classList.add("on");
    const m = cliente.mascotas.find(x => x.id === b.dataset.pid);
    $("[name=mascotaId]", book).value = m ? m.id : "";
    $("[name=mascota]", book).value = m ? m.nombre : "";
    if (m) { const r = $$("input[name=especie]", book).find(x => x.value === m.especie) || $('input[name=especie][value="Otro"]', book); r.checked = true; $("[name=raza]", book).value = m.raza || ""; }
    else $("[name=mascota]", book).focus();
    updateSum();
  });

  const ps = new URLSearchParams(location.search);
  if (ps.get("servicio")) { const r = $$("input[name=servicio]", book).find(x => x.dataset.key === ps.get("servicio")); if (r) r.checked = true; }
  if (ps.get("codigo")) { codeIn.value = ps.get("codigo"); verCodigo(); }
  drawSlots();

  book.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = $(".f-msg", book), btn = $("#bookBtn");
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
    const s = $("input[name=servicio]:checked", book);
    const cita = {
      fecha: dateIn.value, hora: slot, servicioId: s.dataset.key, servicio: s.value, precio: +s.dataset.p || 0,
      code: cliente ? cliente.code : "", mascotaId: cliente ? v("mascotaId") : "", mascota: v("mascota"),
      especie: $("input[name=especie]:checked", book).value, raza: v("raza").slice(0, 80),
      dueno: v("nombre").slice(0, 80), celular: v("celular").replace(/[^\d+ ]/g, "").slice(0, 15), motivo: v("motivo").slice(0, 300),
      origen: "web", estado: "confirmada", pagado: 0, estadoPago: "pendiente", creado: new Date().toISOString(),
    };
    btn.disabled = true; msg.className = "f-msg"; msg.textContent = "Reservando…";
    let id = null;
    try { id = await reservar(cita); } catch (err) { console.error(err); }
    btn.disabled = false;
    if (!id) { msg.className = "f-msg err"; msg.textContent = "Ese horario se acaba de llenar o no pudimos conectar. Elige otro horario."; drawSlots(); return; }
    const txt = ["Hola, acabo de reservar una cita en la web:", "",
      `• Servicio: ${cita.servicio}${cita.precio ? " (desde " + precio(cita.precio) + ")" : ""}`, `• Fecha: ${nice(cita.fecha)}`, `• Hora: ${cita.hora}`,
      `• Mascota: ${cita.mascota} (${cita.especie})`, `• Dueño(a): ${cita.dueno}`, `• Celular: ${cita.celular}`];
    if (cita.code) txt.push(`• Código de cliente: ${cita.code}`);
    if (cita.motivo) txt.push(`• Motivo: ${cita.motivo}`);
    book.hidden = true;
    const ok = $("#bookOk"); ok.hidden = false;
    ok.innerHTML = `<div class="ok-ic">${ICO.check}</div><h3>¡Cita confirmada!</h3><p>Te esperamos, ${esc(cita.dueno.split(" ")[0])}. Guarda estos datos:</p>
      <div class="ok-box"><div><span>Servicio</span><b>${esc(cita.servicio)}</b></div><div><span>Fecha</span><b>${esc(nice(cita.fecha))}</b></div>
      <div><span>Hora</span><b>${esc(cita.hora)} h</b></div><div><span>Mascota</span><b>${esc(cita.mascota)}</b></div>
      <div><span>Precio</span><b>${cita.precio ? "Desde " + precio(cita.precio) : "A consultar"}</b></div><div><span>Pago</span><b>Pendiente (pagas en la veterinaria)</b></div></div>
      <p class="sub-ok">Llega 10 minutos antes. ${cita.code ? "También la verás en <b>Mi Mascota</b> con tu código." : "En tu primera visita te daremos tu código para ver el historial de tu mascota."}</p>
      <div class="hero-actions"><button class="btn btn-pri" id="okWa">${ICO.check} Avisar por WhatsApp</button>${cita.code ? `<a class="btn btn-light" href="mi-mascota?codigo=${esc(cita.code)}">Ver en Mi Mascota</a>` : ""}<a class="btn btn-light" href="citas">Reservar otra</a></div>`;
    $("#okWa").addEventListener("click", () => wa(txt.join("\n")));
    ok.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

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
        { f: day(-18), hora: "11:00", t: "Baño medicado y corte", d: "Piel en buen estado. Se recomienda shampoo hipoalergénico.", vet: "Grooming · Luis R.", monto: 45, pagado: 45, metodo: "Yape" },
        { f: day(-45), hora: "16:30", t: "Consulta dermatológica", d: "Dermatitis leve por alergia alimentaria. Se cambió a alimento hipoalergénico.", vet: "Dra. Carla Méndez", monto: 80, pagado: 50, metodo: "Efectivo" },
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
  const ic = k => `<svg class="ico" viewBox="0 0 24 24">${R_ICO[k] || R_ICO.pill}</svg>`;
  const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const fmt = d => `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()}`;
  const diff = d => Math.round((d - day(0)) / 864e5);
  const edad = d => { const m = Math.floor((Date.now() - d) / (30.44 * 864e5)); return m >= 12 ? `${Math.floor(m / 12)} año${m >= 24 ? "s" : ""}${m % 12 ? " y " + (m % 12) + " m" : ""}` : `${Math.max(m, 0)} meses`; };
  const enDias = n => n === 0 ? "Hoy" : n === 1 ? "Mañana" : n < 0 ? `Hace ${-n} días` : `En ${n} días`;
  const toD = s => { if (!s) return null; if (s instanceof Date) return s; const [y, mo, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(y, mo - 1, d); };
  const fotoSrc = f => !f ? "" : foto(f, 700);
  const pagoTxt = (total, pagado) => {
    total = +total || 0; pagado = +pagado || 0;
    if (total && pagado >= total) return `<span class="st ok">Pagado ${soles(pagado)}</span>`;
    if (pagado > 0) return `<span class="st warn">Adelanto ${soles(pagado)} · Saldo ${soles(Math.max(total - pagado, 0))}</span>`;
    return `<span class="st bad">Pago pendiente${total ? " · " + soles(total) : ""}</span>`;
  };
  let cli = null, code = "", idx = 0, timer = null;

  function normal(c, mascotas, agenda) {   // convierte el formato del panel al de esta página
    const hoy = day(0);
    return { dueño: c.dueno || c.dueño || "", mascotas: mascotas.map(m => {
      const citas = (agenda || []).filter(a => a.mascotaId === m.id && (a.estado || "confirmada") === "confirmada")
        .map(a => ({ ...a, fecha: toD(a.fecha) })).filter(a => a.fecha >= hoy).sort((a, b) => (a.fecha - b.fecha) || String(a.hora).localeCompare(b.hora));
      if (!citas.length && m.prox && m.prox.fecha && toD(m.prox.fecha) >= hoy) citas.push({ ...m.prox, servicio: m.prox.detalle ? `${m.prox.servicio} · ${m.prox.detalle}` : m.prox.servicio, fecha: toD(m.prox.fecha) });
      return { ...m, nac: toD(m.nac), citas,
        vacunas: (m.vacunas || []).map(v => ({ ...v, ult: toD(v.ult), prox: toD(v.prox) })),
        historial: (m.historial || []).map(h => ({ ...h, f: toD(h.f) })).sort((a, b) => b.f - a.f || String(b.hora || "").localeCompare(a.hora || "")),
        rec: (m.rec || []).map(r => ({ ...r, f: toD(r.f) })).filter(r => diff(r.f) >= -7).sort((a, b) => a.f - b.f) };
    }) };
  }
  async function buscar(c) {
    if (EN_VIVO) {
      const { fs, db } = await fb();
      const s = await fs.getDoc(fs.doc(db, "clientes", c)); if (!s.exists()) return null;
      const [ms, ag] = await Promise.all([fs.getDocs(fs.collection(db, "clientes", c, "mascotas")), fs.getDocs(fs.collection(db, "clientes", c, "agenda"))]);
      return normal(s.data(), ms.docs.map(d => ({ id: d.id, ...d.data() })), ag.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    const local = localDB();
    if (local && local.clientes && local.clientes[c]) {
      const x = local.clientes[c];
      const ag = Object.entries(local.citas || {}).filter(([, a]) => a.code === c).map(([id, a]) => ({ id, ...a, total: a.total ?? a.precio, pagado: a.pagado || 0 }));
      return normal(x, Object.entries(x.mascotas || {}).map(([id, m]) => ({ id, ...m })), ag);
    }
    const demo = CLIENTES[c]; if (!demo) return null;
    return { ...demo, mascotas: demo.mascotas.map(m => ({ ...m, citas: m.prox ? [m.prox] : [] })) };
  }

  async function login(c) {
    c = c.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^[A-Z]{2}[A-Z0-9]+$/.test(c)) c = c.slice(0, 2) + "-" + c.slice(2);
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
    $("#petTabs").innerHTML = cli.mascotas.length > 1 ? cli.mascotas.map((p, i) => `<button class="pet-tab ${i === idx ? "on" : ""}" data-i="${i}"><span class="av">${p.foto ? `<img src="${esc(fotoSrc(p.foto))}" alt="" onerror="this.remove()">` : ""}</span>${esc(p.nombre)}</button>`).join("") : "";
    const vencidas = m.vacunas.filter(v => diff(v.prox) < 0);
    $("#petCard").innerHTML = `
      <div class="pet-photo">${m.foto ? `<img src="${esc(fotoSrc(m.foto))}" alt="Foto de ${esc(m.nombre)}" onerror="this.remove()">` : ""}<span class="badge">${esc(m.especie)}</span></div>
      <div class="pet-info"><h2>${esc(m.nombre)}</h2><span>${esc([m.raza, m.sexo].filter(Boolean).join(" · "))}</span>
        <div class="facts">
          <div><small>Edad</small><b>${m.nac ? edad(m.nac) : "—"}</b></div><div><small>Peso</small><b>${esc(m.peso || "—")}</b></div>
          <div><small>Microchip</small><b>${esc(m.chip || "—")}</b></div><div><small>Alergias</small><b>${esc(m.alergias || "—")}</b></div>
        </div>
        ${vencidas.length ? `<div class="alert-box">${ic("alert")}<span><b>Vacuna vencida:</b> ${esc(vencidas.map(v => v.n).join(", "))}. Agenda su refuerzo.</span></div>` : ""}
      </div>`;
    clearInterval(timer);
    const pr = m.citas[0];
    if (pr) {
      const d = pr.fecha;
      $("#nextBox").innerHTML = `
        <div><small>PRÓXIMA CITA · ${enDias(diff(d)).toUpperCase()}</small><h3>${esc(pr.servicio)}</h3>
          <p>${DIA[d.getDay()]} ${fmt(d)} · <b>${esc(pr.hora)} h</b>${pr.vet || pr.sede ? "<br>" + esc([pr.vet, pr.sede].filter(Boolean).join(" · ")) : ""}</p>
          ${pr.total != null || pr.pagado ? `<div class="pay-line">${pagoTxt(pr.total, pr.pagado)}</div>` : ""}</div>
        <div class="countdown" id="cd"></div>
        <div class="next-actions">
          <button class="btn btn-white" data-act="confirmar">Confirmar asistencia</button>
          <button class="btn btn-glass" data-act="reprogramar">Reprogramar</button>
          <a class="btn btn-glass" href="citas?codigo=${encodeURIComponent(code)}">Agendar otra cita</a>
        </div>`;
      const [hh, mm] = String(pr.hora || "00:00").split(":"); const target = new Date(d); target.setHours(+hh, +mm);
      const tick = () => {
        let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
        const D = Math.floor(s / 86400); s %= 86400; const H = Math.floor(s / 3600); s %= 3600; const M = Math.floor(s / 60);
        $("#cd").innerHTML = `<div><b>${D}</b><span>días</span></div><div><b>${H}</b><span>horas</span></div><div><b>${M}</b><span>min</span></div>`;
      };
      tick(); timer = setInterval(tick, 30000);
    } else {
      $("#nextBox").innerHTML = `<div><small>PRÓXIMA CITA</small><h3>${esc(m.nombre)} no tiene citas programadas</h3><p>Reserva su próximo control, baño o vacuna en menos de un minuto.</p></div>
        <div class="next-actions"><a class="btn btn-white" href="citas?codigo=${encodeURIComponent(code)}">Reservar cita</a></div>`;
    }
    // Todas las próximas citas con su estado de pago
    $("#citasCard").style.display = m.citas.length > 1 ? "" : "none";
    $("#citasList").innerHTML = m.citas.map(c => `<div class="vac"><div><b>${esc(c.servicio)}</b><small>${DIA[c.fecha.getDay()]} ${fmt(c.fecha)} · ${esc(c.hora)} h</small></div>${pagoTxt(c.total, c.pagado)}</div>`).join("");
    // Servicios y pagos (atenciones cobradas)
    const pag = m.historial.filter(h => +h.monto > 0 || +h.pagado > 0);
    const totalPag = pag.reduce((a, h) => a + (+h.pagado || 0), 0) + m.citas.reduce((a, c) => a + (+c.pagado || 0), 0);
    const saldo = pag.reduce((a, h) => a + Math.max((+h.monto || 0) - (+h.pagado || 0), 0), 0);
    $("#pagos").innerHTML = pag.length ? `
      <div class="pay-sum"><div><small>Total pagado</small><b>${soles(totalPag)}</b></div>${saldo ? `<div class="due"><small>Saldo por pagar</small><b>${soles(saldo)}</b></div>` : `<div><small>Saldo de atenciones</small><b>S/ 0.00</b></div>`}</div>
      <div class="pay-list">${pag.map(h => `<div class="pay-row"><div><b>${esc(h.t)}</b><small>${fmt(h.f)}${h.hora ? " · " + esc(h.hora) + " h" : ""}${h.metodo ? " · " + esc(h.metodo) : ""}${h.vet ? " · " + esc(h.vet) : ""}</small></div>
        <div class="amt"><b>${soles(+h.monto || +h.pagado)}</b>${pagoTxt(h.monto || h.pagado, h.pagado)}</div></div>`).join("")}</div>`
      : `<p style="color:var(--muted)">Aún no hay pagos registrados.</p>`;
    $("#vacs").innerHTML = m.vacunas.length ? m.vacunas.slice().sort((a, b) => a.prox - b.prox).map(v => { const n = diff(v.prox);
      const st = n < 0 ? `<span class="st bad">Vencida</span>` : n <= 30 ? `<span class="st warn">Vence ${enDias(n).toLowerCase()}</span>` : `<span class="st ok">Al día</span>`;
      return `<div class="vac"><div><b>${esc(v.n)}</b><small>Aplicada: ${fmt(v.ult)} · Próxima: ${fmt(v.prox)}</small></div>${st}</div>`; }).join("")
      : `<p style="color:var(--muted)">Aún no hay vacunas registradas.</p>`;
    $("#timeline").innerHTML = m.citas.map(c => `<li class="upcoming"><span class="t-date">${fmt(c.fecha)} · ${esc(c.hora)} h · Programada</span><b>${esc(c.servicio)}</b><span class="vet">${esc(c.vet || "")}</span></li>`).join("") +
      m.historial.map(h => `<li><span class="t-date">${fmt(h.f)}${h.hora ? " · " + esc(h.hora) + " h" : ""}</span><b>${esc(h.t)}</b>${h.d ? `<p>${esc(h.d)}</p>` : ""}<span class="vet">${esc(h.vet || "")}</span></li>`).join("")
      || `<p style="color:var(--muted)">Aún no hay atenciones registradas.</p>`;
    $("#rems").innerHTML = m.rec.length ? m.rec.map(r => `<div class="rem"><i>${ic(r.i)}</i><b>${esc(r.t)}</b><small>${enDias(diff(r.f))} · ${fmt(r.f)}</small></div>`).join("")
      : `<p style="color:var(--muted)">Sin recordatorios por ahora.</p>`;
  }
  portal.addEventListener("click", e => {
    const t = e.target.closest("[data-i]"); if (t) { idx = +t.dataset.i; render(); }
    const a = e.target.closest("[data-act]"); if (!a) return;
    const m = cli.mascotas[idx], pr = m.citas[0]; if (!pr) return;
    const base = `${pr.servicio} de ${m.nombre} el ${fmt(pr.fecha)} a las ${pr.hora} h (código ${code})`;
    if (a.dataset.act === "confirmar") wa(`Hola ${NOMBRE}, confirmo la cita: ${base}. ¡Gracias!`);
    if (a.dataset.act === "reprogramar") wa(`Hola ${NOMBRE}, necesito reprogramar la cita: ${base}. ¿Qué otros horarios tienen?`);
  });
  $("#codeForm").addEventListener("submit", e => { e.preventDefault(); $("#codeIn").classList.remove("error"); login($("#codeIn").value); });
  $$("[data-code]").forEach(b => b.addEventListener("click", () => { $("#codeIn").value = b.dataset.code; login(b.dataset.code); }));
  $("#logout").addEventListener("click", logout);
  $("#printBtn").addEventListener("click", () => window.print());
  const pc = new URLSearchParams(location.search).get("codigo");
  let saved = null; try { saved = sessionStorage.getItem("hv_code"); } catch (e) {}
  if (pc || saved) cargarDatos().then(() => login(pc || saved));
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
  wa([`Hola ${NOMBRE}:`, "", "• Nombre: " + v("nombre"), "• Celular: " + v("celular"), "• Asunto: " + v("asunto"), "• Mensaje: " + v("mensaje")].join("\n"));
  msg.className = "f-msg ok"; msg.textContent = "¡Listo! Se abrió WhatsApp con tu mensaje.";
});

/* ---------- Arranque ---------- */
aplicarAjustes(AJ);
if (D0.web) aplicarWeb(D0.web);
cargarDatos().then(d => {
  aplicarAjustes(d.ajustes);
  aplicarWeb(d.web);
  PRODS = d.productos; drawCart(); pintarTienda();
  pintarServicios(d.servicios);
  iniciarCitas(d.servicios);
});
