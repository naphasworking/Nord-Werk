/* =========================================================
   Shared product catalog — used by the Featured Parts grid
   (index.html) AND the product detail pages (product.html).

   To add a product: copy a block, give it a unique "slug"
   (used in the URL: product.html?p=<slug>), drop its die-cut
   image in Asset/products/, and list the car slugs it fits.
   ========================================================= */
window.PRODUCTS = [
  {
    slug: "vrsf-n55-downpipe",
    brand: "VRSF",
    name: "N55 Catted Downpipe",
    tag: "Catless · High-flow",
    fit: "Fits BMW 1–4 Series · N55",
    models: "M135i · M235i · M2 · 335i · 435i",
    gain: "+20–25 hp",
    priceTHB: 22500,            // ≈ r44performance.com £499.99 reference price
    img: "Asset/products/n55-downpipe.webp",
    fits: ["bmw-3", "bmw-4"],
    desc: "A high-flow catless downpipe for the BMW N55. Replacing the restrictive factory catalytic converter cuts exhaust backpressure for faster turbo spool, a sharper note and stronger mid-range — ideal alongside a Stage 2 tune.",
    features: [
      "High-flow, catless design",
      "Faster turbo spool & throttle response",
      "Pairs with a Stage 2 tune",
      "Quality stainless construction"
    ]
  },
  {
    slug: "vrsf-b58-downpipe",
    brand: "VRSF",
    name: "B58 Sports Downpipe",
    tag: "Catless · High-flow",
    fit: "Fits 2016+ BMW B58 · M240i · 340i · 440i · 540i · 740i",
    models: "M240i · 340i · 440i · 540i · 740i (xDrive)",
    gain: "+25–30 hp",
    priceTHB: 26100,            // ≈ r44performance.com £579.99 reference price
    img: "Asset/products/b58-downpipe.webp",
    fits: ["bmw-3", "bmw-4", "bmw-5"],
    desc: "Handcrafted from TIG-welded 4.5″ 304-grade stainless steel, the VRSF B58 sports downpipe swaps the restrictive factory cat for a 200-cell high-flow race cat — slashing backpressure for faster spool and a sharper exhaust note. Fits RHD & LHD without modification and works with the stock or an aftermarket catback. Pairs with an ECU tune for 25–30 hp gains.",
    features: [
      "Handcrafted 4.5″ 304 stainless, TIG-welded",
      "200-cell high-flow race cat",
      "Faster spool & sharper exhaust response",
      "Fits RHD & LHD · stock or aftermarket catback"
    ]
  },
  {
    slug: "bilstein-b16-damptronic-coilover",
    brand: "Bilstein",
    name: "B16 Damptronic Coilover Kit",
    tag: "Coilovers · EDC",
    fit: "Fits BMW 1–4 Series · F20 / F22 / F30 / F32 (with EDC)",
    models: "F20/F21 · F22/F23 · F30/F31/F34 · F32/F33/F36",
    priceTHB: 108000,            // ≈ r44performance.com £2,405.16 reference price
    img: "Asset/products/bilstein-b16-coilover.webp",
    fits: ["bmw-3", "bmw-4"],
    desc: "A motorsport-developed B16 coilover system that works with BMW's factory electronic dampers (EDC). Height-adjustable with roughly 30–50 mm of lowering and a 20 mm fine-tuning range at each axle, it sharpens handling and stance while keeping adaptive ride comfort.",
    features: [
      "Works with factory EDC / adaptive dampers",
      "≈30–50 mm lowering · 20 mm adjustment per axle",
      "Mono-tube upside-down gas-pressure design",
      "Triple-C corrosion-resistant coating"
    ]
  },
  {
    slug: "bilstein-b12-prokit",
    brand: "Bilstein",
    name: "B12 Pro-Kit Suspension",
    tag: "Lowering · Non-EDC",
    fit: "Fits BMW M135i · M140i · M235i · M240i (Non-EDC)",
    models: "F20/F21 M135i · M140i · F22/F23 M235i · M240i",
    priceTHB: 52300,            // ≈ r44performance.com £1,162.80 reference price
    img: "Asset/products/bilstein-b12-prokit.webp",
    fits: [],                   // fits 1 & 2 Series (not in the Shop-by-Car list) → shows under "All cars"
    desc: "Bilstein's B12 Pro-Kit pairs B8 sport dampers with Eibach Pro-Kit progressive springs for a sharper fast-road setup. It lowers the car up to 40 mm, trims body roll and tightens cornering response while keeping everyday ride comfort — German-made and TÜV-certified.",
    features: [
      "Bilstein B8 dampers + Eibach Pro-Kit springs",
      "Lowers up to 40 mm",
      "Mono-tube upside-down gas-pressure design",
      "TÜV-certified · made in Germany"
    ]
  },
  {
    slug: "csf-s58-heat-exchanger",
    brand: "CSF",
    name: "S58 Front-Mount Heat Exchanger",
    tag: "Cooling · S58",
    fit: "Fits BMW M2 · M3 · M4 · S58 (G8x)",
    models: "G80/G81 M3 · G82/G83 M4 · G87 M2",
    priceTHB: 37300,            // ≈ r44performance.com £828.00 reference price
    img: "Asset/products/csf-s58-heat-exchanger.webp",
    fits: ["bmw-3", "bmw-4"],
    desc: "CSF's front-mount heat exchanger replaces the factory unit with a 2-row, 42 mm all-aluminium core to keep S58 coolant and intake temperatures in check during hard driving. Plug-and-play fit with CNC brackets, OEM-style quick connects and rock guards — so the M2/M3/M4 holds peak power lap after lap.",
    features: [
      "2-row 42 mm all-aluminium core (B-Tube)",
      "Lower coolant & intake temps under load",
      "Plug & play · CNC brackets, OEM quick-connects",
      "Includes upper & lower rock guards"
    ]
  },
  {
    slug: "mst-n55-intake",
    brand: "MST",
    name: "N55 Performance Intake Kit",
    tag: "Intake · Induction",
    fit: "Fits BMW 1–4 Series · M2 · N55",
    models: "M135i · M235i · 335i · 435i · M2 (F2x/F3x)",
    priceTHB: 20100,            // ≈ r44performance.com £446.99 reference price
    img: "Asset/products/mst-n55-intake.webp",
    fits: ["bmw-3", "bmw-4"],
    desc: "MST's N55 intake swaps the restrictive airbox for a CNC-machined aluminium pipe, a high-flow nanofibre dry filter and a laser-cut heat shield — boosting airflow, throttle response and induction sound. Dyno-proven at +12.7 bhp / +19.8 Nm on a 335i.",
    features: [
      "Nanofibre dry high-flow filter",
      "CNC aluminium intake pipe + MAF housing",
      "Laser-cut powder-coated heat shield",
      "+12.7 bhp / +19.8 Nm (335i, dyno)"
    ]
  },
  {
    slug: "mmr-n55-intercooler",
    brand: "MMR",
    name: "N55 Performance Intercooler",
    tag: "Intercooler · N55",
    fit: "Fits BMW 1–4 Series · N55 (F2x/F3x)",
    models: "M135i · M235i · 335i · 435i (non-cabrio)",
    priceTHB: 35400,            // ≈ r44performance.com £786.23 reference price
    img: "Asset/products/mmr-n55-intercooler.webp",
    fits: ["bmw-3", "bmw-4"],
    desc: "An MMR bar-and-plate stepped-core intercooler that gives the N55 around 70% more frontal area and 90% more internal volume than stock — slashing charge-air temperatures for consistent power on hot days and hard runs, with minimal pressure drop. Direct fit, no modification required.",
    features: [
      "520 × 215 × 145 mm bar-and-plate stepped core",
      "~70% larger frontal area than OE",
      "~90% more internal volume than OE",
      "Direct fit · anti-corrosive coating"
    ]
  }
];
