const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            isayv
          </p>
          <p className="text-muted-foreground">
            Building the future of AI, one innovation at a time.
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
