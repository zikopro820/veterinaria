/* =========================================================
   HUELLITAS — Funciones del sitio
   ========================================================= */
const WHATSAPP = "51987654321";   // ← cambia por el WhatsApp real (51 + número)
const DELIVERY = 10;              // costo de delivery en S/ (0 = gratis)
const DELIVERY_GRATIS_DESDE = 150;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const soles = n => "S/ " + n.toFixed(2);
const foto = (img, w = 600) => img.startsWith("http") ? img : `https://images.unsplash.com/photo-${img}?auto=format&fit=crop&w=${w}&q=80`;
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
};

/* ---------- Menú y animaciones ---------- */
const menu = $("#menu"), burger = $("#hamburger");
if (menu && burger) burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .08 });
  $$(".reveal").forEach(el => io.observe(el));
} else $$(".reveal").forEach(el => el.classList.add("visible"));
$$(".wa-link").forEach(a => a.href = "https://wa.me/" + WHATSAPP);

function toast(t) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.innerHTML = ICO.check + t; el.classList.add("show");
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

/* =========================================================
   CARRITO
   ========================================================= */
let cart = store.get("hv_cart", []);
const P = id => (typeof PRODUCTOS !== "undefined" ? PRODUCTOS : []).find(p => p.id === id);
function saveCart() { store.set("hv_cart", cart); drawCart(); }
function addToCart(id) {
  const it = cart.find(i => i.id === id);
  it ? it.q++ : cart.push({ id, q: 1 });
  saveCart(); toast("Agregado al carrito");
}
function drawCart() {
  const n = cart.reduce((a, i) => a + i.q, 0);
  $$(".cart-count").forEach(c => { c.textContent = n || ""; c.dataset.n = n; });
  const box = $("#cartItems"); if (!box) return;
  cart = cart.filter(i => P(i.id));
  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">${ICO.bag}<b>Tu carrito está vacío</b><p>Agrega alimento, accesorios o medicamentos para tu mascota.</p></div>`;
    $("#cartFoot").style.display = "none"; return;
  }
  $("#cartFoot").style.display = "";
  box.innerHTML = cart.map(i => { const p = P(i.id); return `
    <div class="ci"><div class="ci-img"><img src="${foto(p.img, 160)}" alt="${p.n}"></div>
      <div class="ci-info"><b>${p.n}</b><small>${soles(p.p)} c/u</small></div>
      <div class="qty"><button data-q="-1" data-id="${p.id}" aria-label="Quitar uno">−</button><span>${i.q}</span><button data-q="1" data-id="${p.id}" aria-label="Agregar uno">+</button></div>
    </div>`; }).join("");
  const sub = cart.reduce((a, i) => a + P(i.id).p * i.q, 0);
  const del = $("input[name=entrega]:checked")?.value === "Delivery" ? (sub >= DELIVERY_GRATIS_DESDE ? 0 : DELIVERY) : 0;
  $("#cSub").textContent = soles(sub);
  $("#cDel").textContent = del ? soles(del) : "Gratis";
  $("#cTot").textContent = soles(sub + del);
  $("#cHint").textContent = sub < DELIVERY_GRATIS_DESDE ? `Te faltan ${soles(DELIVERY_GRATIS_DESDE - sub)} para delivery gratis` : "¡Tienes delivery gratis!";
}
const panel = $("#cart");
if (panel) {
  $$(".cart-btn").forEach(b => b.addEventListener("click", () => panel.classList.add("open")));
  $$("[data-close]", panel).forEach(b => b.addEventListener("click", () => panel.classList.remove("open")));
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("[data-q]"); if (!b) return;
    const it = cart.find(i => i.id === +b.dataset.id); it.q += +b.dataset.q;
    if (it.q <= 0) cart = cart.filter(i => i !== it);
    saveCart();
  });
  $$("input[name=entrega]").forEach(r => r.addEventListener("change", () => { $("#cAddr").style.display = r.value === "Delivery" && r.checked ? "" : "none"; drawCart(); }));
  $("#cartSend").addEventListener("click", () => {
    const name = $("#cName"), addr = $("#cAddr"), ent = $("input[name=entrega]:checked").value;
    [name, addr].forEach(x => x.classList.remove("error"));
    if (!name.value.trim()) { name.classList.add("error"); name.focus(); return; }
    if (ent === "Delivery" && !addr.value.trim()) { addr.classList.add("error"); addr.focus(); return; }
    const lines = ["Hola Huellitas, quiero hacer este pedido:", ""];
    cart.forEach(i => { const p = P(i.id); lines.push(`• ${i.q} x ${p.n} — ${soles(p.p * i.q)}`); });
    lines.push("", `Subtotal: ${$("#cSub").textContent}`, `Entrega: ${ent}${ent === "Delivery" ? " (" + $("#cDel").textContent + ")" : ""}`, `*Total: ${$("#cTot").textContent}*`, "", "Nombre: " + name.value.trim());
    if (ent === "Delivery") lines.push("Dirección: " + addr.value.trim());
    wa(lines.join("\n"));
  });
}
drawCart();

