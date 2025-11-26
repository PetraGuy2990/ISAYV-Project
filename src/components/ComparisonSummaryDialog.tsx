import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingDown, Medal } from "lucide-react";

interface RetailerTotal {
  name: string;
  total: number;
  color: string;
}

interface ComparisonSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  retailers: RetailerTotal[];
}

export const ComparisonSummaryDialog = ({
  open,
  onOpenChange,
  retailers,
}: ComparisonSummaryDialogProps) => {
  const sortedRetailers = [...retailers].sort((a, b) => a.total - b.total);
  const cheapest = sortedRetailers[0];
  const savings = sortedRetailers.map((retailer, index) => {
    if (index === 0) return 0;
    return retailer.total - cheapest.total;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Price Comparison</DialogTitle>
          <DialogDescription>
            Your cart total across all retailers, ranked from cheapest to most expensive.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {sortedRetailers.map((retailer, index) => (
            <div
              key={retailer.name}
              className="relative flex items-center justify-between p-4 rounded-lg border transition-all"
              style={{
                backgroundColor: `${retailer.color}10`,
                borderColor: index === 0 ? retailer.color : 'hsl(var(--border))',
                borderWidth: index === 0 ? '2px' : '1px',
              }}
            >
              {index === 0 && (
                <div className="absolute -top-3 left-4 bg-background px-2 py-0.5 rounded-full border-2 flex items-center gap-1 text-xs font-semibold"
                  style={{ borderColor: retailer.color, color: retailer.color }}
                >
                  <Medal className="h-3 w-3" />
                  Best Price
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: retailer.color }}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: retailer.color }}>
                    {retailer.name}
                  </p>
                  {index > 0 && savings[index] > 0 && (
                    <p className="text-xs text-muted-foreground">
                      +${savings[index].toFixed(2)} more
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  ${retailer.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {cheapest && sortedRetailers.length > 1 && (
          <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-primary">
                Save up to ${savings[savings.length - 1].toFixed(2)}
              </p>
              <p className="text-muted-foreground mt-1">
                Shop at {cheapest.name} for the best total price on your cart.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
