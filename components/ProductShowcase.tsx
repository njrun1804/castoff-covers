
import React, { useRef, useState } from 'react';
import { COVERS } from '../constants';
import { CONTENT } from '../content';
import { FurnitureOption } from '../types';
import { LazyRender } from './LazyRender';

const TiltCard: React.FC<{ option: FurnitureOption }> = ({ option }) => {
  const [loadError, setLoadError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative h-[400px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg flex flex-col h-full transform transition-transform duration-500 group-hover:scale-[1.02]">
        
        <div className="aspect-[4/5] bg-stone-100 relative">
          {option.modelUrl && !loadError ? (
             <LazyRender className="w-full h-full">
               {/* @ts-ignore */}
               <model-viewer
                  src={option.modelUrl}
                  poster={option.image}
                  alt={option.name}
                  ar={true}
                  auto-rotate={isHovered ? "true" : undefined}
                  camera-controls="true"
                  shadow-intensity="1"
                  style={{ width: '100%', height: '100%' }}
                  onError={() => setLoadError(true)}
               >
               </model-viewer>
             </LazyRender>
          ) : (
            <img src={option.image} alt={option.name} className="w-full h-full object-cover" loading="lazy" />
          )}
          
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
             ${option.price}
          </div>
        </div>

        <div className="p-4 bg-white flex-grow flex flex-col justify-between z-10 relative">
           <div>
              <p className="text-xs text-slate-400 uppercase mb-1">{option.material}</p>
              <h4 className="font-bold text-navy">{option.name}</h4>
           </div>
           <button className="w-full mt-4 border border-navy text-navy rounded-lg py-2 text-xs font-bold hover:bg-navy hover:text-white transition-colors">
             {CONTENT.products.cta}
           </button>
        </div>

      </div>
    </div>
  );
};

export const ProductShowcase: React.FC = () => {
  return (
    <section id="collection" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">{CONTENT.products.title}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">{CONTENT.products.description}</p>
          <span className="text-xs uppercase tracking-widest mt-2 inline-block text-teal-600 font-bold">
            <i className="fa-solid fa-mobile-screen mr-2"></i>{CONTENT.products.mobileBadge}
          </span>
        </div>

        <div className="flex flex-col gap-32">
          {COVERS.map((cover, index) => (
            <div key={cover.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-start`}>
              
              <div className="w-full md:w-1/3 sticky top-32 p-6 bg-sand/50 rounded-3xl border border-white/50 shadow-lg backdrop-blur-sm">
                 <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                   <img src={cover.coverImage} alt={cover.name} className="w-full h-full object-cover" loading="lazy" />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">{cover.name}</h3>
                 <p className="text-slate-600 italic text-sm">{cover.description}</p>
              </div>

              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="md:col-span-full mb-2 text-navy font-bold border-b border-navy/10 pb-2">
                   {CONTENT.products.compatible}
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
