
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StickyActionBar } from './components/StickyActionBar';
import { NarrativeSection } from './components/NarrativeSection';
import { ProductShowcase } from './components/ProductShowcase';
import { DesignLab } from './components/DesignLab';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-navy selection:bg-navy selection:text-sand bg-stone-50">
      <Navbar />
      
      <main>
        {/* 1. The Dream (Atmospheric) */}
        <Hero />
        
        <StickyActionBar />

        {/* 2. The Performance Lab (Scrollytelling: Storm -> Decay) */}
        <NarrativeSection />

        {/* 3. The Goods (Product Grid + AR) */}
        <ProductShowcase />
        
        {/* 4. The Personalization Studio (AI Tools) */}
        <DesignLab />
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
