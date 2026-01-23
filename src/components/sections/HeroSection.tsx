import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-name', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo('.hero-tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 text-center max-w-4xl">
        {/* Name */}
        <h1 className="hero-name text-hero tracking-tighter mb-4 opacity-0">
          Julian Schwab
        </h1>

        {/* Title */}
        <p className="hero-title text-lg md:text-xl text-muted-foreground mb-8 opacity-0">
          Apprentice Application Developer @ Swisscom
        </p>

        {/* Tagline */}
        <p className="hero-tagline text-display text-foreground/80 opacity-0">
          Built outside. Shipped inside.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
