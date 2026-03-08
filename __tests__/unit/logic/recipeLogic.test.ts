import { Planet } from '@/types/game';
import { calculateScore, matchRecipe } from '@/utils/recipeLogic';

describe('Recipe Logic', () => {
    describe('matchRecipe', () => {
        it('should return a planet when inputs and density match a recipe', () => {
            const result = matchRecipe('fire', 'water', 2.0);
            expect(result).toBeDefined();
            expect(result?.name).toBe('Steam Planet'); // Assuming we have this in our mock/real data
        });

        it('should return null when inputs match but density is too low', () => {
            const result = matchRecipe('fire', 'water', 0.5);
            expect(result).toBeNull();
        });

        it('should return null when input types do not match any recipe', () => {
            const result = matchRecipe('earth', 'lightning', 3.0);
            expect(result).toBeNull();
        });

        it('should be order-independent for input types', () => {
            const result1 = matchRecipe('fire', 'water', 2.0);
            const result2 = matchRecipe('water', 'fire', 2.0);
            expect(result1?.id).toEqual(result2?.id);
        });
    });

    describe('calculateScore', () => {
        it('should assign correct scores based on rarity', () => {
            const commonPlanet: Planet = { id: 'p1', name: 'Test', description: '', rarity: 'common', color: '#fff', score: 100 };
            const rarePlanet: Planet = { id: 'p2', name: 'Test', description: '', rarity: 'rare', color: '#fff', score: 500 };
            const legendaryPlanet: Planet = { id: 'p3', name: 'Test', description: '', rarity: 'legendary', color: '#fff', score: 2000 };

            expect(calculateScore(commonPlanet.rarity)).toBe(100);
            expect(calculateScore(rarePlanet.rarity)).toBe(500);
            expect(calculateScore(legendaryPlanet.rarity)).toBe(2000);
        });
    });
});
