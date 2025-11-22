import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import isayvLogo from "@/assets/logo.png";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";

interface PurchaseHistory {
  id: string;
  items: any;
  total_price: number;
  retailer: string;
  purchased_at: string;
}

const Account = () => {
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      loadPurchaseHistory(session.user.id);
    };
    checkUser();
  }, [navigate]);

  const loadPurchaseHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("purchase_history")
        .select("*")
        .eq("user_id", userId)
        .order("purchased_at", { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error: any) {
      toast.error("Failed to load purchase history");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={isayvLogo} alt="ISAYV" className="h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              My Account
            </h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card className="border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Purchase History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : purchases.length === 0 ? (
              <p className="text-muted-foreground">No purchases yet. Start shopping to see your history!</p>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <Card key={purchase.id} className="border-primary/10">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{purchase.retailer}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(purchase.purchased_at).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            ${purchase.total_price?.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {Array.isArray(purchase.items) ? purchase.items.length : 0} items
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Based on your shopping patterns, here are personalized recommendations:
            </p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="font-medium">Stock up on frequently purchased items</p>
                <p className="text-sm text-muted-foreground">Save 15% when buying in bulk</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="font-medium">Try shopping at Walmart this week</p>
                <p className="text-sm text-muted-foreground">Best prices for your usual basket</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Account;
