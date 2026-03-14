import { Layout } from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.images[0],
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
            <div className="border-2 border-foreground mb-4 aspect-[4/5] overflow-hidden bg-secondary">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`border-2 aspect-square overflow-hidden transition-all duration-200 ${
                    selectedImage === i ? 'border-accent' : 'border-foreground opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-20 lg:self-start border-2 border-foreground p-6"
          >
            <h1 className="text-2xl font-extrabold mb-2">{product.name}</h1>
            <p className="font-heading text-3xl font-extrabold text-accent mb-6">{formatPrice(product.price)}</p>
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

            <button onClick={handleAddToCart} className="btn-accent w-full text-center">
              ADD TO CART — {formatPrice(product.price * quantity)}
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
