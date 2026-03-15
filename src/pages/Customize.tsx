import { Layout } from '@/components/Layout';
import { useState, useRef, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { SIZES, MUG_SIZES, FRAME_SIZES, KEYCHAIN_SIZES, COLORS, formatPrice } from '@/data/products';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { RotateCw, Move, Maximize2 } from 'lucide-react';

const FONTS = ['Arial', 'Impact', 'Courier New', 'Georgia', 'Verdana'];
const PRODUCT_TYPES = [
  { id: 'tshirt', label: 'T-Shirt', basePrice: 349 },
  { id: 'mug', label: 'Coffee Mug', basePrice: 249 },
  { id: 'frame', label: 'Wooden Frame', basePrice: 399 },
  { id: 'keychain', label: 'Keychain', basePrice: 149 },
];

const Customize = () => {
  const { addItem } = useCart();
  const [productType, setProductType] = useState('tshirt');
  const [selectedColor, setSelectedColor] = useState('WHITE');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#1A1A1A');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [logoPos, setLogoPos] = useState({ x: 50, y: 50 });
  const [logoScale, setLogoScale] = useState(1);
  const [logoRotation, setLogoRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentProduct = PRODUCT_TYPES.find(p => p.id === productType)!;
  const totalPrice = currentProduct.basePrice * quantity;

  const getSizes = () => {
    switch (productType) {
      case 'mug': return MUG_SIZES;
      case 'frame': return FRAME_SIZES;
      case 'keychain': return KEYCHAIN_SIZES;
      default: return SIZES;
    }
  };

  const getColors = () => {
    switch (productType) {
      case 'mug': return ['WHITE', 'BLACK'];
      case 'frame': return ['Natural Wood', 'Dark Walnut', 'White'];
      case 'keychain': return ['Natural Wood', 'Dark Walnut', 'Bamboo'];
      default: return COLORS;
    }
  };

  const shirtBg = selectedColor === 'BLACK' ? '#1A1A1A'
    : selectedColor === 'WHITE' ? '#F5F5F5'
    : selectedColor === 'HEATHER GREY' ? '#B0B0B0'
    : selectedColor === 'NAVY' ? '#1B2A4A'
    : selectedColor === 'OLIVE' ? '#556B2F'
    : selectedColor === 'SAND' ? '#D2B48C'
    : selectedColor === 'Natural Wood' ? '#C4A882'
    : selectedColor === 'Dark Walnut' ? '#5C4033'
    : selectedColor === 'Bamboo' ? '#D4C9A8'
    : '#F5F5F5';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoFile(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLogoPos({ x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!customText && !logoFile) { toast.error('Add text or upload a logo'); return; }
    addItem({
      productId: `custom-${productType}-${Date.now()}`,
      name: `Custom ${currentProduct.label}`,
      price: currentProduct.basePrice,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      customText: customText || undefined,
      customLogoUrl: logoFile || undefined,
    });
    toast.success(`Custom ${currentProduct.label} added to cart!`);
  };

  const renderMockup = () => {
    switch (productType) {
      case 'mug':
        return (
          <svg viewBox="0 0 200 160" className="w-3/4 h-3/4 opacity-15" fill="currentColor">
            <rect x="30" y="30" width="100" height="100" rx="8" />
            <path d="M130,50 Q170,50 170,80 Q170,110 130,110" fill="none" stroke="currentColor" strokeWidth="6" />
          </svg>
        );
      case 'frame':
        return (
          <svg viewBox="0 0 200 240" className="w-3/4 h-3/4 opacity-15" fill="none" stroke="currentColor" strokeWidth="4">
            <rect x="20" y="20" width="160" height="200" rx="4" />
            <rect x="35" y="35" width="130" height="170" rx="2" />
          </svg>
        );
      case 'keychain':
        return (
          <svg viewBox="0 0 100 160" className="w-1/2 h-1/2 opacity-15" fill="currentColor">
            <circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="25" y="45" width="50" height="80" rx="8" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 200 240" className="w-3/4 h-3/4 opacity-15" fill="currentColor">
            <path d="M60,10 L30,40 L10,30 L10,70 L50,70 L50,230 L150,230 L150,70 L190,70 L190,30 L170,40 L140,10 L120,25 L80,25 Z" />
          </svg>
        );
    }
  };

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Design Studio</p>
          <h1 className="text-4xl font-extrabold mb-2">CUSTOMIZE YOUR PRODUCT</h1>
          <p className="font-body text-muted-foreground mb-8">Design it. We print it. You own it.</p>
        </motion.div>

        {/* Product Type Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PRODUCT_TYPES.map(pt => (
            <button
              key={pt.id}
              onClick={() => { setProductType(pt.id); setSelectedColor('WHITE'); setSelectedSize(''); }}
              className={`px-5 py-3 text-xs font-heading font-bold uppercase border-2 transition-all duration-200 ${
                productType === pt.id
                  ? 'border-foreground bg-accent text-accent-foreground'
                  : 'border-foreground/30 hover:border-foreground'
              }`}
            >
              {pt.label} — {formatPrice(pt.basePrice)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Preview */}
          <div
            ref={previewRef}
            className="glass-card aspect-[3/4] relative overflow-hidden flex items-center justify-center cursor-crosshair select-none"
            style={{ backgroundColor: shirtBg }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {renderMockup()}
            </div>
            {customText && (
              <div
                className="absolute z-10 select-none pointer-events-none text-center px-4"
                style={{
                  top: `${logoPos.y - 10}%`, left: `${logoPos.x}%`,
                  transform: `translate(-50%, -50%) rotate(${logoRotation}deg)`,
                  fontFamily: selectedFont, color: textColor,
                  fontSize: `clamp(14px, ${2 + logoScale}vw, 36px)`, fontWeight: 'bold',
                }}
              >
                {customText}
              </div>
            )}
            {logoFile && (
              <img
                src={logoFile}
                alt="Custom logo"
                className="absolute z-10 object-contain cursor-grab active:cursor-grabbing"
                style={{
                  top: `${logoPos.y}%`, left: `${logoPos.x}%`,
                  transform: `translate(-50%, -50%) rotate(${logoRotation}deg) scale(${logoScale})`,
                  maxWidth: '40%', maxHeight: '30%',
                }}
                onMouseDown={handleMouseDown}
                draggable={false}
              />
            )}
            {!customText && !logoFile && (
              <p className="font-heading text-sm font-bold uppercase opacity-30 z-10">YOUR DESIGN HERE</p>
            )}

            {/* Drag hint */}
            {(logoFile || customText) && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/80 text-primary-foreground px-3 py-1 flex items-center gap-2 z-20">
                <Move size={12} />
                <span className="font-body text-[10px]">Drag to reposition</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="glass-card p-6">
            <h2 className="font-heading text-lg font-extrabold mb-6">DESIGN TOOLS</h2>

            {/* Custom Text */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">CUSTOM TEXT</label>
              <input type="text" value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Enter your text..."
                className="w-full border-2 border-foreground bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>

            {/* Font */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">FONT</label>
              <div className="flex flex-wrap gap-1">
                {FONTS.map(font => (
                  <button key={font} onClick={() => setSelectedFont(font)}
                    className={`px-3 py-2 text-xs font-bold border-2 transition-all duration-200 ${selectedFont === font ? 'border-foreground bg-primary text-primary-foreground' : 'border-foreground'}`}
                    style={{ fontFamily: font }}>{font}</button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">TEXT COLOR</label>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-12 h-12 border-2 border-foreground cursor-pointer" />
            </div>

            {/* Upload Logo */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">UPLOAD LOGO</label>
              <label className="btn-outline block text-center cursor-pointer text-xs py-2">
                {logoFile ? 'CHANGE LOGO' : 'CHOOSE FILE'}
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>

            {/* Logo Controls */}
            {(logoFile || customText) && (
              <div className="mb-5 p-4 border-2 border-foreground/20 bg-secondary/30">
                <label className="font-heading text-xs font-bold uppercase block mb-3">TRANSFORM</label>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Maximize2 size={12} />
                      <span className="font-body text-xs">Scale: {logoScale.toFixed(1)}x</span>
                    </div>
                    <input type="range" min="0.3" max="3" step="0.1" value={logoScale}
                      onChange={e => setLogoScale(parseFloat(e.target.value))}
                      className="w-full accent-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <RotateCw size={12} />
                      <span className="font-body text-xs">Rotation: {logoRotation}°</span>
                    </div>
                    <input type="range" min="-180" max="180" step="5" value={logoRotation}
                      onChange={e => setLogoRotation(parseInt(e.target.value))}
                      className="w-full accent-accent" />
                  </div>
                </div>
              </div>
            )}

            {/* Product Color */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">{currentProduct.label.toUpperCase()} COLOR</label>
              <div className="flex flex-col gap-1">
                {getColors().map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`text-left px-3 py-2 text-xs font-heading font-bold border-2 transition-all duration-200 ${selectedColor === color ? 'border-foreground bg-primary text-primary-foreground' : 'border-transparent hover:border-foreground'}`}>{color}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">SIZE</label>
              <div className="flex flex-wrap gap-2">
                {getSizes().map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 text-xs font-heading font-bold border-2 transition-all duration-200 ${selectedSize === size ? 'border-foreground bg-primary text-primary-foreground' : 'border-foreground hover:bg-accent'}`}>{size}</button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <label className="font-heading text-xs font-bold uppercase block mb-2">QUANTITY</label>
              <div className="flex items-center border-2 border-foreground inline-flex">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 font-heading font-bold hover:bg-accent transition-colors">−</button>
                <span className="px-6 py-3 font-heading font-bold border-x-2 border-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 font-heading font-bold hover:bg-accent transition-colors">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-accent w-full text-center">
              ADD TO CART — {formatPrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customize;
