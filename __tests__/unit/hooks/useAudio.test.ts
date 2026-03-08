import { useAudio } from '@/hooks/useAudio';
import { act, renderHook } from '@testing-library/react-native';
import { Audio } from 'expo-av';

// Mock expo-av
jest.mock('expo-av', () => ({
    Audio: {
        Sound: {
            createAsync: jest.fn(),
        },
    },
}));

describe('useAudio hook', () => {
    let mockPlayAsync: jest.Mock;
    let mockUnloadAsync: jest.Mock;
    let playbackCallback: ((status: any) => void) | null;

    beforeEach(() => {
        mockPlayAsync = jest.fn();
        mockUnloadAsync = jest.fn();
        playbackCallback = null;

        (Audio.Sound.createAsync as jest.Mock).mockResolvedValue({
            sound: {
                playAsync: mockPlayAsync,
                unloadAsync: mockUnloadAsync,
                setOnPlaybackStatusUpdate: jest.fn((cb) => {
                    playbackCallback = cb;
                }),
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('plays success sound', async () => {
        const { result } = renderHook(() => useAudio());

        await act(async () => {
            await result.current.playSuccessSound();
        });

        expect(Audio.Sound.createAsync).toHaveBeenCalledWith(
            require('../../../assets/sounds/success.mp3')
        );
        expect(mockPlayAsync).toHaveBeenCalled();

        act(() => {
            if (playbackCallback) {
                playbackCallback({ isLoaded: true, didJustFinish: true });
            }
        });

        expect(mockUnloadAsync).toHaveBeenCalled();
    });

    it('plays fail sound', async () => {
        const { result } = renderHook(() => useAudio());

        await act(async () => {
            await result.current.playFailSound();
        });

        expect(Audio.Sound.createAsync).toHaveBeenCalledWith(
            require('../../../assets/sounds/fail.mp3')
        );
        expect(mockPlayAsync).toHaveBeenCalled();

        act(() => {
            if (playbackCallback) {
                playbackCallback({ isLoaded: true, didJustFinish: true });
            }
        });

        expect(mockUnloadAsync).toHaveBeenCalled();
    });
});
