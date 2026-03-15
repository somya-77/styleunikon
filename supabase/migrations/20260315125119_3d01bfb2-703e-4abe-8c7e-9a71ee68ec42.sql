
-- Products table for admin-managed inventory
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'tshirts',
  colors text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  stock_qty integer NOT NULL DEFAULT 50,
  in_stock boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add state column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state text;

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
CREATE POLICY "Anyone can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admins can upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

-- Saved designs table
CREATE TABLE public.saved_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type text NOT NULL DEFAULT 'tshirt',
  design_data jsonb NOT NULL DEFAULT '{}',
  preview_url text,
  name text NOT NULL DEFAULT 'Untitled Design',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own designs" ON public.saved_designs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own designs" ON public.saved_designs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own designs" ON public.saved_designs FOR DELETE TO authenticated USING (auth.uid() = user_id);
