import { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,

} from 'react-native';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';

type Theme = typeof colors.dark;

const { width: SW, height: SH } = Dimensions.get('window');

const SYMBOL_MAP: Record<string, string> = {
  eye:     '◎',
  atom:    '⊛',
  spiral:  '◉',
  circles: '○',
  diamond: '◆',
  network: '⊕',
};

// ── Particles ─────────────────────────────────────────────────────────────────

// green and purple are identical in dark and light themes
const PALETTE = [
  colors.dark.green, colors.dark.green, colors.dark.green,
  colors.dark.purple, colors.dark.purple,
];

type Particle = {
  x: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  y: Animated.Value;
  opacity: Animated.Value;
};

function makeParticles(n: number): Particle[] {
  return Array.from({ length: n }, () => ({
    x:        Math.random() * SW,
    size:     3 + Math.random() * 5,
    color:    PALETTE[Math.floor(Math.random() * PALETTE.length)],
    duration: 2200 + Math.random() * 1800,
    delay:    Math.random() * 2400,
    y:        new Animated.Value(0),
    opacity:  new Animated.Value(0),
  }));
}

function ParticleField({ active }: { active: boolean }) {
  const particles = useRef<Particle[]>(makeParticles(20)).current;
  const cancelled = useRef(false);

  useEffect(() => {
    if (!active) return;
    cancelled.current = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function run(p: Particle) {
      if (cancelled.current) return;
      p.y.setValue(0);
      p.opacity.setValue(0);
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: -(SH * 0.75),
          duration: p.duration,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(p.opacity, {
            toValue: 0.85,
            duration: p.duration * 0.15,
            useNativeDriver: true,
          }),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: p.duration * 0.85,
            useNativeDriver: true,
          }),
        ]),
      ]).start(({ finished }) => {
        if (finished && !cancelled.current) run(p);
      });
    }

    particles.forEach(p => {
      const t = setTimeout(() => run(p), p.delay);
      timers.push(t);
    });

    return () => {
      cancelled.current = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: p.x,
            width: p.size,
            height: p.size,
            borderRadius: p.size / 2,
            backgroundColor: p.color,
            opacity: p.opacity,
            transform: [{ translateY: p.y }],
          }}
        />
      ))}
    </View>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

export type BlockData = {
  id: string;
  name: string;
  symbol: string;
};

interface Props {
  visible: boolean;
  block: BlockData;
  nextBlock: BlockData | null;
  nextBlockNumber: number | null;   // 1-based display index of the next block
  authorsCount: number;
  conceptsCount: number;
  daysTaken: number;
  onContinue: () => void;           // "Continuar al Bloque N+1"
  onViewSummary: () => void;        // "Ver resumen" / dismiss
}

export function BlockCompleteModal({
  visible,
  block,
  nextBlock,
  nextBlockNumber,
  authorsCount,
  conceptsCount,
  daysTaken,
  onContinue,
  onViewSummary,
}: Props) {
  const { theme } = useTheme();
  const cardScale   = useRef(new Animated.Value(0.88)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  const styles = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    if (visible) {
      cardScale.setValue(0.88);
      cardOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(cardScale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 16,
          stiffness: 200,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const glyph = SYMBOL_MAP[block.symbol] ?? block.symbol[0]?.toUpperCase() ?? '◎';

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="none">
      <View style={styles.overlay}>
        <ParticleField active={visible} />

        <Animated.View
          style={[
            styles.card,
            { opacity: cardOpacity, transform: [{ scale: cardScale }] },
          ]}
        >
          {/* Block icon 64px */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconGlyph}>{glyph}</Text>
          </View>

          {/* "Bloque completado" */}
          <Text style={styles.completedLabel}>Bloque completado</Text>

          {/* Block name in serif h1 */}
          <Text style={styles.blockName}>{block.name}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{authorsCount}</Text>
              <Text style={styles.statLabel}>autores</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{conceptsCount}</Text>
              <Text style={styles.statLabel}>conceptos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{daysTaken}</Text>
              <Text style={styles.statLabel}>{daysTaken === 1 ? 'día' : 'días'}</Text>
            </View>
          </View>

          {/* "Siguiente bloque" hint */}
          {nextBlock && (
            <Text style={styles.nextHint}>
              Siguiente bloque: {nextBlock.name}
            </Text>
          )}

          {/* Primary CTA */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={nextBlock ? onContinue : onViewSummary}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>
              {nextBlock
                ? `Continuar al Bloque ${nextBlockNumber}`
                : 'Ver resumen'}
            </Text>
          </TouchableOpacity>

          {/* Secondary CTA — only when there is a next block */}
          {nextBlock && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onViewSummary}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Ver resumen</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.bg,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xxl,
    },
    card: {
      width: '100%',
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      paddingVertical: spacing.xxxl,
      paddingHorizontal: spacing.xxl,
    },

    // Icon
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.greenBg,
      borderWidth: 2,
      borderColor: theme.green,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xl,
    },
    iconGlyph: {
      fontSize: 32,
      lineHeight: 40,
      color: theme.green,
    },

    // Labels
    completedLabel: {
      ...typography.label,
      color: theme.green,
      textTransform: 'uppercase',
      letterSpacing: 1.4,
      marginBottom: spacing.sm,
    },
    blockName: {
      fontFamily: 'PlayfairDisplay_700Bold',
      fontSize: typography.h1.fontSize,
      lineHeight: typography.h1.lineHeight,
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.xxl,
    },

    // Stats
    statsRow: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      marginBottom: spacing.xl,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.border,
      marginVertical: spacing.xs,
    },
    statValue: {
      ...typography.h3,
      color: theme.text,
      marginBottom: spacing.xs,
    },
    statLabel: {
      ...typography.bodyXS,
      color: theme.text3,
    },

    // Next block hint
    nextHint: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
      marginBottom: spacing.xxl,
    },

    // Buttons
    primaryButton: {
      width: '100%',
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    primaryButtonText: {
      ...typography.body,
      color: theme.text,
      fontWeight: '600',
    },
    secondaryButton: {
      width: '100%',
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    secondaryButtonText: {
      ...typography.body,
      color: theme.text2,
    },
  });
}
