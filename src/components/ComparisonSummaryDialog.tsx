/**
 * DEMO MODE - Comparison Summary Dialog
 * Shows basket price comparison across retailers.
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingDown, Medal, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RetailerTotal {
  name: string;
  total: number;
  color: string;
  complete?: boolean;
  substituteCount?: number;
}

interface ComparisonSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  retailers: RetailerTotal[];
  itemCount?: number;
  savings?: number;
}

export const ComparisonSummaryDialog = ({
  open,
  onOpenChange,
  retailers,
  itemCount = 0,
  savings = 0,
}: ComparisonSummaryDialogProps) => {
  const sortedRetailers = [...retailers].sort((a, b) => a.total - b.total);
  const cheapest = sortedRetailers[0];
  const savingsValues = sortedRetailers.map((retailer, index) => {
    if (index === 0) return 0;
    return retailer.total - cheapest.total;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto mx-3 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            Price Comparison
            <Badge variant="secondary" className="text-[10px] sm:text-xs">
              Demo
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Your basket of {itemCount} items ranked by price.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-3">
          {sortedRetailers.map((retailer, index) => (
            <button
              key={retailer.name}
              onClick={() => {
                toast.success(`Opening ${retailer.name} checkout...`, {
                  description: `Your ${itemCount} items totaling $${retailer.total.toFixed(2)} will be added to your ${retailer.name} cart.`,
                  duration: 3000,
                });
                onOpenChange(false);
              }}
              className="relative w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg border transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-left"
              style={{
                backgroundColor: `${retailer.color}10`,
                borderColor: index === 0 ? retailer.color : 'hsl(var(--border))',
                borderWidth: index === 0 ? '2px' : '1px',
              }}
            >
              {index === 0 && (
                <div
                  className="absolute -top-2 left-3 bg-background px-1.5 py-0.5 rounded-full border-2 flex items-center gap-1 text-[9px] font-semibold"
                  style={{ borderColor: retailer.color, color: retailer.color }}
                >
                  <Medal className="h-2.5 w-2.5" />
                  Best
                </div>
              )}

              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: retailer.color }}
                >
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm" style={{ color: retailer.color }}>
                    {retailer.name}
                  </p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {retailer.complete ? (
                      <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5 text-green-500" />
                        All items
                      </span>
                    ) : retailer.substituteCount && retailer.substituteCount > 0 ? (
                      <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                        <AlertCircle className="h-2.5 w-2.5 text-amber-500" />
                        {retailer.substituteCount} subs
                      </span>
                    ) : null}
                    {index > 0 && savingsValues[index] > 0 && (
                      <span className="text-[9px] text-muted-foreground">
                        +${savingsValues[index].toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <p className="text-lg sm:text-xl font-bold">${retailer.total.toFixed(2)}</p>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        {cheapest && sortedRetailers.length > 1 && savings > 0 && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-2 sm:gap-3">
            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-primary">
                Save up to ${savings.toFixed(2)}
              </p>
              <p className="text-muted-foreground mt-0.5 sm:mt-1">
                Shop at <strong>{cheapest.name}</strong> for the best price.
              </p>
            </div>
          </div>
        )}

        <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4">
          * Prices are simulated for demonstration
        </p>
      </DialogContent>
    </Dialog>
  );
};
