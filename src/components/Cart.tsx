import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  grocery_item_id: string | null;
  custom_item_name: string | null;
  quantity: number;
  grocery_items?: {
    item_name: string;
    brand: string;
    size: string;
    price: number;
    category: string;
  };
}

interface CartProps {
  userId: string;
}

export const Cart = ({ userId }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, [userId]);

  const loadCart = async () => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          grocery_items (
            item_name,
            brand,
            size,
            price,
            category
          )
        `)
        .eq("user_id", userId);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemId);

      if (error) throw error;
      loadCart();
    } catch (error: any) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      toast.success("Item removed from cart");
      loadCart();
    } catch (error: any) {
      toast.error("Failed to remove item");
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      const price = item.grocery_items?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const getCategories = () => {
    const categories = new Set<string>();
    cartItems.forEach(item => {
      if (item.grocery_items?.category) {
        categories.add(item.grocery_items.category);
      }
    });
    return Array.from(categories);
  };

  const handleCompare = () => {
    toast.info("Comparing prices across retailers...", {
      description: "This feature will scrape Costco and Walmart for the best deals",
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading cart...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Your Grocery Cart</h2>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {getTotalItems()} items
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            ${getTotalPrice().toFixed(2)}
          </Badge>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <Input
              placeholder="Search for items to add..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardHeader>
      </Card>

      {getCategories().length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {getCategories().map((category) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      )}

      <Card className="border-primary/20 shadow-glow">
        <CardHeader>
          <CardTitle>Cart Items</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your cart is empty. Add items to get started!
            </p>
          ) : (
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-primary/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {item.grocery_items?.item_name || item.custom_item_name}
                          </h3>
                          {item.grocery_items && (
                            <>
                              <p className="text-sm text-muted-foreground">
                                {item.grocery_items.brand} • {item.grocery_items.size}
                              </p>
                              <p className="text-sm font-medium text-primary mt-1">
                                ${item.grocery_items.price} each
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {cartItems.length > 0 && (
        <Button
          size="lg"
          className="w-full text-lg py-6 shadow-glow"
          onClick={handleCompare}
        >
          Compare Prices at Retailers
        </Button>
      )}
    </div>
  );
};
