import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI / ML' | 'Automation' | 'Full-stack' | 'Experiments';
  description: string;
  tech: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: 'ai-assistant',
    title: 'Personal AI Assistant',
    tagline: 'Context-aware companion that learns and adapts.',
    category: 'AI / ML',
    description: 'A conversational AI system built with memory, context awareness, and personalization. Integrates with daily workflows to provide intelligent assistance across tasks.',
    tech: ['Python', 'LangChain', 'Vector DB', 'FastAPI'],
    year: '2025-2026',
  },
  {
    id: 'isaac-robotics',
    title: 'Isaac Lab Experiments',
    tagline: 'Simulation-to-reality robotics research.',
    category: 'AI / ML',
    description: 'Exploring reinforcement learning for robotic manipulation using NVIDIA Isaac Lab. Training policies in simulation for real-world deployment.',
    tech: ['Isaac Lab', 'PyTorch', 'RL', 'CUDA'],
    year: '2024',
  },
  {
    id: 'workflow-automation',
    title: 'Enterprise Workflow Automation',
    tagline: 'Saving 40+ hours weekly through intelligent automation.',
    category: 'Automation',
    description: 'Designed and deployed RPA solutions at Swisscom, automating repetitive processes and integrating disparate systems for seamless data flow.',
    tech: ['UiPath', 'Python', 'REST APIs', 'SQL'],
    year: '2023',
  },
  {
    id: 'ml-pipeline',
    title: 'ML Pipeline Framework',
    tagline: 'End-to-end machine learning infrastructure.',
    category: 'AI / ML',
    description: 'Built a reusable pipeline for data processing, model training, evaluation, and deployment. Focus on reproducibility and scalability.',
    tech: ['Python', 'MLflow', 'Docker', 'scikit-learn'],
    year: '2023',
  },
  {
    id: 'full-stack-app',
    title: 'Real-time Analytics Dashboard',
    tagline: 'Visualizing data that matters.',
    category: 'Full-stack',
    description: 'Full-stack application for real-time data visualization. WebSocket connections for live updates, interactive charts, and custom filtering.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    year: '2023',
  },
  {
    id: 'game-prototype',
    title: 'Unreal Engine Prototype',
    tagline: 'Procedural world generation experiments.',
    category: 'Experiments',
    description: 'Experimented with procedural generation and real-time rendering in Unreal Engine. Built custom shaders and terrain generation systems.',
    tech: ['Unreal Engine', 'C++', 'Blueprints', 'HLSL'],
    year: '2021',
  },
  {
    id: 'nlp-toolkit',
    title: 'NLP Toolkit',
    tagline: 'Text understanding made accessible.',
    category: 'AI / ML',
    description: 'Collection of natural language processing tools for text classification, sentiment analysis, and entity extraction. Modular design for easy integration.',
    tech: ['Python', 'Transformers', 'spaCy', 'FastAPI'],
    year: '2022',
  },
  {
    id: 'iot-monitoring',
    title: 'IoT Monitoring System',
    tagline: 'Edge computing meets cloud analytics.',
    category: 'Experiments',
    description: 'Built an IoT monitoring system with edge processing and cloud aggregation. Real-time alerts and historical trend analysis.',
    tech: ['Raspberry Pi', 'MQTT', 'InfluxDB', 'Grafana'],
    year: '2022',
  },
];

const categories = ['All', 'AI / ML', 'Automation', 'Full-stack', 'Experiments'] as const;

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll for desktop
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalScroll = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <>
      <section 
        id="projects" 
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Header - pinned */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 py-8 bg-gradient-to-b from-background via-background to-transparent">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs tracking-widest text-muted-foreground uppercase mb-4 block">
              04 — Projects
            </span>
            <h2 className="text-display mb-6">
              Things I Actually Built
            </h2>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    activeCategory === category
                      ? 'bg-foreground text-background'
                      : 'bg-muted hover:bg-muted-foreground/20'
                  }`}
                  data-cursor="link"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-8 px-6 pt-48 pb-12 h-screen"
          style={{ width: `${filteredProjects.length * 420 + 200}px` }}
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex-shrink-0 w-[380px] h-[480px] p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02] flex flex-col"
              data-cursor="project"
            >
              {/* Category badge */}
              <span className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-4">
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground/90 transition-colors">
                {project.title}
              </h3>

              {/* Tagline */}
              <p className="text-muted-foreground text-sm flex-grow">
                {project.tagline}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.slice(0, 3).map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs px-2 py-1 bg-muted rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 text-muted-foreground">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Year */}
              <span className="text-xs text-muted-foreground/50 mt-4 tabular-nums">
                {project.year}
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Project detail overlay */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <article 
            className="relative max-w-2xl w-full p-8 md:p-12 rounded-2xl bg-card border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors"
              data-cursor="link"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
              {selectedProject.category} · {selectedProject.year}
            </span>

            <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-4">
              {selectedProject.title}
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              {selectedProject.tagline}
            </p>

            <p className="text-foreground/80 leading-relaxed mb-8">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
                <span 
                  key={tech}
                  className="text-sm px-3 py-1.5 bg-muted rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
