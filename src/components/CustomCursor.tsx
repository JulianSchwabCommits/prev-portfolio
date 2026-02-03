'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

type CursorState = 'default' | 'hover' | 'link' | 'project' | 'assistant' | 'text';

interface Position {
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [delayedPosition, setDelayedPosition] = useState<Position>({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { velocity } = useScrollProgress();
  
  const rafRef = useRef<number>();
  const targetRef = useRef<Position>({ x: 0, y: 0 });

  // Smooth follow animation
  useEffect(() => {
    const animate = () => {
      setDelayedPosition(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.15,
        y: prev.y + (targetRef.current.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    targetRef.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);

  useEffect(() => {
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('[data-cursor="project"]')) {
        setCursorState('project');
      } else if (target.closest('[data-cursor="assistant"]')) {
        setCursorState('assistant');
      } else if (target.closest('[data-cursor="link"]') || target.closest('a') || target.closest('button')) {
        setCursorState('link');
      } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  const getCursorStyles = () => {
    const baseScale = isPressed ? 0.8 : 1;
    const velocityScale = 1 - velocity * 0.3;
    
    switch (cursorState) {
      case 'link':
        return {
          dotSize: 6,
          ringSize: 50,
          dotOpacity: 1,
          ringOpacity: 0.5,
          scale: baseScale * velocityScale * 1.2,
        };
      case 'project':
        return {
          dotSize: 0,
          ringSize: 80,
          dotOpacity: 0,
          ringOpacity: 0.3,
          scale: baseScale * velocityScale,
        };
      case 'assistant':
        return {
          dotSize: 8,
          ringSize: 60,
          dotOpacity: 1,
          ringOpacity: 0.6,
          scale: baseScale * velocityScale * 1.1,
        };
      case 'text':
        return {
          dotSize: 4,
          ringSize: 0,
          dotOpacity: 0.8,
          ringOpacity: 0,
          scale: baseScale * velocityScale,
        };
      default:
        return {
          dotSize: 8,
          ringSize: 40,
          dotOpacity: 1,
          ringOpacity: 0.3,
          scale: baseScale * velocityScale,
        };
    }
  };

  const styles = getCursorStyles();

  return (
    <>
      {/* Dot cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${styles.scale})`,
          opacity: isVisible ? styles.dotOpacity : 0,
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease',
          width: styles.dotSize,
          height: styles.dotSize,
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
      />
      
      {/* Ring cursor */}
      <div
        className="fixed pointer-events-none z-[9998] border border-foreground/50 rounded-full"
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          transform: `translate(-50%, -50%) scale(${styles.scale})`,
          opacity: isVisible ? styles.ringOpacity : 0,
          transition: 'opacity 0.2s ease, width 0.3s ease, height 0.3s ease, border-color 0.2s ease',
          width: styles.ringSize,
          height: styles.ringSize,
        }}
      />

      {/* Icon indicators */}
      {cursorState === 'project' && (
        <div
          className="fixed pointer-events-none z-[9999] text-foreground text-xs font-medium"
          style={{
            left: delayedPosition.x,
            top: delayedPosition.y,
            transform: 'translate(-50%, -50%)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          VIEW
        </div>
      )}

      {cursorState === 'assistant' && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: delayedPosition.x,
            top: delayedPosition.y,
            transform: 'translate(-50%, -50%)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div className="w-2 h-2 bg-foreground rounded-full animate-pulse-slow" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
