import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  { 
    title: 'Running',
    description: "Learning to embrace the uncomfortable, and keep moving anyway."
  },
  { 
    title: 'Hiking',
    description: "Sometimes it's best to just take a step back and look at the situation from there."
  },
  { 
    title: 'Kitesurfing',
    description: "Helped me stay relaxed in uncomfortable situations."
  },
  { 
    title: 'Marathon Training',
    description: "They weren't lying when they said consistency is key."
  },
];


export const OriginSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for the elevation line
      gsap.to(parallaxRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stagger in the activities
      gsap.fromTo('.origin-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.origin-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Main text reveal
      gsap.fromTo('.origin-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.origin-text',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="origin" 
      ref={containerRef}
      className="relative min-h-screen section-padding px-6 overflow-hidden"
    >
      {/* Elevation line - parallax element */}
      <div 
        ref={parallaxRef}
        className="absolute right-0 top-0 w-1/3 h-[200%] pointer-events-none"
      >
        <svg 
          viewBox="0 0 200 1000" 
          className="w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <path
            d="M 180 0 L 180 200 L 120 300 L 160 400 L 100 500 L 140 600 L 80 700 L 120 800 L 60 900 L 100 1000"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          {/* Elevation markers */}
          {[200, 400, 600, 800].map((y, i) => (
            <g key={i}>
              <circle cx="140" cy={y} r="3" fill="currentColor" />
              <text x="145" y={y + 4} fontSize="10" fill="currentColor" opacity="0.5">
                {2000 + i * 500}m
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section label */}
        <span className="text-xs tracking-widest text-muted-foreground uppercase mb-8 block">
          02 — Origin
        </span>

        {/* Main text */}
        <div className="origin-text space-y-8 mb-16">
          <h2 className="text-display">
            Outside First
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Since I was a kid, I've loved being in the mountains with my parents. 
            These days I enjoy trail running, hiking, and snowboarding with friends and family.

          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl">
            Spending time outdoors taught me patience, adaptability, and how to push through challenges that come in handy when I'm coding.
          </p>
        </div>

        {/* Activities list */}
        <div className="origin-list space-y-6">
          {activities.map((activity, index) => (
            <div 
              key={activity.title}
              className="origin-item flex items-start gap-6 py-4 border-t border-border"
            >
              <span className="text-xs text-muted-foreground/50 tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-lg font-medium mb-1">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
