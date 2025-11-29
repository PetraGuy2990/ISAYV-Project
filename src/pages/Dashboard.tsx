import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Plus, X, Trophy, Camera, User as UserIcon, LogOut, LogIn, ShoppingBasket, Scale, Store } from "lucide-react";
import { searchProducts, ProductPrice, getProductByName } from "@/data/mockProducts";
import { ComparisonSummaryDialog } from "@/components/ComparisonSummaryDialog";
import { CameraModal } from "@/components/CameraModal";
import { SearchModeToggle, SearchMode } from "@/components/SearchModeToggle";
import isayvLogo from "@/assets/logo.png";

interface CartItem {
  id: string;
  product_name: string;
  quantity: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("cheapest");
  const [searchResults, setSearchResults] = useState<ProductPrice[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Load cart if user is authenticated
      if (session?.user) {
        loadCart();
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // Load cart when user logs in
      if (session?.user) {
        loadCart();
      } else {
        // Clear cart when user logs out
        setCartItems([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadCart = async () => {
    // Only load from database if user is authenticated
    if (!user) {
      // For demo users, cart stays in local state only
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error loading cart:", error);
      return;
    }

    if (data) {
      const items: CartItem[] = data.map((item) => ({
        id: item.id,
        product_name: item.custom_item_name || "",
        quantity: item.quantity,
      }));
      setCartItems(items);
    }
  };

  const addToCart = async (product: ProductPrice) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (item) => item.product_name === product.name
    );

    if (!user) {
      // Demo mode: use local state only
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.product_name === product.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        toast.success(`Added another ${product.name} to cart`);
      } else {
        setCartItems([...cartItems, {
          id: `demo-${Date.now()}`,
          product_name: product.name,
          quantity: 1,
        }]);
        toast.success(`${product.name} added to cart`);
      }
      setSearchQuery("");
      setShowDropdown(false);
      return;
    }

    // Authenticated mode: save to database
    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      if (error) {
        toast.error("Failed to update cart");
        return;
      }

      toast.success(`Added another ${product.name} to cart`);
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          custom_item_name: product.name,
          quantity: 1,
        });

      if (error) {
        toast.error("Failed to add to cart");
        return;
      }

      toast.success(`${product.name} added to cart`);
    }

    loadCart();
    setSearchQuery("");
    setShowDropdown(false);
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) {
      // Demo mode: update local state only
      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast.success("Item removed from cart");
      return;
    }

    // Authenticated mode: remove from database
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to remove item");
      return;
    }

    toast.success("Item removed from cart");
    loadCart();
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    if (!user) {
      // Demo mode: update local state only
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
      return;
    }

    // Authenticated mode: update database
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to update quantity");
      return;
    }

    loadCart();
  };

  const calculateTotals = () => {
    const retailers = [
      { name: "Walmart", key: "walmart", color: "#0071ce" },
      { name: "Kroger", key: "kroger", color: "#003da5" },
      { name: "Costco", key: "costco", color: "#0078ce" },
    ];

    return retailers.map((retailer) => {
      let total = 0;
      cartItems.forEach((item) => {
        const product = getProductByName(item.product_name);
        if (product && retailer.key in product) {
          total += (product as any)[retailer.key] * item.quantity;
        }
      });
      return {
        name: retailer.name,
        total,
        color: retailer.color,
      };
    });
  };

  const getCheapestRetailer = () => {
    const totals = calculateTotals();
    const validTotals = totals.filter(r => r.total > 0);
    if (validTotals.length === 0) return null;
    return validTotals.reduce((min, retailer) => 
      retailer.total < min.total ? retailer : min
    );
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const retailerTotals = calculateTotals();
  const cheapestRetailer = getCheapestRetailer();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={isayvLogo} alt="ISAYV" className="h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ISAYV
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/account")} className="gap-2 hover:scale-105 transition-transform">
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">My Account</span>
            </Button>
            {user ? (
              <Button variant="outline" onClick={handleSignOut} className="gap-2 hover:scale-105 transition-transform">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate("/auth")} className="gap-2 hover:scale-105 transition-transform">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Search and Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              className={`bg-card border rounded-xl p-6 shadow-sm transition-all ${
                searchMode === 'brand' 
                  ? 'bg-accent/5 border-accent/40' 
                  : 'border-border/60'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Search Products</h2>
                <SearchModeToggle mode={searchMode} onChange={setSearchMode} />
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={
                        searchMode === 'brand'
                          ? "Search by brand e.g. 'Dairy Pure milk'"
                          : "Search all items e.g. 'milk'"
                      }
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowCameraModal(true)}
                    className="h-12 px-4"
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  {searchMode === 'brand'
                    ? "Brand-loyal mode: prioritizing branded products."
                    : "Cheapest mode: sorting by lowest total price."}
                </p>

                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-fade-in">
                    {searchResults.map((product, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 border-b border-border last:border-b-0 hover:bg-accent transition-colors flex items-center justify-between group"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Walmart: ${product.walmart.toFixed(2)} | Kroger: ${product.kroger.toFixed(2)} | Costco: ${product.costco.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="ml-4"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl shadow-sm sticky top-24">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBasket className="h-6 w-6 text-primary" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">My Cart</h2>
                    <p className="text-sm text-muted-foreground">
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Cart Items */}
              <div className="max-h-96 overflow-y-auto p-6 space-y-3">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Your cart is empty</p>
                    <p className="text-sm mt-2">Search and add products above</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.product_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {/* Comparison Section */}
              {cartItems.length > 0 && cheapestRetailer && (
                <div className="p-6 border-t border-border space-y-4">
                  <div 
                    className="p-4 rounded-lg border-2 relative hover:shadow-lg transition-shadow"
                    style={{
                      backgroundColor: `${cheapestRetailer.color}10`,
                      borderColor: cheapestRetailer.color,
                    }}
                  >
                    <div className="absolute -top-3 left-4 bg-background px-3 py-1 rounded-full border-2 flex items-center gap-1.5 text-xs font-semibold"
                      style={{ borderColor: cheapestRetailer.color, color: cheapestRetailer.color }}
                    >
                      <Trophy className="h-3.5 w-3.5" />
                      Best Price
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Store className="h-5 w-5" style={{ color: cheapestRetailer.color }} />
                        <span className="font-semibold text-lg" style={{ color: cheapestRetailer.color }}>
                          {cheapestRetailer.name}
                        </span>
                      </div>
                      <span className="text-2xl font-bold">
                        ${cheapestRetailer.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full gap-2 hover:scale-105 transition-transform"
                    size="lg"
                    variant="outline"
                    onClick={() => setShowComparisonModal(true)}
                  >
                    <Scale className="h-4 w-4" />
                    See Comparison Summary
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ComparisonSummaryDialog
        open={showComparisonModal}
        onOpenChange={setShowComparisonModal}
        retailers={retailerTotals}
      />

      <CameraModal
        open={showCameraModal}
        onOpenChange={setShowCameraModal}
        onProductDetected={(productName) => {
          setSearchQuery(productName);
          setShowDropdown(true);
        }}
      />
    </div>
  );
};

export default Dashboard;
