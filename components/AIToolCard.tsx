
import React from 'react';
import { AITool } from '../types';

interface AIToolCardProps {
  tool: AITool;
  onActionClick: () => void;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, onActionClick }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 flex flex-col hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <span className="p-2 bg-slate-700 rounded-lg mr-4">{tool.icon}</span>
        <h3 className="text-xl font-semibold text-slate-100">{tool.title}</h3>
      </div>
      <p className="text-slate-400 text-sm mb-6 flex-grow">{tool.description}</p>
      <button
        onClick={onActionClick}
        className="mt-auto w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
      >
        {tool.actionText}
      </button>
    </div>
  );
};

export default AIToolCard;
    