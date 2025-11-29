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

    // Build the query - search in grocery_items table instead
    let productsQuery = supabase
      .from('grocery_items')
      .select('*')
      .or(`item_name.ilike.%${query}%,brand.ilike.%${query}%`)
      .limit(50);

    const { data: products, error } = await productsQuery;

    if (error) {
      console.error('Search error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to search products' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process results with brand matching info
    const resultsWithPrice = products.map(p => {
      const brand = p.brand || 'Generic';
      const brandMatch = brand.toLowerCase().includes(query.toLowerCase());
      const nameMatch = p.item_name.toLowerCase().includes(query.toLowerCase());
      const price = p.price ? parseFloat(p.price) : null;

      return {
        id: p.id,
        item_name: p.item_name,
        brand,
        size: p.size,
        price,
        company: p.company,
        category: p.category,
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
