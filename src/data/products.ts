export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  images: string[];
  category: string;
}

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const COLORS = ['BLACK', 'WHITE', 'HEATHER GREY', 'NAVY', 'OLIVE', 'SAND'];

export const products: Product[] = [
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
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=1000&fit=crop',
    ],
    category: 'essentials',
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
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&h=1000&fit=crop',
    ],
    category: 'graphic',
  },
  {
    id: 'corporate-logo-tee',
    name: 'Corporate Logo Tee',
    description: 'Clean corporate branding tee with premium DTG printing. Ideal for businesses, events, and team uniforms. Professional quality guaranteed.',
    price: 349,
    colors: ['BLACK', 'WHITE', 'HEATHER GREY'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=800&h=1000&fit=crop',
    ],
    category: 'corporate',
  },
  {
    id: 'oversized-streetwear-tee',
    name: 'Oversized Streetwear Tee',
    description: 'Drop-shoulder oversized fit in 280gsm heavyweight cotton. Boxy cut with reinforced seams. The ultimate streetwear essential.',
    price: 499,
    colors: ['BLACK', 'WHITE', 'HEATHER GREY', 'NAVY', 'SAND'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
    ],
    category: 'oversized',
  },
  {
    id: 'minimal-logo-tee',
    name: 'Minimal Logo Tee',
    description: 'Subtle embroidered logo on the chest. Clean, understated, premium. Made from ring-spun cotton for an ultra-soft hand feel.',
    price: 329,
    colors: ['BLACK', 'WHITE', 'OLIVE', 'NAVY'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1578768079470-0f0d1e3943a6?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=1000&fit=crop',
    ],
    category: 'essentials',
  },
  {
    id: 'vintage-wash-tee',
    name: 'Vintage Wash Tee',
    description: 'Enzyme-washed for a broken-in vintage feel. 200gsm cotton with a slightly cropped hem. Looks like you\'ve owned it for years.',
    price: 379,
    colors: ['BLACK', 'HEATHER GREY', 'SAND', 'OLIVE'],
    sizes: SIZES,
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1523381294911-8d3cead13b03?w=800&h=1000&fit=crop',
    ],
    category: 'vintage',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function formatPrice(price: number): string {
  return `₹${price}`;
}
