import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { GroceryList } from '@/hooks/useGroceryLists';

interface GroceryListsBarProps {
  lists: GroceryList[];
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
        <div className="flex items-center gap-2 p-2">
          {lists.map((list) => {
            const isActive = list.id === activeListId;
            return (
              <button
                key={list.id}
                onClick={() => onListSelect(list.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
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
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                    style={{ backgroundColor: list.color }}
                  >
                    {list.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{list.name}</span>
              </button>
            );
          })}
          
          <Button
            onClick={onCreateList}
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            New List
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
