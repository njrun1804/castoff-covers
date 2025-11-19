
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { AIService } from '../services/ai';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      role: 'model',
      text: "Greetings. I am the Curator. I can assist with dimensions, pricing, or existential questions regarding your patio furniture."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Add a temporary "thinking" message
      setMessages(prev => [...prev, { id: 'thinking', role: 'model', text: "Consulting the archives...", isThinking: true }]);

      // Use Service
      const response = await AIService.chatWithCurator(messages, input);

      // Remove thinking message and add real response
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'thinking');
        return [...filtered, {
            id: Date.now().toString(),
            role: 'model',
            text: response.text,
            groundingMetadata: response.groundingMetadata
        }];
      });

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => prev.filter(m => m.id !== 'thinking'));
      setMessages(prev => [...prev, { id: 'error', role: 'model', text: "My connection to the aesthetic plane has been severed. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-white text-navy rotate-90' : 'bg-navy text-white'}`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-message'} text-xl`}></i>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl z-50 transition-all duration-500 origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-navy p-4 text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
             <i className="fa-solid fa-robot text-xs"></i>
          </div>
          <div>
            <h3 className="font-bold text-sm">The Curator</h3>
            <p className="text-[10px] opacity-60 uppercase tracking-widest">Gemini 3.0 Powered</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-hide">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div 
                 className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed relative group ${
                   msg.role === 'user' 
                     ? 'bg-navy text-white rounded-br-none' 
                     : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                 }`}
               >
                 {msg.isThinking && (
                   <div className="flex gap-1 items-center py-1">
                     <div className="w-1.5 h-1.5 bg-navy/40 rounded-full animate-bounce"></div>
                     <div className="w-1.5 h-1.5 bg-navy/40 rounded-full animate-bounce delay-100"></div>
                     <div className="w-1.5 h-1.5 bg-navy/40 rounded-full animate-bounce delay-200"></div>
                   </div>
                 )}
                 
                 {!msg.isThinking && msg.text}

                 {/* Search Grounding Citations */}
                 {msg.groundingMetadata?.groundingChunks && (
                    <div className="mt-2 pt-2 border-t border-black/10 flex flex-wrap gap-2">
                        {msg.groundingMetadata.groundingChunks.map((chunk: any, idx: number) => {
                           if (chunk.web?.uri) {
                               return (
                                   <a 
                                     key={idx} 
                                     href={chunk.web.uri} 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="text-[10px] bg-white px-2 py-1 rounded-full border border-slate-200 hover:border-navy text-slate-500 hover:text-navy truncate max-w-full flex items-center gap-1"
                                   >
                                     <i className="fa-brands fa-google text-[8px]"></i>
                                     {chunk.web.title || "Source"}
                                   </a>
                               );
                           }
                           return null;
                        })}
                    </div>
                 )}
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100 bg-white/50">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about fit, price, or meaning..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-navy/50 transition-colors"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fa-solid fa-arrow-up text-xs"></i>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
