import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const newProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
        
        const currentTime = Date.now();
        const timeDelta = currentTime - lastTime;
        const scrollDelta = scrollY - lastScrollY;
        
        if (timeDelta > 0) {
          const newVelocity = Math.abs(scrollDelta / timeDelta) * 10;
          setVelocity(Math.min(newVelocity, 1));
        }

        if (scrollDelta > 0) {
          setDirection('down');
        } else if (scrollDelta < 0) {
          setDirection('up');
        } else {
          setDirection('idle');
        }

        setProgress(newProgress);
        lastScrollY = scrollY;
        lastTime = currentTime;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { progress, velocity, direction };
};
