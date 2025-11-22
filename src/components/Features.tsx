import { Zap, Shield, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden">
      {/* Parallax background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
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
              className={`group relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                transform: `translateY(${isVisible ? 0 : 40}px)`
              }}
            >
              {/* Gradient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
