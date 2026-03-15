export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  category: string;
  stockQty: number;
  inStock: boolean;
}

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const MUG_SIZES = ['Standard 11oz', 'Large 15oz'];
export const FRAME_SIZES = ['6x8 inch', '8x10 inch', '10x12 inch'];
export const KEYCHAIN_SIZES = ['Standard', 'Large'];

export const COLORS = ['BLACK', 'WHITE', 'HEATHER GREY', 'NAVY', 'OLIVE', 'SAND'];

export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'tshirts', label: 'Custom T-Shirts' },
  { id: 'mugs', label: 'Coffee Mugs' },
  { id: 'frames', label: 'Wooden Frames' },
  { id: 'keychains', label: 'Wooden Keychains' },
  { id: 'corporate', label: 'Corporate Gifts' },
];

export const products: Product[] = [
  // T-Shirts
  {
    id: 'classic-white-printed-tee',
    name: 'Classic White Printed Tee',
    description: 'Premium 100% cotton tee with crisp print quality. Perfect for daily wear or custom branding. Comfortable, breathable, and built to last.',
    price: 299,
    colors: ['BLACK', 'WHITE', 'HEATHER GREY', 'NAVY'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
    ],
    category: 'tshirts',
    stockQty: 100,
    inStock: true,
  },
  {
    id: 'premium-black-graphic-tee',
    name: 'Premium Black Graphic Tee',
    description: 'Bold graphic print on heavyweight 240gsm cotton. Screen-printed for durability. A statement piece for streetwear lovers.',
    price: 399,
    colors: ['BLACK', 'WHITE', 'SAND', 'OLIVE'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop',
    ],
    category: 'tshirts',
    stockQty: 80,
    inStock: true,
  },
  {
    id: 'corporate-logo-tee',
    name: 'Corporate Logo Tee',
    description: 'Clean corporate branding tee with premium DTG printing. Ideal for businesses, events, and team uniforms.',
    price: 349,
    colors: ['BLACK', 'WHITE', 'HEATHER GREY'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&h=1000&fit=crop',
    ],
    category: 'tshirts',
    stockQty: 120,
    inStock: true,
  },
  {
    id: 'oversized-streetwear-tee',
    name: 'Oversized Streetwear Tee',
    description: 'Drop-shoulder oversized fit in 280gsm heavyweight cotton. Boxy cut with reinforced seams.',
    price: 499,
    colors: ['BLACK', 'WHITE', 'HEATHER GREY', 'NAVY', 'SAND'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=1000&fit=crop',
    ],
    category: 'tshirts',
    stockQty: 60,
    inStock: true,
  },
  {
    id: 'minimal-logo-tee',
    name: 'Minimal Logo Tee',
    description: 'Subtle embroidered logo on the chest. Clean, understated, premium.',
    price: 329,
    colors: ['BLACK', 'WHITE', 'OLIVE', 'NAVY'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=1000&fit=crop',
    ],
    category: 'tshirts',
    stockQty: 90,
    inStock: true,
  },
  {
    id: 'vintage-wash-tee',
    name: 'Vintage Wash Tee',
    description: 'Enzyme-washed for a broken-in vintage feel. 200gsm cotton.',
    price: 379,
    colors: ['BLACK', 'HEATHER GREY', 'SAND', 'OLIVE'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&h=1000&fit=crop',
    ],
    category: 'tshirts',
    stockQty: 70,
    inStock: true,
  },
  // Mugs
  {
    id: 'custom-coffee-mug',
    name: 'Custom Coffee Mug',
    description: 'High-quality ceramic mug with your custom design. Dishwasher safe. Perfect morning companion.',
    price: 249,
    colors: ['WHITE', 'BLACK'],
    sizes: MUG_SIZES,
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&h=1000&fit=crop',
    ],
    category: 'mugs',
    stockQty: 200,
    inStock: true,
  },
  {
    id: 'premium-photo-mug',
    name: 'Premium Photo Mug',
    description: 'Full wrap-around photo print on premium ceramic. Makes a perfect gift.',
    price: 349,
    colors: ['WHITE'],
    sizes: MUG_SIZES,
    images: [
      'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&h=1000&fit=crop',
    ],
    category: 'mugs',
    stockQty: 150,
    inStock: true,
  },
  {
    id: 'corporate-logo-mug',
    name: 'Corporate Logo Mug',
    description: 'Professional branding on premium ceramic. Ideal for corporate gifts and office use.',
    price: 299,
    colors: ['WHITE', 'BLACK'],
    sizes: MUG_SIZES,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=1000&fit=crop',
    ],
    category: 'mugs',
    stockQty: 180,
    inStock: true,
  },
  // Wooden Frames
  {
    id: 'custom-photo-frame',
    name: 'Custom Photo Frame',
    description: 'Beautiful wooden frame with your photos and custom text. Handcrafted with care.',
    price: 399,
    colors: ['Natural Wood', 'Dark Walnut', 'White'],
    sizes: FRAME_SIZES,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=800&h=1000&fit=crop',
    ],
    category: 'frames',
    stockQty: 100,
    inStock: true,
  },
  {
    id: 'engraved-wooden-frame',
    name: 'Engraved Wooden Frame',
    description: 'Laser-engraved premium wooden frame. Perfect for anniversaries, weddings, and special occasions.',
    price: 499,
    colors: ['Natural Wood', 'Dark Walnut'],
    sizes: FRAME_SIZES,
    images: [
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800&h=1000&fit=crop',
    ],
    category: 'frames',
    stockQty: 80,
    inStock: true,
  },
  // Keychains
  {
    id: 'custom-wooden-keychain',
    name: 'Custom Wooden Keychain',
    description: 'Compact wooden keychain with custom engraving. Lightweight and durable everyday carry.',
    price: 149,
    colors: ['Natural Wood', 'Dark Walnut', 'Bamboo'],
    sizes: KEYCHAIN_SIZES,
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=1000&fit=crop',
    ],
    category: 'keychains',
    stockQty: 300,
    inStock: true,
  },
  {
    id: 'photo-keychain',
    name: 'Photo Keychain',
    description: 'Custom photo keychain with crystal-clear print. Carry your memories everywhere.',
    price: 199,
    colors: ['Silver', 'Gold', 'Rose Gold'],
    sizes: KEYCHAIN_SIZES,
    images: [
      'https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=800&h=1000&fit=crop',
    ],
    category: 'keychains',
    stockQty: 250,
    inStock: true,
  },
  // Corporate Gifts
  {
    id: 'corporate-gift-set',
    name: 'Corporate Gift Set',
    description: 'Premium gift set with custom mug, keychain, and branded packaging. Perfect for employees and clients.',
    price: 799,
    colors: ['Standard'],
    sizes: ['Standard Set', 'Premium Set'],
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238f094?w=800&h=1000&fit=crop',
    ],
    category: 'corporate',
    stockQty: 50,
    inStock: true,
  },
  {
    id: 'branded-combo-pack',
    name: 'Branded Combo Pack',
    description: 'T-shirt + Mug combo with your brand logo. Great value for corporate events.',
    price: 599,
    colors: ['Standard'],
    sizes: ['S+Mug', 'M+Mug', 'L+Mug', 'XL+Mug', 'XXL+Mug'],
    images: [
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&h=1000&fit=crop',
    ],
    category: 'corporate',
    stockQty: 75,
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function formatPrice(price: number): string {
  return `₹${price}`;
}
