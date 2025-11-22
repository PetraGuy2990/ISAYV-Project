import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, ShoppingCart } from "lucide-react";
import { searchProducts, ProductPrice } from "@/data/mockProducts";
import isayvLogo from "@/assets/logo.png";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductPrice[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductPrice | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleProductSelect = (product: ProductPrice) => {
    setSelectedProduct(product);
    setSearchQuery(product.name);
    setShowDropdown(false);
  };

  const handleCompare = () => {
    if (selectedProduct) {
      navigate(`/compare?name=${encodeURIComponent(selectedProduct.name)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
            <img src={isayvLogo} alt="ISAYV" className="h-10" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ISAYV
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              My Cart
            </Button>
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Compare Grocery Prices
            </h1>
            <p className="text-xl text-muted-foreground">
              Search for any product and see the best prices instantly
            </p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products (e.g., Coke 1L, Milk, Bread...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                className="pl-10 h-14 text-lg"
              />
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div className="absolute w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-10 animate-fade-in">
                {searchResults.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => handleProductSelect(product)}
                    className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0 flex items-center justify-between group"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      Compare prices →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedProduct && (
            <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected Product</p>
                  <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
                </div>
                <Button
                  onClick={handleCompare}
                  size="lg"
                  className="px-8"
                >
                  Compare Prices
                </Button>
              </div>
            </div>
          )}

          {!selectedProduct && !searchQuery && (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <SearchIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Start Your Search</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Type in the search box above to find products and compare prices across multiple retailers
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
