import React, { useRef, useEffect, useState } from 'react';

export const DurabilitySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = rect.height + viewportHeight;
      
      // Calculate how far into the section we are (0 to 1)
      // We want the effect to start when the top reaches the center of screen
      let progress = (viewportHeight - rect.top) / (viewportHeight + rect.height / 2);
      
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Thresholds for animation logic
  const isStormy = scrollProgress > 0.4;
  
  // Calculated styles based on scroll
  const backgroundColor = isStormy ? '#1e293b' : '#f5f5f0'; // Navy-ish to Sand
  const furnitureOffset = Math.max(0, (scrollProgress - 0.4) * 1000); // Move furniture to the right
  const furnitureOpacity = Math.max(0, 1 - (scrollProgress - 0.4) * 3); // Fade furniture
  const furnitureRotation = (scrollProgress - 0.4) * 45; // Rotate furniture

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[150vh] overflow-hidden transition-colors duration-700 ease-linear"
      style={{ backgroundColor }}
    >
      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Rain Overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 rain-overlay z-20`}
          style={{ opacity: isStormy ? 0.3 : 0 }}
        ></div>

        {/* Text Content */}
        <div className="absolute top-20 z-30 text-center px-6 transition-colors duration-500">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-700 ${isStormy ? 'text-white' : 'text-navy'}`}>
            Survive the Elements
          </h2>
          <p className={`max-w-md mx-auto transition-colors duration-700 ${isStormy ? 'text-slate-300' : 'text-slate-500'}`}>
            Our patented Weighted Hem Technology ensures the cover stays. <br/>
            <span className="italic opacity-70">Even if the furniture itself decides to leave.</span>
          </p>
        </div>

        {/* The Scene */}
        <div className="relative w-full max-w-4xl h-96 flex items-center justify-center mt-20">
          
          {/* The Furniture (Wireframe) - Only visible when sunny, blows away when stormy */}
          <div 
            className="absolute w-80 h-80 z-10 transition-transform duration-100 ease-out"
            style={{ 
              transform: `translateX(${furnitureOffset}px) rotate(${furnitureRotation}deg)`,
              opacity: furnitureOpacity 
            }}
          >
             <img 
               src="https://images.unsplash.com/photo-1596162954151-cd678fdc42a3?q=80&w=800&auto=format&fit=crop" 
               alt="Furniture" 
               className="w-full h-full object-cover rounded-2xl opacity-50 grayscale mix-blend-multiply"
             />
          </div>

          {/* The Cover - Stays anchored */}
          <div className="relative w-80 h-80 z-20">
            <img 
              src="https://images.unsplash.com/photo-1503602642458-2321114453ad?q=80&w=800&auto=format&fit=crop" 
              alt="Cover" 
              className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-300 ${isStormy ? 'brightness-75' : ''}`}
            />
            
            {/* Anchor Indicator */}
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${isStormy ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-1 h-8 bg-gradient-to-b from-white to-transparent opacity-50"></div>
              <span className="text-xs font-bold text-white tracking-widest uppercase bg-navy/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                Anchored
              </span>
            </div>
          </div>

        </div>

        {/* Scroll indicator if at top of section */}
        <div className={`absolute bottom-10 transition-opacity duration-300 ${scrollProgress < 0.2 ? 'opacity-100' : 'opacity-0'}`}>
           <span className="text-xs font-bold tracking-widest text-slate-400">SCROLL TO TEST</span>
        </div>

      </div>
    </section>
  );
};