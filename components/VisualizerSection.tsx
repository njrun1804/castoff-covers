import React, { useState } from 'react';

type VisualizerState = 'idle' | 'uploading' | 'scanning' | 'result';

export const VisualizerSection: React.FC = () => {
  const [state, setState] = useState<VisualizerState>('idle');
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleUpload = () => {
    setState('uploading');
    // Fake "Uploading"
    setTimeout(() => {
      setState('scanning');
      startScanning();
    }, 1000);
  };

  const startScanning = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setState('result');
      }
    }, 30); // ~1.5 seconds total scan time
  };

  const reset = () => {
    setState('idle');
    setLoadingProgress(0);
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold tracking-widest uppercase mb-6">
              Intelligent Fit™
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Don't buy blind.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-navy">Visualize the void.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Unsure if our cover fits your imaginary patio? Upload a photo of your empty space. Our proprietary engine will superimpose a high-fidelity wireframe of what <i>could</i> be there.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
              </div>
              <span>Used by 14,000+ dreamers today</span>
            </div>
          </div>

          {/* Right: The Interactive Demo */}
          <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl ring-4 ring-slate-50/50">
            
            {/* State: IDLE */}
            {state === 'idle' && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl m-4 cursor-pointer hover:bg-slate-100 hover:border-navy/30 transition-all group"
                onClick={handleUpload}
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-cloud-arrow-up text-2xl text-navy"></i>
                </div>
                <h3 className="font-bold text-navy text-lg">Upload Patio Photo</h3>
                <p className="text-slate-400 text-sm mt-2">JPG or PNG. Max 10MB of emptiness.</p>
              </div>
            )}

            {/* State: UPLOADING / SCANNING */}
            {(state === 'uploading' || state === 'scanning') && (
              <div className="absolute inset-0 bg-navy text-white flex flex-col items-center justify-center z-20">
                {state === 'uploading' ? (
                  <div className="animate-pulse font-mono text-sm">UPLOADING VOID...</div>
                ) : (
                  <div className="w-64 text-center">
                    <div className="flex justify-between text-xs font-mono mb-2 opacity-70">
                      <span>CALCULATING DIMENSIONS</span>
                      <span>{loadingProgress}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-400 transition-all duration-100 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                    
                    {/* Fake Scanning Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" 
                         style={{ 
                           backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                           backgroundSize: '40px 40px'
                         }}>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-400/50 blur-sm animate-[scan_1.5s_ease-in-out_infinite]"></div>
                  </div>
                )}
              </div>
            )}

            {/* State: RESULT */}
            {state === 'result' && (
              <div className="absolute inset-0 z-10">
                {/* Background: Generic Patio */}
                <img 
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop" 
                  alt="Patio Background" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay: The Cover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop" 
                    alt="Virtual Cover" 
                    className="w-2/3 h-auto drop-shadow-2xl animate-float-medium opacity-90"
                  />
                  {/* Augmented Reality UI Markers */}
                  <div className="absolute top-1/3 left-1/4 w-3 h-3 border border-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute left-4 -top-1 bg-black/50 backdrop-blur text-white text-[10px] px-1 rounded whitespace-nowrap">Width: 84"</div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 border border-white rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute right-4 -top-1 bg-black/50 backdrop-blur text-white text-[10px] px-1 rounded whitespace-nowrap">Depth: 32"</div>
                  </div>
                </div>

                {/* Try Again Button */}
                <button 
                  onClick={reset}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                  title="Reset"
                >
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
                  <i className="fa-solid fa-circle-check text-teal-400"></i>
                  <span>Perfect Match</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};