/* ---------- Tarjetas de producto ---------- */
const GRAD = ["#c9bcff,#ffc7b8", "#b8ecd7,#c9bcff", "#ffd9a8,#ffb8a8", "#bfe3ff,#d8c9ff"];
function card(p) {
  return `<article class="prod">
    ${p.tag ? `<span class="tag ${p.tag === "Nuevo" ? "new" : p.tag === "Recomendado" ? "vet" : ""}">${p.tag === "Recomendado" ? "Recomendado por el vet" : p.tag}</span>` : ""}
    <div class="prod-img" style="background:linear-gradient(135deg,${GRAD[p.id % 4]})"><span class="ph">${ICO.paw}</span>
      <img src="${foto(p.img)}" alt="${p.n}" loading="lazy" onerror="this.remove()"></div>
    <div class="prod-body"><span class="cat">${p.cat} · ${p.esp === "ambos" ? "Perro y gato" : p.esp === "perro" ? "Perro" : "Gato"}</span>
      <h3>${p.n}</h3><p class="desc">${p.d}</p>
      <div class="prod-foot"><div class="p"><b>${soles(p.p)}</b>${p.old ? `<s>${soles(p.old)}</s>` : ""}</div>
        <button class="add" data-add="${p.id}" aria-label="Agregar ${p.n} al carrito">${ICO.plus}</button></div>
    </div></article>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if (!b) return;
  addToCart(+b.dataset.add); b.classList.add("done"); b.innerHTML = ICO.check;
  setTimeout(() => { b.classList.remove("done"); b.innerHTML = ICO.plus; }, 1200);
});
const feat = $("#featured");
if (feat && typeof PRODUCTOS !== "undefined") feat.innerHTML = PRODUCTOS.filter(p => p.tag).slice(0, 4).map(card).join("");

const grid = $("#shopGrid");
if (grid && typeof PRODUCTOS !== "undefined") {
  let fCat = "Todos", fEsp = "todos", q = "";
  const draw = () => {
    const list = PRODUCTOS.filter(p => (fCat === "Todos" || p.cat === fCat) && (fEsp === "todos" || p.esp === fEsp || p.esp === "ambos") && (p.n + " " + p.d).toLowerCase().includes(q));
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
const book = $("#bookForm");
if (book) {
  const dateIn = $("[name=fecha]", book), slotsBox = $("#slots");
  const pad = n => String(n).padStart(2, "0");
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = new Date(); dateIn.min = iso(today);
  const max = new Date(); max.setDate(max.getDate() + 45); dateIn.max = iso(max);
  let slot = "";
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const nice = s => { const d = new Date(s + "T12:00"); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  // Demo: algunos horarios aparecen ocupados (en la versión real vienen de la base de datos)
  const busy = (s, h) => { let x = 0; for (const c of s + h) x = (x * 31 + c.charCodeAt(0)) % 997; return x % 3 === 0; };
  function drawSlots() {
    slot = ""; updateSum();
    if (!dateIn.value) { slotsBox.innerHTML = `<p class="slots-msg">Primero elige una fecha para ver los horarios disponibles.</p>`; return; }
    const d = new Date(dateIn.value + "T12:00"), sun = d.getDay() === 0;
    const hours = []; for (let h = 9; h < (sun ? 13 : 19); h++) hours.push(pad(h) + ":00", pad(h) + ":30");
    const now = new Date(), isToday = dateIn.value === iso(now);
    slotsBox.innerHTML = hours.map(h => {
      const past = isToday && (+h.slice(0, 2) * 60 + +h.slice(3)) <= now.getHours() * 60 + now.getMinutes() + 30;
      return `<button type="button" class="slot" data-h="${h}" ${past || busy(dateIn.value, h) ? "disabled" : ""}>${h}</button>`;
    }).join("") + (sun ? `<p class="slots-msg">Domingos atendemos de 9:00 a 13:00. Emergencias las 24 horas.</p>` : "");
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
  if (ps.get("servicio")) { const r = $(`input[name=servicio][data-key="${ps.get("servicio")}"]`, book); if (r) r.checked = true; }
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
    const lines = ["Hola Huellitas, quiero reservar una cita:", "",
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

  function login(c) {
    c = c.trim().toUpperCase().replace(/\s/g, "");
    if (/^HV\d+$/.test(c)) c = "HV-" + c.slice(2);
    const err = $("#loginErr");
    if (!CLIENTES[c]) { err.textContent = "Código no encontrado. Revisa tu código o escríbenos por WhatsApp."; $("#codeIn").classList.add("error"); return; }
    cli = CLIENTES[c]; code = c; idx = 0; err.textContent = "";
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
    $("#dHello").textContent = `Hola, ${cli.dueño.split(" ")[0]}`;
    $("#dCode").textContent = code;
    $("#petTabs").innerHTML = cli.mascotas.length > 1 ? cli.mascotas.map((p, i) => `<button class="pet-tab ${i === idx ? "on" : ""}" data-i="${i}"><span class="av"><img src="${foto(p.foto, 120)}" alt="" onerror="this.remove()"></span>${p.nombre}</button>`).join("") : "";
    const vencidas = m.vacunas.filter(v => diff(v.prox) < 0);
    $("#petCard").innerHTML = `
      <div class="pet-photo"><img src="${foto(m.foto, 700)}" alt="Foto de ${m.nombre}" onerror="this.remove()"><span class="badge">${m.especie}</span></div>
      <div class="pet-info"><h2>${m.nombre}</h2><span>${m.raza} · ${m.sexo}</span>
        <div class="facts">
          <div><small>Edad</small><b>${edad(m.nac)}</b></div><div><small>Peso</small><b>${m.peso}</b></div>
          <div><small>Microchip</small><b>${m.chip}</b></div><div><small>Alergias</small><b>${m.alergias}</b></div>
        </div>
        ${vencidas.length ? `<div class="alert-box">${ic("alert")}<span><b>Vacuna vencida:</b> ${vencidas.map(v => v.n).join(", ")}. Agenda su refuerzo.</span></div>` : ""}
      </div>`;
    const pr = m.prox, d = pr.fecha;
    $("#nextBox").innerHTML = `
      <div><small>PRÓXIMA CITA · ${enDias(diff(d)).toUpperCase()}</small><h3>${pr.servicio}</h3>
        <p>${DIA[d.getDay()]} ${fmt(d)} · <b>${pr.hora} h</b><br>${pr.vet} · ${pr.sede}</p></div>
      <div class="countdown" id="cd"></div>
      <div class="next-actions">
        <button class="btn btn-white" data-act="confirmar">Confirmar asistencia</button>
        <button class="btn btn-glass" data-act="reprogramar">Reprogramar</button>
        <a class="btn btn-glass" href="citas?codigo=${code}">Agendar otra cita</a>
      </div>`;
    clearInterval(timer);
    const [hh, mm] = pr.hora.split(":"); const target = new Date(d); target.setHours(+hh, +mm);
    const tick = () => {
      let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const D = Math.floor(s / 86400); s %= 86400; const H = Math.floor(s / 3600); s %= 3600; const M = Math.floor(s / 60);
      $("#cd").innerHTML = `<div><b>${D}</b><span>días</span></div><div><b>${H}</b><span>horas</span></div><div><b>${M}</b><span>min</span></div>`;
    };
    tick(); timer = setInterval(tick, 30000);
    $("#vacs").innerHTML = m.vacunas.map(v => { const n = diff(v.prox);
      const st = n < 0 ? `<span class="st bad">Vencida</span>` : n <= 30 ? `<span class="st warn">Vence ${enDias(n).toLowerCase()}</span>` : `<span class="st ok">Al día</span>`;
      return `<div class="vac"><div><b>${v.n}</b><small>Aplicada: ${fmt(v.ult)} · Próxima: ${fmt(v.prox)}</small></div>${st}</div>`; }).join("");
    $("#timeline").innerHTML = `<li class="upcoming"><span class="t-date">${fmt(d)} · ${pr.hora} h · Programada</span><b>${pr.servicio}</b><span class="vet">${pr.vet}</span></li>` +
      m.historial.map(h => `<li><span class="t-date">${fmt(h.f)}</span><b>${h.t}</b><p>${h.d}</p><span class="vet">${h.vet}</span></li>`).join("");
    $("#rems").innerHTML = m.rec.map(r => `<div class="rem"><i>${ic(r.i)}</i><b>${r.t}</b><small>${enDias(diff(r.f))} · ${fmt(r.f)}</small></div>`).join("");
  }
  portal.addEventListener("click", e => {
    const t = e.target.closest("[data-i]"); if (t) { idx = +t.dataset.i; render(); }
    const a = e.target.closest("[data-act]"); if (!a) return;
    const m = cli.mascotas[idx], pr = m.prox;
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
