import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Scraping Walmart for: ${query}`);

    const products = await scrapeWalmart(query);
    console.log(`Found ${products.length} products from Walmart`);

    let productsIngested = 0;
    for (const product of products) {
      try {
        const brandId = await upsertBrand(supabase, product.brand);
        const productId = await upsertProduct(supabase, product, brandId);
        await upsertRetailerProduct(supabase, productId, 'walmart', product.price, product.url);
        productsIngested++;
      } catch (error) {
        console.error('Error ingesting product:', product.name, error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraped and ingested ${productsIngested} products from Walmart`,
        products_ingested: productsIngested,
        products_found: products.length,
        products: products
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function scrapeWalmart(query: string) {
  const searchUrl = `https://www.walmart.com/search?q=${encodeURIComponent(query)}`;
  console.log('Fetching:', searchUrl);

  const response = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  const html = await response.text();
  const products = [];

  const productMatches = html.matchAll(/"name":"([^"]+)"[^}]*"price":([0-9.]+)[^}]*"image":"([^"]+)"[^}]*"url":"([^"]+)"/g);

  for (const match of productMatches) {
    const name = match[1];
    const price = parseFloat(match[2]);
    const imageUrl = match[3].replace(/\\u002F/g, '/');
    const url = 'https://www.walmart.com' + match[4].replace(/\\u002F/g, '/');

    const brandMatch = name.match(/^([A-Za-z']+)/);
    const brand = brandMatch ? brandMatch[1] : 'Unknown';

    const sizeMatch = name.match(/(\d+\.?\d*\s?(oz|g|lb|kg|count|ct|pack))/i);
    const size = sizeMatch ? sizeMatch[0] : null;

    products.push({
      name,
      brand,
      size,
      price,
      url,
      image_url: imageUrl,
      gtin: null
    });

    if (products.length >= 10) break;
  }

  return products;
}

async function upsertBrand(supabase: any, brandName: string) {
  const { data: existingBrand } = await supabase
    .from('brands')
    .select('id')
    .eq('name', brandName)
    .maybeSingle();

  if (existingBrand) {
    return existingBrand.id;
  }

  const { data: newBrand, error } = await supabase
    .from('brands')
    .insert({ name: brandName })
    .select('id')
    .single();

  if (error) throw error;
  return newBrand.id;
}

async function upsertProduct(supabase: any, product: any, brandId: string) {
  const { data: existingProduct } = await supabase
    .from('products')
    .select('id')
    .eq('brand_id', brandId)
    .eq('name', product.name)
    .maybeSingle();

  if (existingProduct) {
    await supabase
      .from('products')
      .update({
        size: product.size,
        image_url: product.image_url,
        gtin: product.gtin,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingProduct.id);

    return existingProduct.id;
  }

  const { data: newProduct, error } = await supabase
    .from('products')
    .insert({
      brand_id: brandId,
      name: product.name,
      size: product.size,
      gtin: product.gtin,
      image_url: product.image_url
    })
    .select('id')
    .single();

  if (error) throw error;
  return newProduct.id;
}

async function upsertRetailerProduct(supabase: any, productId: string, retailer: string, price: number, productUrl: string) {
  const { data: existing } = await supabase
    .from('retailer_products')
    .select('id')
    .eq('product_id', productId)
    .eq('retailer', retailer)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('retailer_products')
      .update({
        price,
        product_url: productUrl,
        last_scraped: new Date().toISOString()
      })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('retailer_products')
      .insert({
        product_id: productId,
        retailer,
        price,
        product_url: productUrl
      });
  }
}
