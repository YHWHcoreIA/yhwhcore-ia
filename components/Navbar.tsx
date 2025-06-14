
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
          YHWHcore IA
        </a>
        <div className="space-x-4">
          <a href="#tech" className="text-slate-300 hover:text-indigo-400 transition-colors">Tecnologías</a>
          <a href="#ux" className="text-slate-300 hover:text-indigo-400 transition-colors">UX</a>
          <a href="#tools" className="text-slate-300 hover:text-indigo-400 transition-colors">Herramientas IA</a>
          <a href="#assistant" className="text-slate-300 hover:text-indigo-400 transition-colors">Asistente</a>
          <a href="#features" className="text-slate-300 hover:text-indigo-400 transition-colors">Características</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
    