
import React, { useRef, useState } from 'react';
import { COVERS } from '../constants';
import { FurnitureOption } from '../types';

// Sub-component for the 3D Tilt Logic
const TiltCard: React.FC<{ option: FurnitureOption }> = ({ option }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation based on mouse position relative to center
    // Range: -10deg to 10deg
    const rotateY = ((mouseX / width) - 0.5) * 20; 
    const rotateX = ((mouseY / height) - 0.5) * -20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 }); // Reset to flat
  };

  return (
    <div 
      ref={cardRef}
      className="group relative perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
       <div 
        className="relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-100 ease-out flex flex-col h-full"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out', // Snappy when moving, smooth release
          transformStyle: 'preserve-3d'
        }}
       >
          {/* Glare Effect */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 bg-gradient-to-br from-white/40 via-transparent to-transparent"
            style={{
               opacity: isHovered ? 0.4 : 0,
               transform: 'translateZ(1px)'
            }}
          ></div>

          <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative z-10" style={{ transform: 'translateZ(0px)' }}>
            <img 
              src={option.image} 
              alt={option.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div 
              className="absolute top-3 right-3 bg-white/90 backdrop-blur text-navy px-2 py-1 rounded text-xs font-bold shadow-sm"
              style={{ transform: 'translateZ(20px)' }} // Pop out text
            >
              ${option.price}
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-grow bg-white z-10" style={{ transform: 'translateZ(0px)' }}>
            <div className="mb-auto">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{option.material}</p>
              <h4 className="font-bold text-navy text-lg mb-3">{option.name}</h4>
            </div>
            
            <button 
              className="w-full mt-4 bg-transparent border-2 border-navy text-navy py-2 px-4 rounded-lg font-semibold text-sm group-hover:bg-navy group-hover:text-white transition-colors flex items-center justify-center gap-2"
              style={{ transform: 'translateZ(10px)' }} // Pop out button
            >
              <span>Complete the Set</span>
              <i className="fa-solid fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
            </button>
          </div>
       </div>
    </div>
  );
};

export const ProductSection: React.FC = () => {
  return (
    <section id="collection" className="py-32 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">Don't Let Your Covers Be Lonely.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            You have the protection. Now you need the substance. Select a cover to see what fits inside.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {COVERS.map((cover, index) => (
            <div key={cover.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-start`}>
              
              {/* Left: The Cover (Sticky) */}
              <div className="w-full md:w-1/3 sticky top-32 p-6 bg-sand/50 rounded-3xl border border-white/50 shadow-lg backdrop-blur-sm z-10">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative group">
                  <img src={cover.coverImage} alt={cover.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-mono opacity-75">CURRENTLY OWNS</p>
                    <h3 className="text-2xl font-bold">{cover.name}</h3>
                  </div>
                </div>
                <p className="text-slate-600 italic mb-4">"{cover.description}"</p>
                <div className="flex items-center gap-2 text-xs font-bold text-navy/50 uppercase">
                  <i className="fa-solid fa-check-circle"></i>
                  <span>Weatherproof</span>
                  <i className="fa-solid fa-check-circle ml-2"></i>
                  <span>Empty</span>
                </div>
              </div>

              {/* Right: The Furniture Options */}
              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="md:col-span-full mb-2">
                    <h3 className="text-xl font-bold text-navy">Compatible Fillers</h3>
                    <div className="h-1 w-20 bg-navy/10 mt-2"></div>
                 </div>

                 {cover.furnitureOptions.map((option) => (
                   <TiltCard key={option.id} option={option} />
                 ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
