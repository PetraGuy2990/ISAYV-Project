import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface KrogerProduct {
  name: string;
  brand: string;
  size: string;
  price: number;
  url: string;
  image_url: string;
  gtin?: string;
}

// Scrape Kroger search results
async function scrapeKroger(query: string): Promise<KrogerProduct[]> {
  console.log(`Scraping Kroger for: ${query}`);
  
  try {
    const searchUrl = `https://www.kroger.com/search?query=${encodeURIComponent(query)}`;
    console.log(`Fetching: ${searchUrl}`);
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`Received HTML response (${html.length} chars)`);

    // Parse HTML to extract product data
    // Note: This is a simplified parser. Kroger's actual structure may require more sophisticated parsing
    const products: KrogerProduct[] = [];
    
    // Extract product cards using regex patterns (simplified approach)
    // In a real implementation, you'd use a proper HTML parser
    const productPattern = /<div[^>]*class="[^"]*ProductCard[^"]*"[^>]*>(.*?)<\/div>/gis;
    const matches = html.matchAll(productPattern);

    for (const match of matches) {
      const cardHtml = match[1];
      
      // Extract product details
      const nameMatch = cardHtml.match(/<h3[^>]*>(.*?)<\/h3>/i);
      const priceMatch = cardHtml.match(/\$([0-9]+\.[0-9]{2})/);
      const imageMatch = cardHtml.match(/src="([^"]*\.(jpg|png|webp)[^"]*)"/i);
      const urlMatch = cardHtml.match(/href="([^"]*)"/i);
      
      if (nameMatch && priceMatch) {
        // Extract brand and size from name
        const fullName = nameMatch[1].replace(/<[^>]*>/g, '').trim();
        const parts = fullName.split(/\s+/);
        const brand = parts[0] || 'Unknown';
        const size = parts[parts.length - 1]?.match(/\d+(\.\d+)?\s*(oz|lb|g|kg|ml|l)/i)?.[0] || '';
        
        products.push({
          name: fullName,
          brand: brand,
          size: size,
          price: parseFloat(priceMatch[1]),
          url: urlMatch ? `https://www.kroger.com${urlMatch[1]}` : searchUrl,
          image_url: imageMatch?.[1] || '',
        });
      }
    }

    console.log(`Scraped ${products.length} products from Kroger`);
    return products;
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  }
}

// Upsert brand and return ID
async function upsertBrand(supabase: any, brandName: string): Promise<string> {
  const { data: existing, error: selectError } = await supabase
    .from('brands')
    .select('id')
    .eq('name', brandName)
    .maybeSingle();

  if (existing) {
    return existing.id;
  }

  const { data: newBrand, error: insertError } = await supabase
    .from('brands')
    .insert({ name: brandName })
    .select('id')
    .single();

  if (insertError) {
    throw new Error(`Failed to insert brand: ${insertError.message}`);
  }

  return newBrand.id;
}

// Upsert product and return ID
async function upsertProduct(supabase: any, product: KrogerProduct, brandId: string): Promise<string> {
  // Try to find existing product by name and brand
  const { data: existing, error: selectError } = await supabase
    .from('products')
    .select('id')
    .eq('name', product.name)
    .eq('brand_id', brandId)
    .maybeSingle();

  if (existing) {
    // Update existing product
    await supabase
      .from('products')
      .update({
        size: product.size,
        gtin: product.gtin,
        image_url: product.image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id);
    
    return existing.id;
  }

  // Insert new product
  const { data: newProduct, error: insertError } = await supabase
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

  if (insertError) {
    throw new Error(`Failed to insert product: ${insertError.message}`);
  }

  return newProduct.id;
}

// Upsert retailer product
async function upsertRetailerProduct(
  supabase: any,
  productId: string,
  retailer: string,
  price: number,
  url: string
): Promise<void> {
  const { error } = await supabase
    .from('retailer_products')
    .upsert({
      product_id: productId,
      retailer: retailer,
      price: price,
      product_url: url,
      last_scraped: new Date().toISOString()
    }, {
      onConflict: 'product_id,retailer'
    });

  if (error) {
    throw new Error(`Failed to upsert retailer product: ${error.message}`);
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
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
        JSON.stringify({ error: 'Query parameter is required in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting scrape and ingest for query: ${query}`);

    // Scrape Kroger
    const products = await scrapeKroger(query);

    if (products.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No products found',
          products_ingested: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Ingest products into database
    let ingestedCount = 0;
    for (const product of products) {
      try {
        const brandId = await upsertBrand(supabase, product.brand);
        const productId = await upsertProduct(supabase, product, brandId);
        await upsertRetailerProduct(supabase, productId, 'kroger', product.price, product.url);
        ingestedCount++;
      } catch (error) {
        console.error(`Failed to ingest product ${product.name}:`, error);
      }
    }

    console.log(`Successfully ingested ${ingestedCount} products`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraped and ingested ${ingestedCount} products`,
        products_ingested: ingestedCount,
        products_found: products.length,
        products: products.slice(0, 5) // Return first 5 as sample
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
