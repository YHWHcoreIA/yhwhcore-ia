
import React from 'react';
import { CodeIcon, SparklesIcon } from './icons'; // Using existing icons

const TechItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-xl hover:shadow-indigo-500/30 transition-shadow duration-300">
    <h3 className="text-xl font-semibold mb-2 text-indigo-400">{title}</h3>
    <p className="text-slate-400">{children}</p>
  </div>
);

const TechSection: React.FC = () => {
  return (
    <section id="tech" className="py-16 md:py-24 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <SparklesIcon className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tecnologías de Vanguardia</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Utilizamos las últimas tecnologías y herramientas para garantizar un rendimiento óptimo y una experiencia de usuario excepcional.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TechItem title="Inteligencia Artificial Avanzada">
            Modelos de IA de última generación para potenciar tus proyectos.
          </TechItem>
          <TechItem title="Arquitectura Escalable en la Nube">
            Soluciones robustas y flexibles que crecen con tus necesidades.
          </TechItem>
          <TechItem title="Frameworks Modernos de Desarrollo">
            Desarrollo eficiente y de alta calidad con las herramientas más actuales.
          </TechItem>
          <TechItem title="Integración Continua y Despliegue Automático">
            Agilidad y fiabilidad en cada entrega con CI/CD.
          </TechItem>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
    