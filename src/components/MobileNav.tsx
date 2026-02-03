'use client';

import { useState } from 'react';
import { useSectionObserver } from '@/hooks/useSectionObserver';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'origin', label: 'Origin' },
  { id: 'learning', label: 'Learning' },
  { id: 'projects', label: 'Projects' },
  { id: 'work', label: 'Work' },
  { id: 'now', label: 'Now' },
];

export const MobileNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionIds = sections.map(s => s.id);
  const { activeSection, scrollToSection } = useSectionObserver(sectionIds);

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setIsExpanded(false);
  };

  return (
    <nav 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden"
      aria-label="Mobile navigation"
    >
      {/* Expanded menu */}
      <div 
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 glass rounded-2xl overflow-hidden transition-all duration-300 ${
          isExpanded 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-foreground text-background' 
                    : 'hover:bg-muted'
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass rounded-full p-4 flex items-center gap-2"
        aria-label="Toggle navigation menu"
      >
        {/* Dots indicator */}
        <div className="flex gap-1">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isPast = sections.findIndex(s => s.id === activeSection) > index;
            
            return (
              <div
                key={section.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-foreground w-4' 
                    : isPast 
                      ? 'bg-foreground/50' 
                      : 'bg-muted-foreground/30'
                }`}
              />
            );
          })}
        </div>
      </button>
    </nav>
  );
};

export default MobileNav;
