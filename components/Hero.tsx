
import React, { useEffect, useRef, useState } from 'react';
import { GhostCover } from './GhostCover';
import { COVERS } from '../constants';

interface HeroProps {
  isWindy: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isWindy }) => {
  // Physics State
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity (current - last)
      // We clamp it so it doesn't go crazy fast
      const vx = Math.max(-50, Math.min(50, e.clientX - lastMousePos.current.x));
      const vy = Math.max(-50, Math.min(50, e.clientY - lastMousePos.current.y));
      
      setVelocity({ x: vx, y: vy });
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Physics Loop: Decay velocity over time (simulating air resistance)
  useEffect(() => {
    const animate = () => {
      setVelocity(prev => {
        // If velocity is practically zero, stop updating to save resources
        if (Math.abs(prev.x) < 0.1 && Math.abs(prev.y) < 0.1) return { x: 0, y: 0 };
        
        // Friction factor (0.9 means it retains 90% speed per frame)
        return {
          x: prev.x * 0.9,
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

  return (
    <section className="relative min-h-screen pt-24 flex flex-col items-center justify-center overflow-hidden perspective-1000">
      
      {/* Background Text Texture - Reacts inversely to sway for parallax depth */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03] transition-transform duration-100 ease-out"
        style={{ transform: `translate(${velocity.x * -0.5}px, ${velocity.y * -0.5}px)` }}
      >
        <h1 className="text-[15rem] font-bold text-navy rotate-90 md:rotate-0 whitespace-nowrap">
          MISSING PIECES
        </h1>
      </div>

      <div className="relative z-10 text-center mb-16 max-w-3xl px-6">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-navy/60 text-xs font-bold tracking-widest uppercase">
          Reverse E-Commerce
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-navy tracking-tight mb-6 leading-tight">
          Protection for the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-slate-500">Imagination.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-light">
          World-class covers for the high-end furniture you haven't bought yet.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 items-center justify-center">
          {/* 
              We pass the 'velocity' as 'sway'. 
              Physics note: If mouse moves LEFT (negative X), air drag pushes object RIGHT (positive rotation).
              So we pass raw velocity and let component handle sign.
          */}
          <GhostCover 
            cover={COVERS[0]} 
            animationDelay="animate-float-slow" 
            isWindy={isWindy}
            sway={velocity}
          />
          <div className="md:-mt-16">
            <GhostCover 
                cover={COVERS[1]} 
                animationDelay="animate-float-medium" 
                isWindy={isWindy}
                sway={velocity}
            />
          </div>
          <GhostCover 
            cover={COVERS[2]} 
            animationDelay="animate-float-fast" 
            isWindy={isWindy}
            sway={velocity}
          />
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-navy/30">
        <i className="fa-solid fa-arrow-down text-2xl"></i>
      </div>

    </section>
  );
};
