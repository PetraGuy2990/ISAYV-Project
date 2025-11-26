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

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter "q" is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching for: ${query}`);

    // Search products using full-text search
    const { data: products, error } = await supabase
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
      .textSearch('name', query, {
        type: 'websearch',
        config: 'english'
      })
      .limit(20);

    if (error) {
      console.error('Search error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to search products' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format response
    const results = products.map(p => ({
      id: p.id,
      name: p.name,
      brand: (p.brands as any)?.name || 'Unknown',
      size: p.size,
      gtin: p.gtin,
      image_url: p.image_url
    }));

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
