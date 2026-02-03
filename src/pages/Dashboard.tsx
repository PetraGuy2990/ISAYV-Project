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
import { Search, User as UserIcon, ShoppingBasket, Plus, Leaf, Apple } from "lucide-react";
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
  const [showSuggestions, setShowSuggestions] = useState(true);
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
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/20 px-3 py-1.5 sm:px-4 sm:py-2">
        <div className="container mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
          <span className="text-primary font-medium">Demo Mode</span>
          <span className="text-muted-foreground hidden xs:inline">– Fresh savings await! 🥬</span>
        </div>
      </div>

      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <img src={isayvLogo} alt="ISAYV" className="h-8 sm:h-10" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ISAYV
            </h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowListDetail(!showListDetail)}
              disabled={!activeList}
              className="gap-1.5 sm:gap-2 hover:scale-105 transition-transform h-9 px-2 sm:px-3"
            >
              <ShoppingBasket className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-sm">{activeList?.name || "No List"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/account")}
              className="gap-1.5 sm:gap-2 hover:scale-105 transition-transform h-9 px-2 sm:px-3"
            >
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-sm">Demo User</span>
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

      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-8 flex-1 max-w-6xl">
        {/* Search Panel */}
        <div
          className={`bg-card border rounded-xl p-4 sm:p-6 shadow-sm transition-all mb-4 sm:mb-6 ${
            searchMode === "brand"
              ? "bg-accent/5 border-accent/40"
              : "border-border/60"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Search Products</h2>
            <SearchModeToggle mode={searchMode} onChange={setSearchMode} />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={
                  searchMode === "brand"
                    ? "Search by brand..."
                    : "Search items..."
                }
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setShowSuggestions(false);
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pl-9 sm:pl-10 h-11 sm:h-12 text-base"
              />
              
              {/* Autocomplete Suggestions */}
              {suggestions.length > 0 && showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => {
                        setSearchQuery(suggestion.product.name);
                        handleSearch(suggestion.product.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-accent transition-colors text-xs active:bg-accent/80 flex items-center gap-2"
                    >
                      <img 
                        src={suggestion.product.imageUrl || `https://via.placeholder.com/32x32/22c55e/ffffff?text=${suggestion.product.name.charAt(0)}`}
                        alt=""
                        className="w-6 h-6 rounded object-cover flex-shrink-0"
                      />
                      <span className="truncate">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              size="lg"
              onClick={() => handleSearch()}
              disabled={searching}
              className="h-11 sm:h-12 w-full sm:w-auto min-w-[100px]"
            >
              {searching ? "..." : "Search"}
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {searchMode === "brand"
              ? "Brand-loyal mode"
              : "Cheapest mode"}
            {" "}• 200+ products
          </p>
        </div>

        {/* Search Results - Compact Grid */}
        {searchResults.length > 0 && (
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {searchResults.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-2">
                  {/* Product Image */}
                  <div className="relative mb-1.5">
                    <img 
                      src={item.imageUrl || `https://via.placeholder.com/80x80/22c55e/ffffff?text=${item.name.charAt(0)}`}
                      alt={item.name}
                      className="w-full h-16 sm:h-20 object-cover rounded"
                    />
                    {item.bestRetailer && (
                      <Badge 
                        className="absolute top-1 right-1 text-[8px] px-1 py-0"
                        style={{ backgroundColor: getRetailerInfo(item.bestRetailer)?.color }}
                      >
                        {getRetailerInfo(item.bestRetailer)?.logo}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-medium line-clamp-1 text-xs">{item.name}</h3>
                  <p className="text-[10px] text-muted-foreground truncate">{item.brand} · {item.size}</p>

                  {/* Best Price */}
                  {item.minPrice && (
                    <p className="text-sm font-bold text-primary mt-1">
                      {formatPrice(item.minPrice)}
                    </p>
                  )}

                  <Button
                    size="sm"
                    onClick={() => addToList(item)}
                    disabled={!activeList}
                    className="w-full gap-1 h-7 text-[10px] mt-1.5 active:scale-[0.98]"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {searchResults.length === 0 && !searching && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="flex justify-center gap-2 mb-3 sm:mb-4">
              <Apple className="h-10 w-10 sm:h-14 sm:w-14 text-destructive/60 animate-bounce-subtle" />
              <ShoppingBasket className="h-12 w-12 sm:h-16 sm:w-16 text-primary/60" />
              <Leaf className="h-10 w-10 sm:h-14 sm:w-14 text-primary/60 animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Find the freshest deals</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Search for milk, eggs, produce, or any grocery item
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
                  className="h-9 px-3 text-sm active:scale-[0.98]"
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
