import ArchiveScreen from '@/app/archive';
import { useGameStore } from '@/store/useGameStore';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';

// Mock Expo Router
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

// Mock Zustand Store
jest.mock('@/store/useGameStore', () => ({
    useGameStore: jest.fn(),
}));

// Mock Recipes
jest.mock('@/data/recipes', () => ({
    PLANETS: [
        { id: 'planet_igneous', name: 'Igneous Planet', rarity: 'common', description: 'desc1' },
        { id: 'planet_ocean', name: 'Ocean Planet', rarity: 'rare', description: 'desc2' },
    ],
}));

describe('ArchiveScreen', () => {
    let mockRouter: any;

    beforeEach(() => {
        mockRouter = { back: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders empty state when no planets are discovered', () => {
        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                discoveredPlanets: [],
            });
        });

        render(<ArchiveScreen />);
        expect(screen.getByText('No planets discovered yet.')).toBeTruthy();
    });

    it('renders a list of discovered planets', () => {
        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                discoveredPlanets: [
                    { id: 'planet_igneous', name: 'Igneous Planet', rarity: 'common', description: 'desc1', score: 100, color: '#f00' }
                ],
            });
        });

        render(<ArchiveScreen />);
        expect(screen.getByText('Igneous Planet')).toBeTruthy();
        expect(screen.getByText('common')).toBeTruthy();
        expect(screen.queryByText('Ocean Planet')).toBeNull(); // Not discovered
    });

    it('navigates back when back button is pressed', () => {
        (useGameStore as unknown as jest.Mock).mockImplementation((selector) => {
            return selector({
                discoveredPlanets: [],
            });
        });

        render(<ArchiveScreen />);
        const backButton = screen.getByText('← Back');
        fireEvent.press(backButton);
        expect(mockRouter.back).toHaveBeenCalledTimes(1);
    });
});
