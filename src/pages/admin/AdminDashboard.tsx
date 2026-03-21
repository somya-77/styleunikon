import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice } from '@/data/products';
import { toast } from 'sonner';
import {
  Package, ShoppingCart, Users, FileText,
  LogOut, RefreshCw, Eye, Plus, Trash2, Save, Upload, X, Image as ImageIcon, AlertTriangle
} from 'lucide-react';

type Tab = 'overview' | 'orders' | 'customers' | 'bulk' | 'products';
const STATUS_OPTIONS = ['pending', 'processing', 'printing', 'shipped', 'out_for_delivery', 'delivered'];
const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending', processing: 'Processing', printing: 'Printing',
  shipped: 'Shipped', out_for_delivery: 'Out for Delivery', delivered: 'Delivered',
};

const AdminDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<any[]>([]);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [newProduct, setNewProduct] = useState({
    slug: '', name: '', description: '', price: 299, category: 'tshirts',
    stock_qty: 50, in_stock: true, images: [] as string[],
  });

  useEffect(() => {
    const checkAdmin = async () => {
      if (authLoading) return;
      if (!user) { navigate('/admin/login'); return; }
      const { data } = await supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin');
      if (data && data.length > 0) { setIsAdmin(true); } else { navigate('/admin/login'); toast.error('Access denied'); }
      setChecking(false);
    };
    checkAdmin();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    setLoadingData(true);
    const [ordersRes, customersRes, bulkRes, productsRes] = await Promise.all([
      supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('bulk_inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
    ]);
    setOrders(ordersRes.data || []);
    setCustomers(customersRes.data || []);
    setBulkInquiries(bulkRes.data || []);
    setDbProducts(productsRes.data || []);
    setLoadingData(false);
  };

  useEffect(() => { if (isAdmin) fetchData(); }, [isAdmin]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) toast.error('Failed to update status');
    else { toast.success(`Order updated to ${STATUS_LABELS[status]}`); fetchData(); }
  };

  const updateBulkStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('bulk_inquiries').update({ status }).eq('id', id);
    if (error) toast.error('Failed to update');
    else { toast.success('Updated'); fetchData(); }
  };

  const uploadImages = async (files: FileList): Promise<string[]> => {
    setUploadingImages(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('product-images').upload(path, file);
      if (error) { toast.error(`Failed to upload ${file.name}`); continue; }
      const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
      urls.push(urlData.publicUrl);
    }
    setUploadingImages(false);
    return urls;
  };

  const handleNewProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const urls = await uploadImages(e.target.files);
    setNewProduct(prev => ({ ...prev, images: [...prev.images, ...urls] }));
  };

  const handleProductImageUpload = async (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const product = dbProducts.find(p => p.id === productId);
    if (!product) return;
    const urls = await uploadImages(e.target.files);
    const newImages = [...(product.images || []), ...urls];
    const { error } = await supabase.from('products').update({ images: newImages } as any).eq('id', productId);
    if (error) toast.error('Failed to update images');
    else { toast.success('Images uploaded!'); fetchData(); }
  };

  const handleDeleteImage = async (productId: string, imageIndex: number) => {
    const product = dbProducts.find(p => p.id === productId);
    if (!product) return;
    const newImages = [...(product.images || [])];
    newImages.splice(imageIndex, 1);
    const { error } = await supabase.from('products').update({ images: newImages } as any).eq('id', productId);
    if (error) toast.error('Failed to remove image');
    else { toast.success('Image removed'); fetchData(); }
  };

  const handleAddProduct = async () => {
    if (!newProduct.slug || !newProduct.name) { toast.error('Name and slug required'); return; }
    const { error } = await supabase.from('products').insert({
      ...newProduct,
      colors: ['WHITE', 'BLACK'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      images: newProduct.images.filter(Boolean),
    } as any);
    if (error) { toast.error('Failed to add product: ' + error.message); return; }
    toast.success('Product added!');
    setShowAddProduct(false);
    setNewProduct({ slug: '', name: '', description: '', price: 299, category: 'tshirts', stock_qty: 50, in_stock: true, images: [] });
    fetchData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else { toast.success('Product deleted'); fetchData(); }
  };

  const handleUpdateStock = async (id: string, stockQty: number) => {
    const { error } = await supabase.from('products').update({
      stock_qty: stockQty,
      in_stock: stockQty > 0,
    } as any).eq('id', id);
    if (error) toast.error('Failed to update');
    else { toast.success('Stock updated'); fetchData(); }
  };

  const handleSignOut = async () => { await signOut(); navigate('/admin/login'); };

  if (checking || authLoading) {
    return (<div className="min-h-screen bg-background flex items-center justify-center"><p className="font-heading text-lg font-bold animate-pulse">VERIFYING ACCESS...</p></div>);
  }
  if (!isAdmin) return null;

  const stats = [
    { label: 'TOTAL ORDERS', value: orders.length, icon: ShoppingCart },
    { label: 'CUSTOMERS', value: customers.length, icon: Users },
    { label: 'PRODUCTS', value: dbProducts.length, icon: Package },
    { label: 'REVENUE', value: formatPrice(orders.reduce((s, o) => s + Number(o.total_price), 0)), icon: FileText },
  ];

  const TABS: { key: Tab; label: string; icon: any }[] = [
    { key: 'overview', label: 'OVERVIEW', icon: Eye },
    { key: 'orders', label: 'ORDERS', icon: ShoppingCart },
    { key: 'products', label: 'PRODUCTS', icon: Package },
    { key: 'customers', label: 'CUSTOMERS', icon: Users },
    { key: 'bulk', label: 'BULK', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-foreground bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-heading text-lg font-extrabold">
            CUSTOMIZE<span className="text-accent"> T-SHIRT</span>
          </Link>
          <span className="font-heading text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2 py-1">ADMIN</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className="p-2 hover:bg-primary-foreground/10 transition-colors" title="Refresh">
            <RefreshCw size={16} className={loadingData ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleSignOut} className="flex items-center gap-2 px-3 py-2 border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors font-heading text-[10px] font-bold uppercase">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-56 border-r-2 border-foreground min-h-[calc(100vh-60px)] p-4 hidden md:block">
          <nav className="flex flex-col gap-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-3 px-4 py-3 font-heading text-xs font-bold uppercase text-left transition-all duration-200 border-2 ${
                  tab === t.key ? 'border-foreground bg-primary text-primary-foreground' : 'border-transparent hover:border-foreground'
                }`}>
                <t.icon size={14} />{t.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="md:hidden flex border-b-2 border-foreground w-full overflow-x-auto">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 font-heading text-[10px] font-bold uppercase whitespace-nowrap border-b-2 ${
                tab === t.key ? 'border-accent text-accent' : 'border-transparent'
              }`}>
              <t.icon size={12} />{t.label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6 lg:p-8">
          {/* ===== OVERVIEW ===== */}
          {tab === 'overview' && (
            <>
              <h1 className="text-3xl font-extrabold mb-6">DASHBOARD</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                  <div key={s.label} className="glass-card p-5">
                    <s.icon size={18} className="text-muted-foreground mb-2" />
                    <p className="font-heading text-2xl font-extrabold">{s.value}</p>
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-extrabold mb-4">LOW STOCK ALERTS</h2>
              {dbProducts.filter(p => p.stock_qty <= 20).length === 0 ? (
                <p className="font-body text-sm text-muted-foreground mb-8">All products are well stocked ✓</p>
              ) : (
                <div className="border-2 border-orange-300 bg-orange-50/50 p-4 mb-8">
                  {dbProducts.filter(p => p.stock_qty <= 20).map(p => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-orange-200 last:border-0">
                      <span className="font-heading text-xs font-bold">{p.name}</span>
                      <span className={`font-heading text-xs font-bold ${p.stock_qty <= 0 ? 'text-destructive' : 'text-orange-600'}`}>
                        {p.stock_qty <= 0 ? 'OUT OF STOCK' : `${p.stock_qty} left`}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <h2 className="text-xl font-extrabold mb-4">RECENT ORDERS</h2>
              <div className="border-2 border-foreground overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-foreground bg-secondary">
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">ID</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Customer</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Total</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Status</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-muted-foreground">No orders yet</td></tr>
                    ) : orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b border-foreground/20 hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3 font-body text-xs font-mono">{order.id.slice(0, 8)}</td>
                        <td className="px-4 py-3 font-body text-xs">{order.customer_name}</td>
                        <td className="px-4 py-3 font-heading text-xs font-bold">{formatPrice(order.total_price)}</td>
                        <td className="px-4 py-3">
                          <span className={`font-heading text-[10px] font-bold uppercase px-2 py-1 ${
                            order.status === 'delivered' ? 'bg-accent text-accent-foreground' :
                            order.status === 'shipped' ? 'bg-primary text-primary-foreground' :
                            'bg-muted text-muted-foreground'
                          }`}>{STATUS_LABELS[order.status] || order.status}</span>
                        </td>
                        <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ===== ORDERS ===== */}
          {tab === 'orders' && (
            <>
              <h1 className="text-3xl font-extrabold mb-6">ALL ORDERS</h1>
              <div className="border-2 border-foreground overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-foreground bg-secondary">
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">ID</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Customer</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Email</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Phone</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Items</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Total</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Status</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr><td colSpan={8} className="px-4 py-8 text-center font-body text-sm text-muted-foreground">No orders yet</td></tr>
                    ) : orders.map(order => (
                      <tr key={order.id} className="border-b border-foreground/20 hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3 font-body text-xs font-mono">{order.id.slice(0, 8)}</td>
                        <td className="px-4 py-3 font-body text-xs font-semibold">{order.customer_name}</td>
                        <td className="px-4 py-3 font-body text-xs">{order.customer_email}</td>
                        <td className="px-4 py-3 font-body text-xs">{order.phone || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            {order.order_items?.map((item: any) => (
                              <span key={item.id} className="font-body text-[10px]">
                                {item.product_name} ({item.color}/{item.size}) ×{item.quantity}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-heading text-xs font-bold">{formatPrice(order.total_price)}</td>
                        <td className="px-4 py-3">
                          <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}
                            className="border-2 border-foreground bg-background px-2 py-1 font-heading text-[10px] font-bold uppercase focus:outline-none focus:border-accent">
                            {STATUS_OPTIONS.map(s => (<option key={s} value={s}>{STATUS_LABELS[s]}</option>))}
                          </select>
                        </td>
                        <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ===== PRODUCTS ===== */}
          {tab === 'products' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-extrabold">PRODUCTS</h1>
                <button onClick={() => setShowAddProduct(!showAddProduct)} className="btn-accent flex items-center gap-2 text-xs py-2 px-4">
                  <Plus size={14} /> ADD PRODUCT
                </button>
              </div>

              {showAddProduct && (
                <div className="glass-card p-6 mb-6">
                  <h3 className="font-heading text-sm font-bold mb-4">NEW PRODUCT</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">SLUG</label>
                      <input value={newProduct.slug} onChange={e => setNewProduct({...newProduct, slug: e.target.value})}
                        className="w-full border-2 border-foreground bg-background px-3 py-2 text-sm" placeholder="my-product" />
                    </div>
                    <div>
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">NAME</label>
                      <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full border-2 border-foreground bg-background px-3 py-2 text-sm" placeholder="Product Name" />
                    </div>
                    <div>
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">PRICE (₹)</label>
                      <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                        className="w-full border-2 border-foreground bg-background px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">CATEGORY</label>
                      <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full border-2 border-foreground bg-background px-3 py-2 text-sm">
                        <option value="tshirts">T-Shirts</option>
                        <option value="mugs">Mugs</option>
                        <option value="frames">Frames</option>
                        <option value="keychains">Keychains</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">STOCK QTY</label>
                      <input type="number" value={newProduct.stock_qty} onChange={e => setNewProduct({...newProduct, stock_qty: parseInt(e.target.value) || 0})}
                        className="w-full border-2 border-foreground bg-background px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">PRODUCT IMAGES</label>
                      <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleNewProductImageUpload} className="hidden" />
                      <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImages}
                        className="w-full border-2 border-dashed border-foreground/50 bg-background px-3 py-4 text-sm flex items-center justify-center gap-2 hover:border-accent transition-colors disabled:opacity-50">
                        <Upload size={16} />
                        {uploadingImages ? 'Uploading...' : 'Click to upload images'}
                      </button>
                      {newProduct.images.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {newProduct.images.map((img, i) => (
                            <div key={i} className="relative w-16 h-16 border border-foreground group">
                              <img src={img} className="w-full h-full object-cover" alt="" />
                              <button onClick={() => setNewProduct(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-heading text-[10px] font-bold uppercase block mb-1">DESCRIPTION</label>
                      <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full border-2 border-foreground bg-background px-3 py-2 text-sm h-20" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleAddProduct} className="btn-accent text-xs py-2 px-4 flex items-center gap-2">
                      <Save size={14} /> SAVE
                    </button>
                    <button onClick={() => setShowAddProduct(false)} className="btn-outline text-xs py-2 px-4">CANCEL</button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {dbProducts.length === 0 ? (
                  <div className="border-2 border-foreground px-4 py-12 text-center">
                    <ImageIcon size={32} className="mx-auto text-muted-foreground mb-3" />
                    <p className="font-body text-sm text-muted-foreground">No products in database. Add some above!</p>
                  </div>
                ) : dbProducts.map(p => (
                  <div key={p.id} className="glass-card p-4">
                    <div className="flex items-start gap-4">
                      {/* Product images grid */}
                      <div className="flex gap-2 flex-wrap min-w-[120px]">
                        {(p.images && p.images.length > 0) ? p.images.map((img: string, i: number) => (
                          <div key={i} className="relative w-14 h-14 border border-foreground group">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <button onClick={() => handleDeleteImage(p.id, i)}
                              className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Remove image">
                              <X size={8} />
                            </button>
                          </div>
                        )) : (
                          <div className="w-14 h-14 border border-dashed border-foreground/30 flex items-center justify-center bg-muted">
                            <ImageIcon size={16} className="text-muted-foreground" />
                          </div>
                        )}
                        {/* Add more images button */}
                        <input type="file" ref={editingProduct === p.id ? editFileInputRef : undefined} multiple accept="image/*"
                          onChange={(e) => handleProductImageUpload(p.id, e)} className="hidden" id={`file-${p.id}`} />
                        <button onClick={() => { setEditingProduct(p.id); setTimeout(() => document.getElementById(`file-${p.id}`)?.click(), 0); }}
                          disabled={uploadingImages}
                          className="w-14 h-14 border border-dashed border-foreground/50 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                          title="Upload more images">
                          <Upload size={14} />
                        </button>
                      </div>

                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-heading text-sm font-bold truncate">{p.name}</h4>
                          <span className="font-heading text-[10px] font-bold uppercase px-2 py-0.5 bg-secondary text-muted-foreground">{p.category}</span>
                        </div>
                        <p className="font-body text-xs text-muted-foreground truncate">{p.slug}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="font-heading text-sm font-extrabold text-accent">{formatPrice(p.price)}</span>
                          <div className="flex items-center gap-1">
                            <span className="font-heading text-[10px] font-bold uppercase text-muted-foreground">Stock:</span>
                            <input type="number" value={p.stock_qty} className="w-16 border-2 border-foreground bg-background px-2 py-1 text-xs"
                              onChange={e => handleUpdateStock(p.id, parseInt(e.target.value) || 0)} />
                          </div>
                          {p.stock_qty <= 0 ? (
                            <span className="font-heading text-[10px] font-bold uppercase px-2 py-1 bg-destructive/20 text-destructive">Out of Stock</span>
                          ) : p.stock_qty <= 20 ? (
                            <span className="font-heading text-[10px] font-bold uppercase px-2 py-1 bg-orange-100 text-orange-600 flex items-center gap-1">
                              <AlertTriangle size={10} /> Low Stock
                            </span>
                          ) : (
                            <span className="font-heading text-[10px] font-bold uppercase px-2 py-1 bg-green-100 text-green-600">In Stock</span>
                          )}
                        </div>
                      </div>

                      {/* Delete */}
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-2 hover:text-destructive transition-colors" title="Delete product">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===== CUSTOMERS ===== */}
          {tab === 'customers' && (
            <>
              <h1 className="text-3xl font-extrabold mb-6">CUSTOMERS</h1>
              <div className="border-2 border-foreground overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-foreground bg-secondary">
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Name</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Phone</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Address</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">City</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">State</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Pin Code</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length === 0 ? (
                      <tr><td colSpan={7} className="px-4 py-8 text-center font-body text-sm text-muted-foreground">No customers yet</td></tr>
                    ) : customers.map(c => (
                      <tr key={c.id} className="border-b border-foreground/20 hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3 font-body text-xs font-semibold">{c.full_name || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs">{c.phone || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs">{c.address || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs">{c.city || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs">{c.state || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs">{c.zip_code || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ===== BULK ===== */}
          {tab === 'bulk' && (
            <>
              <h1 className="text-3xl font-extrabold mb-6">BULK INQUIRIES</h1>
              <div className="border-2 border-foreground overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-foreground bg-secondary">
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Company</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Contact</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Email</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Qty</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Instructions</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Status</th>
                      <th className="text-left px-4 py-3 font-heading text-[10px] font-bold uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkInquiries.length === 0 ? (
                      <tr><td colSpan={7} className="px-4 py-8 text-center font-body text-sm text-muted-foreground">No inquiries yet</td></tr>
                    ) : bulkInquiries.map(b => (
                      <tr key={b.id} className="border-b border-foreground/20 hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3 font-body text-xs font-semibold">{b.company_name}</td>
                        <td className="px-4 py-3 font-body text-xs">{b.contact_person || '—'}</td>
                        <td className="px-4 py-3 font-body text-xs">{b.email}</td>
                        <td className="px-4 py-3 font-heading text-xs font-bold">{b.quantity}</td>
                        <td className="px-4 py-3 font-body text-xs max-w-[200px] truncate">{b.instructions || '—'}</td>
                        <td className="px-4 py-3">
                          <select value={b.status} onChange={e => updateBulkStatus(b.id, e.target.value)}
                            className="border-2 border-foreground bg-background px-2 py-1 font-heading text-[10px] font-bold uppercase focus:outline-none focus:border-accent">
                            <option value="new">NEW</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="quoted">QUOTED</option>
                            <option value="completed">COMPLETED</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(b.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
