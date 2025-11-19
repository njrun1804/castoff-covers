
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { CoverProduct } from '../types';
import { CONTENT } from '../content';

interface GhostCoverProps {
  cover: CoverProduct;
  animationDelay: string; // 'animate-float-slow', etc.
  isWindy: boolean;
  // sway prop removed - handled via CSS variables now
}

export const GhostCover = forwardRef<HTMLDivElement, GhostCoverProps>(({ cover, animationDelay, isWindy }, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  
  // Forward the internal ref to the parent so usePhysicsEngine can control it
  useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!internalRef.current) return;

    const rect = internalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    internalRef.current.style.setProperty('--mouse-x', `${x}px`);
    internalRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Interaction Logic (Tap vs Hold)
  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setIsZoomed(true);
    }, 200); // 200ms delay to detect hold
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    setIsZoomed(false);
  };

  const handleClick = () => {
    if (!isZoomed) {
       setIsClicked(true);
       setTimeout(() => setIsClicked(false), 300);
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    setIsHovered(false);
    setIsZoomed(false);
  };

  return (
    <div 
      ref={internalRef}
      className={`relative w-64 h-80 md:w-80 md:h-96 cursor-crosshair transition-all duration-700 ${!isWindy && !isZoomed ? animationDelay : ''} z-20 touch-none select-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      style={{
        // transform is now a mix of React State (Zoom) and CSS Variables (Physics)
        // var(--sway-x) is updated directly by usePhysicsEngine
        transform: isZoomed 
            ? 'scale(1.1) translateZ(20px)' // Zoom overrides physics with 3D pop
            : `rotateY(var(--sway-x, 0deg)) rotateX(var(--sway-y, 0deg))`,
        transition: isZoomed ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out' 
      }}
    >
      {/* 
          LAYER 1: The Wireframe (The "Inside") 
      */}
      <div 
        className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered && !isZoomed ? 1 : 0,
          maskImage: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)`
        }}
      >
         <img 
          src={cover.wireframeImage} 
          alt="Furniture Ghost" 
          className="w-full h-full object-cover rounded-2xl border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/20 mix-blend-multiply rounded-2xl"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
        
        <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
           <p className="text-[10px] uppercase tracking-widest font-mono border-l-2 border-teal-400 pl-2">{CONTENT.ghostCover.xrayActive}</p>
           <p className="font-bold text-lg">{cover.type}</p>
        </div>
      </div>

      {/* 
          LAYER 2: The Cover (The "Outside") 
      */}
      <div 
        className={`absolute inset-0 z-20 transition-all duration-300 ease-in-out overflow-hidden rounded-2xl shadow-2xl
          ${isHovered && !isZoomed ? 'scale-105' : 'scale-100'}
          ${isWindy ? 'wind-shake origin-top' : ''}
          ${isClicked ? 'scale-95' : ''} 
        `}
      >
        <img 
          src={cover.coverImage} 
          alt={cover.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered && !isZoomed ? 'scale-110' : 'scale-100 grayscale-[30%]'}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-200/10 mix-blend-overlay"></div>
        <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-30' : 'opacity-100'}`}>
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${isClicked ? 'opacity-20' : 'opacity-0'}`}></div>

        {/* 
            LAYER 3: Texture Telescope
        */}
        <div 
           className={`absolute inset-0 z-40 bg-navy transition-opacity duration-500 ${isZoomed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* The Macro Texture */}
            <div 
                className="absolute inset-0 opacity-80 mix-blend-overlay"
                style={{
                    backgroundImage: `url('https://www.transparenttextures.com/patterns/canvas-orange.png')`,
                    backgroundSize: '100px 100px',
                    transform: 'scale(2)',
                }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* The Water Droplet */}
            <div 
                className="absolute w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.5),5px_5px_10px_rgba(0,0,0,0.3)] transition-all duration-100"
                style={{
                    top: 'var(--mouse-y)',
                    left: 'var(--mouse-x)',
                    transform: 'translate(-50%, -50%) scale(1)',
                }}
            >
                <div className="absolute top-3 left-3 w-4 h-2 bg-white/60 rounded-[50%] blur-[1px]"></div>
            </div>

            {/* UI Label */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="inline-block px-3 py-1 bg-black/50 backdrop-blur border border-white/20 rounded-full text-white text-[10px] font-mono uppercase tracking-widest">
                    <i className="fa-solid fa-magnifying-glass mr-2"></i>
                    {CONTENT.ghostCover.zoomLabel}
                </div>
            </div>
        </div>
      </div>
      
      {/* Label */}
      <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-full transition-all duration-300 ${isHovered ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
        <span className="text-navy/60 text-xs font-mono uppercase tracking-widest">{cover.name}</span>
        <div className="mt-1 text-[10px] text-slate-400 animate-pulse">{CONTENT.ghostCover.holdToInspect}</div>
      </div>
    </div>
  );
});

GhostCover.displayName = 'GhostCover';
