export const SP = {
  Stumpy: {
    b: 'wood',
    e: '🍃',
    t: '32s',
    desc: 'Spark base. Ingrediente clave de toda la cadena de producción.',
    sIn: {},
    mat: [{ n: 'Aether Shard', q: '1x' }, { n: 'Wooden Log', q: '5x' }]
  },
  Loamy: {
    b: 'wood',
    e: '🌱',
    t: '32s (×5)',
    desc: 'Sin dependencias de Spark. Produce 5 unidades por craft.',
    sIn: {},
    mat: [{ n: 'Aether Shard', q: '5x' }, { n: 'Fertiliser', q: '3x' }]
  },
  Crafty: {
    b: 'wood',
    e: '🔨',
    t: '48s',
    desc: 'Worker Spark, ideal para operar edificios.',
    sIn: { Stumpy: 2 },
    mat: [{ n: 'Wooden Panel', q: '2x' }]
  },
  Carry: {
    b: 'wood',
    e: '📦',
    t: '32s',
    desc: 'Transporta ítems. Base para Hauling.',
    sIn: { Crafty: 1 },
    mat: [{ n: 'Sawn Timber', q: '4x' }]
  },
  Choppy: {
    b: 'wood',
    e: '🪓',
    t: '64s',
    desc: 'Corta árboles y madera. Ingrediente de Slashy.',
    sIn: { Stumpy: 3 },
    mat: [{ n: 'Wooden Blade', q: '1x' }]
  },
  Arty: {
    b: 'wood',
    e: '🎨',
    t: '32s',
    desc: 'Pinta edificios con color. Solo Woodland.',
    sIn: { Stumpy: 2 },
    mat: [{ n: 'Rope', q: '5x' }]
  },
  Rocky: {
    b: 'mtn',
    e: '🌑',
    t: '32s',
    desc: 'Base de todos los Mountain Sparks avanzados.',
    sIn: { Stumpy: 2 },
    mat: [{ n: 'Stone', q: '5x' }]
  },
  Scouty: {
    b: 'mtn',
    e: '🔭',
    t: '32s',
    desc: 'Revela el mapa al lanzarse. Un solo uso.',
    sIn: { Stumpy: 1 },
    mat: [{ n: 'Dowsing Stone', q: '1x' }]
  },
  Hauling: {
    b: 'mtn',
    e: '🚛',
    t: '64s',
    desc: 'Transporta grandes cantidades de ítems.',
    sIn: { Carry: 2 },
    mat: [{ n: 'Stone Wheel', q: '4x' }]
  },
  Boomy: {
    b: 'mtn',
    e: '💣',
    t: '48s (×3)',
    desc: 'Explosión grande. Produce 3 por craft. Ingrediente de Crashy.',
    sIn: { Rocky: 3 },
    mat: [{ n: 'Explosives', q: '5x' }]
  },
  Puffy: {
    b: 'mtn',
    e: '💨',
    t: '32s',
    desc: 'Aspira ítems y enemigos pequeños. Inmune a gases.',
    sIn: { Rocky: 1 },
    mat: [{ n: 'Fabric', q: '4x' }]
  },
  Crashy: {
    b: 'mtn',
    e: '💥',
    t: '64s',
    desc: 'Explosión masiva. Excava casi cualquier material.',
    sIn: { Boomy: 2 },
    mat: [{ n: 'Stone Spike', q: '7x' }]
  },
  Slashy: {
    b: 'mtn',
    e: '⚔️',
    t: '64s',
    desc: 'Combate con daño cortante. Efectivo contra raíces y árboles.',
    sIn: { Rocky: 2, Choppy: 3 },
    mat: []
  }
};

export const POS = {
  Loamy: [0, 1],
  Stumpy: [1.5, 1],
  Arty: [0, 2],
  Crafty: [1.5, 2],
  Choppy: [3, 2],
  Carry: [1.5, 3],
  Hauling: [1.5, 4],
  Rocky: [5, 1],
  Scouty: [7, 1],
  Boomy: [5, 2],
  Puffy: [7, 2],
  Slashy: [4, 3],
  Crashy: [5.8, 3]
};

export const LAYOUT = {
  CW: 80,
  RH: 95,
  NR: 27,
  PX: 44,
  PY: 36,
  VW: 680
};
