
import { CoverProduct, CoverType } from './types';

// High-quality GLB assets for the demo.
// These are sourced from Google's model-viewer examples and Khronos Group samples.
const CHAIR_MODEL_FABRIC = "https://modelviewer.dev/shared-assets/models/SheenChair.glb";
const CHAIR_MODEL_WOOD = "https://modelviewer.dev/shared-assets/models/Chair.glb";
const SOFA_MODEL = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb"; 
const SURREAL_OBJECT_1 = "https://modelviewer.dev/shared-assets/models/Mixer.glb"; // A surreal kitchen appliance for the table
const SURREAL_OBJECT_2 = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"; // A sci-fi artifact

export const AI_PERSONA = {
  name: "The Curator",
  tone: "Sophisticated, slightly nihilistic, high-end, architectural, knowledgeable.",
  manifesto: `
    1. Furniture is a burden. It rots, fades, and demands attention.
    2. The Cover is the ideal form. It is protection, mystery, and permanence.
    3. We do not sell covers to hide furniture; we sell furniture to give our covers shape.
    4. An empty patio is a tragedy. A covered patio is a sculpture.
    5. Longevity is the only metric that matters.
  `,
  materialSpecs: "Heavy-weight marine grade solution-dyed acrylic. Hand-stitched architectural seams. Hydrophobic coating. Matte finish. No plastic sheen."
};

export const COVERS: CoverProduct[] = [
  {
    id: 'c1',
    type: CoverType.CHAIR,
    name: "The Solitary Sentry",
    description: "A cover designed for deep introspection and wide armrests.",
    // Replaced with working "Minimalist Bench" image for cover texture
    coverImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    // Replaced with working "Teak Lounger" for ghost
    wireframeImage: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
    furnitureOptions: [
      { 
        id: 'f1-a', 
        name: "Teak Lounger", 
        price: 899, 
        material: "Solid Teak", 
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
        modelUrl: CHAIR_MODEL_WOOD,
        dimensions: { width: "32\"", height: "35\"", depth: "30\"" }
      },
      { 
        id: 'f1-b', 
        name: "Wicker Shell", 
        price: 650, 
        material: "All-weather Wicker", 
        image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800&auto=format&fit=crop",
        modelUrl: CHAIR_MODEL_FABRIC,
        dimensions: { width: "28\"", height: "32\"", depth: "29\"" }
      },
      { 
        id: 'f1-c', 
        name: "Aluminum Throne", 
        price: 1200, 
        material: "Powder-coated Aluminum", 
        // Replaced with safe Teak Lounger image to ensure visibility
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
        modelUrl: CHAIR_MODEL_FABRIC,
        dimensions: { width: "34\"", height: "40\"", depth: "34\"" }
      }
    ]
  },
  {
    id: 'c2',
    type: CoverType.SOFA,
    name: "The Deep Seating Void",
    description: "Holds the space for conversations that haven't happened yet.",
    // Replaced with working "Sofa" image
    coverImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop", 
    // Replaced with working "Sofa" image
    wireframeImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    furnitureOptions: [
      { 
        id: 'f2-a', 
        name: "Modular Cloud", 
        price: 2400, 
        material: "Performance Fabric", 
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
        modelUrl: SOFA_MODEL,
        dimensions: { width: "84\"", height: "30\"", depth: "35\"" }
      },
      { 
        id: 'f2-b', 
        name: "Rattan Estate", 
        price: 1800, 
        material: "Natural Rattan", 
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop",
        modelUrl: SOFA_MODEL,
        dimensions: { width: "76\"", height: "32\"", depth: "32\"" }
      },
      { 
        id: 'f2-c', 
        name: "Minimalist Bench", 
        price: 1100, 
        material: "Concrete & Wood", 
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
        modelUrl: SOFA_MODEL,
        dimensions: { width: "60\"", height: "18\"", depth: "16\"" }
      }
    ]
  },
  {
    id: 'c3',
    type: CoverType.TABLE,
    name: "The Feast Preserver",
    description: "Keeps the rain off a dinner party that exists only in your mind.",
    // Replaced with working "Glass Modern" image
    coverImage: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=800&auto=format&fit=crop", 
    // Replaced with working "Stone Round" image
    wireframeImage: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?q=80&w=800&auto=format&fit=crop",
    furnitureOptions: [
      { 
        id: 'f3-a', 
        name: "Farmhouse Oak", 
        price: 1500, 
        material: "Reclaimed Oak", 
        image: "https://images.unsplash.com/photo-1577140917170-285929055b42?q=80&w=800&auto=format&fit=crop",
        modelUrl: SURREAL_OBJECT_1,
        dimensions: { width: "48\"", height: "29\"", depth: "48\"" }
      },
      { 
        id: 'f3-b', 
        name: "Glass Modern", 
        price: 900, 
        material: "Tempered Glass", 
        image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?q=80&w=800&auto=format&fit=crop",
        modelUrl: SURREAL_OBJECT_2,
        dimensions: { width: "52\"", height: "30\"", depth: "30\"" }
      },
      { 
        id: 'f3-c', 
        name: "Stone Round", 
        price: 2100, 
        material: "Limestone", 
        image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?q=80&w=800&auto=format&fit=crop",
        modelUrl: SURREAL_OBJECT_2,
        dimensions: { width: "60\"", height: "30\"", depth: "60\"" }
      }
    ]
  }
];
