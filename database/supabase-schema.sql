-- ============================================
-- SUPABASE DATABASE SCHEMA
-- Islamic Shop E-commerce
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: categories
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: products
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category_id UUID REFERENCES categories(id),
  image_url TEXT,
  images TEXT[],
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT CHECK (badge IN ('new', 'sale', 'popular')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: orders
-- ============================================
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: order_items
-- ============================================
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: reviews
-- ============================================
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: profiles (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Products: Public read, Admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
TO public 
USING (is_active = true);

CREATE POLICY "Admins can insert products" 
ON products FOR INSERT 
TO authenticated 
WITH CHECK (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can update products" 
ON products FOR UPDATE 
TO authenticated 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admins can delete products" 
ON products FOR DELETE 
TO authenticated 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Categories: Public read, Admin write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Admins can manage categories" 
ON categories FOR ALL 
TO authenticated 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Orders: Users see their own orders, Admins see all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT 
TO authenticated 
USING (user_id = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can create their own orders" 
ON orders FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Profiles: Users can view and update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by owner" 
ON profiles FOR SELECT 
TO authenticated 
USING (id = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
TO authenticated 
USING (id = auth.uid());

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at on products
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('Tapis de Prière', 'tapis-de-priere', 'Tapis de prière de qualité supérieure'),
  ('Livres', 'livres', 'Coran et livres islamiques'),
  ('Vêtements', 'vetements', 'Vêtements islamiques pour hommes et femmes'),
  ('Parfums', 'parfums', 'Parfums orientaux authentiques'),
  ('Accessoires', 'accessoires', 'Accessoires pour la pratique religieuse'),
  ('Décoration', 'decoration', 'Décoration islamique pour la maison');

-- Insert products
INSERT INTO products (name, slug, price, original_price, category_id, image_url, stock, rating, reviews_count, badge, description) VALUES
  (
    'Tapis de Prière Premium',
    'tapis-priere-premium',
    29.99,
    49.99,
    (SELECT id FROM categories WHERE slug = 'tapis-de-priere'),
    '🕌',
    50,
    4.9,
    234,
    'sale',
    'Tapis de prière de haute qualité, doux et confortable. Parfait pour vos prières quotidiennes.'
  ),
  (
    'Coran avec Traduction Française',
    'coran-traduction',
    24.99,
    NULL,
    (SELECT id FROM categories WHERE slug = 'livres'),
    '📖',
    100,
    5.0,
    189,
    'popular',
    'Le Saint Coran avec traduction en français. Édition de luxe avec couverture rigide.'
  ),
  (
    'Tasbih Électronique',
    'tasbih-electronique',
    12.99,
    NULL,
    (SELECT id FROM categories WHERE slug = 'accessoires'),
    '📿',
    75,
    4.7,
    156,
    'new',
    'Compteur de dhikr électronique moderne avec écran LED. Facile à utiliser.'
  ),
  (
    'Calligraphie Islamique Encadrée',
    'calligraphie-islamique',
    39.99,
    NULL,
    (SELECT id FROM categories WHERE slug = 'decoration'),
    '🎨',
    30,
    4.8,
    98,
    NULL,
    'Magnifique calligraphie arabe encadrée. Décoration murale élégante.'
  ),
  (
    'Parfum Musc Blanc',
    'parfum-musc-blanc',
    19.99,
    29.99,
    (SELECT id FROM categories WHERE slug = 'parfums'),
    '🌸',
    60,
    4.9,
    267,
    'sale',
    'Parfum au musc blanc authentique. Senteur douce et durable.'
  ),
  (
    'Abaya Élégante Noire',
    'abaya-elegante',
    59.99,
    NULL,
    (SELECT id FROM categories WHERE slug = 'vetements'),
    '👗',
    40,
    4.6,
    145,
    NULL,
    'Abaya élégante en tissu de qualité. Coupe moderne et confortable.'
  );
