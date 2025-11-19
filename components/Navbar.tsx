
import React, { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
      <div className={`max-w-7xl mx-auto px-6`}>
        <div className={`flex justify-between items-center backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl shadow-sm transition-all duration-300 px-6 ${scrolled ? 'py-3' : 'py-4'}`}>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy text-white flex items-center justify-center rounded-full">
              <i className="fa-solid fa-ghost text-sm"></i>
            </div>
            <span className="font-bold text-lg tracking-tight text-navy">CASTAWAY FRAMES</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
            <a href="#collection" className="hover:text-navy transition-colors">Collection</a>
            <a href="#visual-proof" className="hover:text-navy transition-colors">Tech Specs</a>
            <a href="#" className="hover:text-navy transition-colors">Manifesto</a>
          </div>

          <MagneticButton className="bg-navy text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl">
            Cart (0)
          </MagneticButton>

        </div>
      </div>
    </nav>
  );
};
