
import { useState, useEffect, useRef } from 'react';

/**
 * Tracks mouse velocity with a decay factor to simulate "air drag".
 * Optimized for performance and accessibility.
 */
export const useMouseVelocity = () => {
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Accessibility Check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const vx = Math.max(-50, Math.min(50, e.clientX - lastMousePos.current.x));
      const vy = Math.max(-50, Math.min(50, e.clientY - lastMousePos.current.y));
      
      setVelocity({ x: vx, y: vy });
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Accessibility Check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const animate = () => {
      setVelocity(prev => {
        // Performance: Stop rendering if almost static
        if (Math.abs(prev.x) < 0.1 && Math.abs(prev.y) < 0.1) return { x: 0, y: 0 };
        
        return {
          x: prev.x * 0.9, // Decay
          y: prev.y * 0.9
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return velocity;
};
