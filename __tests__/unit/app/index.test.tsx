import { render } from '@testing-library/react-native';
import React from 'react';
import IndexScreen from '../../../app/index';
import { useGameStore } from '../../../store/useGameStore';

// Mock Zustand store
jest.mock('../../../store/useGameStore');

// Mock expo-router Link
jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock useAudio hook
jest.mock('../../../hooks/useAudio', () => ({
    useAudio: jest.fn(() => ({
        playSuccessSound: jest.fn(),
        playFailSound: jest.fn(),
    })),
}));

describe('IndexScreen (Main Game Canvas)', () => {
    beforeEach(() => {
        (useGameStore as unknown as jest.Mock).mockImplementation((selector: any) => {
            const state = {
                score: 0,
                activeElements: [],
                discoveredPlanets: [],
                addElement: jest.fn(),
                removeElement: jest.fn(),
                updateElementType: jest.fn(),
                updateElementDensity: jest.fn(),
                updateElementPosition: jest.fn(),
                updateElementVelocity: jest.fn(),
                addScore: jest.fn(),
                discoverPlanet: jest.fn(),
                isPlanetDiscovered: jest.fn(),
                setCurrentElement: jest.fn(),
                resetGame: jest.fn(),
            };
            return selector ? selector(state) : state;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the TargetZone and score', () => {
        const { getByText } = render(<IndexScreen />);
        expect(getByText(/Score: 0/i)).toBeTruthy();
    });

    it('contains a link to the Archive screen', () => {
        const { getByText } = render(<IndexScreen />);
        expect(getByText(/Archive/i)).toBeTruthy();
    });

    it('renders the CosmicBackground', () => {
        const { getByTestId } = render(<IndexScreen />);
        expect(getByTestId('cosmic-background')).toBeTruthy();
    });
});
