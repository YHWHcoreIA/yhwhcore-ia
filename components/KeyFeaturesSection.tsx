
import React from 'react';
import { BoltIcon, ShieldCheckIcon, CogIcon } from './icons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-purple-500/30 transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="p-3 bg-slate-700 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-3 text-purple-400">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const KeyFeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Características Principales</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Descubre por qué YHWHcore IA es la elección ideal para tu próximo proyecto.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<BoltIcon className="w-10 h-10 text-purple-400" />}
            title="Desarrollo Rápido"
            description="Acelera tu proceso de desarrollo con herramientas de IA que automatizan tareas repetitivas y optimizan flujos de trabajo."
          />
          <FeatureCard 
            icon={<ShieldCheckIcon className="w-10 h-10 text-purple-400" />}
            title="Seguro y Escalable"
            description="Arquitectura robusta que crece con tu negocio y mantiene tus datos protegidos con los más altos estándares de seguridad."
          />
          <FeatureCard 
            icon={<CogIcon className="w-10 h-10 text-purple-400" />}
            title="Personalizable"
            description="Adapta la plataforma a tus necesidades específicas con opciones de configuración avanzadas y APIs flexibles."
          />
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
    