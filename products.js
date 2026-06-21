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
  }
];
