import { useState, useEffect, useRef } from "react";

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-secondary/20 via-background to-secondary/10 overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.08}px) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.12}px) scale(${1 + Math.cos(scrollY * 0.01) * 0.1})`, animationDelay: "1.5s" }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              What is <span className="text-primary">isayv</span>?
            </h2>
          </div>

          <div className="space-y-8">
            <div 
              className={`group relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="relative text-2xl font-semibold mb-4 text-primary group-hover:scale-105 inline-block transition-transform duration-300">
                Our Vision
              </h3>
              <p className="relative text-lg text-muted-foreground leading-relaxed">
                isayv is pioneering the next generation of AI technology, designed to empower businesses and individuals with intelligent, intuitive solutions. We're building tools that understand your needs and adapt to your workflow.
              </p>
            </div>

            <div 
              className={`group relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="relative text-2xl font-semibold mb-4 text-primary group-hover:scale-105 inline-block transition-transform duration-300">
                Why Beta?
              </h3>
              <p className="relative text-lg text-muted-foreground leading-relaxed">
                We're inviting select users to join our beta program to help shape the future of AI. Your feedback will directly influence our development roadmap. Be part of something revolutionary from the ground up.
              </p>
            </div>

            <div 
              className={`group relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="relative text-2xl font-semibold mb-4 text-primary group-hover:scale-105 inline-block transition-transform duration-300">
                What to Expect
              </h3>
              <p className="relative text-lg text-muted-foreground leading-relaxed">
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
