import { ShoppingBasket, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              isayv
            </p>
            <ShoppingBasket className="h-6 w-6 text-accent" />
          </div>
          <p className="text-muted-foreground">
            Fresh savings on every grocery trip 🥦🍊🥛
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} isayv. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
