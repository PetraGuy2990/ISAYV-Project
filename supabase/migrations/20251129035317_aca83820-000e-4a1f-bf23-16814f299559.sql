-- Add sample products so search works without scraping

-- Insert sample brands
INSERT INTO public.brands (name) VALUES
  ('Coca-Cola'),
  ('Pepsi'),
  ('Kroger'),
  ('Great Value'),
  ('Kirkland Signature'),
  ('Dairy Pure'),
  ('Land O Lakes'),
  ('Frito-Lay')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, brand_id, size, image_url)
SELECT 
  'Coca-Cola Classic Soda', 
  (SELECT id FROM public.brands WHERE name = 'Coca-Cola'),
  '12 oz, 12 pack',
  'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Coca-Cola Classic Soda');

INSERT INTO public.products (name, brand_id, size, image_url)
SELECT 
  'Pepsi Cola Soda', 
  (SELECT id FROM public.brands WHERE name = 'Pepsi'),
  '12 oz, 12 pack',
  'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Pepsi Cola Soda');

INSERT INTO public.products (name, brand_id, size, image_url)
SELECT 
  'Whole Milk', 
  (SELECT id FROM public.brands WHERE name = 'Dairy Pure'),
  '1 Gallon',
  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Whole Milk');

INSERT INTO public.products (name, brand_id, size, image_url)
SELECT 
  'Great Value Whole Milk', 
  (SELECT id FROM public.brands WHERE name = 'Great Value'),
  '1 Gallon',
  'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Great Value Whole Milk');

INSERT INTO public.products (name, brand_id, size, image_url)
SELECT 
  'Lays Classic Potato Chips', 
  (SELECT id FROM public.brands WHERE name = 'Frito-Lay'),
  '10 oz',
  'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Lays Classic Potato Chips');

INSERT INTO public.products (name, brand_id, size, image_url)
SELECT 
  'Butter Salted', 
  (SELECT id FROM public.brands WHERE name = 'Land O Lakes'),
  '1 lb',
  'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Butter Salted');

-- Add retailer products with prices
INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Coca-Cola Classic Soda'),
  'kroger',
  5.99,
  'https://www.kroger.com/p/coca-cola-classic-soda'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Coca-Cola Classic Soda')
  AND retailer = 'kroger'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Coca-Cola Classic Soda'),
  'walmart',
  5.48,
  'https://www.walmart.com/ip/coca-cola'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Coca-Cola Classic Soda')
  AND retailer = 'walmart'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Coca-Cola Classic Soda'),
  'costco',
  4.99,
  'https://www.costco.com/coca-cola'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Coca-Cola Classic Soda')
  AND retailer = 'costco'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Pepsi Cola Soda'),
  'kroger',
  5.49,
  'https://www.kroger.com/p/pepsi-cola'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Pepsi Cola Soda')
  AND retailer = 'kroger'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Pepsi Cola Soda'),
  'walmart',
  5.28,
  'https://www.walmart.com/ip/pepsi'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Pepsi Cola Soda')
  AND retailer = 'walmart'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Whole Milk'),
  'kroger',
  3.99,
  'https://www.kroger.com/p/dairy-pure-whole-milk'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Whole Milk')
  AND retailer = 'kroger'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Whole Milk'),
  'walmart',
  3.48,
  'https://www.walmart.com/ip/milk'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Whole Milk')
  AND retailer = 'walmart'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Great Value Whole Milk'),
  'walmart',
  2.98,
  'https://www.walmart.com/ip/great-value-milk'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Great Value Whole Milk')
  AND retailer = 'walmart'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Lays Classic Potato Chips'),
  'kroger',
  3.99,
  'https://www.kroger.com/p/lays-chips'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Lays Classic Potato Chips')
  AND retailer = 'kroger'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Lays Classic Potato Chips'),
  'walmart',
  3.48,
  'https://www.walmart.com/ip/lays'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Lays Classic Potato Chips')
  AND retailer = 'walmart'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Butter Salted'),
  'kroger',
  4.99,
  'https://www.kroger.com/p/land-o-lakes-butter'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Butter Salted')
  AND retailer = 'kroger'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Butter Salted'),
  'walmart',
  4.68,
  'https://www.walmart.com/ip/butter'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Butter Salted')
  AND retailer = 'walmart'
);

INSERT INTO public.retailer_products (product_id, retailer, price, product_url)
SELECT 
  (SELECT id FROM public.products WHERE name = 'Butter Salted'),
  'costco',
  3.99,
  'https://www.costco.com/butter'
WHERE NOT EXISTS (
  SELECT 1 FROM public.retailer_products 
  WHERE product_id = (SELECT id FROM public.products WHERE name = 'Butter Salted')
  AND retailer = 'costco'
);