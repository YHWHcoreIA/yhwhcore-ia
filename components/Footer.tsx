
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} YHWHcore IA. Todos los derechos reservados.
        </p>
        <p className="text-slate-500 text-xs mt-2">
          Potenciando el futuro del desarrollo con Inteligencia Artificial.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
    