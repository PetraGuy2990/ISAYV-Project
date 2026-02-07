/**
 * DEMO MODE - All data is fake and for demonstration purposes only.
 * This app is designed for content creation, demos, and user testing.
 */

// Categories for grouping
export type Category = 'Produce' | 'Dairy' | 'Meat & Seafood' | 'Pantry' | 'Frozen' | 'Beverages' | 'Snacks' | 'Bakery' | 'Household' | 'Personal Care';

export interface MockProduct {
  id: string;
  name: string;
  brand: string;
  category: Category;
  size: string;
  basePrice: number;
  imageUrl?: string;
  isPrivateLabel?: boolean;
}

export interface RetailerPrice {
  price: number | null; // null means not available
  isSubstitute?: boolean;
  substituteNote?: string;
}

export interface RetailerPricing {
  walmart: RetailerPrice;
  costco: RetailerPrice;
  target: RetailerPrice;
  kroger: RetailerPrice;
}

// Helper to generate consistent product IDs
const generateId = (name: string, brand: string) => 
  `${name.toLowerCase().replace(/\s+/g, '-')}-${brand.toLowerCase().replace(/\s+/g, '-')}`;

// Price variation generators (Demo Mode - fake but realistic)
const varyPrice = (base: number, variance: number = 0.15): number => {
  const variation = base * (Math.random() * variance * 2 - variance);
  return Math.round((base + variation) * 100) / 100;
};

// Retailer-specific price adjustments
const getRetailerPrice = (basePrice: number, retailer: 'walmart' | 'costco' | 'target' | 'kroger'): number => {
  const adjustments = {
    walmart: -0.05,    // 5% cheaper
    costco: -0.12,     // 12% cheaper (bulk)
    target: 0.03,      // 3% more expensive
    kroger: -0.02,     // 2% cheaper
  };
  return Math.round((basePrice * (1 + adjustments[retailer])) * 100) / 100;
};

