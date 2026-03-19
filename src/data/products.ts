import noRulesTee from '@/assets/products/no-rules-tee.png';
import illusionTee from '@/assets/products/illusion-tee.png';
import unleashedTee from '@/assets/products/unleashed-tee.png';
import elevateTee from '@/assets/products/elevate-tee.png';

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
  badge?: 'new' | 'bestseller' | 'limited';
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

// Placeholder for products without real images
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" fill="#f3f4f6"><rect width="800" height="1000"/><text x="400" y="480" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#9ca3af">Upload Product Image</text><text x="400" y="520" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#d1d5db">800 × 1000</text></svg>`);

export const products: Product[] = [
  // T-Shirts
  {
    id: 'no-rules-oversized-tee',
    name: 'No Rules Oversized Tee',
    description: 'Astronaut graphic oversized tee in 280gsm heavyweight cotton. Drop-shoulder fit with bold "No Rules" print. A streetwear essential.',
    price: 499,
    colors: ['OLIVE', 'BLACK', 'WHITE', 'SAND'],
    sizes: SIZES,
    images: [noRulesTee, illusionTee, unleashedTee, elevateTee],
    category: 'tshirts',
    stockQty: 60,
    inStock: true,
    badge: 'bestseller',
  },
  {
    id: 'illusion-graphic-tee',
    name: 'Illusion Graphic Tee',
    description: 'Psychedelic skull mushroom design on premium cotton. Vibrant DTG print in neon pink and cyan. Stand out from the crowd.',
    price: 449,
    colors: ['SAND', 'BLACK', 'HEATHER GREY'],
    sizes: SIZES,
    images: [illusionTee, noRulesTee, elevateTee, unleashedTee],
    category: 'tshirts',
    stockQty: 80,
    inStock: true,
    badge: 'new',
  },
  {
    id: 'unleashed-bulldog-tee',
    name: 'Unleashed Bulldog Tee',
    description: 'Vintage college-style bulldog graphic on cream cotton. Screen-printed for durability. Bold statement piece.',
    price: 399,
    colors: ['WHITE', 'BLACK', 'HEATHER GREY', 'NAVY'],
    sizes: SIZES,
    images: [unleashedTee, noRulesTee, illusionTee, elevateTee],
    category: 'tshirts',
    stockQty: 100,
    inStock: true,
  },
  {
    id: 'elevate-octopus-tee',
    name: 'Elevate Octopus Tee',
    description: 'Cosmic octopus boombox design in electric green and purple. Full back print on heavyweight cotton. Music meets streetwear.',
    price: 479,
    colors: ['SAND', 'BLACK', 'OLIVE'],
    sizes: SIZES,
    images: [elevateTee, illusionTee, unleashedTee, noRulesTee],
    category: 'tshirts',
    stockQty: 70,
    inStock: true,
    badge: 'new',
  },
  {
    id: 'classic-white-printed-tee',
    name: 'Classic White Printed Tee',
    description: 'Premium 100% cotton tee with crisp print quality. Perfect for daily wear or custom branding.',
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
  // Mugs
  {
    id: 'custom-coffee-mug',
    name: 'Custom Coffee Mug',
    description: 'High-quality ceramic mug with your custom design. Dishwasher safe.',
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
    badge: 'bestseller',
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
    description: 'Professional branding on premium ceramic. Ideal for corporate gifts.',
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
    description: 'Laser-engraved premium wooden frame. Perfect for anniversaries and weddings.',
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
    description: 'Compact wooden keychain with custom engraving. Lightweight and durable.',
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
    description: 'Premium gift set with custom mug, keychain, and branded packaging.',
    price: 799,
    colors: ['Standard'],
    sizes: ['Standard Set', 'Premium Set'],
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238f094?w=800&h=1000&fit=crop',
    ],
    category: 'corporate',
    stockQty: 50,
    inStock: true,
    badge: 'limited',
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
