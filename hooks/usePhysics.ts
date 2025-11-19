
import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Physics Engine.
 * 
 * OPTIMIZATION:
 * Uses Direct DOM Manipulation instead of React State.
 * Updates CSS Custom Properties (--sway-x, --sway-y) directly on the passed refs.
 * This runs outside the React Render Cycle (0 re-renders per frame).
 */
export const usePhysicsEngine = (refs: React.RefObject<HTMLElement>[]) => {
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Accessibility Check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      
      // Calculate raw velocity
      const vx = e.clientX - lastMousePos.current.x;
      const vy = e.clientY - lastMousePos.current.y;
      
      // Clamp velocity for sanity
      velocity.current = {
        x: Math.max(-50, Math.min(50, vx)),
        y: Math.max(-50, Math.min(50, vy))
      };
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const animate = () => {
      if (mediaQuery.matches) return;

      // Decay physics (Air Drag)
      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;

      // Tiny threshold to stop calc when static
      if (Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01) {
        const xVal = velocity.current.x * 0.5; // Dampening
        const yVal = velocity.current.y * -0.5;

        // DIRECT DOM UPDATE - No React Re-renders
        refs.forEach(ref => {
          if (ref.current) {
            ref.current.style.setProperty('--sway-x', `${xVal}deg`);
            ref.current.style.setProperty('--sway-y', `${yVal}deg`);
          }
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [refs]);
};
