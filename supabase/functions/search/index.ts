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

    // Parse request body
    const { query, mode = 'cheapest' } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for: ${query} in mode: ${mode}`);

    // Search in products table with brands and retailer_products
    // Use ilike for case-insensitive search on product name
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        size,
        gtin,
        image_url,
        brands (
          id,
          name
        ),
        retailer_products (
          id,
          retailer,
          price,
          product_url
        )
      `)
      .ilike('name', `%${query}%`)
      .limit(50);

    if (error) {
      console.error('Search error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to search products', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!products || products.length === 0) {
      console.log('No products found');
      return new Response(
        JSON.stringify({ results: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process results with brand matching info
    const resultsWithPrice = products.map(p => {
      const brand = (p.brands as any)?.name || 'Generic';
      const retailerProducts = (p.retailer_products as any) || [];
      
      // Calculate min price across all retailers
      const prices = retailerProducts
        .filter((rp: any) => rp.price != null)
        .map((rp: any) => parseFloat(rp.price));
      const minPrice = prices.length > 0 ? Math.min(...prices) : null;

      // Get price breakdown by retailer
      const retailerPrices: Record<string, number> = {};
      retailerProducts.forEach((rp: any) => {
        if (rp.price) {
          retailerPrices[rp.retailer] = parseFloat(rp.price);
        }
      });

      const brandMatch = brand.toLowerCase().includes(query.toLowerCase());
      const nameMatch = p.name.toLowerCase().includes(query.toLowerCase());

      return {
        id: p.id,
        item_name: p.name,
        brand,
        size: p.size,
        price: minPrice,
        company: retailerProducts.length > 0 ? retailerProducts[0].retailer : null,
        category: null,
        image_url: p.image_url,
        retailer_prices: retailerPrices,
        brandMatch,
        nameMatch
      };
    });

    // Sort based on mode
    let sortedResults;
    if (mode === 'brand') {
      // Brand-loyal mode: prioritize brand match, then name match, then price
      sortedResults = resultsWithPrice.sort((a, b) => {
        if (a.brandMatch !== b.brandMatch) return a.brandMatch ? -1 : 1;
        if (a.nameMatch !== b.nameMatch) return a.nameMatch ? -1 : 1;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      });
    } else {
      // Cheapest mode: prioritize price, then name match, then brand
      sortedResults = resultsWithPrice.sort((a, b) => {
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        if (a.price !== b.price) return a.price - b.price;
        if (a.nameMatch !== b.nameMatch) return a.nameMatch ? -1 : 1;
        return a.brand.localeCompare(b.brand);
      });
    }

    // Remove sorting fields and return results
    const results = sortedResults.slice(0, 20).map(({ brandMatch, nameMatch, ...rest }) => rest);

    console.log(`Found ${results.length} products`);

    return new Response(
      JSON.stringify({ results }),
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
