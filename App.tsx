
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WindToggle } from './components/WindToggle';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import { DurabilitySection } from './components/DurabilitySection';
import { StickyActionBar } from './components/StickyActionBar';
import { VisualizerSection } from './components/VisualizerSection';
import { TimeMachineSection } from './components/TimeMachineSection';
import { ChameleonSection } from './components/ChameleonSection';

const App: React.FC = () => {
  const [isWindy, setIsWindy] = useState(false);

  const toggleWind = () => {
    setIsWindy(prev => !prev);
  };

  return (
    <div className="min-h-screen font-sans text-navy selection:bg-navy selection:text-sand">
      <Navbar />
      
      <main>
        {/* The Hero responds to the Wind State */}
        <Hero isWindy={isWindy} />
        
        {/* Feature 2: Sticky Glass Footer */}
        <StickyActionBar />

        {/* The Tech Demo Controls the Wind State */}
        <WindToggle isWindy={isWindy} toggleWind={toggleWind} />
        
        {/* Feature 1: Scrollytelling Section */}
        <DurabilitySection />

        {/* New Feature A: Time Machine (Longevity) */}
        <TimeMachineSection />

        {/* Standard Grid */}
        <ProductSection />
        
        {/* New Feature C: Chameleon Color Picker */}
        <ChameleonSection />

        {/* Feature 3: Visualizer */}
        <VisualizerSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
