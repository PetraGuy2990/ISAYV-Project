import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { GroceryListDetail } from '@/components/GroceryListDetail';
import type { GroceryList } from '@/hooks/useGroceryLists';

interface GroceryListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list: GroceryList | null;
  onUpdateList: (listId: string, updates: any) => void;
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
          <SheetTitle>Grocery List</SheetTitle>
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
