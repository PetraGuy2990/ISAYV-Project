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

    const url = new URL(req.url);
    const query = url.searchParams.get('q');
    const mode = url.searchParams.get('mode') || 'cheapest';

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter "q" is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for: ${query} in mode: ${mode}`);

    // Build the query based on mode
    let productsQuery = supabase
      .from('products')
      .select(`
        id,
        name,
        size,
        gtin,
        image_url,
        brands (
          name
        ),
        retailer_products (
          retailer,
          price
        )
      `)
      .textSearch('name', query, {
        type: 'websearch',
        config: 'english'
      })
      .limit(50);

    const { data: products, error } = await productsQuery;

    if (error) {
      console.error('Search error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to search products' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate min price and sort based on mode
    const resultsWithPrice = products.map(p => {
      const retailerProducts = (p.retailer_products as any) || [];
      const prices = retailerProducts
        .filter((rp: any) => rp.price != null)
        .map((rp: any) => parseFloat(rp.price));
      
      const minPrice = prices.length > 0 ? Math.min(...prices) : null;
      const brand = (p.brands as any)?.name || 'Unknown';
      const brandMatch = brand.toLowerCase().includes(query.toLowerCase());
      const nameMatch = p.name.toLowerCase().includes(query.toLowerCase());

      return {
        id: p.id,
        name: p.name,
        brand,
        size: p.size,
        gtin: p.gtin,
        image_url: p.image_url,
        minPrice,
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
        if (a.minPrice === null) return 1;
        if (b.minPrice === null) return -1;
        return a.minPrice - b.minPrice;
      });
    } else {
      // Cheapest mode: prioritize price, then name match, then brand
      sortedResults = resultsWithPrice.sort((a, b) => {
        if (a.minPrice === null) return 1;
        if (b.minPrice === null) return -1;
        if (a.minPrice !== b.minPrice) return a.minPrice - b.minPrice;
        if (a.nameMatch !== b.nameMatch) return a.nameMatch ? -1 : 1;
        return a.brand.localeCompare(b.brand);
      });
    }

    // Remove sorting fields and limit results
    const results = sortedResults.slice(0, 20).map(({ minPrice, brandMatch, nameMatch, ...rest }) => rest);

    console.log(`Found ${results.length} products`);

    return new Response(
      JSON.stringify(results),
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
