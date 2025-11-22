import { Zap, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process complex queries in milliseconds with our cutting-edge AI infrastructure. Experience unprecedented speed and efficiency."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted end-to-end. We prioritize your privacy with industry-leading security protocols and compliance."
  },
  {
    icon: Sparkles,
    title: "Intelligent Insights",
    description: "Get actionable insights powered by advanced machine learning. Make data-driven decisions with confidence."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by Innovation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-soft animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
