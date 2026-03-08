import { useGameStore } from '@/store/useGameStore';
import type { Planet } from '@/types/game';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ArchiveScreen() {
    const router = useRouter();
    const discoveredPlanets = useGameStore((s) => s.discoveredPlanets);

    const renderPlanet = ({ item }: { item: Planet }) => (
        <View style={[styles.planetCard, { borderColor: item.color }]}>
            <View style={[styles.planetOrb, { backgroundColor: item.color }]} />
            <View style={styles.planetInfo}>
                <Text style={styles.planetName}>{item.name}</Text>
                <Text style={styles.planetDesc}>{item.description}</Text>
                <View style={styles.planetMeta}>
                    <Text style={[styles.rarityBadge, styles[`rarity_${item.rarity}` as keyof typeof styles]]}>
                        {item.rarity}
                    </Text>
                    <Text style={styles.planetScore}>+{item.score} pts</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🪐 Planet Archive</Text>
                <Pressable onPress={() => router.back()} style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>← Back</Text>
                </Pressable>
            </View>

            <Text style={styles.count}>
                Discovered: {discoveredPlanets.length} planets
            </Text>

            {discoveredPlanets.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🔭</Text>
                    <Text style={styles.emptyText}>No planets discovered yet.</Text>
                    <Text style={styles.emptyHint}>
                        Combine elements to create new worlds!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={discoveredPlanets}
                    renderItem={renderPlanet}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E1A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#E8E0FF',
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(155, 142, 196, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        color: '#9B8EC4',
        fontSize: 16,
        fontWeight: '600',
    },
    count: {
        fontSize: 13,
        color: '#6B5F8A',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    planetCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 20, 60, 0.5)',
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginBottom: 12,
    },
    planetOrb: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 14,
    },
    planetInfo: {
        flex: 1,
    },
    planetName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E8E0FF',
    },
    planetDesc: {
        fontSize: 12,
        color: '#8B7EB0',
        marginTop: 2,
    },
    planetMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        gap: 8,
    },
    rarityBadge: {
        fontSize: 10,
        fontWeight: '700',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    rarity_common: {
        backgroundColor: 'rgba(100, 200, 150, 0.2)',
        color: '#64C896',
    },
    rarity_rare: {
        backgroundColor: 'rgba(100, 150, 255, 0.2)',
        color: '#6496FF',
    },
    rarity_legendary: {
        backgroundColor: 'rgba(255, 180, 50, 0.2)',
        color: '#FFB432',
    },
    planetScore: {
        fontSize: 12,
        color: '#9B8EC4',
        fontWeight: '600',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#8B7EB0',
    },
    emptyHint: {
        fontSize: 13,
        color: '#6B5F8A',
        marginTop: 6,
    },
});
