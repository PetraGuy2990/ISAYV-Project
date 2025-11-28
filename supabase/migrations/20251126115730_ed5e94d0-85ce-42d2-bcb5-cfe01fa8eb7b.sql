-- Create brands table
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id),
  name TEXT NOT NULL,
  size TEXT,
  gtin TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create retailer_products table
CREATE TABLE public.retailer_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id),
  retailer TEXT NOT NULL,
  price NUMERIC,
  product_url TEXT,
  last_scraped TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (product_id, retailer)
);

-- Create full-text search indexes
CREATE INDEX idx_products_name_fts ON public.products USING gin(to_tsvector('english', name));
CREATE INDEX idx_brands_name_fts ON public.brands USING gin(to_tsvector('english', name));
CREATE INDEX idx_retailer_products_retailer ON public.retailer_products(retailer);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retailer_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Brands are viewable by everyone" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Retailer products are viewable by everyone" ON public.retailer_products FOR SELECT USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();