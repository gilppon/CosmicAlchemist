import { renderHook } from '@testing-library/react-native';
import { useComplexGesture } from '../../../hooks/useComplexGesture';

describe('useComplexGesture', () => {
    it('initializes shared values correctly (Pinch -> scale/density, Rotation -> rotation)', () => {
        const { result } = renderHook(() => useComplexGesture());

        // RED: We expect these to fail initially because the hook returns dummy values
        expect(result.current.density.value).toBe(1);
        expect(result.current.rotation.value).toBe(0);
        expect(result.current.scale.value).toBe(1);
        expect(result.current.gesture).toBeDefined();
    });
});
