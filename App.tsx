
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechSection from './components/TechSection';
import UXSection from './components/UXSection';
import AIToolsSection from './components/AIToolsSection';
import AIAssistant from './components/AIAssistant';
import KeyFeaturesSection from './components/KeyFeaturesSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TechSection />
        <UXSection />
        <AIToolsSection />
        <AIAssistant />
        <KeyFeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
    