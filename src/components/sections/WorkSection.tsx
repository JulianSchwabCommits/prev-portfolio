import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    type: 'work',
    period: '2024 - Present',
    title: 'Apprentice Application Developer',
    organization: 'Swisscom',
    description: 'Building production systems, not just prototypes.',
    highlights: [
      'Developed AI-powered features for internal tools, that saves over 20 hours weekly.',
      'Learned from senior engineers on architecture decisions',
      'Prototyped to production — full lifecycle experience',
    ],
  },
  {
    type: 'Berufsschule ',
    period: '2024 - 20028',
    title: 'Apprenticeship Program',
    organization: 'Swiss Vocational Education',
    description: 'learning while doing. Theory meets practice.',
    highlights: [
      'Software engineering fundamentals',
      'Database design and optimization',
      'Project management methodologies',
      'System architecture principles',
    ],
    },
    {
    type: 'Berufsmaturitätsschule',
    period: '2024 - 2028',
    title: '...',
    organization: 'Swiss Vocational Education',
    description: 'learning while doing. Theory meets practice.',
    highlights: [
      'Software engineering fundamentals',
      'Database design and optimization',
      'Project management methodologies',
      'System architecture principles',
    ],
  },
];

export const WorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline items
      gsap.utils.toArray<HTMLElement>('.work-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="work" 
      ref={containerRef}
      className="relative min-h-screen section-padding px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <span className="text-xs tracking-widest text-muted-foreground uppercase mb-8 block">
          05 — Work & School
        </span>

        <h2 className="text-display mb-4">
          Shipping While Learning
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-xl">
          The Swiss apprenticeship model: theory and practice, woven together.
        </p>

        {/* Timeline */}
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <article 
              key={index}
              className="work-item relative"
            >
              {/* Type badge */}
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full ${
                  item.type === 'work' 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {item.type}
                </span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {item.period}
                </span>
              </div>

              {/* Content */}
              <div className="border-l-2 border-border pl-6 py-2">
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.organization}</p>
                
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Connecting statement */}
        <div className="mt-16 p-8 rounded-2xl bg-muted/50 border border-border">
          <p className="text-lg text-foreground/80 italic">
            "What I learn at BBW clicks perfectly with what I do at Swisscom."
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
