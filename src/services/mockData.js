/* Datos mock de respaldo con estructura de FakeStoreAPI */
export const mockProducts = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Mochila ideal para el día a día y salidas al aire libre. Compartimento acolchado para laptops de hasta 15 pulgadas y diseño ergonómico duradero.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Camiseta manga larga tipo henley con tres botones. Tejido liviano, transpirable y suave para un calce cómodo en cualquier ocasión.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description: 'Chaqueta de algodón para entretiempo. Perfecta para caminatas, viajes, ciclismo o actividades urbanas de uso diario.',
    category: "men's clothing",
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: 'John Hardy Legends Naga Gold & Silver Dragon Bracelet',
    price: 695.0,
    description: 'Pulsera artesanal en plata de ley y oro inspirada en el dragón mítico de agua. Detalle minucioso con perla oceánica y grabado a mano.',
    category: 'jewelery',
    image: 'https://images.unsplash.com/photo-1611591475874-8be05f4bf23d?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 5,
    title: 'Solid Gold Petite Micropave Ring',
    price: 168.0,
    description: 'Anillo en oro fino con engaste micropavé. Diseño delicado y atemporal, ideal para obsequios o celebraciones especiales.',
    category: 'jewelery',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 3.9, count: 70 }
  },
  {
    id: 6,
    title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
    price: 64.0,
    description: 'Disco duro externo portátil de 2TB con conexión USB 3.0 y USB 2.0. Transferencia rápida de datos y formato compatible con múltiples sistemas.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 3.3, count: 203 }
  },
  {
    id: 7,
    title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 109.0,
    description: 'Unidad de estado sólido interna para acelerar el arranque del sistema y tiempos de carga de programas con máxima fiabilidad.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 2.9, count: 470 }
  },
  {
    id: 8,
    title: 'BIYLACLESEN Women\'s 3-in-1 Snowboard Jacket Winter Coats',
    price: 56.99,
    description: 'Abrigo de invierno impermeable con forro polar desmontable. Capucha ajustable y múltiples bolsillos seguros.',
    category: "women's clothing",
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop&q=80',
    rating: { rate: 2.6, count: 235 }
  }
];

export const mockCategories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
];
