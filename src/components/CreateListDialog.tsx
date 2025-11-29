import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateList: (name: string, color: string, imageUrl?: string) => void;
}

const PRESET_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // orange
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#EF4444', // red
  '#14B8A6', // teal
];

export function CreateListDialog({
  open,
  onOpenChange,
  onCreateList,
}: CreateListDialogProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [imageUrl, setImageUrl] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreateList(name, selectedColor, imageUrl || undefined);
      setName('');
      setSelectedColor(PRESET_COLORS[0]);
      setImageUrl('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Grocery List</DialogTitle>
          <DialogDescription>
            Give your list a name and choose a color theme.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="list-name">List Name</Label>
            <Input
              id="list-name"
              placeholder="e.g. Weekly Shop, Party Snacks"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreate();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    border:
                      selectedColor === color
                        ? '3px solid hsl(var(--foreground))'
                        : '2px solid hsl(var(--border))',
                  }}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL (optional)</Label>
            <Input
              id="image-url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={!name.trim()}
            type="button"
          >
            Create List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
