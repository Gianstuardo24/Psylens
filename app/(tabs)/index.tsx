import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors, blocks } from '../../constants/data';

// ─── Mock state (replaced by ProgressContext in a later step) ────────────────

const DAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const STREAK: boolean[] = [true, true, true, false, false, false, false];

const activeAuthor  = authors[0];
const activeBlock   = blocks[0];
const completedCount = 0;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Buenos días';
  if (h >= 12 && h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StreakBar() {
  return (
    <View style={sb.row}>
      {DAYS.map((day, i) => (
        <View key={day} style={[sb.chip, STREAK[i] && sb.chipDone]}>
          <Text style={[sb.label, STREAK[i] && sb.labelDone]}>{day}</Text>
        </View>
      ))}
    </View>
  );
}

function ActiveAuthorCard({ author }: { author: typeof authors[0] }) {
  return (
    <TouchableOpacity
      style={ac.card}
      onPress={() => router.push(`/autor/${author.id}`)}
      activeOpacity={0.8}
    >
      {/* Left column — portrait */}
      <View style={ac.leftCol}>
        <View style={ac.portrait}>
          <Text style={ac.initial}>{author.name[0]}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={ac.info}>
        <Text style={ac.name} numberOfLines={1}>{author.name}</Text>
        <Text style={ac.subtitle} numberOfLines={2}>{author.subtitle}</Text>
        <Text style={ac.dates}>{author.dates}</Text>
      </View>

      {/* Active badge */}
      <View style={ac.badge}>
        <Text style={ac.badgeText}>Activo</Text>
      </View>
    </TouchableOpacity>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackWidth === 0) return;
    Animated.timing(anim, {
      toValue: progress * trackWidth,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress, trackWidth]);

  return (
    <View
      style={pb.track}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[pb.fill, { width: anim }]} />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const progress = completedCount / activeBlock.authors.length;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
    >

      {/* Header ─ wordmark centered, greeting below */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>Psylens</Text>
        <Text style={styles.greeting}>{getGreeting()}</Text>
      </View>

      {/* Racha */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Racha</Text>
        <StreakBar />
      </View>

      {/* Continuar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Continuar</Text>
        <ActiveAuthorCard author={activeAuthor} />
      </View>

      {/* Tu progreso */}
      <View style={styles.section}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Tu progreso</Text>
          <Text style={styles.progressCount}>
            {completedCount} de {activeBlock.authors.length}
          </Text>
        </View>
        <Text style={styles.blockName}>{activeBlock.name}</Text>
        <ProgressBar progress={progress} />
      </View>

      {/* Acceso rápido */}
      <View style={styles.quickRow}>
        <TouchableOpacity
          style={styles.quickChip}
          onPress={() => router.push('/(tabs)/glosario')}
          activeOpacity={0.8}
        >
          <Text style={styles.quickChipText}>Glosario →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickChip}
          onPress={() => router.push('/(tabs)/camino')}
          activeOpacity={0.8}
        >
          <Text style={styles.quickChipText}>Camino →</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

// ─── StreakBar styles ─────────────────────────────────────────────────────────

const sb = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chip: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.dark.bg3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipDone: {
    backgroundColor: colors.dark.greenBg,
  },
  label: {
    ...typography.label,
    color: colors.dark.text3,
  },
  labelDone: {
    color: colors.dark.green,
  },
});

// ─── AuthorCard styles ────────────────────────────────────────────────────────

const ac = StyleSheet.create({
  card: {
    height: 110,
    borderRadius: radius.xl,         // 16px
    backgroundColor: colors.dark.bg2,
    borderWidth: 1.5,
    borderColor: colors.dark.purple,  // active state border
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: colors.dark.purple,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  leftCol: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portrait: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dark.bg3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    ...typography.h3,
    color: colors.dark.text2,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  name: {
    ...typography.bodyS,
    color: colors.dark.text,
    fontWeight: '600',
  },
  subtitle: {
    ...typography.bodyXS,
    color: colors.dark.text2,
  },
  dates: {
    ...typography.bodyXS,
    color: colors.dark.text3,
  },
  badge: {
    marginRight: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.dark.purpleBg,
  },
  badgeText: {
    ...typography.label,
    color: colors.dark.purple,
  },
});

// ─── ProgressBar styles ───────────────────────────────────────────────────────

const pb = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.dark.bg3,
    overflow: 'hidden',
    marginTop: spacing.md,
  },
  fill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.dark.green,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.dark.bg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  wordmark: {
    ...typography.h3,
    color: colors.dark.text,
  },
  greeting: {
    ...typography.bodyS,
    color: colors.dark.text2,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.dark.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.dark.text,
    marginBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  progressCount: {
    ...typography.bodyS,
    color: colors.dark.text3,
  },
  blockName: {
    ...typography.bodyXS,
    color: colors.dark.text2,
    marginTop: -spacing.sm,
    marginBottom: spacing.xs,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickChip: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.dark.bg2,
    borderWidth: 1,
    borderColor: colors.dark.border,
    alignItems: 'center',
  },
  quickChipText: {
    ...typography.bodyS,
    color: colors.dark.text2,
  },
});
