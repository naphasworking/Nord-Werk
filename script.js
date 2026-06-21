/* =========================================================
   NORD WERK — interactions
   Swap the PRODUCTS array for a real catalog / API later.
   ========================================================= */

/* ---- Inline SVG icons for product placeholders (no image files needed) ---- */
const PART_ICONS = {
  turbo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/></svg>',
  exhaust: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 15h10a4 4 0 0 0 4-4 3 3 0 0 1 3-3"/><circle cx="6" cy="15" r="2.4"/><path d="M18 15h3M18 18h3"/></svg>',
  intake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 8h9l3 4h4M4 8v8M4 16h7"/><circle cx="18" cy="16" r="2.4"/></svg>',
  brakes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
  ecu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10v4M11 10v4M15 10h2"/></svg>',
  suspension: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 4v16M5 8c4 0 4 4 8 4M5 12c4 0 4 4 8 4"/><circle cx="17" cy="16" r="2.4"/></svg>'
};

/* ---- Category icons (BMW parts) ---- */
const CAT_ICONS = {
  accessories: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
  bodykit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 13l2-5h14l2 5v4h-2M5 17H3v-4M7 17h10"/><circle cx="7.5" cy="17" r="1.7"/><circle cx="16.5" cy="17" r="1.7"/></svg>',
  brake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="12" r="8"/><circle cx="11" cy="12" r="3"/><path d="M17 6h4v5"/></svg>',
  diffuser: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 8h18"/><path d="M5 8v8M9 8v8M13 8v8M17 8v8M21 8v8"/></svg>',
  emblem: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>',
  engine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 10h2V8h4l2 2h3V8h2v8h-2v-2h-3l-2 2H7v-2H5z"/><path d="M3 12h2M19 9h2"/></svg>',
  exhaust: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 15h10a4 4 0 0 0 4-4 3 3 0 0 1 3-3"/><circle cx="6" cy="15" r="2.4"/><path d="M18 15h3M18 18h3"/></svg>',
  intake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 8h9l3 4h4M4 8v8M4 16h7"/><circle cx="18" cy="16" r="2.4"/></svg>',
  grille: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="4" y="5" width="7" height="14" rx="3"/><rect x="13" y="5" width="7" height="14" rx="3"/><path d="M7.5 5v14M16.5 5v14"/></svg>',
  frontlip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 9c4 0 5 4 9 4s5-4 9-4"/><path d="M3 14c4 0 5 3 9 3s5-3 9-3"/></svg>',
  genuine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  lighting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 7h7a5 5 0 0 1 0 10H4z"/><path d="M15 9h4M15 12h5M15 15h4"/></svg>',
  liquids: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M9 3h4v3l3 3v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9l3-3z"/><path d="M8 13h6"/></svg>',
  sideskirts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 14h18l-2-3H7z"/><path d="M3 14v2M21 14v2"/></svg>',
  spoiler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 9h18"/><path d="M6 9v3M18 9v3"/><path d="M3 9c0-2 2-3 9-3s9 1 9 3"/></svg>',
  steering: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M12 14.4V21M9.7 11 3.8 7.6M14.3 11l5.9-3.4"/></svg>',
  suspension: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 3v2M12 19v2M9 5h6M9 19h6"/><path d="M9 6l6 2-6 2 6 2-6 2 6 2"/></svg>',
  tuning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M18 9h3M3 15h3M18 15h3"/></svg>',
  tyre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>',
  wheel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4"/></svg>'
};

/* ---- Categories (mirrors autobahnthailand.com, EN + TH).
   Drop a photo at Asset/categories/<slug>.webp and it auto-replaces the icon. ---- */
const CATEGORIES = [
  { en: "Accessories",           th: "อุปกรณ์เสริมทั่วไป",         slug: "accessories",    icon: "accessories" },
  { en: "Body Kit",              th: "ชุดแต่งรอบคัน",             slug: "body-kit",       icon: "bodykit" },
  { en: "Brake System",          th: "ชุดเบรค",                   slug: "brake-system",   icon: "brake" },
  { en: "Diffuser",              th: "ดิฟฟิวเซอร์",               slug: "diffuser",       icon: "diffuser" },
  { en: "Emblem",                th: "โลโก้",                     slug: "emblem",         icon: "emblem" },
  { en: "Engine",                th: "เครื่องยนต์",               slug: "engine",         icon: "engine" },
  { en: "Exhaust System",        th: "ชุดท่อไอเสีย & ปลายท่อ",     slug: "exhaust-system", icon: "exhaust" },
  { en: "Air Intakes & Filters", th: "ระบบกรองอากาศ / ไส้กรอง",    slug: "air-intakes",    icon: "intake" },
  { en: "Front Grille",          th: "กระจังหน้า",                slug: "front-grille",   icon: "grille" },
  { en: "Front Lip",             th: "ลิ้นหน้า",                  slug: "front-lip",      icon: "frontlip" },
  { en: "Genuine Parts",         th: "พาร์ทแท้",                  slug: "genuine-parts",  icon: "genuine" },
  { en: "Lighting",              th: "ไฟหน้า / ไฟท้าย",           slug: "lighting",       icon: "lighting" },
  { en: "Liquids",               th: "ของเหลว",                   slug: "liquids",        icon: "liquids" },
  { en: "Side Skirts",           th: "สเกิตข้าง",                 slug: "side-skirts",    icon: "sideskirts" },
  { en: "Spoilers & Wings",      th: "สปอยเลอร์",                 slug: "spoilers-wings", icon: "spoiler" },
  { en: "Steering Wheel",        th: "พวงมาลัยรถยนต์",            slug: "steering-wheel", icon: "steering" },
  { en: "Suspension",            th: "ชุดช่วงล่าง",               slug: "suspension",     icon: "suspension" },
  { en: "Tuning",                th: "อุปกรณ์เพิ่มสมรรถนะ",       slug: "tuning",         icon: "tuning" },
  { en: "Tyres",                 th: "ยางรถยนต์",                 slug: "tyres",          icon: "tyre" },
  { en: "Wheels",                th: "ล้อแม็กซ์",                 slug: "wheels",         icon: "wheel" }
];

