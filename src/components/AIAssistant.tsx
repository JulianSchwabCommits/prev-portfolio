import { useState, useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating animation
  useEffect(() => {
    if (!orbRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous float
      gsap.to(orbRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle rotation
      gsap.to(orbRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover reaction
  useEffect(() => {
    if (!orbRef.current) return;

    if (isHovered) {
      gsap.to(orbRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(orbRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      {/* Expanded panel */}
      <div 
        className={`absolute bottom-full right-0 mb-4 w-80 glass rounded-2xl overflow-hidden transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Ask Julian</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              data-cursor="link"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              An AI assistant that knows my story, projects, and journey.
              Coming soon.
            </p>

            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground/80 mb-2">
                What it will do:
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Answer questions about my work</li>
                <li>• Navigate to relevant sections</li>
                <li>• Explain technical projects</li>
                <li>• Share context about my journey</li>
              </ul>
            </div>

            <p className="text-xs text-center text-muted-foreground/60">
              Powered by my own AI assistant project
            </p>
          </div>
        </div>
      </div>

      {/* Orb trigger */}
      <button
        ref={orbRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 rounded-full glass flex items-center justify-center group"
        data-cursor="assistant"
        aria-label="Open AI assistant"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-foreground/5 animate-pulse-slow" />
        
        {/* Inner orb */}
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-foreground/40" />
        </div>

        {/* Orbiting particle */}
        <div 
          className="absolute w-2 h-2 rounded-full bg-foreground/30"
          style={{
            animation: 'orbit 4s linear infinite',
          }}
        />
      </button>

      {/* Custom orbit animation */}
      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(24px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(24px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
