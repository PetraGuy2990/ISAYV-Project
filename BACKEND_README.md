# Backend Infrastructure for Grocery Price Comparison

This backend provides a complete infrastructure for scraping grocery product data, storing it in a database, and exposing APIs for search and price comparison.

## 📦 Database Schema

The system uses three main tables:

### `brands`
- `id` - UUID (Primary Key)
- `name` - TEXT (Unique)
- `created_at` - Timestamp

### `products`
- `id` - UUID (Primary Key)
- `brand_id` - UUID (Foreign Key → brands)
- `name` - TEXT
- `size` - TEXT
- `gtin` - TEXT (barcode/UPC)
- `image_url` - TEXT
- `created_at` - Timestamp
- `updated_at` - Timestamp

### `retailer_products`
- `id` - UUID (Primary Key)
- `product_id` - UUID (Foreign Key → products)
- `retailer` - TEXT (e.g., 'kroger', 'walmart')
- `price` - NUMERIC
- `product_url` - TEXT
- `last_scraped` - Timestamp
- Unique constraint on (product_id, retailer)

**Indexes:**
- Full-text search on `products.name` and `brands.name`
- Index on `retailer_products.retailer`

## 🌐 API Endpoints

All endpoints are deployed as Edge Functions and are publicly accessible (no authentication required).

### 1. Search Products
**GET** `/search?q={query}`

Search the product database using full-text search.

**Example Request:**
```bash
curl "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/search?q=chips"
```

**Example Response:**
```json
[
  {
    "id": "uuid",
    "name": "Kettle Sea Salt Chips",
    "brand": "Kettle",
    "size": "8.5oz",
    "gtin": "0008411413715",
    "image_url": "https://..."
  }
]
```

### 2. Compare Prices
**GET** `/compare?productId={uuid}`

Get price comparison across all retailers for a specific product.

**Example Request:**
```bash
curl "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/compare?productId=uuid-here"
```

**Example Response:**
```json
{
  "product": {
    "id": "uuid",
    "name": "Kettle Sea Salt Chips",
    "brand": "Kettle",
    "size": "8.5oz",
    "gtin": "0008411413715",
    "image_url": "https://..."
  },
  "retailers": [
    {
      "retailer": "kroger",
      "price": 3.49,
      "url": "https://www.kroger.com/p/...",
      "last_scraped": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 3. Compare Cart Prices
**POST** `/compare`

Get total cart cost comparison across Kroger, Walmart, and Costco.

**Example Request:**
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/compare" \
  -H "Content-Type: application/json" \
  -d '{"productIds": ["uuid1", "uuid2", "uuid3"]}'
```

**Example Response:**
```json
{
  "cart": [
    {
      "id": "uuid1",
      "name": "Kettle Sea Salt Chips",
      "brand": "Kettle",
      "size": "8.5oz",
      "image_url": "https://...",
      "gtin": "0008411413715"
    }
  ],
  "retailers": [
    {
      "retailer": "kroger",
      "total": 24.10,
      "complete": true
    },
    {
      "retailer": "walmart",
      "total": 25.30,
      "complete": true
    },
    {
      "retailer": "costco",
      "total": 26.50,
      "complete": false
    }
  ],
  "sortedByTotal": ["kroger", "walmart"]
}
```

### 4. Scrape Kroger
**POST** `/scrape-kroger`

Trigger a scrape of Kroger's website and ingest products into the database.

**Example Request:**
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-kroger" \
  -H "Content-Type: application/json" \
  -d '{"query": "kettle chips"}'
```

### 5. Scrape Walmart
**POST** `/scrape-walmart`

Trigger a scrape of Walmart's website and ingest products into the database.

**Example Request:**
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-walmart" \
  -H "Content-Type: application/json" \
  -d '{"query": "kettle chips"}'
```

### 6. Scrape Costco
**POST** `/scrape-costco`

Trigger a scrape of Costco's website and ingest products into the database.

**Example Request:**
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-costco" \
  -H "Content-Type: application/json" \
  -d '{"query": "kettle chips"}'
```

### 7. Scrape All Retailers
**POST** `/scrape-all`

Trigger scraping across Kroger, Walmart, and Costco simultaneously.

**Example Request:**
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-all" \
  -H "Content-Type: application/json" \
  -d '{"query": "kettle chips"}'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Scraped 35 products from all retailers",
  "total_ingested": 35,
  "total_found": 40,
  "retailers": {
    "kroger": { "ingested": 12, "found": 15, "error": null },
    "walmart": { "ingested": 11, "found": 12, "error": null },
    "costco": { "ingested": 12, "found": 13, "error": null }
  }
}
```

