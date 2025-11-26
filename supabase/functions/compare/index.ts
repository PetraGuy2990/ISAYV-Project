import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { productIds } = await req.json();

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Request body must include "productIds" array' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Comparing cart with ${productIds.length} products`);

    // Get all products in cart
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        id,
        name,
        size,
        gtin,
        image_url,
        brands (
          name
        )
      `)
      .in('id', productIds);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch products' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get retailer prices for all products
    const { data: retailerProducts, error: retailerError } = await supabase
      .from('retailer_products')
      .select('*')
      .in('product_id', productIds);

    if (retailerError) {
      console.error('Error fetching retailer products:', retailerError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch retailer prices' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format cart items
    const cart = products.map(p => ({
      id: p.id,
      name: p.name,
      brand: (p.brands as any)?.name || 'Unknown',
      size: p.size,
      gtin: p.gtin,
      image_url: p.image_url
    }));

    // Calculate totals per retailer
    const retailers = ['kroger', 'walmart', 'costco'];
    const retailerTotals = retailers.map(retailerName => {
      const retailerItems = retailerProducts.filter(rp => rp.retailer === retailerName);
      const productIdsWithPrices = new Set(retailerItems.map(ri => ri.product_id));
      
      const complete = productIds.every(id => productIdsWithPrices.has(id));
      const total = retailerItems.reduce((sum, item) => sum + (item.price || 0), 0);

      return {
        retailer: retailerName,
        total: parseFloat(total.toFixed(2)),
        complete
      };
    });

    // Sort retailers by total (only complete ones first, then by price)
    const sortedByTotal = retailerTotals
      .filter(r => r.complete)
      .sort((a, b) => a.total - b.total)
      .map(r => r.retailer);

    const result = {
      cart,
      retailers: retailerTotals,
      sortedByTotal
    };

    console.log(`Cart comparison complete. Best: ${sortedByTotal[0] || 'none'}`);

    return new Response(
      JSON.stringify(result),
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
