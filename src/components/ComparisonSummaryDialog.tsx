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
import { TrendingDown, Medal, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            Price Comparison
            <Badge variant="secondary" className="text-xs">
              Demo
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Your basket of {itemCount} items across all retailers, ranked from cheapest to most expensive.
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
                <div
                  className="absolute -top-3 left-4 bg-background px-2 py-0.5 rounded-full border-2 flex items-center gap-1 text-xs font-semibold"
                  style={{ borderColor: retailer.color, color: retailer.color }}
                >
                  <Medal className="h-3 w-3" />
                  Best Price
                </div>
              )}

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: retailer.color }}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: retailer.color }}>
                    {retailer.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {retailer.complete ? (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        All items available
                      </span>
                    ) : retailer.substituteCount && retailer.substituteCount > 0 ? (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-amber-500" />
                        {retailer.substituteCount} substitutes
                      </span>
                    ) : null}
                  </div>
                  {index > 0 && savingsValues[index] > 0 && (
                    <p className="text-xs text-muted-foreground">
                      +${savingsValues[index].toFixed(2)} more
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">${retailer.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {cheapest && sortedRetailers.length > 1 && savings > 0 && (
          <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-primary">
                Save up to ${savings.toFixed(2)}
              </p>
              <p className="text-muted-foreground mt-1">
                Shop at <strong>{cheapest.name}</strong> for the best total price on your basket.
              </p>
            </div>
          </div>
        )}

        <p className="text-xs text-center text-muted-foreground mt-4">
          * Prices are simulated for demonstration purposes
        </p>
      </DialogContent>
    </Dialog>
  );
};
