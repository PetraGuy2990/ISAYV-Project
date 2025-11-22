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
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                isayv is pioneering the next generation of AI technology, designed to empower businesses and individuals with intelligent, intuitive solutions. We're building tools that understand your needs and adapt to your workflow.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Why Beta?</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're inviting select users to join our beta program to help shape the future of AI. Your feedback will directly influence our development roadmap. Be part of something revolutionary from the ground up.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
              <h3 className="text-2xl font-semibold mb-4 text-primary">What to Expect</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beta testers will get exclusive early access to groundbreaking features, direct communication with our development team, and the opportunity to influence product direction. Plus, special perks when we launch publicly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
