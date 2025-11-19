
import React, { useState } from 'react';

export const ChameleonSection: React.FC = () => {
  // 0 = Morning, 50 = Noon, 100 = Night
  const [timeOfDay, setTimeOfDay] = useState(50);

  // Derived values
  const isNight = timeOfDay > 80;
  
  // Dynamic Background Gradient
  const getBgGradient = () => {
    if (timeOfDay < 25) return 'from-orange-100 to-blue-200'; // Morning
    if (timeOfDay < 60) return 'from-sky-200 to-white'; // Noon
    if (timeOfDay < 85) return 'from-orange-400 to-indigo-900'; // Sunset
    return 'from-slate-900 to-black'; // Night
  };

  // Dynamic Cover Filter (Complementary Logic)
  // Morning (Cool/Blueish) -> Warm Beige Cover
  // Noon (Bright) -> Cool Grey/Green Cover
  // Sunset (Orange) -> Deep Navy Cover
  // Night (Dark) -> Silver/White Cover
  const getCoverFilter = () => {
    if (timeOfDay < 25) return 'sepia(0.3) hue-rotate(10deg)'; 
    if (timeOfDay < 60) return 'grayscale(0.5) brightness(1.1)';
    if (timeOfDay < 85) return 'brightness(0.7) sepia(0.5) hue-rotate(180deg) saturate(1.5)'; 
    return 'grayscale(1) brightness(1.5) contrast(1.2)'; 
  };

  const getSuggestionText = () => {
    if (timeOfDay < 25) return 'Morning Haze → Warm Sand';
    if (timeOfDay < 60) return 'Midday Sun → Cool Slate';
    if (timeOfDay < 85) return 'Golden Hour → Deep Navy';
    return 'Midnight → Ghost Silver';
  };

  return (
    <section className="relative py-24 overflow-hidden transition-colors duration-1000">
      
      {/* Dynamic Sky Background */}
      <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${getBgGradient()}`}></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 md:order-1">
           <div className={`aspect-square relative rounded-full bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-700 ${isNight ? 'shadow-teal-900/50' : 'shadow-orange-500/20'}`}>
              
              {/* The Chameleon Cover */}
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop"
                alt="Chameleon Cover"
                className="w-3/4 h-3/4 object-contain transition-all duration-700"
                style={{ filter: getCoverFilter() }}
              />

              {/* Floating UI Tag */}
              <div className="absolute bottom-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                 <div 
                    className="w-4 h-4 rounded-full shadow-inner transition-colors duration-700"
                    style={{ 
                        backgroundColor: timeOfDay > 80 ? '#e2e8f0' : (timeOfDay > 60 ? '#1e3a8a' : '#d6d3d1') 
                    }}
                 ></div>
                 <span className="text-xs font-bold text-navy uppercase">{getSuggestionText().split('→')[1]}</span>
              </div>

           </div>
        </div>

        <div className="order-1 md:order-2 text-center md:text-left">
           <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 transition-colors ${isNight ? 'bg-teal-900 text-teal-300' : 'bg-white/50 text-navy'}`}>
             Aesthetic Intelligence
           </div>
           <h2 className={`text-5xl font-bold mb-6 transition-colors duration-700 ${isNight ? 'text-white' : 'text-navy'}`}>
             The Chameleon Effect.
           </h2>
           <p className={`text-lg mb-12 transition-colors duration-700 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
             Stop guessing. Our covers analyze your environment's light temperature to suggest the perfect shade. 
             Because a cover shouldn't just fit the furniture—it should fit the mood.
           </p>

           {/* Slider UI */}
           <div className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700 ${isNight ? 'bg-slate-800/50 border-slate-700' : 'bg-white/40 border-white/60'}`}>
              <div className="flex justify-between mb-4 font-bold text-xs uppercase tracking-wider opacity-60">
                 <span>Dawn</span>
                 <span>Noon</span>
                 <span>Dusk</span>
                 <span>Midnight</span>
              </div>
              
              <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={timeOfDay} 
                 onChange={(e) => setTimeOfDay(parseInt(e.target.value))}
                 className="w-full h-1 bg-gradient-to-r from-orange-300 via-blue-300 to-indigo-900 rounded-lg appearance-none cursor-pointer mb-6"
              />

              <div className="text-center">
                  <span className={`text-2xl font-bold transition-colors ${isNight ? 'text-white' : 'text-navy'}`}>
                    {getSuggestionText()}
                  </span>
              </div>
           </div>
        </div>

      </div>

    </section>
  );
};
