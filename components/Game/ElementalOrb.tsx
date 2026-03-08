import { GESTURE_CONFIG, TYPE_COLORS } from '@/constants/gestures';
import { useComplexGesture } from '@/hooks/useComplexGesture';
import { Element } from '@/types/game';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

interface ElementalOrbProps {
    element?: Element;
}

/**
 * ElementalOrb Component
 * Handles visual representation of the alchemical orb with gesture-driven animations.
 */
export function ElementalOrb({ element }: ElementalOrbProps) {
    const { density, rotation, scale, gesture } = useComplexGesture();

    const elementType = element?.type || 'fire';

    const animatedStyle = useAnimatedStyle(() => {
        // Current element color
        const baseColor = TYPE_COLORS[elementType as keyof typeof TYPE_COLORS] || TYPE_COLORS.fire;

        // Calculate glow intensity based on density
        const glowOpacity = (density.value - GESTURE_CONFIG.MIN_DENSITY) /
            (GESTURE_CONFIG.MAX_DENSITY - GESTURE_CONFIG.MIN_DENSITY) *
            GESTURE_CONFIG.GLOW_INTENSITY_MULTIPLIER;

        return {
            transform: [
                { scale: withSpring(scale.value, GESTURE_CONFIG.SPRING_CONFIG) },
                { rotate: `${rotation.value}rad` },
            ],
            backgroundColor: baseColor,
            // Visual feedback for density/pressure
            shadowColor: baseColor,
            shadowOpacity: Math.min(0.8, 0.4 + glowOpacity),
            shadowRadius: 25 * scale.value,
            // Simple border to define shape
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.4)',
            elevation: 15,
        };
    });

    return (
        <View style={styles.container}>
            <GestureDetector gesture={gesture}>
                <Animated.View
                    testID="elemental-orb"
                    style={[styles.orb, animatedStyle]}
                />
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orb: {
        width: GESTURE_CONFIG.DEFAULT_ORB_SIZE,
        height: GESTURE_CONFIG.DEFAULT_ORB_SIZE,
        borderRadius: GESTURE_CONFIG.DEFAULT_ORB_SIZE / 2,
    },
});
