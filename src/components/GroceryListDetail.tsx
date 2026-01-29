/**
 * DEMO MODE - Grocery List Detail Component
 * Uses mock data for demonstration purposes.
 */

import { useState, useMemo } from 'react';
import { Trash2, UserPlus, X, Edit2, Check, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { ComparisonSummaryDialog } from './ComparisonSummaryDialog';
import { useMockGroceryLists, type MockGroceryList, type MockBasketItem } from '@/hooks/useMockGroceryLists';
import { retailers, retailerPricing } from '@/data/mockGroceryData';

interface GroceryListDetailProps {
  list: MockGroceryList;
  onUpdateList: (listId: string, updates: Partial<MockGroceryList>) => void;
  onDeleteList: (listId: string) => void;
}

export function GroceryListDetail({
  list,
  onUpdateList,
  onDeleteList,
}: GroceryListDetailProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(list.name);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  

  const {
    getListItems,
    getListCollaborators,
    removeItemFromList,
    updateItemQuantity,
    addCollaborator,
    removeCollaborator,
    compareBasketPrices,
  } = useMockGroceryLists();

  const items = useMemo(() => getListItems(list.id), [list.id, getListItems]);
  const collaborators = useMemo(() => getListCollaborators(list.id), [list.id, getListCollaborators]);
  const comparison = useMemo(() => compareBasketPrices(list.id), [list.id, compareBasketPrices]);

  const saveName = () => {
    if (editedName.trim() && editedName !== list.name) {
      onUpdateList(list.id, { name: editedName });
    }
    setIsEditingName(false);
  };

  const handleAddCollaborator = () => {
    if (!newCollaboratorEmail.trim()) return;
    addCollaborator(list.id, newCollaboratorEmail, 'viewer');
    setNewCollaboratorEmail('');
  };

  const groupItemsByCategory = () => {
    const categorized: Record<string, MockBasketItem[]> = {};

    items.forEach((item) => {
      const category = item.product.category || 'Other';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(item);
    });

    return categorized;
  };

  const groupedItems = groupItemsByCategory();
  const categories = Object.keys(groupedItems);
  const shouldGroup = categories.length > 2;

  // Calculate basket total
  const basketTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);
  }, [items]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* List Header */}
      <Card>
        <CardHeader className="pb-3 px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {list.image_url ? (
                <img
                  src={list.image_url}
                  alt={list.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: list.color }}
                >
                  {list.name.charAt(0).toUpperCase()}
                </div>
              )}

              {isEditingName ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveName();
                      if (e.key === 'Escape') setIsEditingName(false);
                    }}
                    className="flex-1 h-10"
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={saveName} className="h-10 w-10 flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 min-w-0">
                  <CardTitle className="text-xl sm:text-2xl truncate">{list.name}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="h-9 w-9 flex-shrink-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeleteList(list.id)}
              className="w-full sm:w-auto h-10 active:scale-[0.98]"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete List
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Basket Summary */}
      <Card>
        <CardHeader className="px-3 sm:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">
              Basket ({items.length} {items.length === 1 ? 'item' : 'items'})
            </CardTitle>
            {items.length > 0 && (
              <span className="text-base sm:text-lg font-semibold text-primary">
                ~${basketTotal.toFixed(2)}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No items yet. Search and add items to this list.
            </p>
          ) : shouldGroup ? (
            <div className="space-y-4 sm:space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3 uppercase tracking-wide">
                    {category} ({groupedItems[category].length})
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {groupedItems[category].map((item) => (
                      <BasketItemRow
                        key={item.id}
                        item={item}
                        onRemove={() => removeItemFromList(item.id)}
                        onUpdateQuantity={(qty) => updateItemQuantity(item.id, qty)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {items.map((item) => (
                <BasketItemRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeItemFromList(item.id)}
                  onUpdateQuantity={(qty) => updateItemQuantity(item.id, qty)}
                />
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
              <Button
                onClick={() => setShowComparison(true)}
                className="w-full h-11 sm:h-12 text-sm sm:text-base active:scale-[0.98]"
                size="lg"
              >
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Compare Prices
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Dialog */}
      {comparison && (
        <ComparisonSummaryDialog
          open={showComparison}
          onOpenChange={setShowComparison}
          retailers={comparison.retailers.map((r) => {
            const retailerInfo = retailers.find((ret) => ret.id === r.retailer);
            return {
              name: retailerInfo?.name || r.retailer,
              total: r.total,
              color: retailerInfo?.color || '#888',
              complete: r.complete,
              substituteCount: r.substituteCount,
            };
          })}
          itemCount={items.length}
          savings={comparison.savings}
        />
      )}

      {/* Collaborators */}
      <Card>
        <CardHeader className="px-3 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Collaborators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="collaborator@example.com"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCollaborator();
              }}
              className="h-10 flex-1"
            />
            <Button onClick={handleAddCollaborator} className="h-10 w-full sm:w-auto active:scale-[0.98]">
              <UserPlus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {collaborators.length > 0 && (
            <div className="space-y-2">
              {collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="flex items-center justify-between p-2 sm:p-3 rounded-lg border gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {collab.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs sm:text-sm truncate">{collab.email}</span>
                    <Badge variant="outline" className="text-[10px] sm:text-xs flex-shrink-0">
                      {collab.role}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCollaborator(collab.id)}
                    className="h-9 w-9 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Basket Item Row Component
function BasketItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: MockBasketItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  const pricing = retailerPricing.get(item.product.id);
  const prices = pricing
    ? [pricing.walmart.price, pricing.costco.price, pricing.target.price, pricing.kroger.price].filter(
        (p): p is number => p !== null
      )
    : [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : item.product.basePrice;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm sm:text-base truncate">{item.product.name}</p>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
            {item.product.brand}
          </Badge>
          {item.product.size && (
            <span className="text-[10px] sm:text-sm text-muted-foreground">{item.product.size}</span>
          )}
          <span className="text-xs sm:text-sm font-medium text-primary">
            ${minPrice.toFixed(2)} ea
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-8 sm:w-8 active:bg-accent"
            onClick={() => onUpdateQuantity(item.quantity - 1)}
          >
            -
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-8 sm:w-8 active:bg-accent"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove} className="h-9 w-9">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