/* ---- Render the two auto-scrolling service rows ---- */
function catCard(c) {
  return `
    <a class="bmw-cat" href="#" aria-label="${c.en}">
      <span class="bmw-cat__stripe"></span>
      <div class="bmw-cat__head">
        <h3>${c.en}</h3>
        <span class="bmw-cat__th">${c.th}</span>
      </div>
      <div class="bmw-cat__media">
        <img class="bmw-cat__img" src="Asset/categories/${c.slug}.webp" alt="${c.en}" loading="lazy" onerror="this.remove()" />
        <span class="bmw-cat__icon">${CAT_ICONS[c.icon] || ""}</span>
      </div>
    </a>`;
}
function renderCategories() {
  const row1 = document.getElementById("catRow1");
  const row2 = document.getElementById("catRow2");
  if (!row1 || !row2) return;
  const first = CATEGORIES.slice(0, 10).map(catCard).join("");
  const second = CATEGORIES.slice(10).map(catCard).join("");
  // duplicate each row's cards so the loop is seamless
  row1.innerHTML = first + first;
  row2.innerHTML = second + second;
}

/* ---- Shop by Car. Drop Asset/cars/<slug>.webp to set each car's photo. ---- */
const CAR_ICON = '<svg viewBox="0 0 64 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 21h56M8 21l3.4-8.2A4 4 0 0 1 15.1 10h24.5a4 4 0 0 1 2.9 1.2l5.4 5.6 8.2 1.5A3 3 0 0 1 58.6 21"/><circle cx="19" cy="21" r="3.6"/><circle cx="45" cy="21" r="3.6"/></svg>';

const CARS = [
  { name: "BMW 3 Series",          chassis: "G20 · 320i–330i",  slug: "bmw-3" },
  { name: "BMW 4 Series",          chassis: "G22 · 420i–430i",  slug: "bmw-4" },
  { name: "BMW 5 Series",          chassis: "G30 · 520i–530i",  slug: "bmw-5" },
  { name: "BMW X3",                chassis: "G01 · 20i–30i",    slug: "bmw-x3" },
  { name: "BMW X5",                chassis: "G05 · xDrive40i",  slug: "bmw-x5" },
  { name: "BMW Z4",                chassis: "G29 · 20i–30i",    slug: "bmw-z4" },
  { name: "Mercedes-Benz C-Class", chassis: "W206 · C200–C300", slug: "benz-c" },
  { name: "Mercedes-Benz E-Class", chassis: "W214 · E200–E300", slug: "benz-e" }
];

/* ---- Render "shop by car" cards ---- */
function carCardHTML(c) {
  const img = c.image || (c.slug ? `Asset/cars/${c.slug}.webp` : "");
  return `
    <a class="car-card reveal" href="#contact" aria-label="${c.name}">
      <div class="car-card__media">
        ${img ? `<img class="car-card__img" src="${img}" alt="${c.name}" loading="lazy" onerror="this.remove()" />` : ""}
        <span class="car-card__icon">${CAR_ICON}</span>
        <span class="car-card__stripe" aria-hidden="true"></span>
      </div>
      <div class="car-card__body">
        <h3>${c.name}</h3>
        <span class="car-card__chassis">${c.chassis || ""}</span>
      </div>
    </a>`;
}
/* Reads the CMS-managed data/cars.json; falls back to the built-in CARS list
   (e.g. when opened from file:// where fetch is blocked). */
async function renderCars() {
  const grid = document.getElementById("carGrid");
  if (!grid) return;
  let cars = CARS;
  try {
    const res = await fetch("data/cars.json", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.cars) && data.cars.length) cars = data.cars;
    }
  } catch (e) { /* offline / local file — use the built-in fallback */ }
  grid.innerHTML = cars.map(carCardHTML).join("");
}

/* ---- Sticky nav shadow + mobile menu ---- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links?.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    })
  );
}

/* ---- Scroll reveal (rect-based; reliably reveals anything in view) ---- */
function initReveal() {
  let els = [...document.querySelectorAll(".reveal")];
  if (!els.length) return;
  const check = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els = els.filter(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add("in"); return false; }
      return true;
    });
  };
  check();
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check, { passive: true });
  window.addEventListener("load", () => { check(); setTimeout(check, 300); });
}

