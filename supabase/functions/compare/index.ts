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
    const productId = url.searchParams.get('productId');

    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'Query parameter "productId" is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Comparing prices for product: ${productId}`);

    // Get product details
    const { data: product, error: productError } = await supabase
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
      .eq('id', productId)
      .single();

    if (productError || !product) {
      console.error('Product not found:', productError);
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get retailer prices
    const { data: retailers, error: retailersError } = await supabase
      .from('retailer_products')
      .select('*')
      .eq('product_id', productId);

    if (retailersError) {
      console.error('Error fetching retailers:', retailersError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch retailer prices' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format response
    const result = {
      product: {
        id: product.id,
        name: product.name,
        brand: (product.brands as any)?.name || 'Unknown',
        size: product.size,
        gtin: product.gtin,
        image_url: product.image_url
      },
      retailers: retailers.map(r => ({
        retailer: r.retailer,
        price: r.price,
        url: r.product_url,
        last_scraped: r.last_scraped
      }))
    };

    console.log(`Found ${retailers.length} retailers for product`);

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
