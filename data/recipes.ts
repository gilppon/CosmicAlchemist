import { Planet, Recipe } from '@/types/game';

// Placeholder Planets
export const PLANETS: Record<string, Planet> = {
    STEAM: {
        id: 'p_steam',
        name: 'Steam Planet',
        description: 'A planet covered in thick, boiling clouds.',
        rarity: 'common',
        color: '#D3D3D3',
        score: 100,
    },
    MUD: {
        id: 'p_mud',
        name: 'Mud Planet',
        description: 'A dense, sticky world.',
        rarity: 'common',
        color: '#5C4033',
        score: 100,
    },
    STORM: {
        id: 'p_storm',
        name: 'Storm Planet',
        description: 'Fierce winds and endless lightning.',
        rarity: 'rare',
        color: '#4B0082',
        score: 500,
    },
    MAGMA: {
        id: 'p_magma',
        name: 'Magma Planet',
        description: 'Molten rock flows like water.',
        rarity: 'rare',
        color: '#FF4500',
        score: 500,
    },
    AETHER: {
        id: 'p_aether',
        name: 'Aether Nexus',
        description: 'Pure cosmic energy.',
        rarity: 'legendary',
        color: '#FFD700',
        score: 2000,
    }
};

// Initial Recipes
export const RECIPES: Recipe[] = [
    {
        id: 'r_fire_water',
        inputTypes: ['fire', 'water'],
        requiredDensity: 1.5,
        resultPlanet: PLANETS.STEAM,
    },
    {
        id: 'r_water_earth',
        inputTypes: ['water', 'earth'],
        requiredDensity: 2.0,
        resultPlanet: PLANETS.MUD,
    },
    {
        id: 'r_air_lightning',
        inputTypes: ['air', 'lightning'],
        requiredDensity: 2.5,
        resultPlanet: PLANETS.STORM,
    },
    {
        id: 'r_fire_earth',
        inputTypes: ['fire', 'earth'],
        requiredDensity: 3.0,
        resultPlanet: PLANETS.MAGMA,
    },
    {
        // Secret legendary combination
        id: 'r_lightning_water',
        inputTypes: ['lightning', 'water'],
        requiredDensity: 4.0,
        resultPlanet: PLANETS.AETHER,
    }
];
