import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, Camera, User as UserIcon, LogOut, LogIn, ShoppingBasket } from "lucide-react";
import { CameraModal } from "@/components/CameraModal";
import { SearchModeToggle, SearchMode } from "@/components/SearchModeToggle";
import { useGroceryLists } from "@/hooks/useGroceryLists";
import { GroceryListsBar } from "@/components/GroceryListsBar";
import { CreateListDialog } from "@/components/CreateListDialog";
import { GroceryListSheet } from "@/components/GroceryListSheet";
import isayvLogo from "@/assets/logo.png";

interface SearchResult {
  id: string;
  item_name: string;
  brand: string | null;
  price: number | null;
  company: string | null;
  size: string | null;
  category: string | null;
  image_url: string | null;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("cheapest");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showCreateListDialog, setShowCreateListDialog] = useState(false);
  const [showListDetail, setShowListDetail] = useState(false);
  const navigate = useNavigate();

  const {
    lists,
    activeListId,
    activeList,
    setActiveListId,
    loading: listsLoading,
    createList,
    updateList,
    deleteList,
  } = useGroceryLists();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Redirect to auth if not logged in
      if (!session) {
        navigate("/auth");
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // Redirect to auth if user signs out
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Auto-prompt to create first list if none exist
  useEffect(() => {
    if (!listsLoading && lists.length === 0 && user) {
      setShowCreateListDialog(true);
    }
  }, [listsLoading, lists.length, user]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke("search", {
        body: { query: searchQuery, mode: searchMode },
      });

      if (error) {
        console.error('Search error:', error);
        throw error;
      }

      console.log('Search results:', data);
      setSearchResults(data.results || []);
      
      if (!data.results || data.results.length === 0) {
        toast.error("No products found for '" + searchQuery + "'", {
          description: "Try searching for: milk, coke, pepsi, butter, or chips",
        });
      }
    } catch (error: any) {
      console.error('Search failed:', error);
      toast.error("Search failed: " + (error.message || 'Unknown error'));
    } finally {
      setSearching(false);
    }
  };

  const handleProductDetected = async (productName: string) => {
    setSearchQuery(productName);
    toast.success(`Identified: ${productName}`);
    handleSearch();
  };

  const addToList = async (item: SearchResult) => {
    if (!activeListId) {
      toast.error("Please create a list first");
      setShowCreateListDialog(true);
      return;
    }

    try {
      const { error } = await supabase.from("grocery_list_items").insert([
        {
          grocery_list_id: activeListId,
          grocery_item_id: item.id,
          quantity: 1,
        },
      ]);

      if (error) throw error;

      toast.success(`Added ${item.item_name} to ${activeList?.name || 'list'}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCreateList = async (
    name: string, 
    color: string, 
    imageUrl?: string,
    items?: { name: string; quantity: number }[]
  ) => {
    const newList = await createList(name, color, imageUrl, items);
    if (newList && lists.length === 0) {
      toast.success("Your first list is ready! Start adding items.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={isayvLogo} alt="ISAYV" className="h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ISAYV
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => setShowListDetail(!showListDetail)}
              disabled={!activeList}
              className="gap-2 hover:scale-105 transition-transform"
            >
              <ShoppingBasket className="h-4 w-4" />
              <span className="hidden sm:inline">{activeList?.name || 'No List'}</span>
            </Button>
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

      {/* Grocery Lists Bar */}
      {!listsLoading && (
        <GroceryListsBar
          lists={lists}
          activeListId={activeListId}
          onListSelect={setActiveListId}
          onCreateList={() => setShowCreateListDialog(true)}
        />
      )}

      <main className="container mx-auto px-4 py-8 flex-1 max-w-6xl">
        {/* Search Panel */}
        <div 
          className={`bg-card border rounded-xl p-6 shadow-sm transition-all mb-6 ${
            searchMode === 'brand' 
              ? 'bg-accent/5 border-accent/40' 
              : 'border-border/60'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Search Products</h2>
            <SearchModeToggle mode={searchMode} onChange={setSearchMode} />
          </div>
          
          <div className="flex gap-2 mb-2">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="pl-10 h-12"
              />
            </div>
            <Button
              size="lg"
              onClick={handleSearch}
              disabled={searching}
              className="h-12"
            >
              Search
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowCameraModal(true)}
              className="h-12 px-4"
            >
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            {searchMode === 'brand'
              ? "Brand-loyal mode: prioritizing branded products."
              : "Cheapest mode: sorting by lowest total price."}
          </p>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.item_name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="font-semibold mb-2">{item.item_name}</h3>
                  {item.brand && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.brand}
                    </p>
                  )}
                  {item.price && (
                    <p className="text-sm mb-4">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  )}
                  <Button
                    size="sm"
                    onClick={() => addToList(item)}
                    disabled={!activeList}
                    className="w-full"
                  >
                    {activeList ? `Add to ${activeList.name}` : 'Create a list first'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <CameraModal
        open={showCameraModal}
        onOpenChange={setShowCameraModal}
        onProductDetected={handleProductDetected}
      />

      <CreateListDialog
        open={showCreateListDialog}
        onOpenChange={setShowCreateListDialog}
        onCreateList={handleCreateList}
      />

      <GroceryListSheet
        open={showListDetail}
        onOpenChange={setShowListDetail}
        list={activeList}
        onUpdateList={updateList}
        onDeleteList={deleteList}
      />
    </div>
  );
};

export default Dashboard;
