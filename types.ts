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