/* ---- Gentle fade-up for the non-stacking sections (rect-based; reliable) ---- */
function initSectionFade() {
  let secs = [...document.querySelectorAll("body > section:not(.hero)")];
  if (!secs.length) return;
  secs.forEach(s => s.classList.add("sect-fade"));
  const check = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    secs = secs.filter(s => {
      const r = s.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) { s.classList.add("in"); return false; }
      return true;
    });
  };
  check();
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check, { passive: true });
  window.addEventListener("load", () => { check(); setTimeout(check, 300); });
}

/* =========================================================
   TUNING STAGES (horizontal slider)
   Drop Asset/tuning/stage1.webp · stage2.webp · stage3.webp for the M-style images.
   ========================================================= */
const STAGES = [
  { n: "01", label: "Stage 1", name: "Custom ECU Tune", featured: false,
    img: "Asset/tuning/stage1.webp", gain: "+15–20%", gainLabel: "more power & torque", priceTHB: 26000,
    feats: ["Log-based custom calibration", "Bootmod3 / MG Flasher platform", "For stock & lightly modified cars", "Pump-fuel safe · fully reversible"] },
  { n: "02", label: "Stage 2", name: "Bolt-On Tune", featured: true,
    img: "Asset/tuning/stage2.webp", gain: "+30–40%", gainLabel: "more power", priceTHB: 39000,
    feats: ["Tuned for downpipe + intake", "Log-based custom calibration", "Sharper throttle & faster spool", "Strong, daily-reliable power"] },
  { n: "03", label: "Stage 3+", name: "Big-Turbo / Hybrid", featured: false,
    img: "Asset/tuning/stage3.webp", gain: "2×+", gainLabel: "maximum power", quote: true,
    feats: ["Upgraded & hybrid turbo setups", "Plug-in hybrid (PHEV) specialist", "Flex-fuel / ethanol-blend ready", "Maximum safe power"] }
];

/* Featured builds — real results from tuning partner Tune Up (model · stage · whp · torque/time).
   Photos live in Asset/builds/. Edit/reorder freely; pairing of photo↔spec is approximate. */
const BUILDS = [
  { img: "Asset/builds/build-05.webp", car: "BMW G20 330e", stage: "Stage 3", power: "550 whp", sub: "B48TU · 8.03s (100–200)" },
  { img: "Asset/builds/build-02.webp", car: "BMW G30 530e", stage: "Stage 3", power: "532 whp", sub: "B48TU · 8.3s (100–200)" },
  { img: "Asset/builds/build-06.webp", car: "BMW G20 330e", stage: "Stage 3", power: "540 whp", sub: "B48TU · 8.25s (100–200)" },
  { img: "Asset/builds/build-07.webp", car: "BMW G20 330e", stage: "Stage 3", power: "492 whp", sub: "B48TU · 752 Nm" },
  { img: "Asset/builds/build-01.webp", car: "BMW G20 330e", stage: "Stage 2", power: "473 whp", sub: "B48TU · 843 Nm" },
  { img: "Asset/builds/build-08.webp", car: "BMW G20 330e", stage: "Stage 2", power: "462 whp", sub: "B48TU · 823 Nm" },
  { img: "Asset/builds/build-10.webp", car: "BMW G20 330e", stage: "Stage 2", power: "438 whp", sub: "B48TU · 802 Nm" },
  { img: "Asset/builds/build-09.webp", car: "BMW F30 330e", stage: "Stage 2", power: "408 whp", sub: "B48 · 607 Nm" },
  { img: "Asset/builds/build-03.webp", car: "BMW G22 430i", stage: "Stage 2", power: "328 whp", sub: "B48TU · 538 Nm" },
  { img: "Asset/builds/build-11.webp", car: "BMW F30 320i", stage: "Stage 2", power: "287 whp", sub: "B48 · 451 Nm" }
];

function renderBuilds() {
  const track = document.getElementById("buildsTrack");
  if (!track) return;
  const card = (b) => `
    <article class="build-card">
      <div class="build-card__media">
        <img class="build-card__photo" src="${b.img}" alt="${b.car} — ${b.stage}" loading="lazy" onerror="this.closest('.build-card').style.display='none'" />
        <span class="build-card__stage">${b.stage}</span>
        <img class="build-card__badge" src="Asset/partners/tuneup.webp" alt="Tune Up" loading="lazy" />
      </div>
      <div class="build-card__body">
        <h4 class="build-card__car">${b.car}</h4>
        <div class="build-card__spec">
          <span class="build-card__power">${b.power}</span>
          <span class="build-card__sub">${b.sub}</span>
        </div>
      </div>
    </article>`;
  // duplicate the list so the right-scrolling marquee loops seamlessly
  track.innerHTML = BUILDS.map(card).join("") + BUILDS.map(card).join("");
}

