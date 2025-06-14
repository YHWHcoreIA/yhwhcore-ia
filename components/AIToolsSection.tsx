import React, { useState, useCallback } from 'react';
import { AITool, AIToolType } from '../types';
import { AI_TOOLS, GEMINI_TEXT_MODEL, GEMINI_IMAGE_MODEL } from '../constants';
import AIToolCard from './AIToolCard';
import Modal from './Modal';
import { geminiService } from '../services/geminiService';
import { SparklesIcon } from './icons';

// API Key is now accessed via process.env.API_KEY within geminiService

const AIToolsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<AITool | null>(null);
  const [modalInput, setModalInput] = useState('');
  const [modalOutput, setModalOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback((tool: AITool) => {
    setCurrentTool(tool);
    setModalInput('');
    setModalOutput(null);
    setError(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentTool(null);
  }, []);

  const handleGenerate = async () => {
    if (!currentTool || !modalInput.trim()) {
      setError("Por favor, ingresa una descripción o pregunta.");
      return;
    }

    // Check for API key is handled by geminiService, but we can have a UI hint
    if (!process.env.API_KEY) {
      setError("Error de configuración: La clave API (process.env.API_KEY) no está disponible.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setModalOutput(null);

    try {
      let result: string | null = null;
      if (currentTool.type === AIToolType.ImageCreation) {
        const images = await geminiService.generateImages(modalInput, GEMINI_IMAGE_MODEL);
        if (images.length > 0 && images[0].image.imageBytes) {
          result = `data:image/jpeg;base64,${images[0].image.imageBytes}`;
        } else {
          throw new Error("No se pudieron generar imágenes o la respuesta no contiene datos de imagen.");
        }
      } else {
        const prompt = currentTool.promptPrefix ? `${currentTool.promptPrefix}${modalInput}` : modalInput;
        result = await geminiService.generateText(prompt, GEMINI_TEXT_MODEL);
      }
      setModalOutput(result);
    } catch (e: any) {
      console.error("Error generating content:", e);
      setError(`Error al generar: ${e.message.includes("API key is not configured") ? "Error de configuración: La clave API (process.env.API_KEY) no está disponible o es incorrecta." : e.message}`);
      setModalOutput(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section id="tools" className="py-16 md:py-24 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <SparklesIcon className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Herramientas de IA</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Potencia tu creatividad y productividad con nuestras herramientas inteligentes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_TOOLS.map((tool) => (
            <AIToolCard key={tool.id} tool={tool} onActionClick={() => openModal(tool)} />
          ))}
        </div>
      </div>
      {currentTool && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={currentTool.title}>
          <div className="space-y-4">
            <p className="text-sm text-slate-400">{currentTool.description}</p>
            <div>
              <label htmlFor="modal-input" className="block text-sm font-medium text-slate-300 mb-1">
                {currentTool.type === AIToolType.ImageCreation ? "Describe la imagen a crear:" : "Tu solicitud:"}
              </label>
              <textarea
                id="modal-input"
                rows={3}
                className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                placeholder={
                  currentTool.type === AIToolType.ImageCreation 
                  ? "Ej: Un astronauta montando un unicornio en Marte, estilo pintura al óleo" 
                  : "Ej: Ideas para un blog post sobre IA en la educación"
                }
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !process.env.API_KEY} // Disable if API key is missing
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando...
                </>
              ) : (
                currentTool.actionText
              )}
            </button>
            {modalOutput && (
              <div className="mt-6 p-4 bg-slate-700/50 rounded-md border border-slate-600">
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">Resultado:</h4>
                {currentTool.type === AIToolType.ImageCreation ? (
                  <img src={modalOutput} alt="Generated content" className="rounded-md max-w-full h-auto mx-auto shadow-lg" />
                ) : (
                  <pre className="text-sm text-slate-200 whitespace-pre-wrap break-words">{modalOutput}</pre>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default AIToolsSection;