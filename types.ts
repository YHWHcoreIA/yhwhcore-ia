import React from 'react';

export enum AIToolType {
  ImageCreation = "Creación de Imágenes",
  ContentWriting = "Escritura de Contenido",
  WebDesign = "Diseño Web",
  AppDevelopment = "Desarrollo de Apps",
  Programming = "Programación",
  QA = "Preguntas y Respuestas",
}

export interface AITool {
  id: string;
  type: AIToolType;
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactNode;
  promptPrefix?: string;
  requiresImagePrompt?: boolean;
}

export interface GroundingChunkWeb {
  uri?: string; // Made optional
  title?: string; // Made optional
}

export interface RetrievedContextChunk {
  uri?: string; // Made optional
  title?: string; // Made optional
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: RetrievedContextChunk;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  groundingChunks?: GroundingChunk[];
}

export interface GeneratedImageDetail {
  image: {
    imageBytes: string;
  };
  // Allow for other potential properties from the SDK
  [key: string]: any;
}
