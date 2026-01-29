/**
 * DEMO MODE - All data is fake and stored in memory.
 * Lists persist only during the current session.
 */

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { mockProducts, retailerPricing, type MockProduct, type Category } from '@/data/mockGroceryData';

export interface MockGroceryList {
  id: string;
  name: string;
  color: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MockBasketItem {
  id: string;
  listId: string;
  product: MockProduct;
  quantity: number;
  addedAt: string;
}

export interface MockCollaborator {
  id: string;
  listId: string;
  email: string;
  role: 'viewer' | 'editor';
  addedAt: string;
}

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Initial demo lists
const initialLists: MockGroceryList[] = [
  {
    id: 'demo-weekly',
    name: 'Weekly Essentials',
    color: '#3B82F6',
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Initial demo items (pre-populated for demo)
const initialItems: MockBasketItem[] = [
  { id: generateId(), listId: 'demo-weekly', product: mockProducts[0], quantity: 2, addedAt: new Date().toISOString() }, // Bananas
  { id: generateId(), listId: 'demo-weekly', product: mockProducts[18], quantity: 1, addedAt: new Date().toISOString() }, // 2% Milk
  { id: generateId(), listId: 'demo-weekly', product: mockProducts[27], quantity: 1, addedAt: new Date().toISOString() }, // Eggs
  { id: generateId(), listId: 'demo-weekly', product: mockProducts[42], quantity: 1, addedAt: new Date().toISOString() }, // Chicken Breast
  { id: generateId(), listId: 'demo-weekly', product: mockProducts[68], quantity: 2, addedAt: new Date().toISOString() }, // Spaghetti
  { id: generateId(), listId: 'demo-weekly', product: mockProducts[120], quantity: 1, addedAt: new Date().toISOString() }, // Coca-Cola
];

export function useMockGroceryLists() {
  const [lists, setLists] = useState<MockGroceryList[]>(initialLists);
  const [items, setItems] = useState<MockBasketItem[]>(initialItems);
  const [collaborators, setCollaborators] = useState<MockCollaborator[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(initialLists[0]?.id || null);
  const [loading] = useState(false);

  // Create a new list
  const createList = useCallback((
    name: string,
    color: string,
    imageUrl?: string,
    initialItems?: { name: string; quantity: number }[]
  ) => {
    const newList: MockGroceryList = {
      id: generateId(),
      name,
      color,
      image_url: imageUrl || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setLists(prev => [...prev, newList]);
    setActiveListId(newList.id);

    // Add initial items if provided (from image extraction)
    if (initialItems && initialItems.length > 0) {
      const newItems: MockBasketItem[] = initialItems.map(item => {
        // Try to find matching product
        const matchedProduct = mockProducts.find(p => 
          p.name.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(p.name.toLowerCase())
        );
        
        return {
          id: generateId(),
          listId: newList.id,
          product: matchedProduct || {
            id: generateId(),
            name: item.name,
            brand: 'Custom',
            category: 'Pantry' as Category,
            size: '',
            basePrice: 0,
          },
          quantity: item.quantity,
          addedAt: new Date().toISOString(),
        };
      });

      setItems(prev => [...prev, ...newItems]);
      toast.success(`"${name}" created with ${initialItems.length} items`);
    } else {
      toast.success(`"${name}" has been created`);
    }

    return newList;
  }, []);

  // Update list
  const updateList = useCallback((listId: string, updates: Partial<MockGroceryList>) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, ...updates, updated_at: new Date().toISOString() }
        : list
    ));
    toast.success('List updated');
  }, []);

  // Delete list
  const deleteList = useCallback((listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
    setItems(prev => prev.filter(item => item.listId !== listId));
    setCollaborators(prev => prev.filter(c => c.listId !== listId));
    
    // Select another list if we deleted the active one
    if (activeListId === listId) {
      setLists(prev => {
        const remaining = prev.filter(list => list.id !== listId);
        setActiveListId(remaining[0]?.id || null);
        return prev;
      });
    }
    
    toast.success('List deleted');
  }, [activeListId]);

  // Add item to list
  const addItemToList = useCallback((listId: string, product: MockProduct, quantity: number = 1) => {
    // Check if item already exists
    const existing = items.find(i => i.listId === listId && i.product.id === product.id);
    
    if (existing) {
      setItems(prev => prev.map(item => 
        item.id === existing.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      toast.success(`Updated quantity for ${product.name}`);
    } else {
      const newItem: MockBasketItem = {
        id: generateId(),
        listId,
        product,
        quantity,
        addedAt: new Date().toISOString(),
      };
      setItems(prev => [...prev, newItem]);
      toast.success(`Added ${product.name}`);
    }
  }, [items]);

  // Remove item from list
  const removeItemFromList = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Item removed');
  }, []);

  // Update item quantity
  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromList(itemId);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  }, [removeItemFromList]);

  // Get items for a specific list
  const getListItems = useCallback((listId: string) => {
    return items.filter(item => item.listId === listId);
  }, [items]);

  // Add collaborator
  const addCollaborator = useCallback((listId: string, email: string, role: 'viewer' | 'editor' = 'viewer') => {
    const newCollaborator: MockCollaborator = {
      id: generateId(),
      listId,
      email,
      role,
      addedAt: new Date().toISOString(),
    };
    setCollaborators(prev => [...prev, newCollaborator]);
    toast.success(`${email} added as collaborator`);
  }, []);

  // Remove collaborator
  const removeCollaborator = useCallback((collaboratorId: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
    toast.success('Collaborator removed');
  }, []);

  // Get collaborators for a list
  const getListCollaborators = useCallback((listId: string) => {
    return collaborators.filter(c => c.listId === listId);
  }, [collaborators]);

  // Compare basket prices across retailers
  const compareBasketPrices = useCallback((listId: string) => {
    const listItems = items.filter(item => item.listId === listId);
    
    if (listItems.length === 0) {
      return null;
    }

    const retailers = ['walmart', 'costco', 'target', 'kroger'] as const;
    
    const totals = retailers.map(retailer => {
      let total = 0;
      let availableCount = 0;
      let substituteCount = 0;

      listItems.forEach(item => {
        const pricing = retailerPricing.get(item.product.id);
        if (pricing) {
          const retailerPrice = pricing[retailer];
          if (retailerPrice.price !== null) {
            total += retailerPrice.price * item.quantity;
            availableCount++;
          } else {
            // Use base price as substitute estimate
            total += item.product.basePrice * item.quantity;
            substituteCount++;
          }
        } else {
          // Fallback to base price
          total += item.product.basePrice * item.quantity;
        }
      });

      return {
        retailer,
        total: Math.round(total * 100) / 100,
        availableCount,
        substituteCount,
        complete: substituteCount === 0,
      };
    });

    // Sort by total price
    totals.sort((a, b) => a.total - b.total);

    return {
      items: listItems,
      retailers: totals,
      bestRetailer: totals[0].retailer,
      savings: totals[totals.length - 1].total - totals[0].total,
    };
  }, [items]);

  // Group items by category
  const getItemsByCategory = useCallback((listId: string) => {
    const listItems = items.filter(item => item.listId === listId);
    const grouped: Record<Category, MockBasketItem[]> = {
      'Produce': [],
      'Dairy': [],
      'Meat & Seafood': [],
      'Pantry': [],
      'Frozen': [],
      'Beverages': [],
      'Snacks': [],
      'Bakery': [],
      'Household': [],
      'Personal Care': [],
    };

    listItems.forEach(item => {
      if (grouped[item.product.category]) {
        grouped[item.product.category].push(item);
      }
    });

    return grouped;
  }, [items]);

  const activeList = lists.find(list => list.id === activeListId) || null;

  return {
    // Lists
    lists,
    activeListId,
    activeList,
    setActiveListId,
    loading,
    createList,
    updateList,
    deleteList,
    
    // Items
    items,
    addItemToList,
    removeItemFromList,
    updateItemQuantity,
    getListItems,
    getItemsByCategory,
    
    // Collaborators
    addCollaborator,
    removeCollaborator,
    getListCollaborators,
    
    // Comparison
    compareBasketPrices,
  };
}
