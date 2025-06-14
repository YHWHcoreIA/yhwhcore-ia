
import React from 'react';
import { UserCircleIcon } from './icons'; // Using UserCircleIcon as a generic UX icon

const UXItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-xl hover:shadow-sky-500/30 transition-shadow duration-300">
    <h3 className="text-xl font-semibold mb-2 text-sky-400">{title}</h3>
    <p className="text-slate-400">{children}</p>
  </div>
);

const UXSection: React.FC = () => {
  return (
    <section id="ux" className="py-16 md:py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <UserCircleIcon className="w-12 h-12 text-sky-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiencia de Usuario Excepcional</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Nos enfocamos en crear productos que no solo funcionen bien, sino que también sean intuitivos y agradables de usar.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <UXItem title="Diseño Centrado en el Usuario">
            Soluciones diseñadas pensando en las necesidades y expectativas de tus usuarios.
          </UXItem>
          <UXItem title="Interfaces Adaptativas e Intuitivas">
            Experiencias fluidas y fáciles de usar en cualquier dispositivo.
          </UXItem>
          <UXItem title="Análisis de Comportamiento y Optimización">
            Mejora continua basada en datos para maximizar la satisfacción del usuario.
          </UXItem>
          <UXItem title="Accesibilidad y Diseño Inclusivo">
            Productos accesibles para todos, sin barreras.
          </UXItem>
        </div>
      </div>
    </section>
  );
};

export default UXSection;
    