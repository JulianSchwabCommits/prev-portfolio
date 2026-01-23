import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const currentPursuits = [
  {
    title: 'Marathon Training',
    status: 'In Progress',
    goal: 'Sub 3:30',
    description: 'Training for my first marathon. The goal is ambitious, but the process is the reward. Currently building base mileage and learning to embrace long runs.',
  },
  {
    title: 'Isaac Lab & Robotics',
    status: 'Exploring',
    goal: 'Sim-to-Real',
    description: 'Diving deep into reinforcement learning for robotic manipulation. Fascinated by the challenge of bridging simulation and reality.',
  },
  {
    title: 'Personal AI Assistant',
    status: 'Building',
    goal: 'v1.0',
    description: 'Crafting my own AI companion. Context-aware, memory-enabled, personalized. Learning by building something I actually want to use.',
  },
  {
    title: 'Learning for Learning',
    status: 'Always',
    goal: '∞',
    description: 'Papers, courses, books, experiments. The stack never stops growing. Currently deep in RL theory and distributed systems.',
  },
];

export const NowSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger in cards
      gsap.fromTo('.now-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.now-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="now" 
      ref={containerRef}
      className="relative min-h-screen section-padding px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <span className="text-xs tracking-widest text-muted-foreground uppercase mb-8 block">
          06 — Now
        </span>

        <h2 className="text-display mb-4">
          What I'm Obsessed With
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-xl">
          A living section. These are the things consuming my attention right now.
        </p>

        {/* Cards grid */}
        <div className="now-grid grid md:grid-cols-2 gap-6">
          {currentPursuits.map((pursuit, index) => (
            <article 
              key={pursuit.title}
              className="now-card p-6 rounded-2xl border border-border bg-card hover:bg-muted/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                    {pursuit.status}
                  </span>
                  <h3 className="text-lg font-semibold mt-1">{pursuit.title}</h3>
                </div>
                <span className="text-sm px-2 py-1 bg-muted rounded text-muted-foreground">
                  Goal: {pursuit.goal}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pursuit.description}
              </p>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">
            This is a living document. Updated as obsessions evolve.
          </p>
          
          <p className="text-sm text-muted-foreground/60">
            Last updated: January 2026
          </p>

          <div className="mt-8 flex justify-center gap-6">
            <a 
              href="mailto:jla.schwab@gmail.com"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
              data-cursor="link"
            >
              Email
            </a>
            <a 
              href="https://github.com/julianschwabcommits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
              data-cursor="link"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/schwab-julian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-muted-foreground transition-colors"
              data-cursor="link"
            >
              LinkedIn
            </a>
          </div>

          <p className="mt-12 text-xs text-muted-foreground/40">
            Built with curiosity and caffeine.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default NowSection;
