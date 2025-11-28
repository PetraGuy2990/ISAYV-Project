export interface ProductPrice {
  name: string;
  walmart: number;
  kroger: number;
  costco: number;
}

export const mockProducts: ProductPrice[] = [
  { name: "Coke 1L", walmart: 1.99, kroger: 1.79, costco: 1.69 },
  { name: "Sprite 1L", walmart: 1.89, kroger: 1.69, costco: 1.79 },
  { name: "Pepsi 1.5L", walmart: 2.09, kroger: 2.19, costco: 1.99 },
  { name: "Fanta 2L", walmart: 2.49, kroger: 2.29, costco: 2.39 },
  { name: "Mountain Dew 1L", walmart: 1.95, kroger: 1.85, costco: 1.75 },
  { name: "Dr Pepper 1.5L", walmart: 2.15, kroger: 2.05, costco: 1.95 },
  { name: "Diet Coke 1L", walmart: 2.05, kroger: 1.89, costco: 1.99 },
  { name: "7UP 2L", walmart: 2.39, kroger: 2.49, costco: 2.29 },
  { name: "Orange Juice 1L", walmart: 3.99, kroger: 3.79, costco: 3.59 },
  { name: "Apple Juice 1L", walmart: 3.49, kroger: 3.29, costco: 3.19 },
  { name: "Milk 1 Gallon", walmart: 4.29, kroger: 3.99, costco: 3.79 },
  { name: "Bread White Loaf", walmart: 2.49, kroger: 2.29, costco: 2.19 },
  { name: "Eggs Dozen", walmart: 3.99, kroger: 3.79, costco: 3.49 },
  { name: "Butter 1lb", walmart: 4.99, kroger: 4.79, costco: 4.49 },
  { name: "Cheese Cheddar 8oz", walmart: 3.49, kroger: 3.29, costco: 2.99 },
];

export const getProductByName = (name: string): ProductPrice | undefined => {
  return mockProducts.find(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );
};

export const searchProducts = (query: string): ProductPrice[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter((product) =>
    product.name.toLowerCase().includes(lowerQuery)
  );
};
