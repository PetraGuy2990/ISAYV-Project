/**
 * DEMO MODE - Grocery List Sheet
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { GroceryListDetail } from '@/components/GroceryListDetail';
import type { MockGroceryList } from '@/hooks/useMockGroceryLists';
import { Badge } from '@/components/ui/badge';

interface GroceryListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list: MockGroceryList | null;
  onUpdateList: (listId: string, updates: Partial<MockGroceryList>) => void;
  onDeleteList: (listId: string) => void;
}

export function GroceryListSheet({
  open,
  onOpenChange,
  list,
  onUpdateList,
  onDeleteList,
}: GroceryListSheetProps) {
  if (!list) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Grocery List
            <Badge variant="secondary" className="text-xs">Demo</Badge>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <GroceryListDetail
            list={list}
            onUpdateList={onUpdateList}
            onDeleteList={(listId) => {
              onDeleteList(listId);
              onOpenChange(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
