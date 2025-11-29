import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DollarSign, Tag } from "lucide-react";

export type SearchMode = "cheapest" | "brand";

interface SearchModeToggleProps {
  mode: SearchMode;
  onChange: (mode: SearchMode) => void;
}

export function SearchModeToggle({ mode, onChange }: SearchModeToggleProps) {
  return (
    <ToggleGroup 
      type="single" 
      value={mode} 
      onValueChange={(value) => value && onChange(value as SearchMode)}
      className="inline-flex rounded-full bg-muted p-1"
    >
      <ToggleGroupItem 
        value="cheapest" 
        className="rounded-full px-4 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm transition-all"
        aria-label="Cheapest mode"
      >
        <DollarSign className="w-4 h-4 mr-2" />
        Cheapest
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="brand" 
        className="rounded-full px-4 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-sm transition-all"
        aria-label="Brand-loyal mode"
      >
        <Tag className="w-4 h-4 mr-2" />
        Brand-Loyal
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
