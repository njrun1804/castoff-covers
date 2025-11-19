import { CoverProduct, CoverType } from './types';

export const COVERS: CoverProduct[] = [
  {
    id: 'c1',
    type: CoverType.CHAIR,
    name: "The Solitary Sentry",
    description: "A cover designed for deep introspection and wide armrests.",
    coverImage: "https://images.unsplash.com/photo-1503602642458-2321114453ad?q=80&w=800&auto=format&fit=crop",
    wireframeImage: "https://images.unsplash.com/photo-1596162954151-cd678fdc42a3?q=80&w=800&auto=format&fit=crop",
    furnitureOptions: [
      { id: 'f1-a', name: "Teak Lounger", price: 899, material: "Solid Teak", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop" },
      { id: 'f1-b', name: "Wicker Shell", price: 650, material: "All-weather Wicker", image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800&auto=format&fit=crop" },
      { id: 'f1-c', name: "Aluminum Throne", price: 1200, material: "Powder-coated Aluminum", image: "https://images.unsplash.com/photo-1604145559206-e3bce0040e95?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: 'c2',
    type: CoverType.SOFA,
    name: "The Deep Seating Void",
    description: "Holds the space for conversations that haven't happened yet.",
    coverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", // Sofa like shape
    wireframeImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    furnitureOptions: [
      { id: 'f2-a', name: "Modular Cloud", price: 2400, material: "Performance Fabric", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" },
      { id: 'f2-b', name: "Rattan Estate", price: 1800, material: "Natural Rattan", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop" },
      { id: 'f2-c', name: "Minimalist Bench", price: 1100, material: "Concrete & Wood", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: 'c3',
    type: CoverType.TABLE,
    name: "The Feast Preserver",
    description: "Keeps the rain off a dinner party that exists only in your mind.",
    coverImage: "https://images.unsplash.com/photo-1530018607912-e78348e1fc84?q=80&w=800&auto=format&fit=crop", // Cloth texture
    wireframeImage: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop",
    furnitureOptions: [
      { id: 'f3-a', name: "Farmhouse Oak", price: 1500, material: "Reclaimed Oak", image: "https://images.unsplash.com/photo-1577140917170-285929055b42?q=80&w=800&auto=format&fit=crop" },
      { id: 'f3-b', name: "Glass Modern", price: 900, material: "Tempered Glass", image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=800&auto=format&fit=crop" },
      { id: 'f3-c', name: "Stone Round", price: 2100, material: "Limestone", image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?q=80&w=800&auto=format&fit=crop" }
    ]
  }
];