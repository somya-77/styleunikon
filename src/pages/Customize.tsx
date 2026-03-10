import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { SIZES, COLORS } from '@/data/products';
import { toast } from 'sonner';

const FONTS = ['Arial', 'Impact', 'Courier New', 'Georgia', 'Verdana'];

const Customize = () => {
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState('WHITE');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#1A1A1A');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 40 });

  const basePrice = 50;
  const totalPrice = basePrice * quantity;

  const shirtBg = selectedColor === 'BLACK' ? '#1A1A1A'
    : selectedColor === 'WHITE' ? '#F5F5F5'
    : selectedColor === 'HEATHER GREY' ? '#B0B0B0'
    : selectedColor === 'NAVY' ? '#1B2A4A'
    : selectedColor === 'OLIVE' ? '#556B2F'
    : selectedColor === 'SAND' ? '#D2B48C'
    : '#F5F5F5';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoFile(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!customText && !logoFile) {
      toast.error('Add text or upload a logo');
      return;
    }
    addItem({
      productId: 'custom-tee-' + Date.now(),
      name: 'Custom T-Shirt',
      price: basePrice,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      customText: customText || undefined,
      customLogoUrl: logoFile || undefined,
    });
    toast.success('Custom tee added to cart!');
  };

  return (
    <Layout>
      <div className="px-8 lg:px-16 py-12">
        <h1 className="text-4xl font-extrabold mb-2">CUSTOMIZE YOUR TEE</h1>
        <p className="font-body text-muted-foreground mb-8">Design it. We print it. You own it.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Preview */}
          <div className="border-2 border-foreground aspect-[3/4] relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: shirtBg }}>
            {/* T-shirt shape hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 200 240" className="w-3/4 h-3/4" fill="currentColor">
                <path d="M60,10 L30,40 L10,30 L10,70 L50,70 L50,230 L150,230 L150,70 L190,70 L190,30 L170,40 L140,10 L120,25 L80,25 Z" />
              </svg>
            </div>

            {/* Custom text */}
            {customText && (
              <div
                className="absolute z-10 select-none pointer-events-none text-center px-4"
                style={{
                  top: `${logoPosition.y}%`,
                  left: `${logoPosition.x}%`,
                  transform: 'translate(-50%, -50%)',
                  fontFamily: selectedFont,
                  color: textColor,
                  fontSize: 'clamp(16px, 3vw, 32px)',
                  fontWeight: 'bold',
                }}
              >
                {customText}
              </div>
            )}

            {/* Logo */}
            {logoFile && (
              <img
                src={logoFile}
                alt="Custom logo"
                className="absolute z-10 max-w-[40%] max-h-[30%] object-contain"
                style={{
                  top: `${logoPosition.y + 15}%`,
                  left: `${logoPosition.x}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}

            {!customText && !logoFile && (
              <p className="font-heading text-sm font-bold uppercase opacity-30 z-10">YOUR DESIGN HERE</p>
            )}
          </div>

          {/* Controls */}
          <div className="border-2 border-foreground p-6">
            <h2 className="font-heading text-lg font-extrabold mb-6">DESIGN TOOLS</h2>

            {/* Text */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">CUSTOM TEXT</label>
              <input
                type="text"
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                placeholder="Enter your text..."
                className="w-full border-2 border-foreground bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Font */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">FONT</label>
              <div className="flex flex-wrap gap-1">
                {FONTS.map(font => (
                  <button
                    key={font}
                    onClick={() => setSelectedFont(font)}
                    className={`px-3 py-2 text-xs font-bold border-2 transition-all duration-200 ${
                      selectedFont === font ? 'border-foreground bg-primary text-primary-foreground' : 'border-foreground'
                    }`}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">TEXT COLOR</label>
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-12 h-12 border-2 border-foreground cursor-pointer"
              />
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">UPLOAD LOGO</label>
              <label className="btn-outline block text-center cursor-pointer text-xs py-2">
                {logoFile ? 'CHANGE LOGO' : 'CHOOSE FILE'}
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>

            {/* T-shirt Color */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">T-SHIRT COLOR</label>
              <div className="flex flex-col gap-1">
                {COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-left px-3 py-2 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                      selectedColor === color ? 'border-foreground bg-primary text-primary-foreground' : 'border-transparent hover:border-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">SIZE</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 text-xs font-heading font-bold border-2 transition-all duration-200 ${
                      selectedSize === size ? 'border-foreground bg-primary text-primary-foreground' : 'border-foreground hover:bg-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="font-heading text-xs font-bold uppercase block mb-2">QUANTITY</label>
              <div className="flex items-center border-2 border-foreground inline-flex">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 font-heading font-bold hover:bg-accent transition-colors">−</button>
                <span className="px-6 py-3 font-heading font-bold border-x-2 border-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 font-heading font-bold hover:bg-accent transition-colors">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-accent w-full text-center">
              ADD TO CART — ${totalPrice}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customize;
