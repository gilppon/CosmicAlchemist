import { ElementalOrb } from '@/components/Game/ElementalOrb';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { makeMutable } from 'react-native-reanimated';

// Mock useComplexGesture
jest.mock('@/hooks/useComplexGesture', () => ({
    useComplexGesture: jest.fn(),
}));

import { useComplexGesture } from '@/hooks/useComplexGesture';

describe('ElementalOrb', () => {
    it('renders correctly and reflects animation state', () => {
        const mockDensity = makeMutable(1);
        const mockRotation = makeMutable(0);
        const mockScale = makeMutable(1.5);
        // Use a real gesture object from the library (which is mocked by jestSetup)
        const mockGesture = Gesture.Pan();

        (useComplexGesture as jest.Mock).mockReturnValue({
            density: mockDensity,
            rotation: mockRotation,
            scale: mockScale,
            gesture: mockGesture,
        });

        render(React.createElement(ElementalOrb));

        const orb = screen.getByTestId('elemental-orb');
        expect(orb).toBeDefined();

        const style: any = orb.props.style;
        const flattenedStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;

        const transform = flattenedStyle.transform || [];
        const scaleObj = transform.find((t: any) => t.scale !== undefined);

        expect(scaleObj?.scale).toBe(1.5);
    });
});
