
import React, { useRef, useEffect, useState } from 'react';
import { CONTENT } from '../content';

export const NarrativeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [year, setYear] = useState(1); // Integrated Time Machine State

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // The section is tall (200vh), so we map scroll to narrative stages
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (rect.height + viewportHeight)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Robustness for resize
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // STAGE 1: The Storm (0.0 - 0.5)
  const isStormy = scrollProgress > 0.15 && scrollProgress < 0.6;
  
  // STAGE 2: The Aftermath / Time Machine (0.6 - 1.0)
  const showTimeMachine = scrollProgress > 0.6;

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[200vh] bg-stone-900 text-sand transition-colors duration-1000"
      style={{ backgroundColor: isStormy ? '#1e293b' : (showTimeMachine ? '#1c1917' : '#f5f5f0') }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* --- STAGE 1: STORM LAYERS --- */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 rain-overlay z-20`}
             style={{ opacity: isStormy ? 0.4 : 0 }}></div>

        <div className={`absolute top-20 z-30 text-center px-6 transition-all duration-700 ${showTimeMachine ? 'opacity-0 translate-y-[-50px]' : 'opacity-100'}`}>
          <div className="inline-block px-3 py-1 rounded-full bg-navy/10 text-xs font-bold tracking-widest uppercase mb-4">
            {CONTENT.narrative.title}
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-700 ${isStormy ? 'text-white' : 'text-navy'}`}>
            {CONTENT.narrative.storm.title}
          </h2>
          <p className={`max-w-md mx-auto transition-colors duration-700 ${isStormy ? 'text-slate-300' : 'text-slate-500'}`}>
            {CONTENT.narrative.storm.description}
          </p>
        </div>

        {/* The Physics Demo Object */}
        <div className={`relative w-full max-w-4xl h-96 flex items-center justify-center mt-10 transition-all duration-1000 ${showTimeMachine ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
           {/* Ghost Furniture (Blown Away) */}
           <div 
             className="absolute w-80 h-80 z-10 transition-transform duration-300 ease-out"
             style={{ 
               transform: isStormy ? `translateX(400px) rotate(45deg)` : `translateX(0) rotate(0)`,
               opacity: isStormy ? 0 : 0.5 
             }}
           >
              <img src="https://images.unsplash.com/photo-1596162954151-cd678fdc42a3?q=80&w=800&auto=format&fit=crop" alt="Ghost" className="w-full h-full object-cover rounded-2xl grayscale mix-blend-multiply" />
           </div>

           {/* The Cover (Anchored) */}
           <div className={`relative w-80 h-80 z-20 transition-transform duration-100 ${isStormy ? 'wind-shake' : ''}`}>
             <img src="https://images.unsplash.com/photo-1503602642458-2321114453ad?q=80&w=800&auto=format&fit=crop" alt="Cover" className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-300 ${isStormy ? 'brightness-75' : ''}`} />
             <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${isStormy ? 'opacity-100' : 'opacity-0'}`}>
               <span className="text-xs font-bold text-white tracking-widest uppercase bg-navy/50 px-3 py-1 rounded-full backdrop-blur-md">{CONTENT.narrative.storm.anchored}</span>
             </div>
           </div>
        </div>

        {/* --- STAGE 2: TIME MACHINE --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${showTimeMachine ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-20'}`}>
            
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-white mb-2">{CONTENT.narrative.timeMachine.title}</h2>
               <p className="text-stone-400 text-sm max-w-lg mx-auto">{CONTENT.narrative.timeMachine.description}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl w-full px-6">
                {/* Controls */}
                <div className="w-full md:w-1/3 bg-stone-800 p-6 rounded-2xl border border-stone-700 shadow-2xl">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
                        <span>{CONTENT.narrative.timeMachine.unboxing}</span>
                        <span>{CONTENT.narrative.timeMachine.future}</span>
                    </div>
                    <input 
                        type="range" min="1" max="10" step="0.1"
                        value={year} onChange={(e) => setYear(parseFloat(e.target.value))}
                        className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">Year {Math.floor(year)}</span>
                    </div>
                </div>

                {/* Visuals */}
                <div className="w-full md:w-2/3 relative aspect-video rounded-3xl overflow-hidden border border-stone-700 shadow-2xl">
                    <div className="absolute inset-0 transition-all duration-300" style={{ filter: `brightness(${1 - (year * 0.05)}) saturate(${1 - (year * 0.05)})` }}>
                        <img src="https://images.unsplash.com/photo-1621252179027-94459d27d3ee?q=80&w=1200&auto=format&fit=crop" alt="Patio" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 mix-blend-multiply bg-green-900/40" style={{ opacity: (year - 1) / 15 }}></div>
                    </div>
                    {/* Decaying Chair */}
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 -translate-y-1/2" style={{ filter: `sepia(${(year - 1) * 10}%)`, opacity: 1 - ((year - 1) * 0.05) }}>
                        <img src="https://images.unsplash.com/photo-1596162954151-cd678fdc42a3?q=80&w=800&auto=format&fit=crop" alt="Chair" className="w-full h-full object-cover rounded-xl opacity-60" />
                    </div>
                    {/* Pristine Cover */}
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 -translate-y-1/2 shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1530018607912-e78348e1fc84?q=80&w=800&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover rounded-xl" />
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
