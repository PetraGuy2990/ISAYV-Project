/**
 * DEMO MODE - Create List Dialog
 * Image extraction simulated for demonstration.
 */

import { useState, useRef } from 'react';
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
import { Camera, Upload, X, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';


interface ExtractedItem {
  name: string;
  quantity: number;
}

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateList: (name: string, color: string, imageUrl?: string, items?: ExtractedItem[]) => void;
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

// Demo mode: Simulated extraction results
const DEMO_EXTRACTED_ITEMS: ExtractedItem[] = [
  { name: 'Milk', quantity: 1 },
  { name: 'Eggs', quantity: 2 },
  { name: 'Bread', quantity: 1 },
  { name: 'Bananas', quantity: 1 },
  { name: 'Chicken Breast', quantity: 2 },
  { name: 'Butter', quantity: 1 },
  { name: 'Cheese', quantity: 1 },
  { name: 'Apples', quantity: 1 },
];

export function CreateListDialog({
  open,
  onOpenChange,
  onCreateList,
}: CreateListDialogProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [extractedItems, setExtractedItems] = useState<ExtractedItem[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    if (name.trim()) {
      onCreateList(name, selectedColor, imageUrl || undefined, extractedItems.length > 0 ? extractedItems : undefined);
      resetForm();
      onOpenChange(false);
    }
  };

  const resetForm = () => {
    setName('');
    setSelectedColor(PRESET_COLORS[0]);
    setImageUrl('');
    setUploadedImages([]);
    setExtractedItems([]);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      newImages.push(base64);
    }

    if (newImages.length > 0) {
      setUploadedImages((prev) => [...prev, ...newImages]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExtractItems = async () => {
    if (uploadedImages.length === 0) return;

    setIsExtracting(true);

    // Demo Mode: Simulate AI extraction with delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Randomly select 4-8 items from demo list
    const numItems = Math.floor(Math.random() * 5) + 4;
    const shuffled = [...DEMO_EXTRACTED_ITEMS].sort(() => Math.random() - 0.5);
    const selectedItems = shuffled.slice(0, numItems);

    setExtractedItems(selectedItems);
    toast.success(`Extracted ${selectedItems.length} items from images (Demo)`);
    setIsExtracting(false);
  };

  const removeExtractedItem = (index: number) => {
    setExtractedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    setExtractedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const updateItemName = (index: number, newName: string) => {
    setExtractedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name: newName } : item))
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create New Grocery List
            <Sparkles className="h-4 w-4 text-primary" />
          </DialogTitle>
          <DialogDescription>
            Give your list a name, choose a color, or upload images to pre-populate items.
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
            <Label htmlFor="image-url">Cover Image URL (optional)</Label>
            <Input
              id="image-url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Upload List Section */}
          <div className="space-y-3 pt-2 border-t border-border">
            <Label className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload List or Product Images
            </Label>
            <p className="text-sm text-muted-foreground">
              Upload handwritten notes, typed lists, or product images to auto-populate your list.
              <span className="text-primary"> (Demo: simulated extraction)</span>
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Camera className="h-4 w-4 mr-2" />
              Select Images
            </Button>

            {/* Preview uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md border border-border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <Button type="button" onClick={handleExtractItems} disabled={isExtracting} className="w-full">
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Extracting Items...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Extract Items from Images
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Extracted items */}
            {extractedItems.length > 0 && (
              <div className="space-y-2">
                <Label>Extracted Items ({extractedItems.length})</Label>
                <div className="max-h-40 overflow-y-auto space-y-1 border border-border rounded-md p-2">
                  {extractedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 1)}
                        className="w-14 h-7 text-center"
                      />
                      <Input
                        value={item.name}
                        onChange={(e) => updateItemName(index, e.target.value)}
                        className="flex-1 h-7"
                      />
                      <button
                        onClick={() => removeExtractedItem(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()} type="button">
            Create List {extractedItems.length > 0 && `(${extractedItems.length} items)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
