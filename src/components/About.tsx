const About = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What is <span className="text-primary">isayv</span>?
            </h2>
          </div>

          <div className="space-y-8 animate-fade-up">
            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Smart Grocery Shopping</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                isayv is revolutionizing how you shop for groceries. Compare prices across multiple retailers instantly, find the best deals on your entire basket—not just individual items—and save hundreds every month with automatic coupon application.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Why Join Beta?</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Be among the first to experience the future of grocery shopping. Help us perfect features like photo basket scanning, location-based comparison, and loyalty rewards. Your feedback shapes a platform that saves families real money.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 text-primary">What You'll Get</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Real-time price comparisons, automatic digital coupon application, stock availability tracking, loyalty rewards on every purchase, and seamless ordering with curbside pickup or delivery. Plus priority support from our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
