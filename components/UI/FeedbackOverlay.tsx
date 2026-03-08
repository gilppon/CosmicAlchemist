import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

interface FeedbackOverlayProps {
    intensity: SharedValue<number>;
}

export function FeedbackOverlay({ intensity }: FeedbackOverlayProps) {
    // Determine overlay color/opacity based on global interaction intensity
    const overlayStyle = useAnimatedStyle(() => {
        // High intensity -> brighter glow hinting at fusion.
        // We can interpolate from transparent to a soft white/purple overlay.
        return {
            backgroundColor: interpolateColor(
                intensity.value,
                [0, 1],
                ['rgba(255, 255, 255, 0)', 'rgba(230, 220, 255, 0.15)']
            ),
        };
    });

    return (
        <Animated.View
            testID="feedback-overlay"
            style={[styles.overlay, overlayStyle]}
            pointerEvents="none" // Pass through all touches to elements
        />
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100, // On top of everything except maybe final modals
    },
});
