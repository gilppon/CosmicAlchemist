/**
 * Cosmic Alchemist — useGameStore Unit Tests (TDD Red Phase)
 *
 * These tests are written FIRST before the store implementation.
 * Expected: All tests FAIL (Red) until store is implemented.
 */
import { act, renderHook } from '@testing-library/react-native';

// This import should FAIL until we implement the store
import { useGameStore } from '@/store/useGameStore';
import type { Element, Planet } from '@/types/game';

// --- Test Fixtures ---

const createMockElement = (overrides: Partial<Element> = {}): Element => ({
    id: 'test-element-1',
    type: 'fire',
    mass: 10,
    density: 1.0,
    velocity: { vx: 0, vy: 0 },
    position: { x: 100, y: 200 },
    ...overrides,
});

const createMockPlanet = (overrides: Partial<Planet> = {}): Planet => ({
    id: 'planet-1',
    name: 'Ignis Prime',
    description: 'A blazing world of eternal flame',
    rarity: 'common',
    color: '#FF6B35',
    score: 100,
    ...overrides,
});

// --- Tests ---

describe('useGameStore', () => {
    beforeEach(() => {
        useGameStore.setState({
            score: 0,
            highScore: 0,
            currentElement: null,
            discoveredPlanets: [],
            activeElements: [],
        });
    });

    describe('Initial State', () => {
        it('should have score = 0', () => {
            const { result } = renderHook(() => useGameStore());
            expect(result.current.score).toBe(0);
        });

        it('should have highScore = 0', () => {
            const { result } = renderHook(() => useGameStore());
            expect(result.current.highScore).toBe(0);
        });

        it('should have currentElement = null', () => {
            const { result } = renderHook(() => useGameStore());
            expect(result.current.currentElement).toBeNull();
        });

        it('should have empty discoveredPlanets', () => {
            const { result } = renderHook(() => useGameStore());
            expect(result.current.discoveredPlanets).toEqual([]);
        });

        it('should have empty activeElements', () => {
            const { result } = renderHook(() => useGameStore());
            expect(result.current.activeElements).toEqual([]);
        });
    });

    describe('Element Management', () => {
        it('should set current element', () => {
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.setCurrentElement(element);
            });

            expect(result.current.currentElement).toEqual(element);
        });

        it('should clear current element with null', () => {
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.setCurrentElement(element);
                result.current.setCurrentElement(null);
            });

            expect(result.current.currentElement).toBeNull();
        });

        it('should add an element to activeElements', () => {
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addElement(element);
            });

            expect(result.current.activeElements).toHaveLength(1);
            expect(result.current.activeElements[0]).toEqual(element);
        });

        it('should remove an element by id', () => {
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addElement(element);
                result.current.removeElement(element.id);
            });

            expect(result.current.activeElements).toHaveLength(0);
        });

        it('should update element density', () => {
            const element = createMockElement({ density: 1.0 });
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addElement(element);
                result.current.updateElementDensity(element.id, 2.5);
            });

            expect(result.current.activeElements[0]?.density).toBe(2.5);
        });

        it('should update element type', () => {
            const element = createMockElement({ type: 'fire' });
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addElement(element);
                result.current.updateElementType(element.id, 'water');
            });

            expect(result.current.activeElements[0]?.type).toBe('water');
        });

        it('should update element position', () => {
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addElement(element);
                result.current.updateElementPosition(element.id, { x: 300, y: 400 });
            });

            expect(result.current.activeElements[0]?.position).toEqual({ x: 300, y: 400 });
        });

        it('should update element velocity', () => {
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addElement(element);
                result.current.updateElementVelocity(element.id, { vx: 5, vy: -3 });
            });

            expect(result.current.activeElements[0]?.velocity).toEqual({ vx: 5, vy: -3 });
        });
    });

    describe('Scoring', () => {
        it('should add score', () => {
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addScore(100);
            });

            expect(result.current.score).toBe(100);
        });

        it('should accumulate score', () => {
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addScore(100);
                result.current.addScore(50);
            });

            expect(result.current.score).toBe(150);
        });

        it('should update highScore when score exceeds it', () => {
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addScore(200);
            });

            expect(result.current.highScore).toBe(200);
        });

        it('should NOT decrease highScore on reset', () => {
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addScore(500);
            });

            act(() => {
                result.current.resetGame();
            });

            expect(result.current.score).toBe(0);
            expect(result.current.highScore).toBe(500);
        });
    });

    describe('Planet Discovery', () => {
        it('should discover a new planet', () => {
            const planet = createMockPlanet();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.discoverPlanet(planet);
            });

            expect(result.current.discoveredPlanets).toHaveLength(1);
            expect(result.current.discoveredPlanets[0]).toEqual(planet);
        });

        it('should NOT add duplicate planet', () => {
            const planet = createMockPlanet();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.discoverPlanet(planet);
                result.current.discoverPlanet(planet);
            });

            expect(result.current.discoveredPlanets).toHaveLength(1);
        });

        it('should check if planet is discovered', () => {
            const planet = createMockPlanet();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.discoverPlanet(planet);
            });

            expect(result.current.isPlanetDiscovered(planet.id)).toBe(true);
            expect(result.current.isPlanetDiscovered('unknown')).toBe(false);
        });

        it('should preserve discoveredPlanets on reset', () => {
            const planet = createMockPlanet();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.discoverPlanet(planet);
                result.current.resetGame();
            });

            expect(result.current.discoveredPlanets).toHaveLength(1);
        });
    });

    describe('Reset', () => {
        it('should reset score but keep highScore and discoveredPlanets', () => {
            const planet = createMockPlanet();
            const element = createMockElement();
            const { result } = renderHook(() => useGameStore());

            act(() => {
                result.current.addScore(300);
                result.current.discoverPlanet(planet);
                result.current.addElement(element);
                result.current.setCurrentElement(element);
            });

            act(() => {
                result.current.resetGame();
            });

            expect(result.current.score).toBe(0);
            expect(result.current.highScore).toBe(300);
            expect(result.current.discoveredPlanets).toHaveLength(1);
            expect(result.current.currentElement).toBeNull();
            expect(result.current.activeElements).toHaveLength(0);
        });
    });
});
