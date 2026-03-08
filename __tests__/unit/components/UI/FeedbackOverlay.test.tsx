import { FeedbackOverlay } from '@/components/UI/FeedbackOverlay';
import { render } from '@testing-library/react-native';
import React from 'react';
import { useSharedValue } from 'react-native-reanimated';

// Helper component to pass shared values in tests
const TestWrapper = () => {
    const intensity = useSharedValue(0.5);
    return <FeedbackOverlay intensity={ intensity } />;
};

describe('FeedbackOverlay', () => {
    it('renders the overlay container', () => {
        const { getByTestId } = render(<TestWrapper />);
        const overlay = getByTestId('feedback-overlay');
        expect(overlay).toBeDefined();
    });
});
