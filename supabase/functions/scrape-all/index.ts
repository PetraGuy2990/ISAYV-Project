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

    console.log(`Scraping all retailers for: ${query}`);

    const results = {
      kroger: { ingested: 0, found: 0, error: null as string | null },
      walmart: { ingested: 0, found: 0, error: null as string | null },
      costco: { ingested: 0, found: 0, error: null as string | null }
    };

    // Scrape Kroger
    try {
      const krogerResponse = await supabase.functions.invoke('scrape-kroger', {
        body: { query }
      });
      if (krogerResponse.data) {
        results.kroger.ingested = krogerResponse.data.products_ingested || 0;
        results.kroger.found = krogerResponse.data.products_found || 0;
      }
    } catch (error) {
      results.kroger.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Kroger scrape error:', error);
    }

    // Scrape Walmart
    try {
      const walmartResponse = await supabase.functions.invoke('scrape-walmart', {
        body: { query }
      });
      if (walmartResponse.data) {
        results.walmart.ingested = walmartResponse.data.products_ingested || 0;
        results.walmart.found = walmartResponse.data.products_found || 0;
      }
    } catch (error) {
      results.walmart.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Walmart scrape error:', error);
    }

    // Scrape Costco
    try {
      const costcoResponse = await supabase.functions.invoke('scrape-costco', {
        body: { query }
      });
      if (costcoResponse.data) {
        results.costco.ingested = costcoResponse.data.products_ingested || 0;
        results.costco.found = costcoResponse.data.products_found || 0;
      }
    } catch (error) {
      results.costco.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Costco scrape error:', error);
    }

    const totalIngested = results.kroger.ingested + results.walmart.ingested + results.costco.ingested;
    const totalFound = results.kroger.found + results.walmart.found + results.costco.found;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Scraped ${totalIngested} products from all retailers`,
        total_ingested: totalIngested,
        total_found: totalFound,
        retailers: results
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
