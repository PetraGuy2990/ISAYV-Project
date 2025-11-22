import { ShoppingBasket, Search, ShoppingCart, Gift } from "lucide-react";

const features = [
  {
    icon: ShoppingBasket,
    title: "Smart Basket Selection",
    description: "Upload a photo, select items, or type your grocery list. Our AI recognizes your items instantly for quick comparison."
  },
  {
    icon: Search,
    title: "Intelligent Price Comparison",
    description: "Compare prices across multiple retailers based on location, stock availability, and total basket cost. Digital coupons automatically applied."
  },
  {
    icon: ShoppingCart,
    title: "Seamless Ordering",
    description: "Order directly from your chosen retailer with options for curbside pickup, click & collect, or home delivery."
  },
  {
    icon: Gift,
    title: "Rewards & Loyalty",
    description: "Track your purchases and earn loyalty points with every order. Save more with our integrated rewards program."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to smarter grocery shopping and big savings
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