function renderStages() {
  const track = document.getElementById("stagesTrack");
  if (!track) return;
  track.innerHTML = STAGES.map((s, i) => `
    <article class="stage${s.featured ? " stage--featured" : ""}${i === 0 ? " is-active" : ""}" data-tilt>
      <div class="stage__media">
        <img class="stage__img" src="${s.img}" alt="${s.name}" loading="lazy" onerror="this.remove()" />
        <span class="stage__num" aria-hidden="true">${s.n}</span>
        <span class="stage__stripe" aria-hidden="true"></span>
        <span class="stage__glow" aria-hidden="true"></span>
        ${s.featured ? '<span class="stage__badge">Most popular</span>' : ""}
      </div>
      <div class="stage__body">
        <span class="stage__label">${s.label}</span>
        <h3 class="stage__name">${s.name}</h3>
        <div class="stage__gain"><strong>${s.gain}</strong><span>${s.gainLabel}</span></div>
        <ul class="stage__list">${s.feats.map(f => `<li>${f}</li>`).join("")}</ul>
        ${s.quote
          ? `<div class="stage__price stage__price--quote"><span class="stage__price__num" data-i18n="tuning.quote">Get a quote</span></div>`
          : `<div class="stage__price"><span class="stage__price__from" data-i18n="tuning.from">From</span><span class="stage__price__num" data-thb="${s.priceTHB}">฿${s.priceTHB.toLocaleString()}</span></div>`}
        <a href="#contact" class="btn ${s.featured ? "btn--primary" : "btn--ghost"} stage__cta">Enquire</a>
      </div>
    </article>`).join("");
}

function initStagesSlider() {
  const track = document.getElementById("stagesTrack");
  const dotsWrap = document.getElementById("stagesDots");
  const prev = document.getElementById("stagesPrev");
  const next = document.getElementById("stagesNext");
  if (!track) return;
  const cards = [...track.querySelectorAll(".stage")];
  if (!cards.length) return;

  if (dotsWrap) {
    dotsWrap.innerHTML = cards.map((_, i) =>
      `<button aria-label="Go to stage ${i + 1}"${i === 0 ? ' class="is-active"' : ""}></button>`).join("");
  }
  const dots = dotsWrap ? [...dotsWrap.querySelectorAll("button")] : [];
  const step = () => cards[0].offsetWidth + 22;
  const setActive = (idx) => {
    cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  };
  let raf;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const idx = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / step())));
      setActive(idx);
    });
  }, { passive: true });
  prev && prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next && next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  dots.forEach((d, i) => d.addEventListener("click", () => track.scrollTo({ left: i * step(), behavior: "smooth" })));
}

