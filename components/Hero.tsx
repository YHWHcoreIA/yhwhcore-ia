
import React from 'react';
import { ChatBubbleLeftEllipsisIcon } from './icons/ChatBubbleLeftEllipsisIcon'; // Placeholder, actual icon may vary

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6 text-center">
        <ChatBubbleLeftEllipsisIcon className="w-24 h-24 text-indigo-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-500">
          Desarrollo IA Ágil con YHWHcore
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Crea, itera y mejora continuamente con nuestra plataforma de IA que evoluciona con el feedback de tus usuarios.
        </p>
        <a
          href="#tools"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Explorar Herramientas IA
        </a>
      </div>
    </section>
  );
};

export default Hero;
    