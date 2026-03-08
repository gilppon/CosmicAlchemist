import { useAudio } from '@/hooks/useAudio';
import { useGameStore } from '@/store/useGameStore';
import { calculateScore, matchRecipe } from '@/utils/recipeLogic';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function TargetZone() {
    const activeElements = useGameStore(state => state.activeElements);
    const removeElement = useGameStore(state => state.removeElement);
    const addScore = useGameStore(state => state.addScore);
    const discoverPlanet = useGameStore(state => state.discoverPlanet);

    const { playSuccessSound, playFailSound } = useAudio();

    const hasActiveElements = activeElements.length > 0;

    useEffect(() => {
        // MVP: 2개의 원소가 존재할 때 자동으로 합성을 시도합니다.
        if (activeElements.length >= 2) {
            const el1 = activeElements[0];
            const el2 = activeElements[1];

            // 두 원소의 밀도 평균 계산
            const averageDensity = (el1.density + el2.density) / 2;

            // 합성 시도
            const resultPlanet = matchRecipe(el1.type, el2.type, averageDensity);

            if (resultPlanet) {
                // 성공: 사운드 재생, 인벤토리에 추가, 점수 부여, 기존 원소 제거
                playSuccessSound();
                discoverPlanet(resultPlanet);
                const score = calculateScore(resultPlanet.rarity);
                addScore(score);
            } else {
                // 실패: 사운드 재생, 기존 원소 제거 (또는 초기 위치로 되돌리기 등 가능하나 MVP 단에선 초기화)
                playFailSound();
            }
            // 조합에 사용된 원소 제거
            removeElement(el1.id);
            removeElement(el2.id);
        }
    }, [activeElements, removeElement, discoverPlanet, addScore, playSuccessSound, playFailSound]);

    return (
        <View style={styles.container}>
            <View style={[styles.zone, hasActiveElements && styles.zoneActive]}>
                <Text style={styles.text}>
                    {hasActiveElements ? 'Fusion Initiated...' : 'Synthesize Elements Here'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 0, // Behind the orbs
    },
    zone: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    zoneActive: {
        borderColor: 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        letterSpacing: 2,
        textTransform: 'uppercase',
    }
});
