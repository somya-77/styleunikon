import { Layout } from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, formatPrice, PLACEHOLDER_IMAGE } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, RefreshCw, ZoomIn } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <Layout>
        <div className="px-8 lg:px-16 py-24 text-center">
          <h1 className="text-4xl font-extrabold mb-4">PRODUCT NOT FOUND</h1>
          <button onClick={() => navigate('/shop')} className="btn-primary">Back to Shop</button>
        </div>
      </Layout>
    );
  }

  const images = product.images.length > 0 ? product.images : [PLACEHOLDER_IMAGE];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    if (!product.inStock) { toast.error('This product is out of stock'); return; }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: images[0],
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <button
          onClick={() => navigate('/shop')}
          className="font-heading text-xs font-bold uppercase tracking-wider mb-8 inline-block hover:text-accent transition-colors border-b-2 border-foreground pb-1"
        >
          ← Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Main image with zoom */}
            <div
              ref={imgRef}
              className="border-2 border-foreground mb-4 aspect-[4/5] overflow-hidden bg-secondary relative cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                  style={isZoomed ? {
                    transform: 'scale(2)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: 'transform-origin 0.1s ease',
                  } : {
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </AnimatePresence>
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <ZoomIn size={16} className="text-foreground" />
              </div>
              {product.badge && (
                <span className={`absolute top-3 left-3 font-heading text-[10px] font-bold uppercase px-3 py-1 z-10 ${
                  product.badge === 'new' ? 'bg-accent text-accent-foreground' :
                  product.badge === 'bestseller' ? 'bg-primary text-primary-foreground' :
                  'bg-destructive text-destructive-foreground'
                }`}>
                  {product.badge === 'new' ? 'NEW' : product.badge === 'bestseller' ? 'BEST SELLER' : 'LIMITED'}
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border-2 aspect-square overflow-hidden transition-all duration-200 ${
                      selectedImage === i ? 'border-accent ring-2 ring-accent/30' : 'border-foreground/30 opacity-60 hover:opacity-100 hover:border-foreground'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-20 lg:self-start glass-card p-6"
          >
            <h1 className="text-2xl font-extrabold mb-2">{product.name}</h1>
            <p className="font-heading text-3xl font-extrabold text-accent mb-2">{formatPrice(product.price)}</p>

            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 font-heading text-xs font-bold text-green-600 bg-green-100 px-3 py-1">
                  ● In Stock ({product.stockQty} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-heading text-xs font-bold text-destructive bg-destructive/10 px-3 py-1">
                  ● Out of Stock
                </span>
              )}
            </div>

            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-8">{product.description}</p>

            {/* Color */}
            <div className="mb-6">
              <h3 className="font-heading text-xs font-bold uppercase mb-3">COLOR</h3>
              <div className="flex flex-col gap-1">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-left px-3 py-2 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-foreground bg-primary text-primary-foreground'
                        : 'border-transparent hover:border-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <h3 className="font-heading text-xs font-bold uppercase mb-3">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-foreground bg-primary text-primary-foreground'
                        : 'border-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-heading text-xs font-bold uppercase mb-3">QUANTITY</h3>
              <div className="flex items-center border-2 border-foreground inline-flex">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 font-heading font-bold hover:bg-accent transition-colors">−</button>
                <span className="px-6 py-3 font-heading font-bold border-x-2 border-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 font-heading font-bold hover:bg-accent transition-colors">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-accent w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.inStock ? `ADD TO CART — ${formatPrice(product.price * quantity)}` : 'OUT OF STOCK'}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t-2 border-foreground/20">
              {[
                { icon: ShieldCheck, label: 'Quality Assured' },
                { icon: Truck, label: 'Fast Shipping' },
                { icon: RefreshCw, label: 'Easy Returns' },
              ].map(b => (
                <div key={b.label} className="text-center">
                  <b.icon size={16} className="mx-auto text-accent mb-1" />
                  <p className="font-body text-[9px] text-muted-foreground uppercase">{b.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
