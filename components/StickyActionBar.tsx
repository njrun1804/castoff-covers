
import React, { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';

export const StickyActionBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 800px (approx hero height)
      const shouldShow = window.scrollY > 800;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <div className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full py-3 px-4 md:px-6 flex items-center gap-4 md:gap-8 max-w-[90%]">
        
        {/* Product Info (Hidden on very small screens) */}
        <div className="hidden sm:flex flex-col text-navy">
           <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Current Vibe</span>
           <span className="text-sm font-bold">The Solitary Sentry</span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-[1px] bg-navy/10"></div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="text-navy font-semibold text-sm hidden md:inline">$899.00</span>
          
          <MagneticButton className="bg-navy text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
            <span>Complete the Set</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          </MagneticButton>
        </div>

      </div>
    </div>
  );
};
