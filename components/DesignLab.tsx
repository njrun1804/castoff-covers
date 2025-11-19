
import React, { useState, useRef } from 'react';
import { CONTENT } from '../content';
import { AIService } from '../services/ai';
import { AnalysisResult } from '../types';

type LabTab = 'ai' | 'chameleon';
type AIState = 'idle' | 'uploading' | 'scanning' | 'result' | 'error';

export const DesignLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('ai');
  
  // AI State
  const [aiState, setAiState] = useState<AIState>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [genPrompt, setGenPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chameleon State
  const [timeOfDay, setTimeOfDay] = useState(50);

  // --- AI Handlers ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(URL.createObjectURL(file));
    setAiState('scanning');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await AIService.analyzePatio(base64, file.type);
        setAnalysis(result);
        setGenPrompt(`Add a luxurious, ${result.color} outdoor furniture cover. Photorealistic.`);
        setAiState('result');
      };
    } catch (error) {
      console.error(error);
      setAiState('error');
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !genPrompt) return;
    setIsGenerating(true);
    try {
      // In a real scenario, we'd keep the base64 in state, but re-fetching from blob for demo
      const blob = await fetch(uploadedImage).then(r => r.blob());
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const url = await AIService.generateReality(base64, blob.type, genPrompt);
        setGeneratedImage(url);
        setIsGenerating(false);
      };
    } catch (e) {
      setIsGenerating(false);
      alert("Reality generation failed.");
    }
  };

  // --- Chameleon Helpers ---
  const getBgGradient = () => {
    if (timeOfDay < 25) return 'from-orange-100 to-blue-200'; 
    if (timeOfDay < 60) return 'from-sky-200 to-white';
    if (timeOfDay < 85) return 'from-orange-400 to-indigo-900'; 
    return 'from-slate-900 to-black'; 
  };

  const getCoverFilter = () => {
    if (timeOfDay < 25) return 'sepia(0.3) hue-rotate(10deg)'; 
    if (timeOfDay < 60) return 'grayscale(0.5) brightness(1.1)';
    if (timeOfDay < 85) return 'brightness(0.7) sepia(0.5) hue-rotate(180deg) saturate(1.5)'; 
    return 'grayscale(1) brightness(1.5) contrast(1.2)'; 
  };

  return (
    <section className="py-24 px-6 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold tracking-widest uppercase mb-4">
            {CONTENT.designLab.title}
          </div>
          <h2 className="text-4xl font-bold text-navy mb-4">{CONTENT.designLab.subtitle}</h2>
          
          <div className="flex justify-center gap-4 mt-8">
             <button 
               onClick={() => setActiveTab('ai')}
               className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'ai' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
             >
               {CONTENT.designLab.tabs.ai}
             </button>
             <button 
               onClick={() => setActiveTab('chameleon')}
               className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'chameleon' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
             >
               {CONTENT.designLab.tabs.color}
             </button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-xl min-h-[600px] relative transition-all duration-500">
          
          {/* --- TAB: AI VISUALIZER --- */}
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
               <div className="p-12 flex flex-col justify-center">
                  <div className="inline-block px-2 py-1 rounded bg-teal-100 text-teal-800 text-[10px] font-bold uppercase w-fit mb-4">
                    {CONTENT.designLab.ai.badge}
                  </div>
                  <h3 className="text-3xl font-bold text-navy mb-4">{CONTENT.designLab.ai.headline}</h3>
                  <p className="text-slate-500 mb-8">{CONTENT.designLab.ai.description}</p>
                  
                  {aiState === 'result' && analysis && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                       <div className="text-xs font-mono text-teal-600 uppercase mb-2">Analysis Complete</div>
                       <p className="text-xl font-serif italic text-navy mb-2">"{analysis.vibe}"</p>
                       <p className="text-sm text-slate-500">{analysis.philosophy}</p>
                    </div>
                  )}
               </div>

               <div className="relative bg-slate-200 h-full min-h-[400px]">
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                  
                  {aiState === 'idle' && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                       <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                             <i className="fa-solid fa-cloud-arrow-up text-navy text-2xl"></i>
                          </div>
                          <span className="font-bold text-navy">{CONTENT.designLab.ai.upload}</span>
                       </div>
                    </div>
                  )}

                  {(aiState === 'scanning' || aiState === 'uploading') && (
                     <div className="absolute inset-0 bg-navy text-white flex items-center justify-center flex-col z-10">
                        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-400 mb-4"></i>
                        <span className="font-mono text-xs tracking-widest">{CONTENT.designLab.ai.analyzing}</span>
                     </div>
                  )}

                  {(aiState === 'result' || aiState === 'error') && uploadedImage && (
                     <div className="absolute inset-0">
                        <img src={generatedImage || uploadedImage} alt="Result" className="w-full h-full object-cover" />
                        
                        {aiState === 'result' && (
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                             <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={genPrompt} 
                                  onChange={e => setGenPrompt(e.target.value)}
                                  className="flex-grow bg-white/10 backdrop-blur border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-mono"
                                />
                                <button 
                                  onClick={handleGenerate}
                                  disabled={isGenerating}
                                  className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase"
                                >
                                  {isGenerating ? '...' : 'Materialize'}
                                </button>
                             </div>
                             <button onClick={() => {setAiState('idle'); setUploadedImage(null); setGeneratedImage(null);}} className="text-white/50 text-xs mt-2 hover:text-white">Reset</button>
                          </div>
                        )}
                     </div>
                  )}
               </div>
            </div>
          )}

          {/* --- TAB: CHAMELEON --- */}
          {activeTab === 'chameleon' && (
            <div className={`h-full flex flex-col items-center justify-center py-16 transition-colors duration-1000 bg-gradient-to-b ${getBgGradient()}`}>
               
               <div className="relative z-10 text-center mb-8">
                  <h3 className={`text-3xl font-bold transition-colors ${timeOfDay > 80 ? 'text-white' : 'text-navy'}`}>
                    {CONTENT.designLab.chameleon.headline}
                  </h3>
               </div>

               <div className="relative w-64 h-64 mb-12">
                  <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
                     <img 
                       src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop" 
                       alt="Chameleon" 
                       className="w-3/4 h-3/4 object-contain transition-all duration-700"
                       style={{ filter: getCoverFilter() }}
                     />
                  </div>
               </div>

               <div className="w-full max-w-md px-6">
                  <input 
                     type="range" min="0" max="100" value={timeOfDay} 
                     onChange={e => setTimeOfDay(parseInt(e.target.value))}
                     className="w-full h-2 bg-white/50 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className={`flex justify-between text-xs font-bold uppercase mt-4 ${timeOfDay > 80 ? 'text-white/50' : 'text-navy/50'}`}>
                     <span>{CONTENT.designLab.chameleon.dawn}</span>
                     <span>{CONTENT.designLab.chameleon.noon}</span>
                     <span>{CONTENT.designLab.chameleon.dusk}</span>
                     <span>{CONTENT.designLab.chameleon.midnight}</span>
                  </div>
               </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
