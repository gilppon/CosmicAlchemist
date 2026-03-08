import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

interface CosmicBackgroundProps {
    particleCount?: number;
}

const Star = ({ top, left, size, duration }: { top: number; left: number; size: number; duration: number }) => {
    const opacity = useSharedValue(0.2);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(1, { duration }),
            -1, // infinite
            true // reverse
        );
    }, [duration, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            testID="star-particle"
            style={[
                styles.star,
                { top: `${top}%` as any, left: `${left}%` as any, width: size, height: size, borderRadius: size / 2 },
                animatedStyle,
            ]}
        />
    );
};

export const CosmicBackground = ({ particleCount = 30 }: CosmicBackgroundProps) => {
    // Generate static stars array once to prevent re-renders changing positions
    const [stars] = React.useState(() =>
        Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 2000 + 1000,
        }))
    );

    return (
        <View testID="cosmic-background" style={styles.container}>
            {stars.map((star) => (
                <Star key={star.id} {...star} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#050a1f', // Deep space blue/black
        zIndex: -1,
    },
    star: {
        position: 'absolute',
        backgroundColor: '#ffffff',
    },
});
