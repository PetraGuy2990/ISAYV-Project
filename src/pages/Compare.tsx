import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingDown, Store } from "lucide-react";
import { getProductByName, ProductPrice } from "@/data/mockProducts";
import isayvLogo from "@/assets/logo.png";

const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productName = searchParams.get("name");
    
    if (!productName) {
      setError("No product specified");
      setLoading(false);
      return;
    }

    // Simulate API call delay for realism
    setTimeout(() => {
      const foundProduct = getProductByName(productName);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Product not found");
      }
      setLoading(false);
    }, 500);
  }, [searchParams]);

  const getCheapestStore = (): "walmart" | "kroger" | null => {
    if (!product) return null;
    return product.walmart < product.kroger ? "walmart" : "kroger";
  };

  const getSavings = (): number => {
    if (!product) return 0;
    return Math.abs(product.walmart - product.kroger);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-lg text-muted-foreground">Comparing prices...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center space-y-4">
          <p className="text-xl text-destructive">{error || "Product not found"}</p>
          <Button onClick={() => navigate("/search")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const cheapestStore = getCheapestStore();
  const savings = getSavings();

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
          <Button variant="ghost" onClick={() => navigate("/search")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Search
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">Price comparison across retailers</p>
          </div>

          {savings > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-center gap-2 text-primary">
              <TrendingDown className="h-5 w-5" />
              <span className="font-semibold">
                Save ${savings.toFixed(2)} by shopping at {cheapestStore === "walmart" ? "Walmart" : "Kroger"}!
              </span>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Walmart Card */}
            <div
              className={`bg-card border-2 rounded-xl p-8 transition-all hover:shadow-lg ${
                cheapestStore === "walmart"
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0071ce] rounded-full flex items-center justify-center">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Walmart</h2>
                  </div>
                  {cheapestStore === "walmart" && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Best Price
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-5xl font-bold text-foreground">
                    ${product.walmart.toFixed(2)}
                  </p>
                </div>

                <Button className="w-full" size="lg" variant={cheapestStore === "walmart" ? "default" : "outline"}>
                  View at Walmart
                </Button>
              </div>
            </div>

            {/* Kroger Card */}
            <div
              className={`bg-card border-2 rounded-xl p-8 transition-all hover:shadow-lg ${
                cheapestStore === "kroger"
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#003da5] rounded-full flex items-center justify-center">
                      <Store className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Kroger</h2>
                  </div>
                  {cheapestStore === "kroger" && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Best Price
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-5xl font-bold text-foreground">
                    ${product.kroger.toFixed(2)}
                  </p>
                </div>

                <Button className="w-full" size="lg" variant={cheapestStore === "kroger" ? "default" : "outline"}>
                  View at Kroger
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button variant="ghost" size="lg" onClick={() => navigate("/search")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Search Another Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Compare;
