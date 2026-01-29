/**
 * DEMO MODE - Grocery Lists Bar
 */

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { MockGroceryList } from '@/hooks/useMockGroceryLists';

interface GroceryListsBarProps {
  lists: MockGroceryList[];
  activeListId: string | null;
  onListSelect: (listId: string) => void;
  onCreateList: () => void;
}

export function GroceryListsBar({
  lists,
  activeListId,
  onListSelect,
  onCreateList,
}: GroceryListsBarProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 p-2 px-3 sm:px-4">
          {lists.map((list) => {
            const isActive = list.id === activeListId;
            return (
              <button
                key={list.id}
                onClick={() => onListSelect(list.id)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap active:scale-[0.98] min-h-[44px] sm:min-h-0',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                style={{
                  borderLeft: isActive ? `3px solid ${list.color}` : 'none',
                }}
              >
                {list.image_url ? (
                  <img
                    src={list.image_url}
                    alt={list.name}
                    className="w-5 h-5 sm:w-5 sm:h-5 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-5 h-5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs text-white font-semibold flex-shrink-0"
                    style={{ backgroundColor: list.color }}
                  >
                    {list.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="max-w-[80px] sm:max-w-none truncate">{list.name}</span>
              </button>
            );
          })}
          
          <Button
            onClick={onCreateList}
            variant="ghost"
            size="sm"
            className="gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground whitespace-nowrap min-h-[44px] sm:min-h-0 px-3 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">New List</span>
            <span className="xs:hidden">New</span>
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
