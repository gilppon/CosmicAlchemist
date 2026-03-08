import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { TargetZone } from '../../../../components/Game/TargetZone';
import { useAudio } from '../../../../hooks/useAudio';
import { useGameStore } from '../../../../store/useGameStore';
import { calculateScore, matchRecipe } from '../../../../utils/recipeLogic';

jest.mock('../../../../store/useGameStore', () => ({
    useGameStore: jest.fn(),
}));

jest.mock('../../../../hooks/useAudio', () => ({
    useAudio: jest.fn(),
}));

jest.mock('../../../../utils/recipeLogic', () => ({
    matchRecipe: jest.fn(),
    calculateScore: jest.fn(),
}));

describe('TargetZone', () => {
    let mockPlaySuccessSound: jest.Mock;
    let mockPlayFailSound: jest.Mock;
    let mockRemoveElement: jest.Mock;
    let mockAddScore: jest.Mock;
    let mockDiscoverPlanet: jest.Mock;

    beforeEach(() => {
        mockPlaySuccessSound = jest.fn();
        mockPlayFailSound = jest.fn();
        mockRemoveElement = jest.fn();
        mockAddScore = jest.fn();
        mockDiscoverPlanet = jest.fn();

        (useAudio as jest.Mock).mockReturnValue({
            playSuccessSound: mockPlaySuccessSound,
            playFailSound: mockPlayFailSound,
        });

        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            const state = {
                activeElements: [],
                removeElement: mockRemoveElement,
                addScore: mockAddScore,
                discoverPlanet: mockDiscoverPlanet,
            };
            return selector(state);
        });

        (matchRecipe as jest.Mock).mockReturnValue(null);
        (calculateScore as jest.Mock).mockReturnValue(0);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders placeholder text when no elements are active', () => {
        render(<TargetZone />);
        expect(screen.getByText('Synthesize Elements Here')).toBeDefined();
    });

    it('renders differently when exactly 1 element is active (hinting fusion)', () => {
        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                activeElements: [{ id: '1', type: 'fire' }],
                removeElement: mockRemoveElement,
                addScore: mockAddScore,
                discoverPlanet: mockDiscoverPlanet,
            });
        });

        render(<TargetZone />);
        expect(screen.queryByText('Synthesize Elements Here')).toBeNull();
        expect(screen.getByText('Fusion Initiated...')).toBeDefined();
    });

    it('attempts fusion and plays success sound when 2 elements match a recipe', () => {
        const testElements = [
            { id: '1', type: 'fire', density: 1.0 },
            { id: '2', type: 'water', density: 1.0 }
        ];

        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                activeElements: testElements,
                removeElement: mockRemoveElement,
                addScore: mockAddScore,
                discoverPlanet: mockDiscoverPlanet,
            });
        });

        (matchRecipe as jest.Mock).mockReturnValue({
            id: 'steam_planet',
            name: 'Steam Planet',
            recipe: ['fire', 'water'],
            rarity: 'Common'
        });
        (calculateScore as jest.Mock).mockReturnValue(100);

        render(<TargetZone />);

        expect(matchRecipe).toHaveBeenCalled();
        expect(mockPlaySuccessSound).toHaveBeenCalled();
        expect(mockRemoveElement).toHaveBeenCalledTimes(2);
        expect(mockDiscoverPlanet).toHaveBeenCalledWith(expect.objectContaining({ name: 'Steam Planet' }));
        expect(mockAddScore).toHaveBeenCalledWith(100);
    });

    it('attempts fusion and plays fail sound when 2 elements do NOT match a recipe', () => {
        const testElements = [
            { id: '1', type: 'fire', density: 1.0 },
            { id: '2', type: 'fire', density: 1.0 }
        ];

        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                activeElements: testElements,
                removeElement: mockRemoveElement,
                addScore: mockAddScore,
                discoverPlanet: mockDiscoverPlanet,
            });
        });

        (matchRecipe as jest.Mock).mockReturnValue(null);

        render(<TargetZone />);

        expect(matchRecipe).toHaveBeenCalled();
        expect(mockPlayFailSound).toHaveBeenCalled();
        expect(mockRemoveElement).toHaveBeenCalledTimes(2); // Remove elements on fail too
        expect(mockDiscoverPlanet).not.toHaveBeenCalled();
        expect(mockAddScore).not.toHaveBeenCalled();
    });
});
