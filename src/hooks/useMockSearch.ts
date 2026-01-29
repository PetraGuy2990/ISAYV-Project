/**
 * DEMO MODE - Mock search with autocomplete
 */

import { useState, useCallback, useMemo } from 'react';
import { 
  mockProducts, 
  retailerPricing, 
  type MockProduct, 
  type RetailerId 
} from '@/data/mockGroceryData';

export type SearchMode = 'cheapest' | 'brand';

export interface SearchResult extends MockProduct {
  minPrice: number | null;
  retailerPrices: Record<RetailerId, number | null>;
  bestRetailer: RetailerId | null;
}

export function useMockSearch() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('cheapest');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  // Get autocomplete suggestions
  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    return mockProducts
      .filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8)
      .map(p => ({
        id: p.id,
        text: `${p.name} - ${p.brand}`,
        product: p,
      }));
  }, [query]);

  // Perform search
  const search = useCallback((searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);

    // Simulate network delay for realism
    setTimeout(() => {
      const lowerQuery = q.toLowerCase();
      
      let matches = mockProducts.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );

      // Add pricing info to results
      const resultsWithPricing: SearchResult[] = matches.map(product => {
        const pricing = retailerPricing.get(product.id);
        const retailerPrices: Record<RetailerId, number | null> = {
          walmart: pricing?.walmart.price ?? null,
          costco: pricing?.costco.price ?? null,
          target: pricing?.target.price ?? null,
          kroger: pricing?.kroger.price ?? null,
        };

        // Find minimum price
        const prices = Object.values(retailerPrices).filter((p): p is number => p !== null);
        const minPrice = prices.length > 0 ? Math.min(...prices) : null;
        
        // Find best retailer
        let bestRetailer: RetailerId | null = null;
        if (minPrice !== null) {
          for (const [retailer, price] of Object.entries(retailerPrices)) {
            if (price === minPrice) {
              bestRetailer = retailer as RetailerId;
              break;
            }
          }
        }

        return {
          ...product,
          minPrice,
          retailerPrices,
          bestRetailer,
        };
      });

      // Sort based on mode
      if (mode === 'cheapest') {
        resultsWithPricing.sort((a, b) => {
          if (a.minPrice === null) return 1;
          if (b.minPrice === null) return -1;
          return a.minPrice - b.minPrice;
        });
      } else {
        // Brand mode: prioritize exact brand matches
        resultsWithPricing.sort((a, b) => {
          const aMatch = a.brand.toLowerCase().includes(lowerQuery) ? 0 : 1;
          const bMatch = b.brand.toLowerCase().includes(lowerQuery) ? 0 : 1;
          if (aMatch !== bMatch) return aMatch - bMatch;
          return (a.minPrice || 999) - (b.minPrice || 999);
        });
      }

      setResults(resultsWithPricing.slice(0, 20));
      setSearching(false);
    }, 300); // Simulate API delay
  }, [query, mode]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return {
    query,
    setQuery,
    mode,
    setMode,
    results,
    searching,
    suggestions,
    search,
    clearSearch,
  };
}
