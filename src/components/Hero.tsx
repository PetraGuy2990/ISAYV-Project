import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import isayvLogo from "@/assets/isayv-logo.jpg";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for your interest! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0003})` }}
        />
        <div 
          className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0002})`, animationDelay: "1s" }}
        />
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0004})`, animationDelay: "2s" }}
        />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent/30 rounded-full animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }} />
      </div>

      <div 
        className="container relative z-10 mx-auto px-4 py-20"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          {/* Logo with enhanced effects */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <img 
                src={isayvLogo} 
                alt="isayv logo" 
                className="relative h-32 w-auto rounded-2xl shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-110 hover:rotate-2"
              />
            </div>
          </div>

          {/* Hero heading with animated gradient */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow bg-[length:200%_auto]">
              Welcome to isayv
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
            Experience the future of AI-powered innovation. Join our exclusive beta program and be among the first to transform your workflow.
          </p>

          {/* Email signup form with enhanced styling */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 animate-fade-up" style={{ animationDelay: "400ms" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-base border-0 bg-background/50 focus:bg-background focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300"
                />
                <Button 
                  type="submit" 
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-soft hover:shadow-glow hover:scale-105"
                >
                  Join Beta
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 animate-pulse">
              ✨ Be the first to experience next-generation AI
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
