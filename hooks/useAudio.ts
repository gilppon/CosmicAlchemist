import { Audio } from 'expo-av';
import { useCallback, useEffect, useState } from 'react';

export const useAudio = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    const playSound = async (type: 'success' | 'fail') => {
        try {
            const soundFile = type === 'success'
                ? require('../assets/sounds/success.mp3')
                : require('../assets/sounds/fail.mp3');

            const { sound: playbackObject } = await Audio.Sound.createAsync(
                soundFile,
                { shouldPlay: true }
            );

            playbackObject.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    playbackObject.unloadAsync().catch(() => { });
                }
            });

            setSound(playbackObject);
        } catch (error) {
            console.warn(`[useAudio] Playback failed for ${type}:`, error);
        }
    };

    const playSuccessSound = useCallback(() => playSound('success'), []);
    const playFailSound = useCallback(() => playSound('fail'), []);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync().catch(() => { });
            }
        };
    }, [sound]);

    return {
        playSuccessSound,
        playFailSound,
    };
};
