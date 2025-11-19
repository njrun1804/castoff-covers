
import React, { useState } from 'react';

export const TimeMachineSection: React.FC = () => {
  const [year, setYear] = useState(1);

  return (
    <section className="py-24 bg-stone-900 text-sand relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Controls */}
          <div className="w-full md:w-1/3">
            <div className="mb-8">
               <h2 className="text-4xl font-bold text-white mb-2">The Time Machine</h2>
               <p className="text-stone-400 text-sm">
                 Fast forward to see why "cheap" is expensive. 
                 Witness the decay of the unprotected world while our cover stands timeless.
               </p>
            </div>

            <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 shadow-2xl">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
                 <span>Unboxing</span>
                 <span>The Future</span>
               </div>
               
               <input 
                 type="range" 
                 min="1" 
                 max="10" 
                 step="0.1"
                 value={year} 
                 onChange={(e) => setYear(parseFloat(e.target.value))}
                 className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
               />
               
               <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">Year {Math.floor(year)}</span>
                  <span className="text-stone-500 text-sm">of exposure</span>
               </div>
            </div>
          </div>

          {/* The Scene */}
          <div className="w-full md:w-2/3 relative aspect-video rounded-3xl overflow-hidden border border-stone-700 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             
             {/* Background Environment (Ages) */}
             <div className="absolute inset-0 transition-all duration-300"
                style={{
                    filter: `brightness(${1 - (year * 0.05)}) saturate(${1 - (year * 0.05)})`
                }}
             >
                <img 
                  src="https://images.unsplash.com/photo-1621252179027-94459d27d3ee?q=80&w=1200&auto=format&fit=crop" 
                  alt="Patio" 
                  className="w-full h-full object-cover"
                />
                
                {/* Grime/Moss Overlay */}
                <div 
                    className="absolute inset-0 mix-blend-multiply bg-green-900/40 transition-opacity duration-100"
                    style={{ opacity: (year - 1) / 15 }}
                ></div>
                <div 
                    className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none"
                    style={{ 
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/cracked-concrete.png')`,
                        opacity: (year - 1) / 9 
                    }}
                ></div>
             </div>

             {/* Ghost Furniture (Decays) */}
             <div 
                className="absolute top-1/2 left-1/3 w-64 h-64 -translate-y-1/2 transition-all duration-300"
                style={{
                    filter: `sepia(${(year - 1) * 10}%) contrast(${100 + (year * 5)}%) brightness(${100 - (year * 5)}%)`,
                    opacity: 1 - ((year - 1) * 0.05)
                }}
             >
                 <img 
                    src="https://images.unsplash.com/photo-1596162954151-cd678fdc42a3?q=80&w=800&auto=format&fit=crop" 
                    alt="Ghost Chair" 
                    className="w-full h-full object-cover rounded-xl mix-blend-hard-light opacity-60"
                 />
                 {/* Rust Overlay */}
                 <div className="absolute inset-0 bg-orange-900/30 mix-blend-color" style={{ opacity: (year - 1) / 10 }}></div>
             </div>

             {/* The Cover (Timeless) */}
             <div className="absolute top-1/2 right-1/4 w-64 h-64 -translate-y-1/2 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                 <img 
                    src="https://images.unsplash.com/photo-1530018607912-e78348e1fc84?q=80&w=800&auto=format&fit=crop"
                    alt="The Timeless Cover"
                    className="w-full h-full object-cover rounded-xl shadow-2xl ring-1 ring-white/20"
                 />
                 <div className="absolute -top-4 right-4 bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                    LIFETIME GUARANTEE
                 </div>
             </div>

             {/* UI Stats */}
             <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-white/70 bg-black/50 backdrop-blur p-2 rounded-lg">
                 <div> UV INDEX: {Math.floor(year * 1.2)}</div>
                 <div> MOISTURE: {Math.floor(year * 8)}%</div>
                 <div> STRUCTURAL INTEGRITY: {Math.max(0, 100 - (year * 9))}%</div>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
};
