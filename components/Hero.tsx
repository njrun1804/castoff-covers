
import React, { useRef } from 'react';
import { GhostCover } from './GhostCover';
import { COVERS } from '../constants';
import { usePhysicsEngine } from '../hooks/usePhysics';
import { CONTENT } from '../content';

export const Hero: React.FC = () => {
  // Create refs for the elements we want to animate with physics
  const bgTextRef = useRef<HTMLDivElement>(null);
  const cover1Ref = useRef<HTMLDivElement>(null);
  const cover2Ref = useRef<HTMLDivElement>(null);
  const cover3Ref = useRef<HTMLDivElement>(null);

  // Register refs with the physics engine
  // This hook will update the DOM directly, preventing Re-Renders
  usePhysicsEngine([bgTextRef, cover1Ref, cover2Ref, cover3Ref]);

  return (
    <section className="relative min-h-screen pt-24 flex flex-col items-center justify-center overflow-hidden perspective-1000">
      
      <div 
        ref={bgTextRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03]"
        style={{ 
          // The engine updates --sway-x/y, we use them here
          transform: `translate(calc(var(--sway-x, 0deg) * -2px), calc(var(--sway-y, 0deg) * -2px))` 
        }}
      >
        <h1 className="text-[15rem] font-bold text-navy rotate-90 md:rotate-0 whitespace-nowrap">
          {CONTENT.hero.missingPieces}
        </h1>
      </div>

      <div className="relative z-10 text-center mb-16 max-w-3xl px-6">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-navy/60 text-xs font-bold tracking-widest uppercase">
          {CONTENT.hero.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-navy tracking-tight mb-6 leading-tight">
          {CONTENT.hero.title} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-slate-500">{CONTENT.hero.titleHighlight}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-light">
          {CONTENT.hero.subtitle}
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 items-center justify-center">
          <GhostCover ref={cover1Ref} cover={COVERS[0]} animationDelay="animate-float-slow" isWindy={false} />
          <div className="md:-mt-16">
            <GhostCover ref={cover2Ref} cover={COVERS[1]} animationDelay="animate-float-medium" isWindy={false} />
          </div>
          <GhostCover ref={cover3Ref} cover={COVERS[2]} animationDelay="animate-float-fast" isWindy={false} />
        </div>
      </div>
    </section>
  );
};
