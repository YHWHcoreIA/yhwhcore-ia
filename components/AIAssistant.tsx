import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, GroundingChunk } from '../types';
import { PaperAirplaneIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon } from './icons';
import { geminiService } from '../services/geminiService';
import { GEMINI_CHAT_MODEL } from '../constants';
import { GenerateContentResponse, Chat } from '@google/genai';

// API Key is now accessed via process.env.API_KEY within geminiService

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  const [isChatInitialized, setIsChatInitialized] = useState(false);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (!process.env.API_KEY) {
      console.error("API key for chat not configured. Set process.env.API_KEY.");
      setError("Error de configuración: La clave API (process.env.API_KEY) no está disponible.");
      setIsChatInitialized(true); 
      return;
    }
    try {
      const newChatInstance = geminiService.startChat(
        GEMINI_CHAT_MODEL,
        "Eres YHWHcore IA, un asistente amigable y experto en desarrollo ágil, diseño, programación y tecnologías de IA. Responde de manera concisa y útil."
      );
      setChatInstance(newChatInstance);
    } catch (e: any) {
       console.error("Failed to initialize chat:", e);
       setError(`Error al iniciar el chat: ${e.message.includes("API key is not configured") ? "Error de configuración: La clave API (process.env.API_KEY) no está disponible o es incorrecta." : e.message}`);
    } finally {
      setIsChatInitialized(true);
    }
  }, []); 


  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || !chatInstance) {
      if (!process.env.API_KEY) {
         setError("Error de configuración: La clave API (process.env.API_KEY) no está disponible.");
      } else if (!chatInstance) {
         setError("El chat no está inicializado. Intenta recargar la página.");
      }
      return;
    }

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsAiTyping(true);
    setError(null);

    const aiMessageId = Date.now().toString() + '-ai-stream';
    const aiMessageShell: ChatMessage = {
      id: aiMessageId,
      sender: 'ai',
      text: '',
      timestamp: new Date(),
      groundingChunks: [] // Initialize with empty array
    };
    setMessages((prevMessages) => [...prevMessages, aiMessageShell]);

    try {
      const stream = await geminiService.sendMessageStream(chatInstance, currentInput);
      let aiResponseText = "";
      let currentGroundingChunks: GroundingChunk[] = []; // Use local GroundingChunk type

      for await (const chunk of stream) { // chunk is GenerateContentResponse
        const chunkText = chunk.text;
        aiResponseText += chunkText;
        
        // SDK's groundingMetadata.groundingChunks needs to be compatible with local GroundingChunk[]
        // This is now handled by making properties in local GroundingChunk types optional
        const sdkGroundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (sdkGroundingChunks) {
            currentGroundingChunks = sdkGroundingChunks.map(sdkChunk => ({
                web: sdkChunk.web ? { uri: sdkChunk.web.uri, title: sdkChunk.web.title } : undefined,
                retrievedContext: sdkChunk.retrievedContext ? { uri: sdkChunk.retrievedContext.uri, title: sdkChunk.retrievedContext.title } : undefined,
            })) as GroundingChunk[]; // Cast if confident in structure, or perform safer mapping
        }

        setMessages((prevMessages) => 
          prevMessages.map(msg => 
            msg.id === aiMessageId 
            ? { ...msg, text: aiResponseText, groundingChunks: currentGroundingChunks.length > 0 ? currentGroundingChunks : msg.groundingChunks } 
            : msg
          )
        );
      }
      
      setMessages((prevMessages) => 
        prevMessages.map(msg => 
          msg.id === aiMessageId 
          ? { ...msg, text: aiResponseText, timestamp: new Date(), groundingChunks: currentGroundingChunks }
          : msg
        )
      );

    } catch (e: any) {
      console.error("Error sending message:", e);
      setError(`Error al enviar mensaje: ${e.message.includes("API key is not configured") ? "Error de configuración: La clave API (process.env.API_KEY) no está disponible o es incorrecta." : e.message}`);
      setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== aiMessageId));
      const aiErrorMessage: ChatMessage = {
        id: Date.now().toString() + '-error',
        sender: 'ai',
        text: `Lo siento, ocurrió un error: ${e.message}`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  }, [userInput, chatInstance]);

  return (
    <section id="assistant" className="py-16 md:py-24 bg-slate-900">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <ChatBubbleLeftEllipsisIcon className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">YHWHcore IA Asistente</h2>
             <p className={`text-sm font-medium ${process.env.API_KEY && chatInstance ? 'text-emerald-400' : 'text-rose-400'}`}>
              ● {process.env.API_KEY && chatInstance ? 'En línea' : 'Desconectado - API Key o Chat no configurado'}
            </p>
          </div>

          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600 space-y-4"
            aria-live="polite"
          >
            {messages.length === 0 && isChatInitialized && (
                 <div className="text-center text-slate-400 py-10">
                    <p className="text-lg">¡Hola! Soy tu asistente de YHWHcore IA.</p>
                    <p>Estoy aquí para ayudarte con desarrollo ágil, diseño, programación y más.</p>
                    <p className="mt-2">¿En qué puedo asistirte hoy?</p>
                </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-slate-600 text-slate-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.text || (msg.sender === 'ai' && isAiTyping && msg.id.endsWith('-ai-stream') ? '...' : '...')}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'} text-right`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.sender === 'ai' && msg.groundingChunks && msg.groundingChunks.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-500">
                      <p className="text-xs text-slate-300 mb-1">Fuentes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {msg.groundingChunks.map((chunk, index) => (
                          (chunk.web?.uri || chunk.retrievedContext?.uri) && (
                            <li key={index} className="text-xs">
                              <a 
                                href={chunk.web?.uri || chunk.retrievedContext?.uri} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-indigo-300 hover:text-indigo-200 underline truncate block"
                                title={chunk.web?.title || chunk.retrievedContext?.title || chunk.web?.uri || chunk.retrievedContext?.uri}
                              >
                                {chunk.web?.title || chunk.retrievedContext?.title || (chunk.web?.uri || chunk.retrievedContext?.uri ? new URL(chunk.web.uri || chunk.retrievedContext.uri).hostname : 'Fuente desconocida')}
                              </a>
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAiTyping && messages[messages.length-1]?.sender === 'user' && ( 
              <div className="flex justify-start" aria-label="IA está escribiendo">
                <div className="max-w-xs px-4 py-3 rounded-xl shadow bg-slate-600 text-slate-100 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-75"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
            {error && <p role="alert" className="text-sm text-red-400 mb-2 text-center">{error}</p>}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAiTyping && handleSendMessage()}
              placeholder="Escribe tu mensaje..."
              className="flex-grow p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-slate-400"
              disabled={isAiTyping || !chatInstance || !process.env.API_KEY || !isChatInitialized}
              aria-label="Entrada de mensaje del chat"
            />
            <button
              onClick={handleSendMessage}
              disabled={isAiTyping || !userInput.trim() || !chatInstance || !process.env.API_KEY || !isChatInitialized}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold p-3 rounded-lg shadow-md transition-colors"
              aria-label="Enviar mensaje"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;