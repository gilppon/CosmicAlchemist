import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

export const useComplexGesture = () => {
    const density = useSharedValue(1);
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    const pinch = Gesture.Pinch().onChange((e) => {
        scale.value = e.scale;
        density.value = e.scale; // Simple mapping for now
    });

    const rotate = Gesture.Rotation().onChange((e) => {
        rotation.value = e.rotation;
    });

    // A basic pan gesture
    const pan = Gesture.Pan();

    // Compose all gestures to work simultaneously
    const gesture = Gesture.Simultaneous(pinch, rotate, pan);

    return {
        density,
        rotation,
        scale,
        gesture,
    };
};