/* pointer-follow tilt + spotlight (mouse only; touch uses native swipe) */
function initStageTilt() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".stage[data-tilt]").forEach((card) => {
    const glow = card.querySelector(".stage__glow");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 9}deg) rotateY(${(px - 0.5) * 9}deg)`;
      if (glow) { glow.style.setProperty("--mx", px * 100 + "%"); glow.style.setProperty("--my", py * 100 + "%"); }
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

/* =========================================================
   FEATURED PARTS — products live in products.js (window.PRODUCTS),
   shared with the product detail pages (product.html).
   ========================================================= */
const PRODUCTS = window.PRODUCTS || [];

/* "Shop by Car" filter chips — reads the CMS-managed data/cars.json,
   falls back to the built-in CARS list (e.g. on file:// where fetch is blocked). */
let PARTS_FILTER = "all";
async function renderPartsFilter() {
  const wrap = document.getElementById("partsFilter");
  if (!wrap) return;
  let cars = CARS;
  try {
    const res = await fetch("data/cars.json", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.cars) && data.cars.length) cars = data.cars;
    }
  } catch (e) { /* offline / local file — use the built-in fallback */ }
  wrap.innerHTML = '<button class="part-chip is-active" data-car="all" data-i18n="parts.all">All</button>'
    + cars.map(c => `<button class="part-chip" data-car="${c.slug}">${c.name}</button>`).join("");
  if (typeof applyLang === "function") applyLang();   // translate the "All" chip
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".part-chip");
    if (!btn) return;
    wrap.querySelectorAll(".part-chip").forEach(b => b.classList.toggle("is-active", b === btn));
    renderProducts(btn.getAttribute("data-car"));
  });
}

function partCardHTML(p) {
  return `
    <a class="part-card" href="product.html?p=${encodeURIComponent(p.slug)}" aria-label="${p.brand} ${p.name}">
      <div class="part-card__media">
        <span class="part-card__stripe" aria-hidden="true"></span>
        ${p.tag ? `<span class="part-card__tag">${p.tag}</span>` : ""}
        <img class="part-card__img" src="${p.img}" alt="${p.brand} ${p.name}" loading="lazy" onerror="this.remove()" />
      </div>
      <div class="part-card__body">
        ${p.brand ? `<span class="part-card__brand">${p.brand}</span>` : ""}
        <h3 class="part-card__name">${p.name}</h3>
        <p class="part-card__fit">${p.fit}</p>
        ${p.models ? `<p class="part-card__models">${p.models}</p>` : ""}
        <div class="part-card__foot">
          ${p.gain ? `<span class="part-card__gain">${p.gain}</span>` : "<span></span>"}
          <span class="btn btn--ghost part-card__cta" data-i18n="parts.view">View details</span>
        </div>
      </div>
    </a>`;
}

/* Render parts into a manual swipe slider (like Tuning Stages) — no auto-move. */
function renderProducts(filter) {
  if (filter) PARTS_FILTER = filter;
  const track = document.getElementById("partsTrack");
  if (!track) return;
  const list = PARTS_FILTER === "all" ? PRODUCTS : PRODUCTS.filter(p => (p.fits || []).includes(PARTS_FILTER));
  const empty = document.getElementById("partsEmpty");
  const slider = document.querySelector(".parts-slider");
  if (empty) empty.hidden = list.length > 0;
  if (slider) slider.hidden = list.length === 0;
  track.innerHTML = list.map(partCardHTML).join("");
  if (typeof applyLang === "function") applyLang();
  initPartsSlider();
}

/* Dots + scroll-snap sync for the 2-row parts slider. Cards fill 2 rows, so each
   horizontal step is a COLUMN of 2 cards; one dot per column. */
function initPartsSlider() {
  const track = document.getElementById("partsTrack");
  const dotsWrap = document.getElementById("partsDots");
  if (!track) return;
  const cards = [...track.querySelectorAll(".part-card")];
  const columns = Math.ceil(cards.length / 2);
  const step = () => (cards[0] ? cards[0].offsetWidth + 16 : 1);
  if (dotsWrap) {
    dotsWrap.innerHTML = columns > 1
      ? Array.from({ length: columns }, (_, i) => `<button aria-label="Go to group ${i + 1}"${i === 0 ? ' class="is-active"' : ""}></button>`).join("")
      : "";
    [...dotsWrap.querySelectorAll("button")].forEach((d, i) =>
      d.addEventListener("click", () => track.scrollTo({ left: i * step(), behavior: "smooth" })));
  }
  // attach the scroll->dot sync once; it re-queries live so it survives re-renders
  if (!track.dataset.bound) {
    track.dataset.bound = "1";
    let raf;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const c = [...track.querySelectorAll(".part-card")];
        const dw = document.getElementById("partsDots");
        if (!c.length || !dw) return;
        const st = c[0].offsetWidth + 16;
        const idx = Math.max(0, Math.round(track.scrollLeft / st));
        [...dw.querySelectorAll("button")].forEach((d, i) => d.classList.toggle("is-active", i === idx));
      });
    }, { passive: true });
  }
}

/* =========================================================
   GOOGLE REVIEWS  —  EDIT THIS to point at your business.
   • reviewsUrl: your Google listing / "see all reviews" link
   • writeUrl:   direct "write a review" link (needs your Place ID)
                 https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
   • rating / count: shown in the badge
   Default below opens a Google Maps search for the shop name.
   ========================================================= */
const GOOGLE = {
  // Your live listing (resolved from your Maps short link):
  reviewsUrl: "https://www.google.com/maps?cid=10396968605545080179",
  // Paste your Place ID to enable the one-click "write a review" dialog;
  // otherwise the button falls back to the listing above.
  placeId: "",   // e.g. "ChIJ..."  — get it from Google's Place ID Finder
  // Optional static numbers for the badge. Leave blank to just show "Reviews on Google".
  rating: "",
  count: ""
};

const FEATURABLE = {
  // Paste ONLY your Featurable widget ID here to switch ON live, auto-syncing reviews.
  // Create a free widget at https://featurable.com → it embeds as id="featurable-XXXX";
  // paste just the XXXX part below.
  widgetId: "728bc4c2-6394-4136-870f-0ab9846ca0ad"
};

function initGoogleReviews() {
  const setHref = (id, url) => { const el = document.getElementById(id); if (el && url) el.href = url; };
  const writeUrl = GOOGLE.placeId
    ? `https://search.google.com/local/writereview?placeid=${GOOGLE.placeId}`
    : GOOGLE.reviewsUrl;
  setHref("gReviewsBadge", GOOGLE.reviewsUrl);
  setHref("gReviewsLink", GOOGLE.reviewsUrl);
  setHref("gWriteLink", writeUrl);

  const num = document.getElementById("gRatingNum");
  const stars = document.getElementById("gRatingStars");
  const cnt = document.getElementById("gRatingCount");
  if (GOOGLE.rating) {
    if (num) num.textContent = GOOGLE.rating;
    if (cnt) cnt.textContent = GOOGLE.count ? `Google Rating · ${GOOGLE.count} reviews` : "Google Rating";
  } else {
    if (num) num.style.display = "none";
    if (stars) stars.style.display = "none";
    if (cnt) cnt.textContent = "Reviews on Google";
  }
}

/* ---- Live Google reviews via Featurable (free, auto-syncing) ---- */
function initLiveReviews() {
  const id = (FEATURABLE.widgetId || "").trim();
  const host = document.getElementById("liveReviews");
  if (!id || !host) return;                  // not configured → keep the sample cards
  const widget = document.createElement("div");
  widget.id = "featurable-" + id;
  widget.setAttribute("data-featurable-async", "");
  host.appendChild(widget);
  const s = document.createElement("script");
  s.src = "https://featurable.com/assets/bundle.js";
  s.defer = true;
  document.body.appendChild(s);
  // hide the sample cards + static badge — the live widget shows the real rating
  const fallback = document.getElementById("reviewsFallback");
  if (fallback) fallback.style.display = "none";
  const badge = document.getElementById("gReviewsBadge");
  if (badge) badge.style.display = "none";
}

/* =========================================================
   APPOINTMENT BOOKING
   Route bookings to ONE of these (leave both blank to just show a
   confirmation message that you can follow up on):
     whatsapp : your WhatsApp number, digits + country code, no "+"
                e.g. "66812345678"  → opens WhatsApp with the details
     endpoint : OR a form/Google-Apps-Script POST URL to store the lead
   ========================================================= */
const BOOKING = {
  whatsapp: "",
  endpoint: ""
};

