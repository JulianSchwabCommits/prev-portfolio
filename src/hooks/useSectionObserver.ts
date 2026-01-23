import { useState, useEffect, useRef } from 'react';

export const useSectionObserver = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        
        setSectionProgress(prev => ({
          ...prev,
          [id]: entry.intersectionRatio,
        }));

        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setActiveSection(id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { activeSection, sectionProgress, scrollToSection };
};
