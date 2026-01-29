/**
 * DEMO MODE - Dashboard with mock data
 * This app is for demonstration, content creation, and user testing only.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, User as UserIcon, ShoppingBasket, Plus, Sparkles } from "lucide-react";
import { SearchModeToggle } from "@/components/SearchModeToggle";
import { GroceryListsBar } from "@/components/GroceryListsBar";
import { CreateListDialog } from "@/components/CreateListDialog";
import { GroceryListSheet } from "@/components/GroceryListSheet";
import isayvLogo from "@/assets/logo.png";
import { useMockGroceryLists } from "@/hooks/useMockGroceryLists";
import { useMockSearch, type SearchResult } from "@/hooks/useMockSearch";
import { retailers } from "@/data/mockGroceryData";

const Dashboard = () => {
  const [showCreateListDialog, setShowCreateListDialog] = useState(false);
  const [showListDetail, setShowListDetail] = useState(false);
  const navigate = useNavigate();

  // Mock grocery lists hook
  const {
    lists,
    activeListId,
    activeList,
    setActiveListId,
    loading: listsLoading,
    createList,
    updateList,
    deleteList,
    addItemToList,
  } = useMockGroceryLists();

  // Mock search hook
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    mode: searchMode,
    setMode: setSearchMode,
    results: searchResults,
    searching,
    suggestions,
    search: handleSearch,
  } = useMockSearch();

  const addToList = (item: SearchResult) => {
    if (!activeListId) {
      toast.error("Please create a list first");
      setShowCreateListDialog(true);
      return;
    }

    addItemToList(activeListId, item, 1);
  };

  const handleCreateList = (
    name: string,
    color: string,
    imageUrl?: string,
    items?: { name: string; quantity: number }[]
  ) => {
    createList(name, color, imageUrl, items);
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  const getRetailerInfo = (id: string) => {
    return retailers.find(r => r.id === id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Demo Mode Banner */}
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-primary font-medium">Demo Mode</span>
          <span className="text-muted-foreground">– All data is simulated for demonstration purposes</span>
        </div>
      </div>

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
              <span className="hidden sm:inline">{activeList?.name || "No List"}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/account")}
              className="gap-2 hover:scale-105 transition-transform"
            >
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Demo User</span>
            </Button>
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
            searchMode === "brand"
              ? "bg-accent/5 border-accent/40"
              : "border-border/60"
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
                  searchMode === "brand"
                    ? "Search by brand e.g. 'Kirkland milk'"
                    : "Search all items e.g. 'milk', 'chicken', 'chips'"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="pl-10 h-12"
              />
              
              {/* Autocomplete Suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => {
                        setSearchQuery(suggestion.product.name);
                        handleSearch(suggestion.product.name);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-accent transition-colors text-sm"
                    >
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              size="lg"
              onClick={() => handleSearch()}
              disabled={searching}
              className="h-12"
            >
              {searching ? "Searching..." : "Search"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            {searchMode === "brand"
              ? "Brand-loyal mode: prioritizing branded products."
              : "Cheapest mode: sorting by lowest price."}
            {" "}• 200+ products available
          </p>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">{item.size}</p>

                  {/* Price comparison grid */}
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {retailers.map((retailer) => {
                      const price = item.retailerPrices[retailer.id];
                      const isBest = item.bestRetailer === retailer.id;
                      return (
                        <div
                          key={retailer.id}
                          className={`px-2 py-1 rounded text-xs flex items-center justify-between ${
                            isBest
                              ? "bg-primary/10 border border-primary/30"
                              : "bg-muted/50"
                          }`}
                        >
                          <span className="font-medium">{retailer.logo}</span>
                          <span className={isBest ? "font-bold text-primary" : ""}>
                            {formatPrice(price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {item.minPrice && (
                    <p className="text-sm font-semibold text-primary mb-3">
                      Best: {formatPrice(item.minPrice)} at{" "}
                      {getRetailerInfo(item.bestRetailer!)?.name}
                    </p>
                  )}

                  <Button
                    size="sm"
                    onClick={() => addToList(item)}
                    disabled={!activeList}
                    className="w-full gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    {activeList ? `Add to ${activeList.name}` : "Create a list first"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {searchResults.length === 0 && !searching && (
          <div className="text-center py-12">
            <ShoppingBasket className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search for groceries</h3>
            <p className="text-muted-foreground mb-4">
              Try searching for "milk", "chicken", "chips", or any grocery item
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Milk", "Eggs", "Bread", "Chicken", "Bananas", "Chips"].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch(term);
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </main>

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
