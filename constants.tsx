
import React from 'react';
import { AITool, AIToolType } from './types';
import { SparklesIcon, PencilIcon, LayoutIcon, SmartphoneIcon, CodeIcon, QuestionMarkCircleIcon } from './components/icons';

export const AI_TOOLS: AITool[] = [
  {
    id: 'image-creation',
    type: AIToolType.ImageCreation,
    title: "Creación de Imágenes",
    description: "Genera imágenes impresionantes a partir de descripciones de texto. Ideal para diseño gráfico, marketing y contenido creativo.",
    actionText: "Crear imagen",
    icon: <SparklesIcon className="w-8 h-8 text-indigo-400" />,
    requiresImagePrompt: true,
  },
  {
    id: 'content-writing',
    type: AIToolType.ContentWriting,
    title: "Escritura de Contenido",
    description: "Crea artículos, textos publicitarios, correos electrónicos y más con nuestra IA especializada en escritura.",
    actionText: "Escribir contenido",
    icon: <PencilIcon className="w-8 h-8 text-sky-400" />,
    promptPrefix: "Escribe contenido sobre: ",
  },
  {
    id: 'web-design',
    type: AIToolType.WebDesign,
    title: "Diseño Web",
    description: "Crea diseños web profesionales y responsivos con solo describir lo que necesitas. Sin necesidad de conocimientos técnicos.",
    actionText: "Diseñar web",
    icon: <LayoutIcon className="w-8 h-8 text-emerald-400" />,
    promptPrefix: "Proporciona ideas detalladas para un diseño web sobre: ",
  },
  {
    id: 'app-development',
    type: AIToolType.AppDevelopment,
    title: "Desarrollo de Apps",
    description: "Crea prototipos y aplicaciones funcionales con asistencia de IA. Convierte tus ideas en realidad rápidamente.",
    actionText: "Desarrollar app",
    icon: <SmartphoneIcon className="w-8 h-8 text-rose-400" />,
    promptPrefix: "Describe un prototipo de aplicación para: ",
  },
  {
    id: 'programming',
    type: AIToolType.Programming,
    title: "Programación",
    description: "Obtén ayuda con código, depuración y optimización. Nuestra IA puede asistirte en múltiples lenguajes de programación.",
    actionText: "Programar",
    icon: <CodeIcon className="w-8 h-8 text-amber-400" />,
    promptPrefix: "Ayúdame con este problema de programación o genera código para: ",
  },
  {
    id: 'qa',
    type: AIToolType.QA,
    title: "Preguntas y Respuestas",
    description: "Obtén respuestas precisas a tus preguntas sobre cualquier tema. Nuestra IA está entrenada con una amplia base de conocimientos.",
    actionText: "Hacer pregunta",
    icon: <QuestionMarkCircleIcon className="w-8 h-8 text-fuchsia-400" />,
  },
];

export const GEMINI_CHAT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002';
    