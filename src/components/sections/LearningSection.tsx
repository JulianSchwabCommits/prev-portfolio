'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2020',
    title: 'Early Web Dev',
    description: 'HTML, CSS, JavaScript.  Building my first interactive experiences.',
    icon: '◇',
  },
  {
    year: '2021',
    title: 'Python Game Dev',
    description: 'Developed a collection of interactive games using object-oriented programming.',
    icon: '◆',
  },
  {
    year: '2023-2024',
    title: 'Game Dev in Unreal Engine',
    description: 'Focused primarily on building 3D games, designing using Blender and implementing logic with Unreal Engine. My secondary school final project was creating a VR mental arithmetic game for the Oculus Quest, where players solve math challenges to earn points.',
    icon: '△',
  },
  {
    year: '2024',
    title: 'RPA Automation Consulting',
    description: 'My first Team at my apprenticeship at Swisscom. learned about Automating business processes using UiPath RPA platform.',
    icon: '□',
  },
  {
    year: '2024-2025',
    title: 'Machine Learning & Deep Learning',
    description: 'I taught myself machine learning from Hands-On Machine Learning with Scikit-Learn and TensorFlow by Aurélien Géron. I built prediction models using Python, Scikit-learn, and TensorFlow. I learned how to clean data, train models, and make accurate predictions.',
    icon: '○',
  },
  {
    year: '2025-2026',
    title: 'Backend Developer (AI Focus)',
    description: 'Developing AI-powered systems with the Apps Team, build a prototype for nl2sql and worked for a year on refinement until it was perfect, had a great time.',
    icon: '✧',
  },
  {
    year: 'present',
    title: 'Robotics & Isaac Lab',
    description: "I'm really interested in robotics if you come back in a view weeks maybe there will be more to share.",
    icon: '◎',
  },
];

export const LearningSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Progress line animation
      gsap.fromTo('.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        }
      );

      // Milestone reveals
      gsap.utils.toArray<HTMLElement>('.milestone-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
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
      id="learning" 
      ref={containerRef}
      className="relative min-h-screen section-padding px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <span className="text-xs tracking-widest text-muted-foreground uppercase mb-8 block">
          03 — Learning Path
        </span>

        <h2 className="text-display mb-4">
          Curiosity Compounded
        </h2>

        <p className="text-lg text-muted-foreground mb-16 max-w-xl">
          Every step built on the last. Not a skill dump — a progression.
        </p>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2">
            <div className="timeline-progress absolute inset-0 bg-foreground origin-top" />
          </div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`milestone-item relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="absolute left-6 md:left-1/2 w-6 h-6 -translate-x-1/2 bg-background flex items-center justify-center z-10">
                  <span className="text-lg">{milestone.icon}</span>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <span className="text-xs text-muted-foreground/50 tabular-nums block mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="text-lg font-medium mb-2">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
