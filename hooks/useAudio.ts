import { Audio } from 'expo-av';
import { useCallback } from 'react';

export const useAudio = () => {
    const playSuccessSound = useCallback(async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/success.mp3')
            );
            await sound.playAsync();

            // 재생 완료 후 메모리 해제
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.error('Failed to play success sound', error);
        }
    }, []);

    const playFailSound = useCallback(async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/fail.mp3')
            );
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.error('Failed to play fail sound', error);
        }
    }, []);

    return {
        playSuccessSound,
        playFailSound,
    };
};
