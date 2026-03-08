import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ElementalOrb } from '../components/Game/ElementalOrb';
import { TargetZone } from '../components/Game/TargetZone';
import { CosmicBackground } from '../components/UI/CosmicBackground';
import { FeedbackOverlay } from '../components/UI/FeedbackOverlay';
import { useGameStore } from '../store/useGameStore';

export default function GameScreen() {
    const { score, activeElements, addElement } = useGameStore();
    const interactionIntensity = useSharedValue(0);

    // MVP: Initial elements spawning (only once)
    const hasSpawned = React.useRef(false);
    useEffect(() => {
        if (!hasSpawned.current && activeElements.length === 0) {
            hasSpawned.current = true;
            addElement({
                id: 'e_water_1', type: 'water', mass: 1, density: 1,
                velocity: { vx: 0, vy: 0 }, position: { x: 100, y: 200 }
            });
            addElement({
                id: 'e_fire_1', type: 'fire', mass: 1, density: 1,
                velocity: { vx: 0, vy: 0 }, position: { x: 250, y: 200 }
            });
            addElement({
                id: 'e_earth_1', type: 'earth', mass: 1, density: 1,
                velocity: { vx: 0, vy: 0 }, position: { x: 100, y: 350 }
            });
            addElement({
                id: 'e_air_1', type: 'air', mass: 1, density: 1,
                velocity: { vx: 0, vy: 0 }, position: { x: 250, y: 350 }
            });
        }
    }, [activeElements.length, addElement]);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
            <CosmicBackground particleCount={40} />
            <FeedbackOverlay intensity={interactionIntensity} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Cosmic Alchemist</Text>
                        <Text style={styles.subtitle}>✨ Touch, Mix, Create Worlds</Text>
                    </View>
                    <Link href="/archive" asChild>
                        <TouchableOpacity style={styles.archiveBtn}>
                            <Text style={styles.archiveText}>Archive</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Game Canvas Area */}
                <View style={styles.gameCanvas}>
                    <TargetZone />
                    {activeElements.map((element) => (
                        <ElementalOrb key={element.id} element={element} />
                    ))}
                    <Text style={styles.scoreText}>Score: {score}</Text>
                </View>

                {/* Thumb Zone Bottom UI */}
                <View style={styles.thumbZone}>
                    <Text style={styles.thumbText}>🎮 Drag elements to the center to combine them!</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#E8E0FF',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 13,
        color: '#9B8EC4',
        marginTop: 2,
    },
    archiveBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(155, 142, 196, 0.2)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(155, 142, 196, 0.4)',
    },
    archiveText: {
        color: '#E8E0FF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    gameCanvas: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(155, 142, 196, 0.2)',
        backgroundColor: 'rgba(10, 14, 26, 0.8)',
        position: 'relative',
        overflow: 'hidden',
    },
    scoreText: {
        position: 'absolute',
        top: 20,
        right: 20,
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 215, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    thumbZone: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 20, 60, 0.6)',
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(155, 142, 196, 0.15)',
    },
    thumbText: {
        fontSize: 14,
        color: '#7B6FA0',
    },
});
