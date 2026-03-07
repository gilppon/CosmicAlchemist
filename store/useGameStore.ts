import type { Element, ElementType, GameState, Planet, Position, Velocity } from '@/types/game';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const INITIAL_GAMEPLAY_STATE = {
    score: 0,
    currentElement: null as Element | null,
    activeElements: [] as Element[],
};

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            // --- Initial State ---
            ...INITIAL_GAMEPLAY_STATE,
            highScore: 0,
            discoveredPlanets: [] as Planet[],

            // --- Element Management ---
            setCurrentElement: (element: Element | null) => {
                set({ currentElement: element });
            },

            addElement: (element: Element) => {
                set((state) => ({
                    activeElements: [...state.activeElements, element],
                }));
            },

            removeElement: (id: string) => {
                set((state) => ({
                    activeElements: state.activeElements.filter((e) => e.id !== id),
                }));
            },

            updateElementDensity: (id: string, density: number) => {
                set((state) => ({
                    activeElements: state.activeElements.map((e) =>
                        e.id === id ? { ...e, density } : e
                    ),
                }));
            },

            updateElementType: (id: string, type: ElementType) => {
                set((state) => ({
                    activeElements: state.activeElements.map((e) =>
                        e.id === id ? { ...e, type } : e
                    ),
                }));
            },

            updateElementPosition: (id: string, position: Position) => {
                set((state) => ({
                    activeElements: state.activeElements.map((e) =>
                        e.id === id ? { ...e, position } : e
                    ),
                }));
            },

            updateElementVelocity: (id: string, velocity: Velocity) => {
                set((state) => ({
                    activeElements: state.activeElements.map((e) =>
                        e.id === id ? { ...e, velocity } : e
                    ),
                }));
            },

            // --- Scoring ---
            addScore: (points: number) => {
                set((state) => {
                    const newScore = state.score + points;
                    return {
                        score: newScore,
                        highScore: Math.max(state.highScore, newScore),
                    };
                });
            },

            // --- Planet Discovery ---
            discoverPlanet: (planet: Planet) => {
                set((state) => {
                    const alreadyDiscovered = state.discoveredPlanets.some(
                        (p) => p.id === planet.id
                    );
                    if (alreadyDiscovered) return state;
                    return {
                        discoveredPlanets: [...state.discoveredPlanets, planet],
                    };
                });
            },

            isPlanetDiscovered: (planetId: string) => {
                return get().discoveredPlanets.some((p) => p.id === planetId);
            },

            // --- Reset ---
            resetGame: () => {
                set((state) => ({
                    ...INITIAL_GAMEPLAY_STATE,
                    highScore: state.highScore,
                    discoveredPlanets: state.discoveredPlanets,
                }));
            },
        }),
        {
            name: 'cosmic-alchemist-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                highScore: state.highScore,
                discoveredPlanets: state.discoveredPlanets,
            }),
        }
    )
);
