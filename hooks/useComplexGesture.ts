import { GESTURE_CONFIG } from '@/constants/gestures';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

/**
 * useComplexGesture Hook
 * Manages simultaneous multi-touch gestures and maps them to reactive shared values.
 */
export const useComplexGesture = () => {
    // Shared values for physics and animation
    const density = useSharedValue(1);
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    // Initial values for relative calculation
    const startScale = useSharedValue(1);
    const startRotation = useSharedValue(0);

    // 1. Pinch Gesture -> Scale & Density
    const pinch = Gesture.Pinch()
        .onStart(() => {
            startScale.value = scale.value;
        })
        .onChange((e) => {
            const rawScale = startScale.value * e.scale;
            // Clamp density within defined limits
            scale.value = Math.max(0.5, Math.min(rawScale, GESTURE_CONFIG.MAX_DENSITY));
            density.value = scale.value;
        });

    // 2. Rotation Gesture -> Rotation & Element Type
    const rotate = Gesture.Rotation()
        .onStart(() => {
            startRotation.value = rotation.value;
        })
        .onChange((e) => {
            rotation.value = startRotation.value + e.rotation;
        });

    // 3. Pan Gesture -> Future Position/Physics
    const pan = Gesture.Pan()
        .onUpdate((e) => {
            // Placeholder for velocity-based physics in Phase 3
        });

    // Compose gestures to work together
    const gesture = Gesture.Simultaneous(pinch, rotate, pan);

    return {
        density,
        rotation,
        scale,
        gesture,
    };
};