// Generate 200+ products across categories
export const mockProducts: MockProduct[] = [
  // === PRODUCE (25 items) ===
  { id: generateId('Bananas', 'Dole'), name: 'Bananas', brand: 'Dole', category: 'Produce', size: '1 lb', basePrice: 0.59, imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop' },
  { id: generateId('Organic Bananas', 'Dole'), name: 'Organic Bananas', brand: 'Dole', category: 'Produce', size: '1 lb', basePrice: 0.79, imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200&h=200&fit=crop' },
  { id: generateId('Gala Apples', 'Stemilt'), name: 'Gala Apples', brand: 'Stemilt', category: 'Produce', size: '3 lb bag', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop' },
  { id: generateId('Honeycrisp Apples', 'Stemilt'), name: 'Honeycrisp Apples', brand: 'Stemilt', category: 'Produce', size: '2 lb', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=200&h=200&fit=crop' },
  { id: generateId('Navel Oranges', 'Sunkist'), name: 'Navel Oranges', brand: 'Sunkist', category: 'Produce', size: '4 lb bag', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=200&h=200&fit=crop' },
  { id: generateId('Strawberries', 'Driscoll\'s'), name: 'Strawberries', brand: 'Driscoll\'s', category: 'Produce', size: '1 lb', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop' },
  { id: generateId('Blueberries', 'Driscoll\'s'), name: 'Blueberries', brand: 'Driscoll\'s', category: 'Produce', size: '6 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop' },
  { id: generateId('Raspberries', 'Driscoll\'s'), name: 'Raspberries', brand: 'Driscoll\'s', category: 'Produce', size: '6 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=200&h=200&fit=crop' },
  { id: generateId('Avocados', 'Hass'), name: 'Avocados', brand: 'Hass', category: 'Produce', size: '4 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop' },
  { id: generateId('Baby Spinach', 'Earthbound Farm'), name: 'Baby Spinach', brand: 'Earthbound Farm', category: 'Produce', size: '5 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop' },
  { id: generateId('Spring Mix', 'Earthbound Farm'), name: 'Spring Mix Salad', brand: 'Earthbound Farm', category: 'Produce', size: '5 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
  { id: generateId('Romaine Hearts', 'Fresh Express'), name: 'Romaine Hearts', brand: 'Fresh Express', category: 'Produce', size: '3 count', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=200&fit=crop' },
  { id: generateId('Baby Carrots', 'Bolthouse'), name: 'Baby Carrots', brand: 'Bolthouse', category: 'Produce', size: '1 lb', basePrice: 1.99, imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=200&h=200&fit=crop' },
  { id: generateId('Russet Potatoes', 'Idaho'), name: 'Russet Potatoes', brand: 'Idaho', category: 'Produce', size: '5 lb bag', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82ber6f3?w=200&h=200&fit=crop' },
  { id: generateId('Sweet Potatoes', 'Generic'), name: 'Sweet Potatoes', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 1.49, imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63a7acd7d?w=200&h=200&fit=crop' },
  { id: generateId('Yellow Onions', 'Generic'), name: 'Yellow Onions', brand: 'Fresh', category: 'Produce', size: '3 lb bag', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&h=200&fit=crop' },
  { id: generateId('Garlic', 'Generic'), name: 'Garlic', brand: 'Fresh', category: 'Produce', size: '3 count', basePrice: 1.99, imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=200&h=200&fit=crop' },
  { id: generateId('Broccoli Crowns', 'Generic'), name: 'Broccoli Crowns', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop' },
  { id: generateId('Cauliflower', 'Generic'), name: 'Cauliflower', brand: 'Fresh', category: 'Produce', size: '1 head', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=200&h=200&fit=crop' },
  { id: generateId('Bell Peppers', 'Generic'), name: 'Bell Peppers - Mixed', brand: 'Fresh', category: 'Produce', size: '3 count', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop' },
  { id: generateId('Tomatoes on Vine', 'Generic'), name: 'Tomatoes on the Vine', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=200&h=200&fit=crop' },
  { id: generateId('Roma Tomatoes', 'Generic'), name: 'Roma Tomatoes', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 1.99, imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=200&h=200&fit=crop' },
  { id: generateId('Cucumber', 'Generic'), name: 'English Cucumber', brand: 'Fresh', category: 'Produce', size: '1 count', basePrice: 1.49, imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=200&h=200&fit=crop' },
  { id: generateId('Zucchini', 'Generic'), name: 'Zucchini', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 1.79, imageUrl: 'https://images.unsplash.com/photo-1563252722-6434563a985d?w=200&h=200&fit=crop' },
  { id: generateId('Lemons', 'Sunkist'), name: 'Lemons', brand: 'Sunkist', category: 'Produce', size: '2 lb bag', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=200&h=200&fit=crop' },
  
  // === DAIRY (30 items) ===
  { id: generateId('2% Milk', 'Horizon'), name: '2% Reduced Fat Milk', brand: 'Horizon Organic', category: 'Dairy', size: '1 gallon', basePrice: 6.49, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  { id: generateId('Whole Milk', 'Horizon'), name: 'Whole Milk', brand: 'Horizon Organic', category: 'Dairy', size: '1 gallon', basePrice: 6.49, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop' },
  { id: generateId('2% Milk', 'Great Value'), name: '2% Reduced Fat Milk', brand: 'Great Value', category: 'Dairy', size: '1 gallon', basePrice: 3.48, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  { id: generateId('Whole Milk', 'Great Value'), name: 'Whole Milk', brand: 'Great Value', category: 'Dairy', size: '1 gallon', basePrice: 3.48, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop' },
  { id: generateId('2% Milk', 'Kirkland'), name: '2% Reduced Fat Milk', brand: 'Kirkland Signature', category: 'Dairy', size: '1 gallon', basePrice: 3.29, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  { id: generateId('Whole Milk', 'Kirkland'), name: 'Whole Milk', brand: 'Kirkland Signature', category: 'Dairy', size: '1 gallon', basePrice: 3.29, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop' },
  { id: generateId('Almond Milk', 'Almond Breeze'), name: 'Almond Milk Unsweetened', brand: 'Almond Breeze', category: 'Dairy', size: '64 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=200&h=200&fit=crop' },
  { id: generateId('Oat Milk', 'Oatly'), name: 'Oat Milk Original', brand: 'Oatly', category: 'Dairy', size: '64 oz', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1631851182986-e0f7e1e70dbe?w=200&h=200&fit=crop' },
  { id: generateId('Large Eggs', 'Eggland\'s Best'), name: 'Large Eggs', brand: 'Eggland\'s Best', category: 'Dairy', size: '12 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop' },
  { id: generateId('Large Eggs', 'Great Value'), name: 'Large Eggs', brand: 'Great Value', category: 'Dairy', size: '12 count', basePrice: 3.29, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop' },
  { id: generateId('Large Eggs', 'Kirkland'), name: 'Large Eggs Cage Free', brand: 'Kirkland Signature', category: 'Dairy', size: '24 count', basePrice: 6.99, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=200&h=200&fit=crop' },
  { id: generateId('Butter Salted', 'Land O Lakes'), name: 'Butter Salted', brand: 'Land O\'Lakes', category: 'Dairy', size: '1 lb', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop' },
  { id: generateId('Butter Unsalted', 'Land O Lakes'), name: 'Butter Unsalted', brand: 'Land O\'Lakes', category: 'Dairy', size: '1 lb', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop' },
  { id: generateId('Butter', 'Kerrygold'), name: 'Pure Irish Butter', brand: 'Kerrygold', category: 'Dairy', size: '8 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop' },
  { id: generateId('Greek Yogurt', 'Chobani'), name: 'Greek Yogurt Plain', brand: 'Chobani', category: 'Dairy', size: '32 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop' },
  { id: generateId('Greek Yogurt Vanilla', 'Chobani'), name: 'Greek Yogurt Vanilla', brand: 'Chobani', category: 'Dairy', size: '32 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop' },
  { id: generateId('Yogurt', 'Yoplait'), name: 'Original Yogurt Strawberry', brand: 'Yoplait', category: 'Dairy', size: '6 oz', basePrice: 0.89, imageUrl: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=200&h=200&fit=crop' },
  { id: generateId('Shredded Cheddar', 'Tillamook'), name: 'Shredded Sharp Cheddar', brand: 'Tillamook', category: 'Dairy', size: '8 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=200&h=200&fit=crop' },
  { id: generateId('Shredded Mozzarella', 'Galbani'), name: 'Shredded Mozzarella', brand: 'Galbani', category: 'Dairy', size: '8 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop' },
  { id: generateId('Cream Cheese', 'Philadelphia'), name: 'Cream Cheese Original', brand: 'Philadelphia', category: 'Dairy', size: '8 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=200&h=200&fit=crop' },
  { id: generateId('Sour Cream', 'Daisy'), name: 'Sour Cream', brand: 'Daisy', category: 'Dairy', size: '16 oz', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=200&h=200&fit=crop' },
  { id: generateId('Cottage Cheese', 'Breakstone'), name: 'Cottage Cheese 4%', brand: 'Breakstone\'s', category: 'Dairy', size: '16 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=200&h=200&fit=crop' },
  { id: generateId('Heavy Cream', 'Organic Valley'), name: 'Heavy Whipping Cream', brand: 'Organic Valley', category: 'Dairy', size: '16 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  { id: generateId('Half and Half', 'Land O Lakes'), name: 'Half and Half', brand: 'Land O\'Lakes', category: 'Dairy', size: '32 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  { id: generateId('Parmesan Cheese', 'BelGioioso'), name: 'Parmesan Wedge', brand: 'BelGioioso', category: 'Dairy', size: '8 oz', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop' },
  { id: generateId('String Cheese', 'Frigo'), name: 'String Cheese', brand: 'Frigo', category: 'Dairy', size: '12 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop' },
  { id: generateId('American Cheese', 'Kraft'), name: 'American Cheese Singles', brand: 'Kraft', category: 'Dairy', size: '16 slices', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=200&h=200&fit=crop' },
  { id: generateId('Feta Cheese', 'Athenos'), name: 'Crumbled Feta', brand: 'Athenos', category: 'Dairy', size: '6 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=200&h=200&fit=crop' },
  { id: generateId('Ricotta Cheese', 'Galbani'), name: 'Whole Milk Ricotta', brand: 'Galbani', category: 'Dairy', size: '15 oz', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=200&h=200&fit=crop' },
  { id: generateId('Whipped Cream', 'Reddi-wip'), name: 'Whipped Cream Original', brand: 'Reddi-wip', category: 'Dairy', size: '6.5 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
  
  // === MEAT & SEAFOOD (25 items) ===
  { id: generateId('Ground Beef 80/20', 'Generic'), name: 'Ground Beef 80/20', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&h=200&fit=crop' },
  { id: generateId('Ground Beef 90/10', 'Generic'), name: 'Ground Beef 90/10 Lean', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 7.49, imageUrl: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&h=200&fit=crop' },
  { id: generateId('Chicken Breast', 'Perdue'), name: 'Boneless Skinless Chicken Breast', brand: 'Perdue', category: 'Meat & Seafood', size: '1.5 lb', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=200&h=200&fit=crop' },
  { id: generateId('Chicken Thighs', 'Perdue'), name: 'Boneless Chicken Thighs', brand: 'Perdue', category: 'Meat & Seafood', size: '1.25 lb', basePrice: 6.99, imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=200&h=200&fit=crop' },
  { id: generateId('Whole Chicken', 'Perdue'), name: 'Whole Chicken', brand: 'Perdue', category: 'Meat & Seafood', size: '5 lb', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&h=200&fit=crop' },
  { id: generateId('Chicken Wings', 'Tyson'), name: 'Chicken Wings', brand: 'Tyson', category: 'Meat & Seafood', size: '2.5 lb', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b4bbed?w=200&h=200&fit=crop' },
  { id: generateId('Bacon', 'Oscar Mayer'), name: 'Hardwood Smoked Bacon', brand: 'Oscar Mayer', category: 'Meat & Seafood', size: '16 oz', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1606851094291-6efae152bb87?w=200&h=200&fit=crop' },
  { id: generateId('Bacon', 'Wright'), name: 'Thick Cut Bacon', brand: 'Wright Brand', category: 'Meat & Seafood', size: '24 oz', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1606851094291-6efae152bb87?w=200&h=200&fit=crop' },
  { id: generateId('Pork Chops', 'Generic'), name: 'Bone-In Pork Chops', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255a1d754?w=200&h=200&fit=crop' },
  { id: generateId('Pork Tenderloin', 'Smithfield'), name: 'Pork Tenderloin', brand: 'Smithfield', category: 'Meat & Seafood', size: '1.5 lb', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1432139509613-5c4255a1d754?w=200&h=200&fit=crop' },
  { id: generateId('Italian Sausage', 'Johnsonville'), name: 'Italian Sausage Links', brand: 'Johnsonville', category: 'Meat & Seafood', size: '19 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop' },
  { id: generateId('Breakfast Sausage', 'Jimmy Dean'), name: 'Breakfast Sausage Links', brand: 'Jimmy Dean', category: 'Meat & Seafood', size: '12 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop' },
  { id: generateId('Hot Dogs', 'Hebrew National'), name: 'Beef Franks', brand: 'Hebrew National', category: 'Meat & Seafood', size: '12 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1612392062422-ef19b42f4a46?w=200&h=200&fit=crop' },
  { id: generateId('Deli Ham', 'Boar\'s Head'), name: 'Black Forest Ham', brand: 'Boar\'s Head', category: 'Meat & Seafood', size: '8 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop' },
  { id: generateId('Deli Turkey', 'Boar\'s Head'), name: 'Oven Roasted Turkey', brand: 'Boar\'s Head', category: 'Meat & Seafood', size: '8 oz', basePrice: 9.49, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop' },
  { id: generateId('Ribeye Steak', 'Generic'), name: 'Ribeye Steak', brand: 'USDA Choice', category: 'Meat & Seafood', size: '12 oz', basePrice: 14.99, imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&h=200&fit=crop' },
  { id: generateId('NY Strip Steak', 'Generic'), name: 'New York Strip Steak', brand: 'USDA Choice', category: 'Meat & Seafood', size: '12 oz', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&h=200&fit=crop' },
  { id: generateId('Salmon Fillet', 'Generic'), name: 'Atlantic Salmon Fillet', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=200&h=200&fit=crop' },
  { id: generateId('Shrimp Raw', 'Generic'), name: 'Raw Shrimp 21-25 count', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 11.99, imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop' },
  { id: generateId('Shrimp Cooked', 'Generic'), name: 'Cooked Shrimp 31-40 count', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop' },
  { id: generateId('Tilapia', 'Generic'), name: 'Tilapia Fillets', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1510130113356-d94cc07bbcc5?w=200&h=200&fit=crop' },
  { id: generateId('Cod', 'Generic'), name: 'Atlantic Cod Fillets', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1510130113356-d94cc07bbcc5?w=200&h=200&fit=crop' },
  { id: generateId('Crab Meat', 'Phillips'), name: 'Lump Crab Meat', brand: 'Phillips', category: 'Meat & Seafood', size: '8 oz', basePrice: 14.99, imageUrl: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=200&h=200&fit=crop' },
  { id: generateId('Ground Turkey', 'Jennie-O'), name: 'Ground Turkey 93% Lean', brand: 'Jennie-O', category: 'Meat & Seafood', size: '1 lb', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&h=200&fit=crop' },
  { id: generateId('Turkey Breast', 'Butterball'), name: 'Turkey Breast Roast', brand: 'Butterball', category: 'Meat & Seafood', size: '3 lb', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1574926054530-540288c8e678?w=200&h=200&fit=crop' },
  
  // === PANTRY (50 items) ===
  { id: generateId('White Rice', 'Jasmine'), name: 'Jasmine White Rice', brand: 'Dynasty', category: 'Pantry', size: '5 lb', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
  { id: generateId('Brown Rice', 'Minute'), name: 'Instant Brown Rice', brand: 'Minute', category: 'Pantry', size: '14 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
  { id: generateId('Spaghetti', 'Barilla'), name: 'Spaghetti', brand: 'Barilla', category: 'Pantry', size: '16 oz', basePrice: 1.99, imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop' },
  { id: generateId('Penne', 'Barilla'), name: 'Penne Rigate', brand: 'Barilla', category: 'Pantry', size: '16 oz', basePrice: 1.99, imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop' },
  { id: generateId('Fettuccine', 'Barilla'), name: 'Fettuccine', brand: 'Barilla', category: 'Pantry', size: '16 oz', basePrice: 1.99, imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop' },
  { id: generateId('Mac and Cheese', 'Kraft'), name: 'Mac & Cheese Original', brand: 'Kraft', category: 'Pantry', size: '7.25 oz', basePrice: 1.49, imageUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=200&h=200&fit=crop' },
  { id: generateId('Marinara Sauce', 'Rao\'s'), name: 'Marinara Sauce', brand: 'Rao\'s Homemade', category: 'Pantry', size: '24 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop' },
  { id: generateId('Marinara Sauce', 'Prego'), name: 'Traditional Marinara', brand: 'Prego', category: 'Pantry', size: '24 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop' },
  { id: generateId('Alfredo Sauce', 'Bertolli'), name: 'Alfredo Sauce', brand: 'Bertolli', category: 'Pantry', size: '15 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop' },
  { id: generateId('Diced Tomatoes', 'Hunt\'s'), name: 'Diced Tomatoes', brand: 'Hunt\'s', category: 'Pantry', size: '14.5 oz', basePrice: 1.29, imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=200&h=200&fit=crop' },
  { id: generateId('Tomato Paste', 'Hunt\'s'), name: 'Tomato Paste', brand: 'Hunt\'s', category: 'Pantry', size: '6 oz', basePrice: 0.99, imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=200&h=200&fit=crop' },
  { id: generateId('Crushed Tomatoes', 'Tuttorosso'), name: 'Crushed Tomatoes', brand: 'Tuttorosso', category: 'Pantry', size: '28 oz', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=200&h=200&fit=crop' },
  { id: generateId('Chicken Broth', 'Swanson'), name: 'Chicken Broth', brand: 'Swanson', category: 'Pantry', size: '32 oz', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744aec?w=200&h=200&fit=crop' },
  { id: generateId('Beef Broth', 'Swanson'), name: 'Beef Broth', brand: 'Swanson', category: 'Pantry', size: '32 oz', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744aec?w=200&h=200&fit=crop' },
  { id: generateId('Vegetable Broth', 'Swanson'), name: 'Vegetable Broth', brand: 'Swanson', category: 'Pantry', size: '32 oz', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744aec?w=200&h=200&fit=crop' },
  { id: generateId('Olive Oil', 'Bertolli'), name: 'Extra Virgin Olive Oil', brand: 'Bertolli', category: 'Pantry', size: '25.5 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eabd7875faf?w=200&h=200&fit=crop' },
  { id: generateId('Olive Oil', 'California Olive Ranch'), name: 'Extra Virgin Olive Oil', brand: 'California Olive Ranch', category: 'Pantry', size: '25.4 oz', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eabd7875faf?w=200&h=200&fit=crop' },
  { id: generateId('Vegetable Oil', 'Wesson'), name: 'Vegetable Oil', brand: 'Wesson', category: 'Pantry', size: '48 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eabd7875faf?w=200&h=200&fit=crop' },
  { id: generateId('Canola Oil', 'Crisco'), name: 'Pure Canola Oil', brand: 'Crisco', category: 'Pantry', size: '48 oz', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eabd7875faf?w=200&h=200&fit=crop' },
  { id: generateId('Flour', 'Gold Medal'), name: 'All-Purpose Flour', brand: 'Gold Medal', category: 'Pantry', size: '5 lb', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop' },
  { id: generateId('Sugar', 'Domino'), name: 'Granulated White Sugar', brand: 'Domino', category: 'Pantry', size: '4 lb', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop' },
  { id: generateId('Brown Sugar', 'Domino'), name: 'Light Brown Sugar', brand: 'Domino', category: 'Pantry', size: '2 lb', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop' },
  { id: generateId('Honey', 'Nature Nate\'s'), name: 'Raw & Unfiltered Honey', brand: 'Nature Nate\'s', category: 'Pantry', size: '16 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop' },
  { id: generateId('Peanut Butter', 'Jif'), name: 'Creamy Peanut Butter', brand: 'Jif', category: 'Pantry', size: '16 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=200&h=200&fit=crop' },
  { id: generateId('Peanut Butter', 'Skippy'), name: 'Crunchy Peanut Butter', brand: 'Skippy', category: 'Pantry', size: '16.3 oz', basePrice: 3.79, imageUrl: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=200&h=200&fit=crop' },
  { id: generateId('Grape Jelly', 'Welch\'s'), name: 'Concord Grape Jelly', brand: 'Welch\'s', category: 'Pantry', size: '18 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop' },
  { id: generateId('Strawberry Jam', 'Smucker\'s'), name: 'Strawberry Jam', brand: 'Smucker\'s', category: 'Pantry', size: '18 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop' },
  { id: generateId('Black Beans', 'Goya'), name: 'Black Beans', brand: 'Goya', category: 'Pantry', size: '15.5 oz', basePrice: 1.29, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Pinto Beans', 'Bush\'s'), name: 'Pinto Beans', brand: 'Bush\'s Best', category: 'Pantry', size: '16 oz', basePrice: 1.49, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Kidney Beans', 'Bush\'s'), name: 'Dark Red Kidney Beans', brand: 'Bush\'s Best', category: 'Pantry', size: '16 oz', basePrice: 1.49, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Chickpeas', 'Goya'), name: 'Chickpeas Garbanzo Beans', brand: 'Goya', category: 'Pantry', size: '15.5 oz', basePrice: 1.29, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Canned Corn', 'Green Giant'), name: 'Whole Kernel Corn', brand: 'Green Giant', category: 'Pantry', size: '15.25 oz', basePrice: 1.29, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Green Beans', 'Del Monte'), name: 'Cut Green Beans', brand: 'Del Monte', category: 'Pantry', size: '14.5 oz', basePrice: 1.19, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Canned Peas', 'Del Monte'), name: 'Sweet Peas', brand: 'Del Monte', category: 'Pantry', size: '15 oz', basePrice: 1.19, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Canned Tuna', 'StarKist'), name: 'Chunk Light Tuna in Water', brand: 'StarKist', category: 'Pantry', size: '5 oz', basePrice: 1.49, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Canned Salmon', 'Chicken of Sea'), name: 'Pink Salmon', brand: 'Chicken of the Sea', category: 'Pantry', size: '14.75 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&h=200&fit=crop' },
  { id: generateId('Cereal', 'Cheerios'), name: 'Cheerios Original', brand: 'General Mills', category: 'Pantry', size: '18 oz', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=200&h=200&fit=crop' },
  { id: generateId('Cereal', 'Honey Nut Cheerios'), name: 'Honey Nut Cheerios', brand: 'General Mills', category: 'Pantry', size: '19.5 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=200&h=200&fit=crop' },
  { id: generateId('Cereal', 'Frosted Flakes'), name: 'Frosted Flakes', brand: 'Kellogg\'s', category: 'Pantry', size: '19.2 oz', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=200&h=200&fit=crop' },
  { id: generateId('Oatmeal', 'Quaker'), name: 'Old Fashioned Oats', brand: 'Quaker', category: 'Pantry', size: '42 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop' },
  { id: generateId('Granola', 'Nature Valley'), name: 'Oats & Honey Granola', brand: 'Nature Valley', category: 'Pantry', size: '16 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop' },
  { id: generateId('Pancake Mix', 'Bisquick'), name: 'Original Pancake Mix', brand: 'Bisquick', category: 'Pantry', size: '40 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop' },
  { id: generateId('Maple Syrup', 'Log Cabin'), name: 'Original Syrup', brand: 'Log Cabin', category: 'Pantry', size: '24 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop' },
  { id: generateId('Pure Maple Syrup', 'Kirkland'), name: 'Pure Maple Syrup', brand: 'Kirkland Signature', category: 'Pantry', size: '33.8 oz', basePrice: 14.99, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop' },
  { id: generateId('Mayonnaise', 'Hellmann\'s'), name: 'Real Mayonnaise', brand: 'Hellmann\'s', category: 'Pantry', size: '30 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=200&h=200&fit=crop' },
  { id: generateId('Ketchup', 'Heinz'), name: 'Tomato Ketchup', brand: 'Heinz', category: 'Pantry', size: '32 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop' },
  { id: generateId('Mustard', 'French\'s'), name: 'Classic Yellow Mustard', brand: 'French\'s', category: 'Pantry', size: '14 oz', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1528750717929-32abb73d3bd9?w=200&h=200&fit=crop' },
  { id: generateId('Ranch Dressing', 'Hidden Valley'), name: 'Ranch Dressing', brand: 'Hidden Valley', category: 'Pantry', size: '16 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop' },
  { id: generateId('Soy Sauce', 'Kikkoman'), name: 'Soy Sauce', brand: 'Kikkoman', category: 'Pantry', size: '15 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200&h=200&fit=crop' },
  { id: generateId('Hot Sauce', 'Tabasco'), name: 'Original Red Pepper Sauce', brand: 'Tabasco', category: 'Pantry', size: '5 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=200&h=200&fit=crop' },
  
  // === FROZEN (30 items) ===
  { id: generateId('Frozen Pizza', 'DiGiorno'), name: 'Rising Crust Pepperoni Pizza', brand: 'DiGiorno', category: 'Frozen', size: '27.5 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Pizza', 'Red Baron'), name: 'Classic Crust Pepperoni', brand: 'Red Baron', category: 'Frozen', size: '20.6 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Pizza', 'Totino\'s'), name: 'Party Pizza Pepperoni', brand: 'Totino\'s', category: 'Frozen', size: '10.2 oz', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: generateId('Ice Cream', 'Ben & Jerry\'s'), name: 'Half Baked Ice Cream', brand: 'Ben & Jerry\'s', category: 'Frozen', size: '16 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=200&fit=crop' },
  { id: generateId('Ice Cream', 'Häagen-Dazs'), name: 'Vanilla Bean Ice Cream', brand: 'Häagen-Dazs', category: 'Frozen', size: '14 oz', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=200&fit=crop' },
  { id: generateId('Ice Cream', 'Tillamook'), name: 'Vanilla Bean Ice Cream', brand: 'Tillamook', category: 'Frozen', size: '48 oz', basePrice: 6.99, imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Vegetables', 'Birds Eye'), name: 'Steamfresh Mixed Vegetables', brand: 'Birds Eye', category: 'Frozen', size: '10 oz', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Broccoli', 'Birds Eye'), name: 'Steamfresh Broccoli Florets', brand: 'Birds Eye', category: 'Frozen', size: '10.8 oz', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Corn', 'Green Giant'), name: 'Steamers Sweet Corn', brand: 'Green Giant', category: 'Frozen', size: '10 oz', basePrice: 2.29, imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Peas', 'Birds Eye'), name: 'Sweet Garden Peas', brand: 'Birds Eye', category: 'Frozen', size: '13 oz', basePrice: 2.29, imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Berries', 'Dole'), name: 'Mixed Berries', brand: 'Dole', category: 'Frozen', size: '12 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Strawberries', 'Dole'), name: 'Whole Strawberries', brand: 'Dole', category: 'Frozen', size: '16 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop' },
  { id: generateId('French Fries', 'Ore-Ida'), name: 'Golden Fries', brand: 'Ore-Ida', category: 'Frozen', size: '32 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { id: generateId('Tater Tots', 'Ore-Ida'), name: 'Tater Tots', brand: 'Ore-Ida', category: 'Frozen', size: '32 oz', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { id: generateId('Hash Browns', 'Ore-Ida'), name: 'Shredded Hash Browns', brand: 'Ore-Ida', category: 'Frozen', size: '30 oz', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Chicken Nuggets', 'Tyson'), name: 'Chicken Nuggets', brand: 'Tyson', category: 'Frozen', size: '32 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Chicken Strips', 'Tyson'), name: 'Crispy Chicken Strips', brand: 'Tyson', category: 'Frozen', size: '25 oz', basePrice: 10.99, imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Fish Sticks', 'Gorton\'s'), name: 'Fish Sticks', brand: 'Gorton\'s', category: 'Frozen', size: '19 oz', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1510130113356-d94cc07bbcc5?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Shrimp', 'SeaPak'), name: 'Popcorn Shrimp', brand: 'SeaPak', category: 'Frozen', size: '18 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Burritos', 'El Monterey'), name: 'Bean & Cheese Burritos', brand: 'El Monterey', category: 'Frozen', size: '8 count', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&h=200&fit=crop' },
  { id: generateId('Hot Pockets', 'Hot Pockets'), name: 'Pepperoni Pizza Hot Pockets', brand: 'Hot Pockets', category: 'Frozen', size: '4 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Waffles', 'Eggo'), name: 'Homestyle Waffles', brand: 'Eggo', category: 'Frozen', size: '10 count', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Pancakes', 'Aunt Jemima'), name: 'Buttermilk Pancakes', brand: 'Aunt Jemima', category: 'Frozen', size: '12 count', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Breakfast Sandwich', 'Jimmy Dean'), name: 'Croissant Breakfast Sandwich', brand: 'Jimmy Dean', category: 'Frozen', size: '4 count', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Pot Pie', 'Marie Callender\'s'), name: 'Chicken Pot Pie', brand: 'Marie Callender\'s', category: 'Frozen', size: '15 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop' },
  { id: generateId('Lean Cuisine', 'Lean Cuisine'), name: 'Chicken Alfredo', brand: 'Lean Cuisine', category: 'Frozen', size: '10 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=200&h=200&fit=crop' },
  { id: generateId('Stouffer\'s', 'Stouffer\'s'), name: 'Lasagna with Meat Sauce', brand: 'Stouffer\'s', category: 'Frozen', size: '19 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Fruit Bars', 'Outshine'), name: 'Strawberry Fruit Bars', brand: 'Outshine', category: 'Frozen', size: '6 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=200&h=200&fit=crop' },
  { id: generateId('Popsicles', 'Popsicle'), name: 'Rainbow Ice Pops', brand: 'Popsicle', category: 'Frozen', size: '18 count', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=200&h=200&fit=crop' },
  { id: generateId('Frozen Pie Crust', 'Pillsbury'), name: 'Pie Crusts', brand: 'Pillsbury', category: 'Frozen', size: '2 count', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop' },
  
  // === BEVERAGES (25 items) ===
  { id: generateId('Coca-Cola', 'Coca-Cola'), name: 'Coca-Cola', brand: 'Coca-Cola', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop' },
  { id: generateId('Pepsi', 'Pepsi'), name: 'Pepsi', brand: 'Pepsi', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=200&h=200&fit=crop' },
  { id: generateId('Sprite', 'Coca-Cola'), name: 'Sprite', brand: 'Sprite', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop' },
  { id: generateId('Mountain Dew', 'Pepsi'), name: 'Mountain Dew', brand: 'Mountain Dew', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
  { id: generateId('Dr Pepper', 'Dr Pepper'), name: 'Dr Pepper', brand: 'Dr Pepper', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
  { id: generateId('La Croix', 'La Croix'), name: 'Sparkling Water Lime', brand: 'LaCroix', category: 'Beverages', size: '8 pack 12 oz cans', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&h=200&fit=crop' },
  { id: generateId('Bottled Water', 'Dasani'), name: 'Purified Water', brand: 'Dasani', category: 'Beverages', size: '24 pack 16.9 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
  { id: generateId('Bottled Water', 'Fiji'), name: 'Natural Artesian Water', brand: 'Fiji', category: 'Beverages', size: '6 pack 16.9 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
  { id: generateId('Bottled Water', 'Kirkland'), name: 'Purified Drinking Water', brand: 'Kirkland Signature', category: 'Beverages', size: '40 pack 16.9 oz', basePrice: 4.49, isPrivateLabel: true, imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
  { id: generateId('Orange Juice', 'Tropicana'), name: 'Orange Juice No Pulp', brand: 'Tropicana', category: 'Beverages', size: '52 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop' },
  { id: generateId('Orange Juice', 'Simply'), name: 'Orange Juice Pulp Free', brand: 'Simply Orange', category: 'Beverages', size: '52 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop' },
  { id: generateId('Apple Juice', 'Mott\'s'), name: '100% Apple Juice', brand: 'Mott\'s', category: 'Beverages', size: '64 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=200&h=200&fit=crop' },
  { id: generateId('Grape Juice', 'Welch\'s'), name: '100% Grape Juice', brand: 'Welch\'s', category: 'Beverages', size: '64 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=200&h=200&fit=crop' },
  { id: generateId('Lemonade', 'Simply'), name: 'Lemonade', brand: 'Simply Lemonade', category: 'Beverages', size: '52 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&h=200&fit=crop' },
  { id: generateId('Iced Tea', 'Gold Peak'), name: 'Sweet Tea', brand: 'Gold Peak', category: 'Beverages', size: '59 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
  { id: generateId('Green Tea', 'Arizona'), name: 'Green Tea with Ginseng', brand: 'Arizona', category: 'Beverages', size: '1 gallon', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop' },
  { id: generateId('Coffee', 'Folgers'), name: 'Classic Roast Ground Coffee', brand: 'Folgers', category: 'Beverages', size: '30.5 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop' },
  { id: generateId('Coffee', 'Starbucks'), name: 'Pike Place Roast Ground', brand: 'Starbucks', category: 'Beverages', size: '12 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop' },
  { id: generateId('K-Cups', 'Green Mountain'), name: 'Breakfast Blend K-Cups', brand: 'Green Mountain', category: 'Beverages', size: '24 count', basePrice: 14.99, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop' },
  { id: generateId('Energy Drink', 'Red Bull'), name: 'Red Bull Energy Drink', brand: 'Red Bull', category: 'Beverages', size: '4 pack 8.4 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop' },
  { id: generateId('Energy Drink', 'Monster'), name: 'Monster Energy Original', brand: 'Monster', category: 'Beverages', size: '4 pack 16 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop' },
  { id: generateId('Gatorade', 'Gatorade'), name: 'Gatorade Fruit Punch', brand: 'Gatorade', category: 'Beverages', size: '8 pack 20 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop' },
  { id: generateId('Coconut Water', 'Vita Coco'), name: 'Coconut Water Original', brand: 'Vita Coco', category: 'Beverages', size: '33.8 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
  { id: generateId('Protein Shake', 'Ensure'), name: 'Nutrition Shake Chocolate', brand: 'Ensure', category: 'Beverages', size: '6 pack 8 oz', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop' },
  { id: generateId('Hot Chocolate', 'Swiss Miss'), name: 'Hot Cocoa Mix', brand: 'Swiss Miss', category: 'Beverages', size: '8 count', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop' },
  
  // === SNACKS (25 items) ===
  { id: generateId('Potato Chips', 'Lay\'s'), name: 'Classic Potato Chips', brand: 'Lay\'s', category: 'Snacks', size: '10 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Potato Chips', 'Ruffles'), name: 'Ridged Potato Chips', brand: 'Ruffles', category: 'Snacks', size: '10 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Doritos', 'Doritos'), name: 'Nacho Cheese Doritos', brand: 'Doritos', category: 'Snacks', size: '9.25 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=200&h=200&fit=crop' },
  { id: generateId('Cheetos', 'Cheetos'), name: 'Crunchy Cheetos', brand: 'Cheetos', category: 'Snacks', size: '8.5 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=200&h=200&fit=crop' },
  { id: generateId('Tortilla Chips', 'Tostitos'), name: 'Scoops Tortilla Chips', brand: 'Tostitos', category: 'Snacks', size: '10 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=200&h=200&fit=crop' },
  { id: generateId('Salsa', 'Tostitos'), name: 'Medium Chunky Salsa', brand: 'Tostitos', category: 'Snacks', size: '15.5 oz', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=200&h=200&fit=crop' },
  { id: generateId('Pretzels', 'Snyder\'s'), name: 'Mini Pretzels', brand: 'Snyder\'s of Hanover', category: 'Snacks', size: '16 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Goldfish', 'Pepperidge Farm'), name: 'Goldfish Cheddar', brand: 'Pepperidge Farm', category: 'Snacks', size: '6.6 oz', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Crackers', 'Ritz'), name: 'Original Crackers', brand: 'Ritz', category: 'Snacks', size: '13.7 oz', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Crackers', 'Triscuit'), name: 'Original Triscuit', brand: 'Triscuit', category: 'Snacks', size: '8.5 oz', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Cookies', 'Oreo'), name: 'Original Oreo', brand: 'Oreo', category: 'Snacks', size: '14.3 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop' },
  { id: generateId('Cookies', 'Chips Ahoy'), name: 'Original Chips Ahoy', brand: 'Chips Ahoy', category: 'Snacks', size: '13 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop' },
  { id: generateId('Granola Bars', 'Nature Valley'), name: 'Crunchy Oats & Honey', brand: 'Nature Valley', category: 'Snacks', size: '12 count', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop' },
  { id: generateId('Granola Bars', 'Kind'), name: 'Dark Chocolate Nuts & Sea Salt', brand: 'Kind', category: 'Snacks', size: '6 count', basePrice: 6.99, imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop' },
  { id: generateId('Trail Mix', 'Planters'), name: 'Trail Mix Nuts & Chocolate', brand: 'Planters', category: 'Snacks', size: '6 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop' },
  { id: generateId('Mixed Nuts', 'Planters'), name: 'Deluxe Mixed Nuts', brand: 'Planters', category: 'Snacks', size: '10.3 oz', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop' },
  { id: generateId('Almonds', 'Blue Diamond'), name: 'Whole Natural Almonds', brand: 'Blue Diamond', category: 'Snacks', size: '16 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop' },
  { id: generateId('Popcorn', 'Orville Redenbacher'), name: 'Microwave Popcorn Butter', brand: 'Orville Redenbacher\'s', category: 'Snacks', size: '6 count', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4132e?w=200&h=200&fit=crop' },
  { id: generateId('Popcorn', 'SkinnyPop'), name: 'Original Popcorn', brand: 'SkinnyPop', category: 'Snacks', size: '4.4 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4132e?w=200&h=200&fit=crop' },
  { id: generateId('Beef Jerky', 'Jack Link\'s'), name: 'Original Beef Jerky', brand: 'Jack Link\'s', category: 'Snacks', size: '2.85 oz', basePrice: 6.99, imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop' },
  { id: generateId('Fruit Snacks', 'Welch\'s'), name: 'Mixed Fruit Snacks', brand: 'Welch\'s', category: 'Snacks', size: '10 count', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=200&h=200&fit=crop' },
  { id: generateId('Rice Cakes', 'Quaker'), name: 'Lightly Salted Rice Cakes', brand: 'Quaker', category: 'Snacks', size: '4.47 oz', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop' },
  { id: generateId('Hummus', 'Sabra'), name: 'Classic Hummus', brand: 'Sabra', category: 'Snacks', size: '10 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=200&h=200&fit=crop' },
  { id: generateId('Guacamole', 'Wholly'), name: 'Classic Guacamole', brand: 'Wholly Guacamole', category: 'Snacks', size: '8 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop' },
  { id: generateId('String Cheese', 'Sargento'), name: 'Light String Cheese', brand: 'Sargento', category: 'Snacks', size: '12 count', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop' },
  
  // === BAKERY (15 items) ===
  { id: generateId('White Bread', 'Wonder'), name: 'Classic White Bread', brand: 'Wonder', category: 'Bakery', size: '20 oz', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=200&h=200&fit=crop' },
  { id: generateId('Whole Wheat Bread', 'Nature\'s Own'), name: '100% Whole Wheat Bread', brand: 'Nature\'s Own', category: 'Bakery', size: '20 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' },
  { id: generateId('Sourdough Bread', 'San Francisco'), name: 'Sourdough Round', brand: 'San Francisco Baking Co.', category: 'Bakery', size: '24 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=200&h=200&fit=crop' },
  { id: generateId('Bagels', 'Thomas'), name: 'Plain Bagels', brand: 'Thomas\'', category: 'Bakery', size: '6 count', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aed1?w=200&h=200&fit=crop' },
  { id: generateId('English Muffins', 'Thomas'), name: 'Original English Muffins', brand: 'Thomas\'', category: 'Bakery', size: '6 count', basePrice: 4.29, imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=200&h=200&fit=crop' },
  { id: generateId('Hamburger Buns', 'Nature\'s Own'), name: 'Butter Hamburger Buns', brand: 'Nature\'s Own', category: 'Bakery', size: '8 count', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=200&h=200&fit=crop' },
  { id: generateId('Hot Dog Buns', 'Sunbeam'), name: 'Hot Dog Buns', brand: 'Sunbeam', category: 'Bakery', size: '8 count', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=200&h=200&fit=crop' },
  { id: generateId('Tortillas Flour', 'Mission'), name: 'Flour Tortillas Soft Taco', brand: 'Mission', category: 'Bakery', size: '10 count', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&h=200&fit=crop' },
  { id: generateId('Tortillas Corn', 'Mission'), name: 'Yellow Corn Tortillas', brand: 'Mission', category: 'Bakery', size: '30 count', basePrice: 2.99, imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&h=200&fit=crop' },
  { id: generateId('Croissants', 'Marketside'), name: 'Butter Croissants', brand: 'Bakery Fresh', category: 'Bakery', size: '4 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=200&h=200&fit=crop' },
  { id: generateId('Muffins Blueberry', 'Otis Spunkmeyer'), name: 'Blueberry Muffins', brand: 'Otis Spunkmeyer', category: 'Bakery', size: '4 count', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=200&h=200&fit=crop' },
  { id: generateId('Donuts', 'Entenmann\'s'), name: 'Rich Frosted Donuts', brand: 'Entenmann\'s', category: 'Bakery', size: '8 count', basePrice: 5.49, imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop' },
  { id: generateId('Cinnamon Rolls', 'Pillsbury'), name: 'Cinnamon Rolls with Icing', brand: 'Pillsbury', category: 'Bakery', size: '8 count', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=200&h=200&fit=crop' },
  { id: generateId('Biscuits', 'Pillsbury'), name: 'Grands! Flaky Layers Biscuits', brand: 'Pillsbury', category: 'Bakery', size: '8 count', basePrice: 3.49, imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=200&h=200&fit=crop' },
  { id: generateId('Pizza Dough', 'Pillsbury'), name: 'Classic Pizza Crust', brand: 'Pillsbury', category: 'Bakery', size: '13.8 oz', basePrice: 3.29, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  
  // === HOUSEHOLD (15 items) ===
  { id: generateId('Paper Towels', 'Bounty'), name: 'Select-A-Size Paper Towels', brand: 'Bounty', category: 'Household', size: '8 rolls', basePrice: 19.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Toilet Paper', 'Charmin'), name: 'Ultra Soft Toilet Paper', brand: 'Charmin', category: 'Household', size: '12 mega rolls', basePrice: 21.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Tissues', 'Kleenex'), name: 'Ultra Soft Tissues', brand: 'Kleenex', category: 'Household', size: '4 boxes', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Trash Bags', 'Hefty'), name: 'Strong Trash Bags 13 gal', brand: 'Hefty', category: 'Household', size: '80 count', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Dish Soap', 'Dawn'), name: 'Ultra Dishwashing Liquid', brand: 'Dawn', category: 'Household', size: '19.4 oz', basePrice: 3.99, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Dishwasher Pods', 'Cascade'), name: 'Platinum ActionPacs', brand: 'Cascade', category: 'Household', size: '36 count', basePrice: 15.99, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Laundry Detergent', 'Tide'), name: 'Liquid Laundry Detergent', brand: 'Tide', category: 'Household', size: '92 oz', basePrice: 14.99, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Dryer Sheets', 'Bounce'), name: 'Dryer Sheets Fresh Linen', brand: 'Bounce', category: 'Household', size: '160 count', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('All-Purpose Cleaner', 'Lysol'), name: 'All-Purpose Cleaner', brand: 'Lysol', category: 'Household', size: '32 oz', basePrice: 4.49, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Disinfecting Wipes', 'Clorox'), name: 'Disinfecting Wipes', brand: 'Clorox', category: 'Household', size: '75 count', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Aluminum Foil', 'Reynolds'), name: 'Aluminum Foil', brand: 'Reynolds Wrap', category: 'Household', size: '75 sq ft', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Plastic Wrap', 'Glad'), name: 'Press\'n Seal Wrap', brand: 'Glad', category: 'Household', size: '70 sq ft', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Ziploc Bags', 'Ziploc'), name: 'Gallon Storage Bags', brand: 'Ziploc', category: 'Household', size: '38 count', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  { id: generateId('Sponges', 'Scotch-Brite'), name: 'Non-Scratch Scrub Sponges', brand: 'Scotch-Brite', category: 'Household', size: '6 count', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Light Bulbs', 'GE'), name: 'LED Light Bulbs 60W', brand: 'GE', category: 'Household', size: '4 count', basePrice: 9.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
  
  // === PERSONAL CARE (10 items) ===
  { id: generateId('Toothpaste', 'Colgate'), name: 'Total Whitening Toothpaste', brand: 'Colgate', category: 'Personal Care', size: '4.8 oz', basePrice: 4.99, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop' },
  { id: generateId('Toothbrush', 'Oral-B'), name: 'Soft Bristle Toothbrush', brand: 'Oral-B', category: 'Personal Care', size: '2 count', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop' },
  { id: generateId('Shampoo', 'Head & Shoulders'), name: 'Classic Clean Shampoo', brand: 'Head & Shoulders', category: 'Personal Care', size: '23.7 oz', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: generateId('Conditioner', 'Pantene'), name: 'Daily Moisture Conditioner', brand: 'Pantene', category: 'Personal Care', size: '24 oz', basePrice: 6.99, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: generateId('Body Wash', 'Dove'), name: 'Deep Moisture Body Wash', brand: 'Dove', category: 'Personal Care', size: '22 oz', basePrice: 7.99, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: generateId('Deodorant', 'Degree'), name: 'Cool Rush Antiperspirant', brand: 'Degree', category: 'Personal Care', size: '2.7 oz', basePrice: 5.99, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: generateId('Hand Soap', 'Softsoap'), name: 'Liquid Hand Soap Fresh Breeze', brand: 'Softsoap', category: 'Personal Care', size: '7.5 oz', basePrice: 2.49, imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=200&h=200&fit=crop' },
  { id: generateId('Lotion', 'Aveeno'), name: 'Daily Moisturizing Lotion', brand: 'Aveeno', category: 'Personal Care', size: '18 oz', basePrice: 11.99, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: generateId('Razors', 'Gillette'), name: 'Fusion5 Razor', brand: 'Gillette', category: 'Personal Care', size: '1 handle + 2 blades', basePrice: 12.99, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop' },
  { id: generateId('Bandages', 'Band-Aid'), name: 'Flexible Fabric Bandages', brand: 'Band-Aid', category: 'Personal Care', size: '100 count', basePrice: 8.99, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop' },
];

// Generate retailer-specific pricing (Demo Mode)
export const generateRetailerPricing = (product: MockProduct): RetailerPricing => {
  const base = product.basePrice;
  
  // Some items not available at certain retailers (10% chance)
  const notAtWalmart = Math.random() < 0.05;
  const notAtCostco = Math.random() < 0.08; // Costco has less variety
  const notAtTarget = Math.random() < 0.05;
  const notAtKroger = Math.random() < 0.03;
  
  return {
    walmart: notAtWalmart 
      ? { price: null, isSubstitute: true, substituteNote: 'Similar item available' }
      : { price: getRetailerPrice(varyPrice(base, 0.08), 'walmart') },
    costco: notAtCostco 
      ? { price: null, isSubstitute: true, substituteNote: 'Bulk alternative available' }
      : { price: getRetailerPrice(varyPrice(base, 0.1), 'costco') },
    target: notAtTarget 
      ? { price: null, isSubstitute: true, substituteNote: 'Store brand available' }
      : { price: getRetailerPrice(varyPrice(base, 0.06), 'target') },
    kroger: notAtKroger 
      ? { price: null, isSubstitute: true, substituteNote: 'Kroger brand available' }
      : { price: getRetailerPrice(varyPrice(base, 0.07), 'kroger') },
  };
};

// Pre-generate all pricing (stable across sessions via seed)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Use product index as seed for consistent pricing
export const retailerPricing: Map<string, RetailerPricing> = new Map();
mockProducts.forEach((product, index) => {
  // Create deterministic pricing based on index
  const base = product.basePrice;
  const seed = index * 1000;
  
  const variance = (s: number) => {
    const r = seededRandom(s);
    return (r * 0.16) - 0.08; // -8% to +8%
  };
  
  const notAvailable = (s: number) => seededRandom(s) < 0.06;
  
  retailerPricing.set(product.id, {
    walmart: notAvailable(seed + 1) 
      ? { price: null, isSubstitute: true, substituteNote: 'Similar item available' }
      : { price: Math.round((base * (0.95 + variance(seed + 10))) * 100) / 100 },
    costco: notAvailable(seed + 2) 
      ? { price: null, isSubstitute: true, substituteNote: 'Bulk alternative available' }
      : { price: Math.round((base * (0.88 + variance(seed + 20))) * 100) / 100 },
    target: notAvailable(seed + 3) 
      ? { price: null, isSubstitute: true, substituteNote: 'Store brand available' }
      : { price: Math.round((base * (1.03 + variance(seed + 30))) * 100) / 100 },
    kroger: notAvailable(seed + 4) 
      ? { price: null, isSubstitute: true, substituteNote: 'Kroger brand available' }
      : { price: Math.round((base * (0.98 + variance(seed + 40))) * 100) / 100 },
  });
});

// Retailer info
export const retailers = [
  { id: 'walmart', name: 'Walmart', color: '#0071CE', logo: '🏪' },
  { id: 'costco', name: 'Costco', color: '#E31837', logo: '🏬' },
  { id: 'target', name: 'Target', color: '#CC0000', logo: '🎯' },
  { id: 'kroger', name: 'Kroger', color: '#0066B2', logo: '🛒' },
] as const;

export type RetailerId = typeof retailers[number]['id'];

// Search function
export const searchProducts = (query: string): MockProduct[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  ).slice(0, 20);
};

// Get product by ID
export const getProductById = (id: string): MockProduct | undefined => {
  return mockProducts.find(p => p.id === id);
};

// Get pricing for product
export const getProductPricing = (productId: string): RetailerPricing | undefined => {
  return retailerPricing.get(productId);
};
