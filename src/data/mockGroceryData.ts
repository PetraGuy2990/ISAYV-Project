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
  { id: generateId('Bananas', 'Dole'), name: 'Bananas', brand: 'Dole', category: 'Produce', size: '1 lb', basePrice: 0.59 },
  { id: generateId('Organic Bananas', 'Dole'), name: 'Organic Bananas', brand: 'Dole', category: 'Produce', size: '1 lb', basePrice: 0.79 },
  { id: generateId('Gala Apples', 'Stemilt'), name: 'Gala Apples', brand: 'Stemilt', category: 'Produce', size: '3 lb bag', basePrice: 4.99 },
  { id: generateId('Honeycrisp Apples', 'Stemilt'), name: 'Honeycrisp Apples', brand: 'Stemilt', category: 'Produce', size: '2 lb', basePrice: 5.99 },
  { id: generateId('Navel Oranges', 'Sunkist'), name: 'Navel Oranges', brand: 'Sunkist', category: 'Produce', size: '4 lb bag', basePrice: 5.49 },
  { id: generateId('Strawberries', 'Driscoll\'s'), name: 'Strawberries', brand: 'Driscoll\'s', category: 'Produce', size: '1 lb', basePrice: 3.99 },
  { id: generateId('Blueberries', 'Driscoll\'s'), name: 'Blueberries', brand: 'Driscoll\'s', category: 'Produce', size: '6 oz', basePrice: 4.49 },
  { id: generateId('Raspberries', 'Driscoll\'s'), name: 'Raspberries', brand: 'Driscoll\'s', category: 'Produce', size: '6 oz', basePrice: 4.99 },
  { id: generateId('Avocados', 'Hass'), name: 'Avocados', brand: 'Hass', category: 'Produce', size: '4 count', basePrice: 4.99 },
  { id: generateId('Baby Spinach', 'Earthbound Farm'), name: 'Baby Spinach', brand: 'Earthbound Farm', category: 'Produce', size: '5 oz', basePrice: 3.49 },
  { id: generateId('Spring Mix', 'Earthbound Farm'), name: 'Spring Mix Salad', brand: 'Earthbound Farm', category: 'Produce', size: '5 oz', basePrice: 3.99 },
  { id: generateId('Romaine Hearts', 'Fresh Express'), name: 'Romaine Hearts', brand: 'Fresh Express', category: 'Produce', size: '3 count', basePrice: 3.49 },
  { id: generateId('Baby Carrots', 'Bolthouse'), name: 'Baby Carrots', brand: 'Bolthouse', category: 'Produce', size: '1 lb', basePrice: 1.99 },
  { id: generateId('Russet Potatoes', 'Idaho'), name: 'Russet Potatoes', brand: 'Idaho', category: 'Produce', size: '5 lb bag', basePrice: 3.99 },
  { id: generateId('Sweet Potatoes', 'Generic'), name: 'Sweet Potatoes', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 1.49 },
  { id: generateId('Yellow Onions', 'Generic'), name: 'Yellow Onions', brand: 'Fresh', category: 'Produce', size: '3 lb bag', basePrice: 2.99 },
  { id: generateId('Garlic', 'Generic'), name: 'Garlic', brand: 'Fresh', category: 'Produce', size: '3 count', basePrice: 1.99 },
  { id: generateId('Broccoli Crowns', 'Generic'), name: 'Broccoli Crowns', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 2.49 },
  { id: generateId('Cauliflower', 'Generic'), name: 'Cauliflower', brand: 'Fresh', category: 'Produce', size: '1 head', basePrice: 2.99 },
  { id: generateId('Bell Peppers', 'Generic'), name: 'Bell Peppers - Mixed', brand: 'Fresh', category: 'Produce', size: '3 count', basePrice: 3.99 },
  { id: generateId('Tomatoes on Vine', 'Generic'), name: 'Tomatoes on the Vine', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 2.99 },
  { id: generateId('Roma Tomatoes', 'Generic'), name: 'Roma Tomatoes', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 1.99 },
  { id: generateId('Cucumber', 'Generic'), name: 'English Cucumber', brand: 'Fresh', category: 'Produce', size: '1 count', basePrice: 1.49 },
  { id: generateId('Zucchini', 'Generic'), name: 'Zucchini', brand: 'Fresh', category: 'Produce', size: '1 lb', basePrice: 1.79 },
  { id: generateId('Lemons', 'Sunkist'), name: 'Lemons', brand: 'Sunkist', category: 'Produce', size: '2 lb bag', basePrice: 3.49 },
  
  // === DAIRY (30 items) ===
  { id: generateId('2% Milk', 'Horizon'), name: '2% Reduced Fat Milk', brand: 'Horizon Organic', category: 'Dairy', size: '1 gallon', basePrice: 6.49 },
  { id: generateId('Whole Milk', 'Horizon'), name: 'Whole Milk', brand: 'Horizon Organic', category: 'Dairy', size: '1 gallon', basePrice: 6.49 },
  { id: generateId('2% Milk', 'Great Value'), name: '2% Reduced Fat Milk', brand: 'Great Value', category: 'Dairy', size: '1 gallon', basePrice: 3.48, isPrivateLabel: true },
  { id: generateId('Whole Milk', 'Great Value'), name: 'Whole Milk', brand: 'Great Value', category: 'Dairy', size: '1 gallon', basePrice: 3.48, isPrivateLabel: true },
  { id: generateId('2% Milk', 'Kirkland'), name: '2% Reduced Fat Milk', brand: 'Kirkland Signature', category: 'Dairy', size: '1 gallon', basePrice: 3.29, isPrivateLabel: true },
  { id: generateId('Whole Milk', 'Kirkland'), name: 'Whole Milk', brand: 'Kirkland Signature', category: 'Dairy', size: '1 gallon', basePrice: 3.29, isPrivateLabel: true },
  { id: generateId('Almond Milk', 'Almond Breeze'), name: 'Almond Milk Unsweetened', brand: 'Almond Breeze', category: 'Dairy', size: '64 oz', basePrice: 3.99 },
  { id: generateId('Oat Milk', 'Oatly'), name: 'Oat Milk Original', brand: 'Oatly', category: 'Dairy', size: '64 oz', basePrice: 5.49 },
  { id: generateId('Large Eggs', 'Eggland\'s Best'), name: 'Large Eggs', brand: 'Eggland\'s Best', category: 'Dairy', size: '12 count', basePrice: 4.99 },
  { id: generateId('Large Eggs', 'Great Value'), name: 'Large Eggs', brand: 'Great Value', category: 'Dairy', size: '12 count', basePrice: 3.29, isPrivateLabel: true },
  { id: generateId('Large Eggs', 'Kirkland'), name: 'Large Eggs Cage Free', brand: 'Kirkland Signature', category: 'Dairy', size: '24 count', basePrice: 6.99, isPrivateLabel: true },
  { id: generateId('Butter Salted', 'Land O Lakes'), name: 'Butter Salted', brand: 'Land O\'Lakes', category: 'Dairy', size: '1 lb', basePrice: 5.49 },
  { id: generateId('Butter Unsalted', 'Land O Lakes'), name: 'Butter Unsalted', brand: 'Land O\'Lakes', category: 'Dairy', size: '1 lb', basePrice: 5.49 },
  { id: generateId('Butter', 'Kerrygold'), name: 'Pure Irish Butter', brand: 'Kerrygold', category: 'Dairy', size: '8 oz', basePrice: 4.99 },
  { id: generateId('Greek Yogurt', 'Chobani'), name: 'Greek Yogurt Plain', brand: 'Chobani', category: 'Dairy', size: '32 oz', basePrice: 5.99 },
  { id: generateId('Greek Yogurt Vanilla', 'Chobani'), name: 'Greek Yogurt Vanilla', brand: 'Chobani', category: 'Dairy', size: '32 oz', basePrice: 5.99 },
  { id: generateId('Yogurt', 'Yoplait'), name: 'Original Yogurt Strawberry', brand: 'Yoplait', category: 'Dairy', size: '6 oz', basePrice: 0.89 },
  { id: generateId('Shredded Cheddar', 'Tillamook'), name: 'Shredded Sharp Cheddar', brand: 'Tillamook', category: 'Dairy', size: '8 oz', basePrice: 4.49 },
  { id: generateId('Shredded Mozzarella', 'Galbani'), name: 'Shredded Mozzarella', brand: 'Galbani', category: 'Dairy', size: '8 oz', basePrice: 3.99 },
  { id: generateId('Cream Cheese', 'Philadelphia'), name: 'Cream Cheese Original', brand: 'Philadelphia', category: 'Dairy', size: '8 oz', basePrice: 3.99 },
  { id: generateId('Sour Cream', 'Daisy'), name: 'Sour Cream', brand: 'Daisy', category: 'Dairy', size: '16 oz', basePrice: 2.99 },
  { id: generateId('Cottage Cheese', 'Breakstone'), name: 'Cottage Cheese 4%', brand: 'Breakstone\'s', category: 'Dairy', size: '16 oz', basePrice: 3.49 },
  { id: generateId('Heavy Cream', 'Organic Valley'), name: 'Heavy Whipping Cream', brand: 'Organic Valley', category: 'Dairy', size: '16 oz', basePrice: 5.99 },
  { id: generateId('Half and Half', 'Land O Lakes'), name: 'Half and Half', brand: 'Land O\'Lakes', category: 'Dairy', size: '32 oz', basePrice: 3.99 },
  { id: generateId('Parmesan Cheese', 'BelGioioso'), name: 'Parmesan Wedge', brand: 'BelGioioso', category: 'Dairy', size: '8 oz', basePrice: 7.99 },
  { id: generateId('String Cheese', 'Frigo'), name: 'String Cheese', brand: 'Frigo', category: 'Dairy', size: '12 count', basePrice: 4.99 },
  { id: generateId('American Cheese', 'Kraft'), name: 'American Cheese Singles', brand: 'Kraft', category: 'Dairy', size: '16 slices', basePrice: 4.29 },
  { id: generateId('Feta Cheese', 'Athenos'), name: 'Crumbled Feta', brand: 'Athenos', category: 'Dairy', size: '6 oz', basePrice: 4.49 },
  { id: generateId('Ricotta Cheese', 'Galbani'), name: 'Whole Milk Ricotta', brand: 'Galbani', category: 'Dairy', size: '15 oz', basePrice: 4.29 },
  { id: generateId('Whipped Cream', 'Reddi-wip'), name: 'Whipped Cream Original', brand: 'Reddi-wip', category: 'Dairy', size: '6.5 oz', basePrice: 4.49 },
  
  // === MEAT & SEAFOOD (25 items) ===
  { id: generateId('Ground Beef 80/20', 'Generic'), name: 'Ground Beef 80/20', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 5.99 },
  { id: generateId('Ground Beef 90/10', 'Generic'), name: 'Ground Beef 90/10 Lean', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 7.49 },
  { id: generateId('Chicken Breast', 'Perdue'), name: 'Boneless Skinless Chicken Breast', brand: 'Perdue', category: 'Meat & Seafood', size: '1.5 lb', basePrice: 8.99 },
  { id: generateId('Chicken Thighs', 'Perdue'), name: 'Boneless Chicken Thighs', brand: 'Perdue', category: 'Meat & Seafood', size: '1.25 lb', basePrice: 6.99 },
  { id: generateId('Whole Chicken', 'Perdue'), name: 'Whole Chicken', brand: 'Perdue', category: 'Meat & Seafood', size: '5 lb', basePrice: 9.99 },
  { id: generateId('Chicken Wings', 'Tyson'), name: 'Chicken Wings', brand: 'Tyson', category: 'Meat & Seafood', size: '2.5 lb', basePrice: 12.99 },
  { id: generateId('Bacon', 'Oscar Mayer'), name: 'Hardwood Smoked Bacon', brand: 'Oscar Mayer', category: 'Meat & Seafood', size: '16 oz', basePrice: 7.99 },
  { id: generateId('Bacon', 'Wright'), name: 'Thick Cut Bacon', brand: 'Wright Brand', category: 'Meat & Seafood', size: '24 oz', basePrice: 12.99 },
  { id: generateId('Pork Chops', 'Generic'), name: 'Bone-In Pork Chops', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 4.99 },
  { id: generateId('Pork Tenderloin', 'Smithfield'), name: 'Pork Tenderloin', brand: 'Smithfield', category: 'Meat & Seafood', size: '1.5 lb', basePrice: 8.99 },
  { id: generateId('Italian Sausage', 'Johnsonville'), name: 'Italian Sausage Links', brand: 'Johnsonville', category: 'Meat & Seafood', size: '19 oz', basePrice: 5.99 },
  { id: generateId('Breakfast Sausage', 'Jimmy Dean'), name: 'Breakfast Sausage Links', brand: 'Jimmy Dean', category: 'Meat & Seafood', size: '12 oz', basePrice: 4.99 },
  { id: generateId('Hot Dogs', 'Hebrew National'), name: 'Beef Franks', brand: 'Hebrew National', category: 'Meat & Seafood', size: '12 oz', basePrice: 5.99 },
  { id: generateId('Deli Ham', 'Boar\'s Head'), name: 'Black Forest Ham', brand: 'Boar\'s Head', category: 'Meat & Seafood', size: '8 oz', basePrice: 8.99 },
  { id: generateId('Deli Turkey', 'Boar\'s Head'), name: 'Oven Roasted Turkey', brand: 'Boar\'s Head', category: 'Meat & Seafood', size: '8 oz', basePrice: 9.49 },
  { id: generateId('Ribeye Steak', 'Generic'), name: 'Ribeye Steak', brand: 'USDA Choice', category: 'Meat & Seafood', size: '12 oz', basePrice: 14.99 },
  { id: generateId('NY Strip Steak', 'Generic'), name: 'New York Strip Steak', brand: 'USDA Choice', category: 'Meat & Seafood', size: '12 oz', basePrice: 12.99 },
  { id: generateId('Salmon Fillet', 'Generic'), name: 'Atlantic Salmon Fillet', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 12.99 },
  { id: generateId('Shrimp Raw', 'Generic'), name: 'Raw Shrimp 21-25 count', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 11.99 },
  { id: generateId('Shrimp Cooked', 'Generic'), name: 'Cooked Shrimp 31-40 count', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 12.99 },
  { id: generateId('Tilapia', 'Generic'), name: 'Tilapia Fillets', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 7.99 },
  { id: generateId('Cod', 'Generic'), name: 'Atlantic Cod Fillets', brand: 'Fresh', category: 'Meat & Seafood', size: '1 lb', basePrice: 9.99 },
  { id: generateId('Crab Meat', 'Phillips'), name: 'Lump Crab Meat', brand: 'Phillips', category: 'Meat & Seafood', size: '8 oz', basePrice: 14.99 },
  { id: generateId('Ground Turkey', 'Jennie-O'), name: 'Ground Turkey 93% Lean', brand: 'Jennie-O', category: 'Meat & Seafood', size: '1 lb', basePrice: 5.99 },
  { id: generateId('Turkey Breast', 'Butterball'), name: 'Turkey Breast Roast', brand: 'Butterball', category: 'Meat & Seafood', size: '3 lb', basePrice: 12.99 },
  
  // === PANTRY (50 items) ===
  { id: generateId('White Rice', 'Jasmine'), name: 'Jasmine White Rice', brand: 'Dynasty', category: 'Pantry', size: '5 lb', basePrice: 7.99 },
  { id: generateId('Brown Rice', 'Minute'), name: 'Instant Brown Rice', brand: 'Minute', category: 'Pantry', size: '14 oz', basePrice: 3.49 },
  { id: generateId('Spaghetti', 'Barilla'), name: 'Spaghetti', brand: 'Barilla', category: 'Pantry', size: '16 oz', basePrice: 1.99 },
  { id: generateId('Penne', 'Barilla'), name: 'Penne Rigate', brand: 'Barilla', category: 'Pantry', size: '16 oz', basePrice: 1.99 },
  { id: generateId('Fettuccine', 'Barilla'), name: 'Fettuccine', brand: 'Barilla', category: 'Pantry', size: '16 oz', basePrice: 1.99 },
  { id: generateId('Mac and Cheese', 'Kraft'), name: 'Mac & Cheese Original', brand: 'Kraft', category: 'Pantry', size: '7.25 oz', basePrice: 1.49 },
  { id: generateId('Marinara Sauce', 'Rao\'s'), name: 'Marinara Sauce', brand: 'Rao\'s Homemade', category: 'Pantry', size: '24 oz', basePrice: 8.99 },
  { id: generateId('Marinara Sauce', 'Prego'), name: 'Traditional Marinara', brand: 'Prego', category: 'Pantry', size: '24 oz', basePrice: 3.49 },
  { id: generateId('Alfredo Sauce', 'Bertolli'), name: 'Alfredo Sauce', brand: 'Bertolli', category: 'Pantry', size: '15 oz', basePrice: 3.99 },
  { id: generateId('Diced Tomatoes', 'Hunt\'s'), name: 'Diced Tomatoes', brand: 'Hunt\'s', category: 'Pantry', size: '14.5 oz', basePrice: 1.29 },
  { id: generateId('Tomato Paste', 'Hunt\'s'), name: 'Tomato Paste', brand: 'Hunt\'s', category: 'Pantry', size: '6 oz', basePrice: 0.99 },
  { id: generateId('Crushed Tomatoes', 'Tuttorosso'), name: 'Crushed Tomatoes', brand: 'Tuttorosso', category: 'Pantry', size: '28 oz', basePrice: 2.49 },
  { id: generateId('Chicken Broth', 'Swanson'), name: 'Chicken Broth', brand: 'Swanson', category: 'Pantry', size: '32 oz', basePrice: 2.99 },
  { id: generateId('Beef Broth', 'Swanson'), name: 'Beef Broth', brand: 'Swanson', category: 'Pantry', size: '32 oz', basePrice: 2.99 },
  { id: generateId('Vegetable Broth', 'Swanson'), name: 'Vegetable Broth', brand: 'Swanson', category: 'Pantry', size: '32 oz', basePrice: 2.99 },
  { id: generateId('Olive Oil', 'Bertolli'), name: 'Extra Virgin Olive Oil', brand: 'Bertolli', category: 'Pantry', size: '25.5 oz', basePrice: 9.99 },
  { id: generateId('Olive Oil', 'California Olive Ranch'), name: 'Extra Virgin Olive Oil', brand: 'California Olive Ranch', category: 'Pantry', size: '25.4 oz', basePrice: 12.99 },
  { id: generateId('Vegetable Oil', 'Wesson'), name: 'Vegetable Oil', brand: 'Wesson', category: 'Pantry', size: '48 oz', basePrice: 4.99 },
  { id: generateId('Canola Oil', 'Crisco'), name: 'Pure Canola Oil', brand: 'Crisco', category: 'Pantry', size: '48 oz', basePrice: 5.49 },
  { id: generateId('Flour', 'Gold Medal'), name: 'All-Purpose Flour', brand: 'Gold Medal', category: 'Pantry', size: '5 lb', basePrice: 4.29 },
  { id: generateId('Sugar', 'Domino'), name: 'Granulated White Sugar', brand: 'Domino', category: 'Pantry', size: '4 lb', basePrice: 3.99 },
  { id: generateId('Brown Sugar', 'Domino'), name: 'Light Brown Sugar', brand: 'Domino', category: 'Pantry', size: '2 lb', basePrice: 3.49 },
  { id: generateId('Honey', 'Nature Nate\'s'), name: 'Raw & Unfiltered Honey', brand: 'Nature Nate\'s', category: 'Pantry', size: '16 oz', basePrice: 8.99 },
  { id: generateId('Peanut Butter', 'Jif'), name: 'Creamy Peanut Butter', brand: 'Jif', category: 'Pantry', size: '16 oz', basePrice: 3.99 },
  { id: generateId('Peanut Butter', 'Skippy'), name: 'Crunchy Peanut Butter', brand: 'Skippy', category: 'Pantry', size: '16.3 oz', basePrice: 3.79 },
  { id: generateId('Grape Jelly', 'Welch\'s'), name: 'Concord Grape Jelly', brand: 'Welch\'s', category: 'Pantry', size: '18 oz', basePrice: 3.49 },
  { id: generateId('Strawberry Jam', 'Smucker\'s'), name: 'Strawberry Jam', brand: 'Smucker\'s', category: 'Pantry', size: '18 oz', basePrice: 3.99 },
  { id: generateId('Black Beans', 'Goya'), name: 'Black Beans', brand: 'Goya', category: 'Pantry', size: '15.5 oz', basePrice: 1.29 },
  { id: generateId('Pinto Beans', 'Bush\'s'), name: 'Pinto Beans', brand: 'Bush\'s Best', category: 'Pantry', size: '16 oz', basePrice: 1.49 },
  { id: generateId('Kidney Beans', 'Bush\'s'), name: 'Dark Red Kidney Beans', brand: 'Bush\'s Best', category: 'Pantry', size: '16 oz', basePrice: 1.49 },
  { id: generateId('Chickpeas', 'Goya'), name: 'Chickpeas Garbanzo Beans', brand: 'Goya', category: 'Pantry', size: '15.5 oz', basePrice: 1.29 },
  { id: generateId('Canned Corn', 'Green Giant'), name: 'Whole Kernel Corn', brand: 'Green Giant', category: 'Pantry', size: '15.25 oz', basePrice: 1.29 },
  { id: generateId('Green Beans', 'Del Monte'), name: 'Cut Green Beans', brand: 'Del Monte', category: 'Pantry', size: '14.5 oz', basePrice: 1.19 },
  { id: generateId('Canned Peas', 'Del Monte'), name: 'Sweet Peas', brand: 'Del Monte', category: 'Pantry', size: '15 oz', basePrice: 1.19 },
  { id: generateId('Canned Tuna', 'StarKist'), name: 'Chunk Light Tuna in Water', brand: 'StarKist', category: 'Pantry', size: '5 oz', basePrice: 1.49 },
  { id: generateId('Canned Salmon', 'Chicken of Sea'), name: 'Pink Salmon', brand: 'Chicken of the Sea', category: 'Pantry', size: '14.75 oz', basePrice: 4.99 },
  { id: generateId('Cereal', 'Cheerios'), name: 'Cheerios Original', brand: 'General Mills', category: 'Pantry', size: '18 oz', basePrice: 5.49 },
  { id: generateId('Cereal', 'Honey Nut Cheerios'), name: 'Honey Nut Cheerios', brand: 'General Mills', category: 'Pantry', size: '19.5 oz', basePrice: 5.99 },
  { id: generateId('Cereal', 'Frosted Flakes'), name: 'Frosted Flakes', brand: 'Kellogg\'s', category: 'Pantry', size: '19.2 oz', basePrice: 5.49 },
  { id: generateId('Oatmeal', 'Quaker'), name: 'Old Fashioned Oats', brand: 'Quaker', category: 'Pantry', size: '42 oz', basePrice: 5.99 },
  { id: generateId('Granola', 'Nature Valley'), name: 'Oats & Honey Granola', brand: 'Nature Valley', category: 'Pantry', size: '16 oz', basePrice: 4.49 },
  { id: generateId('Pancake Mix', 'Bisquick'), name: 'Original Pancake Mix', brand: 'Bisquick', category: 'Pantry', size: '40 oz', basePrice: 4.99 },
  { id: generateId('Maple Syrup', 'Log Cabin'), name: 'Original Syrup', brand: 'Log Cabin', category: 'Pantry', size: '24 oz', basePrice: 4.49 },
  { id: generateId('Pure Maple Syrup', 'Kirkland'), name: 'Pure Maple Syrup', brand: 'Kirkland Signature', category: 'Pantry', size: '33.8 oz', basePrice: 14.99, isPrivateLabel: true },
  { id: generateId('Mayonnaise', 'Hellmann\'s'), name: 'Real Mayonnaise', brand: 'Hellmann\'s', category: 'Pantry', size: '30 oz', basePrice: 5.99 },
  { id: generateId('Ketchup', 'Heinz'), name: 'Tomato Ketchup', brand: 'Heinz', category: 'Pantry', size: '32 oz', basePrice: 4.49 },
  { id: generateId('Mustard', 'French\'s'), name: 'Classic Yellow Mustard', brand: 'French\'s', category: 'Pantry', size: '14 oz', basePrice: 2.49 },
  { id: generateId('Ranch Dressing', 'Hidden Valley'), name: 'Ranch Dressing', brand: 'Hidden Valley', category: 'Pantry', size: '16 oz', basePrice: 3.99 },
  { id: generateId('Soy Sauce', 'Kikkoman'), name: 'Soy Sauce', brand: 'Kikkoman', category: 'Pantry', size: '15 oz', basePrice: 3.49 },
  { id: generateId('Hot Sauce', 'Tabasco'), name: 'Original Red Pepper Sauce', brand: 'Tabasco', category: 'Pantry', size: '5 oz', basePrice: 4.99 },
  
  // === FROZEN (30 items) ===
  { id: generateId('Frozen Pizza', 'DiGiorno'), name: 'Rising Crust Pepperoni Pizza', brand: 'DiGiorno', category: 'Frozen', size: '27.5 oz', basePrice: 8.99 },
  { id: generateId('Frozen Pizza', 'Red Baron'), name: 'Classic Crust Pepperoni', brand: 'Red Baron', category: 'Frozen', size: '20.6 oz', basePrice: 5.99 },
  { id: generateId('Frozen Pizza', 'Totino\'s'), name: 'Party Pizza Pepperoni', brand: 'Totino\'s', category: 'Frozen', size: '10.2 oz', basePrice: 2.49 },
  { id: generateId('Ice Cream', 'Ben & Jerry\'s'), name: 'Half Baked Ice Cream', brand: 'Ben & Jerry\'s', category: 'Frozen', size: '16 oz', basePrice: 5.99 },
  { id: generateId('Ice Cream', 'Häagen-Dazs'), name: 'Vanilla Bean Ice Cream', brand: 'Häagen-Dazs', category: 'Frozen', size: '14 oz', basePrice: 5.49 },
  { id: generateId('Ice Cream', 'Tillamook'), name: 'Vanilla Bean Ice Cream', brand: 'Tillamook', category: 'Frozen', size: '48 oz', basePrice: 6.99 },
  { id: generateId('Frozen Vegetables', 'Birds Eye'), name: 'Steamfresh Mixed Vegetables', brand: 'Birds Eye', category: 'Frozen', size: '10 oz', basePrice: 2.49 },
  { id: generateId('Frozen Broccoli', 'Birds Eye'), name: 'Steamfresh Broccoli Florets', brand: 'Birds Eye', category: 'Frozen', size: '10.8 oz', basePrice: 2.49 },
  { id: generateId('Frozen Corn', 'Green Giant'), name: 'Steamers Sweet Corn', brand: 'Green Giant', category: 'Frozen', size: '10 oz', basePrice: 2.29 },
  { id: generateId('Frozen Peas', 'Birds Eye'), name: 'Sweet Garden Peas', brand: 'Birds Eye', category: 'Frozen', size: '13 oz', basePrice: 2.29 },
  { id: generateId('Frozen Berries', 'Dole'), name: 'Mixed Berries', brand: 'Dole', category: 'Frozen', size: '12 oz', basePrice: 4.49 },
  { id: generateId('Frozen Strawberries', 'Dole'), name: 'Whole Strawberries', brand: 'Dole', category: 'Frozen', size: '16 oz', basePrice: 3.99 },
  { id: generateId('French Fries', 'Ore-Ida'), name: 'Golden Fries', brand: 'Ore-Ida', category: 'Frozen', size: '32 oz', basePrice: 4.99 },
  { id: generateId('Tater Tots', 'Ore-Ida'), name: 'Tater Tots', brand: 'Ore-Ida', category: 'Frozen', size: '32 oz', basePrice: 5.49 },
  { id: generateId('Hash Browns', 'Ore-Ida'), name: 'Shredded Hash Browns', brand: 'Ore-Ida', category: 'Frozen', size: '30 oz', basePrice: 4.29 },
  { id: generateId('Frozen Chicken Nuggets', 'Tyson'), name: 'Chicken Nuggets', brand: 'Tyson', category: 'Frozen', size: '32 oz', basePrice: 9.99 },
  { id: generateId('Frozen Chicken Strips', 'Tyson'), name: 'Crispy Chicken Strips', brand: 'Tyson', category: 'Frozen', size: '25 oz', basePrice: 10.99 },
  { id: generateId('Frozen Fish Sticks', 'Gorton\'s'), name: 'Fish Sticks', brand: 'Gorton\'s', category: 'Frozen', size: '19 oz', basePrice: 7.99 },
  { id: generateId('Frozen Shrimp', 'SeaPak'), name: 'Popcorn Shrimp', brand: 'SeaPak', category: 'Frozen', size: '18 oz', basePrice: 9.99 },
  { id: generateId('Frozen Burritos', 'El Monterey'), name: 'Bean & Cheese Burritos', brand: 'El Monterey', category: 'Frozen', size: '8 count', basePrice: 5.99 },
  { id: generateId('Hot Pockets', 'Hot Pockets'), name: 'Pepperoni Pizza Hot Pockets', brand: 'Hot Pockets', category: 'Frozen', size: '4 count', basePrice: 4.99 },
  { id: generateId('Frozen Waffles', 'Eggo'), name: 'Homestyle Waffles', brand: 'Eggo', category: 'Frozen', size: '10 count', basePrice: 3.99 },
  { id: generateId('Frozen Pancakes', 'Aunt Jemima'), name: 'Buttermilk Pancakes', brand: 'Aunt Jemima', category: 'Frozen', size: '12 count', basePrice: 3.49 },
  { id: generateId('Frozen Breakfast Sandwich', 'Jimmy Dean'), name: 'Croissant Breakfast Sandwich', brand: 'Jimmy Dean', category: 'Frozen', size: '4 count', basePrice: 7.99 },
  { id: generateId('Frozen Pot Pie', 'Marie Callender\'s'), name: 'Chicken Pot Pie', brand: 'Marie Callender\'s', category: 'Frozen', size: '15 oz', basePrice: 4.49 },
  { id: generateId('Lean Cuisine', 'Lean Cuisine'), name: 'Chicken Alfredo', brand: 'Lean Cuisine', category: 'Frozen', size: '10 oz', basePrice: 3.49 },
  { id: generateId('Stouffer\'s', 'Stouffer\'s'), name: 'Lasagna with Meat Sauce', brand: 'Stouffer\'s', category: 'Frozen', size: '19 oz', basePrice: 5.99 },
  { id: generateId('Frozen Fruit Bars', 'Outshine'), name: 'Strawberry Fruit Bars', brand: 'Outshine', category: 'Frozen', size: '6 count', basePrice: 4.99 },
  { id: generateId('Popsicles', 'Popsicle'), name: 'Rainbow Ice Pops', brand: 'Popsicle', category: 'Frozen', size: '18 count', basePrice: 4.49 },
  { id: generateId('Frozen Pie Crust', 'Pillsbury'), name: 'Pie Crusts', brand: 'Pillsbury', category: 'Frozen', size: '2 count', basePrice: 3.99 },
  
  // === BEVERAGES (25 items) ===
  { id: generateId('Coca-Cola', 'Coca-Cola'), name: 'Coca-Cola', brand: 'Coca-Cola', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99 },
  { id: generateId('Pepsi', 'Pepsi'), name: 'Pepsi', brand: 'Pepsi', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99 },
  { id: generateId('Sprite', 'Coca-Cola'), name: 'Sprite', brand: 'Sprite', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99 },
  { id: generateId('Mountain Dew', 'Pepsi'), name: 'Mountain Dew', brand: 'Mountain Dew', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99 },
  { id: generateId('Dr Pepper', 'Dr Pepper'), name: 'Dr Pepper', brand: 'Dr Pepper', category: 'Beverages', size: '12 pack 12 oz cans', basePrice: 7.99 },
  { id: generateId('La Croix', 'La Croix'), name: 'Sparkling Water Lime', brand: 'LaCroix', category: 'Beverages', size: '8 pack 12 oz cans', basePrice: 4.99 },
  { id: generateId('Bottled Water', 'Dasani'), name: 'Purified Water', brand: 'Dasani', category: 'Beverages', size: '24 pack 16.9 oz', basePrice: 5.99 },
  { id: generateId('Bottled Water', 'Fiji'), name: 'Natural Artesian Water', brand: 'Fiji', category: 'Beverages', size: '6 pack 16.9 oz', basePrice: 8.99 },
  { id: generateId('Bottled Water', 'Kirkland'), name: 'Purified Drinking Water', brand: 'Kirkland Signature', category: 'Beverages', size: '40 pack 16.9 oz', basePrice: 4.49, isPrivateLabel: true },
  { id: generateId('Orange Juice', 'Tropicana'), name: 'Orange Juice No Pulp', brand: 'Tropicana', category: 'Beverages', size: '52 oz', basePrice: 4.99 },
  { id: generateId('Orange Juice', 'Simply'), name: 'Orange Juice Pulp Free', brand: 'Simply Orange', category: 'Beverages', size: '52 oz', basePrice: 4.49 },
  { id: generateId('Apple Juice', 'Mott\'s'), name: '100% Apple Juice', brand: 'Mott\'s', category: 'Beverages', size: '64 oz', basePrice: 3.49 },
  { id: generateId('Grape Juice', 'Welch\'s'), name: '100% Grape Juice', brand: 'Welch\'s', category: 'Beverages', size: '64 oz', basePrice: 4.49 },
  { id: generateId('Lemonade', 'Simply'), name: 'Lemonade', brand: 'Simply Lemonade', category: 'Beverages', size: '52 oz', basePrice: 3.99 },
  { id: generateId('Iced Tea', 'Gold Peak'), name: 'Sweet Tea', brand: 'Gold Peak', category: 'Beverages', size: '59 oz', basePrice: 3.49 },
  { id: generateId('Green Tea', 'Arizona'), name: 'Green Tea with Ginseng', brand: 'Arizona', category: 'Beverages', size: '1 gallon', basePrice: 3.49 },
  { id: generateId('Coffee', 'Folgers'), name: 'Classic Roast Ground Coffee', brand: 'Folgers', category: 'Beverages', size: '30.5 oz', basePrice: 9.99 },
  { id: generateId('Coffee', 'Starbucks'), name: 'Pike Place Roast Ground', brand: 'Starbucks', category: 'Beverages', size: '12 oz', basePrice: 9.99 },
  { id: generateId('K-Cups', 'Green Mountain'), name: 'Breakfast Blend K-Cups', brand: 'Green Mountain', category: 'Beverages', size: '24 count', basePrice: 14.99 },
  { id: generateId('Energy Drink', 'Red Bull'), name: 'Red Bull Energy Drink', brand: 'Red Bull', category: 'Beverages', size: '4 pack 8.4 oz', basePrice: 9.99 },
  { id: generateId('Energy Drink', 'Monster'), name: 'Monster Energy Original', brand: 'Monster', category: 'Beverages', size: '4 pack 16 oz', basePrice: 9.99 },
  { id: generateId('Gatorade', 'Gatorade'), name: 'Gatorade Fruit Punch', brand: 'Gatorade', category: 'Beverages', size: '8 pack 20 oz', basePrice: 8.99 },
  { id: generateId('Coconut Water', 'Vita Coco'), name: 'Coconut Water Original', brand: 'Vita Coco', category: 'Beverages', size: '33.8 oz', basePrice: 4.99 },
  { id: generateId('Protein Shake', 'Ensure'), name: 'Nutrition Shake Chocolate', brand: 'Ensure', category: 'Beverages', size: '6 pack 8 oz', basePrice: 12.99 },
  { id: generateId('Hot Chocolate', 'Swiss Miss'), name: 'Hot Cocoa Mix', brand: 'Swiss Miss', category: 'Beverages', size: '8 count', basePrice: 2.99 },
  
  // === SNACKS (25 items) ===
  { id: generateId('Potato Chips', 'Lay\'s'), name: 'Classic Potato Chips', brand: 'Lay\'s', category: 'Snacks', size: '10 oz', basePrice: 4.49 },
  { id: generateId('Potato Chips', 'Ruffles'), name: 'Ridged Potato Chips', brand: 'Ruffles', category: 'Snacks', size: '10 oz', basePrice: 4.49 },
  { id: generateId('Doritos', 'Doritos'), name: 'Nacho Cheese Doritos', brand: 'Doritos', category: 'Snacks', size: '9.25 oz', basePrice: 4.99 },
  { id: generateId('Cheetos', 'Cheetos'), name: 'Crunchy Cheetos', brand: 'Cheetos', category: 'Snacks', size: '8.5 oz', basePrice: 4.49 },
  { id: generateId('Tortilla Chips', 'Tostitos'), name: 'Scoops Tortilla Chips', brand: 'Tostitos', category: 'Snacks', size: '10 oz', basePrice: 4.49 },
  { id: generateId('Salsa', 'Tostitos'), name: 'Medium Chunky Salsa', brand: 'Tostitos', category: 'Snacks', size: '15.5 oz', basePrice: 4.29 },
  { id: generateId('Pretzels', 'Snyder\'s'), name: 'Mini Pretzels', brand: 'Snyder\'s of Hanover', category: 'Snacks', size: '16 oz', basePrice: 3.99 },
  { id: generateId('Goldfish', 'Pepperidge Farm'), name: 'Goldfish Cheddar', brand: 'Pepperidge Farm', category: 'Snacks', size: '6.6 oz', basePrice: 2.99 },
  { id: generateId('Crackers', 'Ritz'), name: 'Original Crackers', brand: 'Ritz', category: 'Snacks', size: '13.7 oz', basePrice: 4.29 },
  { id: generateId('Crackers', 'Triscuit'), name: 'Original Triscuit', brand: 'Triscuit', category: 'Snacks', size: '8.5 oz', basePrice: 4.29 },
  { id: generateId('Cookies', 'Oreo'), name: 'Original Oreo', brand: 'Oreo', category: 'Snacks', size: '14.3 oz', basePrice: 4.99 },
  { id: generateId('Cookies', 'Chips Ahoy'), name: 'Original Chips Ahoy', brand: 'Chips Ahoy', category: 'Snacks', size: '13 oz', basePrice: 4.49 },
  { id: generateId('Granola Bars', 'Nature Valley'), name: 'Crunchy Oats & Honey', brand: 'Nature Valley', category: 'Snacks', size: '12 count', basePrice: 4.49 },
  { id: generateId('Granola Bars', 'Kind'), name: 'Dark Chocolate Nuts & Sea Salt', brand: 'Kind', category: 'Snacks', size: '6 count', basePrice: 6.99 },
  { id: generateId('Trail Mix', 'Planters'), name: 'Trail Mix Nuts & Chocolate', brand: 'Planters', category: 'Snacks', size: '6 oz', basePrice: 4.99 },
  { id: generateId('Mixed Nuts', 'Planters'), name: 'Deluxe Mixed Nuts', brand: 'Planters', category: 'Snacks', size: '10.3 oz', basePrice: 9.99 },
  { id: generateId('Almonds', 'Blue Diamond'), name: 'Whole Natural Almonds', brand: 'Blue Diamond', category: 'Snacks', size: '16 oz', basePrice: 8.99 },
  { id: generateId('Popcorn', 'Orville Redenbacher'), name: 'Microwave Popcorn Butter', brand: 'Orville Redenbacher\'s', category: 'Snacks', size: '6 count', basePrice: 5.49 },
  { id: generateId('Popcorn', 'SkinnyPop'), name: 'Original Popcorn', brand: 'SkinnyPop', category: 'Snacks', size: '4.4 oz', basePrice: 3.99 },
  { id: generateId('Beef Jerky', 'Jack Link\'s'), name: 'Original Beef Jerky', brand: 'Jack Link\'s', category: 'Snacks', size: '2.85 oz', basePrice: 6.99 },
  { id: generateId('Fruit Snacks', 'Welch\'s'), name: 'Mixed Fruit Snacks', brand: 'Welch\'s', category: 'Snacks', size: '10 count', basePrice: 3.49 },
  { id: generateId('Rice Cakes', 'Quaker'), name: 'Lightly Salted Rice Cakes', brand: 'Quaker', category: 'Snacks', size: '4.47 oz', basePrice: 3.49 },
  { id: generateId('Hummus', 'Sabra'), name: 'Classic Hummus', brand: 'Sabra', category: 'Snacks', size: '10 oz', basePrice: 4.99 },
  { id: generateId('Guacamole', 'Wholly'), name: 'Classic Guacamole', brand: 'Wholly Guacamole', category: 'Snacks', size: '8 oz', basePrice: 4.99 },
  { id: generateId('String Cheese', 'Sargento'), name: 'Light String Cheese', brand: 'Sargento', category: 'Snacks', size: '12 count', basePrice: 5.99 },
  
  // === BAKERY (15 items) ===
  { id: generateId('White Bread', 'Wonder'), name: 'Classic White Bread', brand: 'Wonder', category: 'Bakery', size: '20 oz', basePrice: 2.99 },
  { id: generateId('Whole Wheat Bread', 'Nature\'s Own'), name: '100% Whole Wheat Bread', brand: 'Nature\'s Own', category: 'Bakery', size: '20 oz', basePrice: 3.99 },
  { id: generateId('Sourdough Bread', 'San Francisco'), name: 'Sourdough Round', brand: 'San Francisco Baking Co.', category: 'Bakery', size: '24 oz', basePrice: 4.99 },
  { id: generateId('Bagels', 'Thomas'), name: 'Plain Bagels', brand: 'Thomas\'', category: 'Bakery', size: '6 count', basePrice: 4.49 },
  { id: generateId('English Muffins', 'Thomas'), name: 'Original English Muffins', brand: 'Thomas\'', category: 'Bakery', size: '6 count', basePrice: 4.29 },
  { id: generateId('Hamburger Buns', 'Nature\'s Own'), name: 'Butter Hamburger Buns', brand: 'Nature\'s Own', category: 'Bakery', size: '8 count', basePrice: 3.99 },
  { id: generateId('Hot Dog Buns', 'Sunbeam'), name: 'Hot Dog Buns', brand: 'Sunbeam', category: 'Bakery', size: '8 count', basePrice: 2.99 },
  { id: generateId('Tortillas Flour', 'Mission'), name: 'Flour Tortillas Soft Taco', brand: 'Mission', category: 'Bakery', size: '10 count', basePrice: 3.49 },
  { id: generateId('Tortillas Corn', 'Mission'), name: 'Yellow Corn Tortillas', brand: 'Mission', category: 'Bakery', size: '30 count', basePrice: 2.99 },
  { id: generateId('Croissants', 'Marketside'), name: 'Butter Croissants', brand: 'Bakery Fresh', category: 'Bakery', size: '4 count', basePrice: 4.99 },
  { id: generateId('Muffins Blueberry', 'Otis Spunkmeyer'), name: 'Blueberry Muffins', brand: 'Otis Spunkmeyer', category: 'Bakery', size: '4 count', basePrice: 5.99 },
  { id: generateId('Donuts', 'Entenmann\'s'), name: 'Rich Frosted Donuts', brand: 'Entenmann\'s', category: 'Bakery', size: '8 count', basePrice: 5.49 },
  { id: generateId('Cinnamon Rolls', 'Pillsbury'), name: 'Cinnamon Rolls with Icing', brand: 'Pillsbury', category: 'Bakery', size: '8 count', basePrice: 4.49 },
  { id: generateId('Biscuits', 'Pillsbury'), name: 'Grands! Flaky Layers Biscuits', brand: 'Pillsbury', category: 'Bakery', size: '8 count', basePrice: 3.49 },
  { id: generateId('Pizza Dough', 'Pillsbury'), name: 'Classic Pizza Crust', brand: 'Pillsbury', category: 'Bakery', size: '13.8 oz', basePrice: 3.29 },
  
  // === HOUSEHOLD (15 items) ===
  { id: generateId('Paper Towels', 'Bounty'), name: 'Select-A-Size Paper Towels', brand: 'Bounty', category: 'Household', size: '8 rolls', basePrice: 19.99 },
  { id: generateId('Toilet Paper', 'Charmin'), name: 'Ultra Soft Toilet Paper', brand: 'Charmin', category: 'Household', size: '12 mega rolls', basePrice: 21.99 },
  { id: generateId('Tissues', 'Kleenex'), name: 'Ultra Soft Tissues', brand: 'Kleenex', category: 'Household', size: '4 boxes', basePrice: 7.99 },
  { id: generateId('Trash Bags', 'Hefty'), name: 'Strong Trash Bags 13 gal', brand: 'Hefty', category: 'Household', size: '80 count', basePrice: 12.99 },
  { id: generateId('Dish Soap', 'Dawn'), name: 'Ultra Dishwashing Liquid', brand: 'Dawn', category: 'Household', size: '19.4 oz', basePrice: 3.99 },
  { id: generateId('Dishwasher Pods', 'Cascade'), name: 'Platinum ActionPacs', brand: 'Cascade', category: 'Household', size: '36 count', basePrice: 15.99 },
  { id: generateId('Laundry Detergent', 'Tide'), name: 'Liquid Laundry Detergent', brand: 'Tide', category: 'Household', size: '92 oz', basePrice: 14.99 },
  { id: generateId('Dryer Sheets', 'Bounce'), name: 'Dryer Sheets Fresh Linen', brand: 'Bounce', category: 'Household', size: '160 count', basePrice: 8.99 },
  { id: generateId('All-Purpose Cleaner', 'Lysol'), name: 'All-Purpose Cleaner', brand: 'Lysol', category: 'Household', size: '32 oz', basePrice: 4.49 },
  { id: generateId('Disinfecting Wipes', 'Clorox'), name: 'Disinfecting Wipes', brand: 'Clorox', category: 'Household', size: '75 count', basePrice: 5.99 },
  { id: generateId('Aluminum Foil', 'Reynolds'), name: 'Aluminum Foil', brand: 'Reynolds Wrap', category: 'Household', size: '75 sq ft', basePrice: 5.99 },
  { id: generateId('Plastic Wrap', 'Glad'), name: 'Press\'n Seal Wrap', brand: 'Glad', category: 'Household', size: '70 sq ft', basePrice: 4.99 },
  { id: generateId('Ziploc Bags', 'Ziploc'), name: 'Gallon Storage Bags', brand: 'Ziploc', category: 'Household', size: '38 count', basePrice: 7.99 },
  { id: generateId('Sponges', 'Scotch-Brite'), name: 'Non-Scratch Scrub Sponges', brand: 'Scotch-Brite', category: 'Household', size: '6 count', basePrice: 4.99 },
  { id: generateId('Light Bulbs', 'GE'), name: 'LED Light Bulbs 60W', brand: 'GE', category: 'Household', size: '4 count', basePrice: 9.99 },
  
  // === PERSONAL CARE (10 items) ===
  { id: generateId('Toothpaste', 'Colgate'), name: 'Total Whitening Toothpaste', brand: 'Colgate', category: 'Personal Care', size: '4.8 oz', basePrice: 4.99 },
  { id: generateId('Toothbrush', 'Oral-B'), name: 'Soft Bristle Toothbrush', brand: 'Oral-B', category: 'Personal Care', size: '2 count', basePrice: 5.99 },
  { id: generateId('Shampoo', 'Head & Shoulders'), name: 'Classic Clean Shampoo', brand: 'Head & Shoulders', category: 'Personal Care', size: '23.7 oz', basePrice: 8.99 },
  { id: generateId('Conditioner', 'Pantene'), name: 'Daily Moisture Conditioner', brand: 'Pantene', category: 'Personal Care', size: '24 oz', basePrice: 6.99 },
  { id: generateId('Body Wash', 'Dove'), name: 'Deep Moisture Body Wash', brand: 'Dove', category: 'Personal Care', size: '22 oz', basePrice: 7.99 },
  { id: generateId('Deodorant', 'Degree'), name: 'Cool Rush Antiperspirant', brand: 'Degree', category: 'Personal Care', size: '2.7 oz', basePrice: 5.99 },
  { id: generateId('Hand Soap', 'Softsoap'), name: 'Liquid Hand Soap Fresh Breeze', brand: 'Softsoap', category: 'Personal Care', size: '7.5 oz', basePrice: 2.49 },
  { id: generateId('Lotion', 'Aveeno'), name: 'Daily Moisturizing Lotion', brand: 'Aveeno', category: 'Personal Care', size: '18 oz', basePrice: 11.99 },
  { id: generateId('Razors', 'Gillette'), name: 'Fusion5 Razor', brand: 'Gillette', category: 'Personal Care', size: '1 handle + 2 blades', basePrice: 12.99 },
  { id: generateId('Bandages', 'Band-Aid'), name: 'Flexible Fabric Bandages', brand: 'Band-Aid', category: 'Personal Care', size: '100 count', basePrice: 8.99 },
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