## 🕸 Scraper Implementation

The scrapers for Kroger, Walmart, and Costco are implemented using:
- **HTTP Fetch**: Direct HTTP requests to retailer websites
- **HTML Parsing**: Regex-based extraction (simplified approach)
- **Data Normalization**: Extracts brand, size, price, image, and product details

**Supported Retailers:**
- **Kroger**: Searches product listings and extracts brand, price, image, size
- **Walmart**: Parses JSON-LD product data from search results
- **Costco**: Extracts product information from catalog search

**Note:** The current scrapers use basic HTML parsing. For production use, you may want to:
- Use a more robust HTML parser
- Add retry logic and rate limiting
- Implement proxy rotation for reliability
- Handle dynamic content rendering

### Ingestion Pipeline

The scraper automatically:
1. **Upserts brands**: Creates or finds existing brand entries
2. **Upserts products**: Creates or updates product records
3. **Upserts retailer data**: Updates price and availability info

**Helper Functions:**
- `upsertBrand(name)` - Insert or get brand ID
- `upsertProduct(productData, brandId)` - Insert or update product
- `upsertRetailerProduct(productId, retailer, price, url)` - Update retailer pricing

## 🚀 Deployment

Edge functions are automatically deployed when you save changes. No manual deployment needed!

## 🧪 Testing

### Test Search
```bash
curl "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/search?q=doritos"
```

### Test Scraping
```bash
# Scrape Doritos products
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-kroger" \
  -H "Content-Type: application/json" \
  -d '{"query": "doritos"}'

# Scrape Lays products
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-kroger" \
  -H "Content-Type: application/json" \
  -d '{"query": "lays chips"}'
```

### Test Cart Comparison
After scraping, get product IDs from search results, then:
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/compare" \
  -H "Content-Type: application/json" \
  -d '{"productIds": ["PRODUCT-ID-1", "PRODUCT-ID-2"]}'
```

### Test Scrape All Retailers
```bash
curl -X POST "https://yypsgricdvtvlogucfsm.supabase.co/functions/v1/scrape-all" \
  -H "Content-Type: application/json" \
  -d '{"query": "doritos"}'
```

## 📁 Project Structure

```
supabase/
  ├── functions/
  │   ├── search/
  │   │   └── index.ts          # Search API endpoint
  │   ├── compare/
  │   │   └── index.ts          # Cart comparison endpoint (multi-product)
  │   ├── scrape-kroger/
  │   │   └── index.ts          # Kroger scraper + ingestion
  │   ├── scrape-walmart/
  │   │   └── index.ts          # Walmart scraper + ingestion
  │   ├── scrape-costco/
  │   │   └── index.ts          # Costco scraper + ingestion
  │   └── scrape-all/
  │       └── index.ts          # Scrapes all retailers at once
  └── config.toml               # Edge function configuration
```

## 🔌 Adding Additional Retailers

To add support for more retailers (Walmart, Target, etc.):

1. **Create a new scraper function:**
   ```
   supabase/functions/scrape-walmart/index.ts
   ```

2. **Implement scraper logic:**
   - Use the same pattern as `scrape-kroger`
   - Extract: name, brand, size, price, url, image_url
   - Use retailer name: `'walmart'`

3. **Add to config.toml:**
   ```toml
   [functions.scrape-walmart]
   verify_jwt = false
   ```

4. **Reuse ingestion helpers:**
   - All `upsertBrand`, `upsertProduct`, `upsertRetailerProduct` functions can be reused
   - Just pass `'walmart'` as the retailer parameter

## 🔒 Security Considerations

- All endpoints are currently public (`verify_jwt = false`)
- Consider adding authentication for scrape endpoints in production
- Rate limiting should be implemented to prevent abuse
- Add proper error handling and logging

## 📊 Database Access

View your data using the Lovable Cloud backend interface:
- Navigate to Cloud → Database → Tables
- View `brands`, `products`, and `retailer_products` tables
- Export data as needed

## 🛠 Maintenance

- **Update scraper logic** if retailer websites change structure
- **Monitor scrape success rate** via Edge Function logs
- **Refresh data periodically** by running scrape jobs
- **Clean up old data** by checking `last_scraped` timestamps