function initBookingForm() {
  const form = document.getElementById("bookForm");
  if (!form) return;
  const msg = document.getElementById("bookMsg");
  const val = (id) => (document.getElementById(id).value || "").trim();
  const show = (text, kind) => { if (msg) { msg.textContent = text; msg.className = "book-form__msg " + kind; } };

  // can't book in the past
  const dateEl = document.getElementById("bkDate");
  if (dateEl) dateEl.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = { name: val("bkName"), phone: val("bkPhone"), date: val("bkDate"), time: val("bkTime") };

    if (!d.name || !d.phone || !d.date || !d.time) {
      show("Please fill in your name, mobile number, date and time.", "err");
      return;
    }
    if (d.phone.replace(/\D/g, "").length < 8) {
      show("Please enter a valid mobile number.", "err");
      return;
    }

    const lines = [
      "New appointment request — Nord Werk",
      "Name: " + d.name,
      "Mobile: " + d.phone,
      "Date: " + d.date,
      "Time: " + d.time
    ].filter(Boolean).join("\n");
    const done = `Thanks ${d.name}! We've received your request for ${d.date} at ${d.time}. We'll confirm shortly.`;

    if (BOOKING.whatsapp) {
      window.open(`https://wa.me/${BOOKING.whatsapp}?text=${encodeURIComponent(lines)}`, "_blank");
      show(`Thanks ${d.name}! Opening WhatsApp to confirm your ${d.date} ${d.time} booking…`, "ok");
      form.reset();
    } else if (BOOKING.endpoint) {
      const body = new FormData();
      Object.entries(d).forEach(([k, v]) => body.append(k, v));
      fetch(BOOKING.endpoint, { method: "POST", body })
        .then(() => { show(done, "ok"); form.reset(); })
        .catch(() => show("Sorry, something went wrong — please call or message us instead.", "err"));
    } else {
      show(done, "ok");
      form.reset();
    }
  });
}

/* ---- Self-hosted looping hero video (muted, loops back to HERO_VIDEO_START) ---- */
const HERO_VIDEO_START = 3;   // seconds; set to 0 to loop from the very beginning
function initHeroVideo() {
  const v = document.getElementById("heroVideo");
  if (!v) return;
  v.muted = true;             // required for autoplay
  const seekStart = () => { try { v.currentTime = HERO_VIDEO_START; } catch (e) {} };
  v.addEventListener("loadedmetadata", seekStart);
  v.addEventListener("ended", () => { seekStart(); v.play().catch(() => {}); });
  const p = v.play();
  if (p && p.catch) p.catch(() => {});   // ignore autoplay rejection
}

/* ---- "Coming soon" countdown to opening day (25 July 2026) ---- */
function initCountdown() {
  const wrap = document.getElementById("countdown");
  if (!wrap) return;
  const target = new Date(2026, 6, 25, 0, 0, 0).getTime(); // month 6 = July
  const d = document.getElementById("cdDays"), h = document.getElementById("cdHours"),
        m = document.getElementById("cdMins"), s = document.getElementById("cdSecs");
  const set = (node, v) => {
    const str = String(v).padStart(2, "0");
    if (node.textContent !== str) {
      node.textContent = str;
      node.classList.remove("bump"); void node.offsetWidth; node.classList.add("bump");
    }
  };
  const tick = () => {
    let diff = Math.floor((target - Date.now()) / 1000);
    if (diff < 0) diff = 0;
    set(d, Math.floor(diff / 86400));
    set(h, Math.floor((diff % 86400) / 3600));
    set(m, Math.floor((diff % 3600) / 60));
    set(s, diff % 60);
  };
  tick();
  setInterval(tick, 1000);
}

/* =========================================================
   LANGUAGE (English default + Thai) and CURRENCY
   ========================================================= */
