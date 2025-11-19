
# Castaway Frames: Autonomous Developer Manual

**Target Agent:** Gemini Code 3.0 Pro
**Vibe:** The Emperor's New Patio (Surreal, Minimalist, High-End, Invisible)
**Tech Stack:** React 18, Tailwind CSS, Three.js (model-viewer), Google GenAI SDK

---

## 1. Core Philosophy
This is NOT a standard e-commerce site. It is a "Reverse E-Commerce" experience.
- **We sell the void:** The cover is the protagonist; the furniture is the ghost.
- **Physics over Text:** Show durability through wind/rain simulations (`NarrativeSection`), not bullet points.
- **Invisible UI:** Use glass-morphism, magnetic buttons, and negative space.

## 2. Architecture & Separation of Concerns

### The Brain: `services/ai.ts`
- **Role:** Encapsulates ALL interaction with Google Gemini APIs.
- **Pattern:** No API calls in UI components. UI components call semantic methods like `analyzePatio()` or `chatWithCurator()`.
- **Personas:** This file manages the "Curator" and "Vibe Auditor" system instructions.
- **Hardening:** Includes `cleanJSON` utilities to handle LLM markdown output safely.

### The Voice: `content.ts`
- **Role:** Central dictionary for all text copy.
- **Rule:** **NEVER hardcode strings in JSX.** Always reference `CONTENT.section.key`.
- **Benefit:** Allows distinct "Copywriter Agents" to update tone without breaking code.

### The Performance: `components/LazyRender.tsx`
- **Role:** Wrapper for heavy assets (3D models, large images).
- **Rule:** Any `<model-viewer>` or asset below the fold MUST be wrapped in this component.

### The Physics: `hooks/usePhysics.ts`
- **Role:** mathematical logic for mouse velocity, drag, and decay.
- **Rule:** Do not put `requestAnimationFrame` loops inside UI components. Use this hook.

## 3. Component Map

| New Component | Role | Replaces (Deprecated) |
|---|---|---|
| `Hero.tsx` | Atmospheric entry. Pure visuals. | N/A |
| `NarrativeSection.tsx` | Scrollytelling engine. Merges Storm, Wind, Time Machine. | `DurabilitySection`, `WindToggle`, `TimeMachineSection` |
| `DesignLab.tsx` | AI Tools container. Merges Vibe Auditor & Chameleon. | `VisualizerSection`, `ChameleonSection` |
| `ProductShowcase.tsx` | 3D Grid & AR Lidar experience. | `ProductSection` |
| `Chatbot.tsx` | Gemini 3.0 powered concierge with RAG/Grounding. | N/A |

## 4. Coding Standards for Gemini 3.0

1.  **Strict Typing:** All interfaces must reside in `types.ts`. Do not declare types locally in components.
2.  **Reduced Motion:** Always check `prefers-reduced-motion` in animation hooks (see `usePhysics.ts`).
3.  **Error Boundaries:** Heavy tech (AI, 3D) must have fallback UI states (e.g., `loadError` in `TiltCard`).
4.  **Tailwind:** Use `bg-navy`, `text-sand`, `backdrop-blur` classes to maintain the established palette.

## 5. External Dependencies
- **3D:** `<model-viewer>` (Loaded via CDN in `index.html`)
- **Icons:** FontAwesome (Loaded via CDN)
- **AI:** `@google/genai` (esm.sh)

---
*End of Manual*
