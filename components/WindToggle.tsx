import React from 'react';

interface WindToggleProps {
  isWindy: boolean;
  toggleWind: () => void;
}

export const WindToggle: React.FC<WindToggleProps> = ({ isWindy, toggleWind }) => {
  return (
    <section id="visual-proof" className="py-16 bg-stone-100 border-y border-stone-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <div className="mb-8">
          <h3 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-2">The Trojan Horse Tech Demo</h3>
          <h2 className="text-3xl font-bold text-navy">Visual Proof</h2>
          <p className="text-slate-500 mt-2">Ensure your imagination stays grounded, even when nature gets rough.</p>
        </div>

        <div className="inline-flex items-center gap-6 bg-white p-4 rounded-2xl shadow-lg border border-stone-200">
           <div className="text-left">
             <div className="font-bold text-navy">Wind Test Laboratory</div>
             <div className="text-xs text-slate-400">Simulation Level: 45mph</div>
           </div>

           <div className="h-12 w-[1px] bg-stone-200"></div>

           <button 
            onClick={toggleWind}
            className={`
              relative w-20 h-10 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy
              ${isWindy ? 'bg-navy' : 'bg-slate-200'}
            `}
           >
             <span className="sr-only">Enable Wind Test</span>
             <span 
               className={`
                 absolute left-1 top-1 bg-white w-8 h-8 rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center
                 ${isWindy ? 'translate-x-10' : 'translate-x-0'}
               `}
             >
                <i className={`fa-solid fa-wind text-xs ${isWindy ? 'text-navy animate-pulse' : 'text-slate-300'}`}></i>
             </span>
           </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-60">
           <div className="text-center">
             <div className="text-2xl font-bold text-navy">0%</div>
             <div className="text-xs text-slate-500 uppercase">Furniture Movement</div>
           </div>
           <div className="text-center">
             <div className="text-2xl font-bold text-navy">100%</div>
             <div className="text-xs text-slate-500 uppercase">Fabric Agitation</div>
           </div>
           <div className="text-center">
             <div className="text-2xl font-bold text-navy">10/10</div>
             <div className="text-xs text-slate-500 uppercase">Surrealism Score</div>
           </div>
        </div>

      </div>
    </section>
  );
};