const I18N = {
  en: {
    "nav.services": "Services", "nav.cars": "Cars", "nav.parts": "Parts", "nav.brands": "Brands",
    "nav.tuning": "Tuning Stages", "nav.reviews": "Reviews",
    "hero.loc": "Pattaya, Thailand",
    "hero.coming": "COMING<br>SOON",
    "hero.sub": "BMW &amp; BENZ coding, performance tuning &amp; service.<br>Grand opening <strong>25 July 2026</strong>.",
    "cd.days": "Days", "cd.hours": "Hours", "cd.mins": "Minutes", "cd.secs": "Seconds",
    "hero.book": "Book Appointment", "hero.explore": "Explore Services",
    "services.title": "OUR SERVICES",
    "services.lead": "BMW & BENZ parts, performance and styling — everything we offer under one roof.",
    "cars.title": "SHOP BY CAR",
    "cars.lead": "Find parts, coding and tuning built for your exact BMW or Mercedes.",
    "cars.cta": "Don't see your model? Get in touch",
    "props.ship.t": "BMW & BENZ Specialists", "props.ship.d": "Coding, tuning & service",
    "props.fit.t": "Dealer-Level Coding", "props.fit.d": "Unlock 20+ hidden functions",
    "props.support.t": "Dyno-Proven Tuning", "props.support.d": "Real, reliable power gains",
    "props.secure.t": "Expert Technicians", "props.secure.d": "Talk to real specialists",
    "tuning.eyebrow": "PERFORMANCE TUNING", "tuning.title": "TUNING STAGES",
    "tuning.lead": "Staged power packages for your build — dyno-developed and street-reliable. Pick your level.",
    "tuning.partner": "Calibrated by our tuning partner",
    "tuning.partner.short": "Tuning partner", "tuning.platforms": "Platforms",
    "tuning.authorized": "bootmod3 Authorized Dealer",
    "tuning.from": "From", "tuning.quote": "Get a quote",
    "tuning.note": "Gains vary by model, fuel and supporting mods. Track, race & bespoke builds on custom quote — book a consultation for a build tailored to your car.",
    "builds.title": "FEATURED BUILDS", "builds.lead": "Real dyno-proven results from our tuning partner.",
    "brands.label": "BRANDS WE OFFER",
    "parts.eyebrow": "PERFORMANCE PARTS", "parts.title": "FEATURED PARTS",
    "parts.lead": "Hand-picked bolt-ons for more power and a sharper drive.",
    "parts.all": "All cars", "parts.empty": "No parts listed for this model yet — get in touch.",
    "parts.view": "View details",
    "reviews.title": "FROM THE GARAGE", "reviews.lead": "Real customer reviews — see them all on Google.",
    "reviews.count": "Reviews on Google", "reviews.readall": "Read all reviews on Google", "reviews.write": "Write a review",
    "book.eyebrow": "VISIT THE GARAGE", "book.title": "BOOK AN APPOINTMENT",
    "book.desc": "Reserve a slot at our Pattaya workshop — coding, tuning, diagnostics or service. We'll confirm your booking shortly.",
    "book.name": "Name", "book.name.ph": "Your name", "book.phone": "Mobile number",
    "book.service": "Service", "book.service.opt": "Select a service (optional)",
    "book.svc.coding": "BMW / BENZ Coding", "book.svc.tuning": "Performance Tuning", "book.svc.diag": "Diagnostics",
    "book.svc.service": "General Service / Maintenance", "book.svc.other": "Other",
    "book.date": "Preferred date", "book.time": "Preferred time", "book.time.opt": "Select time",
    "book.submit": "Book Appointment", "book.directions": "Get directions ↗",
    "footer.brand": "Pattaya's home for BMW & BENZ coding, performance tuning & service.",
    "footer.explore": "Explore", "footer.visit": "Visit Us",
    "footer.shop": "Shop", "footer.tuning": "Tuning", "footer.support": "Support", "footer.contact": "Contact"
  },
  th: {
    "nav.services": "บริการ", "nav.cars": "รถยนต์", "nav.parts": "อะไหล่", "nav.brands": "แบรนด์",
    "nav.tuning": "ระดับการจูน", "nav.reviews": "รีวิว",
    "hero.loc": "พัทยา ประเทศไทย",
    "hero.coming": "เปิดให้บริการ<br>เร็ว ๆ นี้",
    "hero.sub": "บริการโค้ดดิ้ง จูนสมรรถนะ และดูแลรักษา BMW &amp; BENZ<br>พบกัน <strong>25 กรกฎาคม 2026</strong>",
    "cd.days": "วัน", "cd.hours": "ชั่วโมง", "cd.mins": "นาที", "cd.secs": "วินาที",
    "hero.book": "จองคิวนัดหมาย", "hero.explore": "ดูบริการ",
    "services.title": "บริการของเรา",
    "services.lead": "อะไหล่ สมรรถนะ และของแต่ง BMW & BENZ — ครบจบในที่เดียว",
    "cars.title": "เลือกตามรุ่นรถ",
    "cars.lead": "ค้นหาอะไหล่ โค้ดดิ้ง และการจูนสำหรับ BMW หรือ Mercedes รุ่นของคุณ",
    "cars.cta": "ไม่พบรุ่นรถของคุณ? ติดต่อเรา",
    "props.ship.t": "เชี่ยวชาญ BMW & BENZ", "props.ship.d": "โค้ดดิ้ง จูน และดูแลรักษา",
    "props.fit.t": "โค้ดดิ้งระดับศูนย์", "props.fit.d": "ปลดล็อก 20+ ฟังก์ชันซ่อน",
    "props.support.t": "จูนพิสูจน์บนไดโน่", "props.support.d": "เพิ่มแรงม้าจริง ขับได้ทุกวัน",
    "props.secure.t": "ช่างผู้เชี่ยวชาญ", "props.secure.d": "ปรึกษาช่างตัวจริง",
    "tuning.eyebrow": "การจูนสมรรถนะ", "tuning.title": "ระดับการจูน",
    "tuning.lead": "แพ็กเกจเพิ่มพลังแบบเป็นขั้นสำหรับรถของคุณ พัฒนาบนไดโน่ ขับใช้งานจริงได้ — เลือกระดับของคุณ",
    "tuning.partner": "จูนโดยพาร์ทเนอร์จูนของเรา",
    "tuning.partner.short": "พาร์ทเนอร์จูน", "tuning.platforms": "แพลตฟอร์ม",
    "tuning.authorized": "ตัวแทนจำหน่าย bootmod3 อย่างเป็นทางการ",
    "tuning.from": "เริ่มต้น", "tuning.quote": "ขอใบเสนอราคา",
    "tuning.note": "ผลลัพธ์แตกต่างกันตามรุ่นรถ เชื้อเพลิง และอุปกรณ์เสริม งานสนาม แข่ง และงานสั่งทำพิเศษ ประเมินราคาเฉพาะคัน — ปรึกษาเราเพื่อจัดสเปกให้เหมาะกับรถของคุณ",
    "builds.title": "ผลงานเด่น", "builds.lead": "ผลลัพธ์จริงที่พิสูจน์บนไดโน่ จากพาร์ทเนอร์จูนของเรา",
    "brands.label": "แบรนด์ที่เราจำหน่าย",
    "parts.eyebrow": "อะไหล่สมรรถนะ", "parts.title": "อะไหล่แนะนำ",
    "parts.lead": "อะไหล่บอลต์ออนคัดสรร เพิ่มพลังและการขับขี่ที่ดีขึ้น",
    "parts.all": "ทุกรุ่น", "parts.empty": "ยังไม่มีอะไหล่สำหรับรุ่นนี้ — ติดต่อเราได้เลย",
    "parts.view": "ดูรายละเอียด",
    "reviews.title": "เสียงจากลูกค้า", "reviews.lead": "รีวิวจริงจากลูกค้า — ดูทั้งหมดบน Google",
    "reviews.count": "รีวิวบน Google", "reviews.readall": "อ่านรีวิวทั้งหมดบน Google", "reviews.write": "เขียนรีวิว",
    "book.eyebrow": "เยี่ยมชมอู่ของเรา", "book.title": "จองคิวนัดหมาย",
    "book.desc": "จองคิวที่อู่ของเราในพัทยา — โค้ดดิ้ง จูน วิเคราะห์ปัญหา หรือซ่อมบำรุง เราจะยืนยันการจองให้เร็วที่สุด",
    "book.name": "ชื่อ", "book.name.ph": "ชื่อของคุณ", "book.phone": "เบอร์โทรศัพท์",
    "book.service": "บริการ", "book.service.opt": "เลือกบริการ (ไม่บังคับ)",
    "book.svc.coding": "โค้ดดิ้ง BMW / BENZ", "book.svc.tuning": "จูนสมรรถนะ", "book.svc.diag": "วิเคราะห์ปัญหา",
    "book.svc.service": "ซ่อมบำรุงทั่วไป", "book.svc.other": "อื่น ๆ",
    "book.date": "วันที่สะดวก", "book.time": "เวลาที่สะดวก", "book.time.opt": "เลือกเวลา",
    "book.submit": "จองคิว", "book.directions": "ดูเส้นทาง ↗",
    "footer.brand": "ศูนย์รวมบริการโค้ดดิ้ง จูนสมรรถนะ และดูแล BMW & BENZ ในพัทยา",
    "footer.explore": "เมนู", "footer.visit": "มาหาเรา",
    "footer.shop": "ช็อป", "footer.tuning": "จูน", "footer.support": "ช่วยเหลือ", "footer.contact": "ติดต่อเรา"
  }
};
let LANG = localStorage.getItem("nw_lang") || "en";   // English on first load
function t(key) { return (I18N[LANG] && I18N[LANG][key]) != null ? I18N[LANG][key] : (I18N.en[key] != null ? I18N.en[key] : key); }
function applyLang() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = LANG === "en" ? "ไทย" : "ENG";
}
function setLang(l) { LANG = l; localStorage.setItem("nw_lang", l); applyLang(); }

