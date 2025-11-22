import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import isayvLogo from "@/assets/isayv-logo.jpg";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for your interest! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={isayvLogo} 
              alt="isayv logo" 
              className="h-32 w-auto rounded-2xl shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Hero heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome to isayv
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the future of AI-powered innovation. Join our exclusive beta program and be among the first to transform your workflow.
          </p>

          {/* Email signup form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base border-border/50 focus:border-primary transition-colors"
              />
              <Button 
                type="submit" 
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-glow"
              >
                Join Beta
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Be the first to experience next-generation AI
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
