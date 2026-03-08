import { render } from '@testing-library/react-native';
import React from 'react';
import { CosmicBackground } from '../../../../components/UI/CosmicBackground';

describe('CosmicBackground', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(<CosmicBackground />);
        expect(getByTestId('cosmic-background')).toBeTruthy();
    });

    it('contains multiple star particle elements', () => {
        const { getAllByTestId } = render(<CosmicBackground particleCount={10} />);
        const stars = getAllByTestId('star-particle');
        expect(stars.length).toBe(10);
    });
});
