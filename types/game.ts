// Cosmic Alchemist — Core Game Types

export type ElementType = 'fire' | 'water' | 'earth' | 'air' | 'lightning';

export interface Position {
    x: number;
    y: number;
}

export interface Velocity {
    vx: number;
    vy: number;
}

export interface Element {
    id: string;
    type: ElementType;
    mass: number;
    density: number;
    velocity: Velocity;
    position: Position;
}

export interface Recipe {
    id: string;
    inputTypes: [ElementType, ElementType];
    requiredDensity: number;
    resultPlanet: Planet;
}

export interface Planet {
    id: string;
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'legendary';
    color: string;
    score: number;
}

export interface GameState {
    // Current gameplay
    score: number;
    highScore: number;
    currentElement: Element | null;
    activeElements: Element[];

    // Collection
    discoveredPlanets: Planet[];

    // Actions
    setCurrentElement: (element: Element | null) => void;
    addElement: (element: Element) => void;
    removeElement: (id: string) => void;
    updateElementDensity: (id: string, density: number) => void;
    updateElementType: (id: string, type: ElementType) => void;
    updateElementPosition: (id: string, position: Position) => void;
    updateElementVelocity: (id: string, velocity: Velocity) => void;

    // Scoring & Discovery
    addScore: (points: number) => void;
    discoverPlanet: (planet: Planet) => void;
    isPlanetDiscovered: (planetId: string) => boolean;

    // Reset
    resetGame: () => void;
}
