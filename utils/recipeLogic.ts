import { RECIPES } from '@/data/recipes';
import { ElementType, Planet } from '@/types/game';

/**
 * Checks if two elements and a given combined density match any known recipe.
 * Order of element types does not matter.
 */
export const matchRecipe = (
    typeA: ElementType,
    typeB: ElementType,
    combinedDensity: number
): Planet | null => {

    for (const recipe of RECIPES) {
        // Check if types match in any order
        const typesMatch =
            (recipe.inputTypes[0] === typeA && recipe.inputTypes[1] === typeB) ||
            (recipe.inputTypes[0] === typeB && recipe.inputTypes[1] === typeA);

        if (typesMatch) {
            // Check if density requirement is met (can be tweaked to need exact match later)
            if (combinedDensity >= recipe.requiredDensity) {
                return recipe.resultPlanet;
            }
        }
    }

    return null;
};

/**
 * Calculates base score based on planet rarity
 */
export const calculateScore = (rarity: Planet['rarity']): number => {
    switch (rarity) {
        case 'common': return 100;
        case 'rare': return 500;
        case 'legendary': return 2000;
        default: return 0;
    }
};