/* ---- Currency (prices are stored in THB via data-thb="amount") ---- */
const CURRENCIES = {
  THB: { symbol: "฿", rate: 1,      dp: 0 },
  USD: { symbol: "$", rate: 0.028,  dp: 2 },
  CNY: { symbol: "¥", rate: 0.20,   dp: 2 },
  EUR: { symbol: "€", rate: 0.026,  dp: 2 },
  RUB: { symbol: "₽", rate: 2.5,    dp: 0 }
};
let CURRENCY = localStorage.getItem("nw_cur") || "THB";
function formatPrice(thb) {
  const c = CURRENCIES[CURRENCY] || CURRENCIES.THB;
  const v = thb * c.rate;
  return c.symbol + v.toLocaleString("en-US", { minimumFractionDigits: c.dp, maximumFractionDigits: c.dp });
}
function applyCurrency() {
  document.querySelectorAll("[data-thb]").forEach(el => {
    const thb = parseFloat(el.getAttribute("data-thb"));
    if (!isNaN(thb)) el.textContent = formatPrice(thb);
  });
  const sel = document.getElementById("curSelect");
  if (sel) sel.value = CURRENCY;
}
function setCurrency(c) { CURRENCY = c; localStorage.setItem("nw_cur", c); applyCurrency(); }

function initLangCurrency() {
  const btn = document.getElementById("langToggle");
  if (btn) btn.addEventListener("click", () => setLang(LANG === "en" ? "th" : "en"));
  const sel = document.getElementById("curSelect");
  if (sel) sel.addEventListener("change", () => setCurrency(sel.value));
  applyLang();
  applyCurrency();
}

/* ---- Boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  initHeroVideo();
  initCountdown();
  renderCategories();
  renderStages();
  renderBuilds();
  renderPartsFilter();
  renderProducts();
  initStagesSlider();
  initStageTilt();
  initNav();
  initGoogleReviews();
  initLiveReviews();
  initBookingForm();
  initReveal();
  initSectionFade();
  initLangCurrency();

  // safety net: nothing should ever stay hidden — force-reveal after load
  window.addEventListener("load", () => setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in), .sect-fade:not(.in)").forEach(el => el.classList.add("in"));
  }, 2200));
});
