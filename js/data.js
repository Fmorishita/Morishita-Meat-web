/* ============================================================
   MORISHITA MEAT — Datos de ejemplo (placeholder)
   Reemplazar precios, descripciones y agregar fotos reales.
   Las imágenes reales irían en assets/images/<id>.jpg
   y se activan poniendo "image": "assets/images/<id>.jpg".
   ============================================================ */

window.MORISHITA_PRODUCTS = [
  {
    id: "wagyu-a5-ribeye",
    nombre: "Wagyu A5 Ribeye",
    origen: "Prefectura de Hyogo · Japón",
    categoria: "Wagyu Japonés",
    bms: 12,
    cert: "A5 Wagyu",
    badge: "BMS 12",
    image: null,
    pesos: [
      { label: "300 g", precio: 4800 },
      { label: "500 g", precio: 7600 },
      { label: "1 kg",  precio: 14500 }
    ],
    desc: "La cima del wagyu japonés. Marmoleo extremo, sabor mantecoso y una textura que se deshace en el paladar.",
    guia: "Sella 45–60 segundos por lado en plancha muy caliente. Sin aceite: la propia grasa basta. Reposa 3 minutos, corta delgado y termina con sal en escamas."
  },
  {
    id: "kobe-sirloin",
    nombre: "Kobe Sirloin",
    origen: "Kobe · Prefectura de Hyogo",
    categoria: "Wagyu Japonés",
    bms: 10,
    cert: "Kobe Beef",
    badge: "BMS 10",
    image: null,
    pesos: [
      { label: "300 g", precio: 5200 },
      { label: "500 g", precio: 8400 },
      { label: "1 kg",  precio: 16200 }
    ],
    desc: "Certificado de origen Kobe, el wagyu más célebre del mundo. Equilibrio perfecto entre grasa intramuscular y firmeza.",
    guia: "Temperatura ambiente 30 min antes. Fuego alto y breve. Ideal sukiyaki o teppanyaki. Acompaña con ponzu y wasabi fresco."
  },
  {
    id: "wagyu-a5-filete",
    nombre: "Wagyu A5 Filete",
    origen: "Prefectura de Kagoshima",
    categoria: "Wagyu Japonés",
    bms: 11,
    cert: "A5 Wagyu",
    badge: "BMS 11",
    image: null,
    pesos: [
      { label: "300 g", precio: 5600 },
      { label: "500 g", precio: 9000 },
      { label: "1 kg",  precio: 17400 }
    ],
    desc: "El corte más tierno del animal con la elegancia del A5. Magro, delicado y profundamente aromático.",
    guia: "Cocción suave y precisa. Sellado rápido a fuego medio-alto, centro tibio (rare). Reposo de 4 minutos antes de cortar."
  },
  {
    id: "tomahawk-prime",
    nombre: "Tomahawk USDA Prime",
    origen: "Estados Unidos",
    categoria: "USDA Prime",
    bms: 7,
    cert: "USDA Prime",
    badge: "Prime",
    image: null,
    pesos: [
      { label: "800 g", precio: 2400 },
      { label: "1.2 kg", precio: 3400 }
    ],
    desc: "El corte de mayor presencia. Hueso largo, ojo de ribeye generoso y un sabor intenso que domina la parrilla.",
    guia: "Método reverse sear: horno a 120 °C hasta 48 °C internos, luego sellado agresivo en parrilla. Reposo de 8 minutos."
  },
  {
    id: "ribeye-prime",
    nombre: "Ribeye USDA Prime",
    origen: "Estados Unidos",
    categoria: "USDA Prime",
    bms: 6,
    cert: "USDA Prime",
    badge: "Prime",
    image: null,
    pesos: [
      { label: "300 g", precio: 980 },
      { label: "500 g", precio: 1550 },
      { label: "1 kg",  precio: 2900 }
    ],
    desc: "El balance ideal entre grasa y carne. Jugoso, profundo y versátil para sartén de hierro o parrilla.",
    guia: "Sal gruesa 40 min antes. Fuego alto, 3–4 min por lado para término medio. Mantequilla, ajo y tomillo al final."
  },
  {
    id: "new-york-prime",
    nombre: "New York Strip",
    origen: "Estados Unidos",
    categoria: "USDA Prime",
    bms: 6,
    cert: "USDA Prime",
    badge: "Prime",
    image: null,
    pesos: [
      { label: "300 g", precio: 920 },
      { label: "500 g", precio: 1480 },
      { label: "1 kg",  precio: 2750 }
    ],
    desc: "Firme, magro y con borde de grasa que sella el sabor. El favorito de los puristas del bistec.",
    guia: "Sella a fuego fuerte, voltea cada minuto para corteza uniforme. Término medio (54 °C). Corta contra la fibra."
  },
  {
    id: "picana",
    nombre: "Picaña",
    origen: "Sudamérica",
    categoria: "Parrilla",
    bms: 5,
    cert: "Origen seleccionado",
    badge: "Parrilla",
    image: null,
    pesos: [
      { label: "1 kg",  precio: 890 },
      { label: "1.5 kg", precio: 1300 }
    ],
    desc: "Corte estrella de la parrilla brasileña. Capa de grasa generosa que, al fuego, perfuma toda la pieza.",
    guia: "Con la grasa hacia arriba. Sal gruesa y fuego indirecto. Corta en abanico contra la fibra al servir."
  },
  {
    id: "short-rib",
    nombre: "Short Rib",
    origen: "Estados Unidos",
    categoria: "Parrilla",
    bms: 7,
    cert: "Premium",
    badge: "Premium",
    image: null,
    pesos: [
      { label: "500 g", precio: 760 },
      { label: "1 kg",  precio: 1420 }
    ],
    desc: "Costilla con marmoleo notable. Insuperable para parrilla coreana (galbi) y cocciones lentas.",
    guia: "Para parrilla: corte mariposa fino, fuego alto y rápido. Para braseado: 3 horas a fuego bajo en su jugo."
  }
];
