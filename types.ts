import React from 'react';

export enum CoverType {
  CHAIR = 'CHAIR',
  SOFA = 'SOFA',
  TABLE = 'TABLE'
}

export interface FurnitureOption {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  modelUrl?: string; // URL to .glb file for 3D display
  dimensions?: { width: string; height: string; depth: string };
}

export interface CoverProduct {
  id: string;
  type: CoverType;
  name: string;
  description: string;
  coverImage: string; // Image of the draped cloth
  wireframeImage: string; // Image of the furniture underneath
  furnitureOptions: FurnitureOption[];
}

// --- AI Service Interfaces ---

export interface AnalysisResult {
  vibe: string;
  dimensions: string;
  color: string; // Hex
  philosophy: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  groundingMetadata?: any;
}
