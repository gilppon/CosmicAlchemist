import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GameScreen() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cosmic Alchemist</Text>
                    <Text style={styles.subtitle}>✨ Touch, Mix, Create Worlds</Text>
                </View>

                {/* Game Canvas Area — Phase 2에서 ElementalOrb 배치 */}
                <View style={styles.gameCanvas}>
                    <Text style={styles.placeholder}>🌌 Game Canvas</Text>
                    <Text style={styles.hint}>Phase 2: Gesture + Animation</Text>
                </View>

                {/* Thumb Zone Bottom UI — Phase 4에서 완성 */}
                <View style={styles.thumbZone}>
                    <Text style={styles.thumbText}>🎮 Thumb Zone</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E1A',
    },
    header: {
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
    gameCanvas: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(155, 142, 196, 0.2)',
        backgroundColor: 'rgba(10, 14, 26, 0.8)',
    },
    placeholder: {
        fontSize: 40,
    },
    hint: {
        fontSize: 12,
        color: '#6B5F8A',
        marginTop: 8,
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
