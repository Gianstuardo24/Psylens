import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
  RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors } from '../../constants/data';

const PROGRESS_KEY     = 'psylens_progress';
const DAYS_VISITED_KEY = 'psylens_days_visited';

const USER_NAME  = 'Usuario';
const USER_EMAIL = 'usuario@email.com';

type LayerProgress = { surface?: boolean; concept?: boolean; fondo?: boolean };
type ProgressMap   = Record<string, LayerProgress>;

function isComplete(prog: ProgressMap, authorId: string): boolean {
  const p = prog[authorId];
  return !!(p?.surface && p?.concept && p?.fondo);
}

function computeStreak(days: string[]): number {
  let count = 0;
  const d = new Date();
  while (true) {
    const iso = d.toISOString().slice(0, 10);
    if (days.includes(iso)) { count++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return count;
}

// ─── SettingRow ───────────────────────────────────────────────────────────────

type SettingRowProps = {
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  labelColor?: string;
  isLast?: boolean;
};

function SettingRow({
  label,
  value,
  onPress,
  rightElement,
  labelColor,
  isLast,
}: SettingRowProps) {
  const inner = (
    <View style={[sr.row, !isLast && sr.rowBorder]}>
      <Text style={[sr.label, labelColor ? { color: labelColor } : undefined]}>
        {label}
      </Text>

      <View style={sr.right}>
        {rightElement ?? (
          <>
            {value ? <Text style={sr.value}>{value}</Text> : null}
            {onPress ? <Text style={sr.chevron}>›</Text> : null}
          </>
        )}
      </View>
    </View>
  );

  if (!onPress) return inner;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {inner}
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function YoScreen() {
  const insets = useSafeAreaInsets();

  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [daysVisited, setDaysVisited] = useState<string[]>([]);
  const [isDark,        setIsDark]        = useState(true);
  const [language,      setLanguage]      = useState<'Español' | 'English'>('Español');
  const [reminderTime,  setReminderTime]  = useState('9:00');
  const [isPremium]                       = useState(false);
  const [refreshing,    setRefreshing]    = useState(false);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
        AsyncStorage.getItem(DAYS_VISITED_KEY).catch(() => null),
      ]).then(([rawProg, rawDays]) => {
        if (rawProg) setProgress(JSON.parse(rawProg));
        if (rawDays) setDaysVisited(JSON.parse(rawDays));
      });
    }, []),
  );

  const completedAuthors = authors.filter(a => isComplete(progress, a.id)).length;
  const layersRead = Object.values(progress).reduce((sum, p) => (
    sum + (p.surface ? 1 : 0) + (p.concept ? 1 : 0) + (p.fondo ? 1 : 0)
  ), 0);
  const streak = computeStreak(daysVisited);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }

  function handleLanguage() {
    Alert.alert('Idioma', undefined, [
      {
        text: `Español${language === 'Español' ? '  ✓' : ''}`,
        onPress: () => setLanguage('Español'),
      },
      {
        text: `English${language === 'English' ? '  ✓' : ''}  (próximamente)`,
        onPress: () => {},
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  }

  function handleReminder() {
    Alert.alert(
      'Recordatorio diario',
      `Actualmente configurado a las ${reminderTime} AM.\n\nEl selector de hora estará disponible en la próxima versión.`,
      [{ text: 'Entendido' }],
    );
  }

  function handleSubscription() {
    Alert.alert(
      'Suscripción',
      'Tienes el plan Gratuito. Desbloquea todos los bloques y autores con Premium.',
      [
        { text: 'Ver planes' },
        { text: 'Ahora no', style: 'cancel' },
      ],
    );
  }

  function handleSignOut() {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => router.replace('/onboarding'),
        },
      ],
    );
  }

  function handleDeleteAccount() {
    Alert.alert(
      'Eliminar cuenta',
      'Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar cuenta', style: 'destructive', onPress: () => {} },
      ],
    );
  }

  function handleResetProgress() {
    Alert.alert(
      'Resetear progreso',
      '¿Seguro que quieres borrar todo tu progreso? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              'psylens_progress',
              'psylens_streak',
              'psylens_last_active',
              'psylens_onboarding_done',
              'psylens_concepts',
              'psylens_is_premium',
              'psylens_unlocked',
              'psylens_days_visited',
            ]).catch(() => {});
            router.replace('/splash');
          },
        },
      ],
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.dark.bg }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.dark.text3}
        />
      }
    >

      {/* ── Avatar section ─────────────────────────────── */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>
            {USER_NAME[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.userName}>{USER_NAME}</Text>
        <Text style={styles.userEmail}>{USER_EMAIL}</Text>
      </View>

      {/* ── Stats ──────────────────────────────────────── */}
      <Text style={styles.sectionLabel}>Estadísticas</Text>
      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>{'días de\nracha'}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{completedAuthors}</Text>
          <Text style={styles.statLabel}>{'autores\ncompletados'}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{layersRead}</Text>
          <Text style={styles.statLabel}>{'capas\nleídas'}</Text>
        </View>
      </View>

      {/* ── Settings ───────────────────────────────────── */}
      <Text style={styles.sectionLabel}>Ajustes</Text>
      <View style={styles.card}>

        <SettingRow
          label="Modo oscuro"
          rightElement={
            <Switch
              value={isDark}
              onValueChange={setIsDark}
              trackColor={{
                false: colors.dark.bg3,
                true:  colors.dark.green,
              }}
              thumbColor={
                Platform.OS === 'android'
                  ? isDark ? colors.dark.text : colors.dark.text3
                  : undefined
              }
              ios_backgroundColor={colors.dark.bg3}
            />
          }
        />

        <SettingRow
          label="Idioma"
          value={language}
          onPress={handleLanguage}
        />

        <SettingRow
          label="Recordatorio diario"
          value={`${reminderTime} AM`}
          onPress={handleReminder}
        />

        <SettingRow
          label="Suscripción"
          value={isPremium ? 'Premium' : 'Gratuita'}
          onPress={handleSubscription}
          isLast
        />

      </View>

      {/* ── Account ────────────────────────────────────── */}
      <Text style={styles.sectionLabel}>Cuenta</Text>
      <View style={styles.card}>

        <SettingRow
          label="Cerrar sesión"
          labelColor={colors.dark.text2}
          onPress={handleSignOut}
        />

        <SettingRow
          label="Resetear progreso"
          labelColor={colors.dark.coral}
          onPress={handleResetProgress}
        />

        <SettingRow
          label="Eliminar cuenta"
          labelColor={colors.dark.coral}
          onPress={handleDeleteAccount}
          isLast
        />

      </View>

      {/* Version note */}
      <Text style={styles.versionText}>Psylens v1.0</Text>

    </ScrollView>
  );
}

// ─── SettingRow styles ────────────────────────────────────────────────────────

const sr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  label: {
    ...typography.body,
    color: colors.dark.text,
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  value: {
    ...typography.bodyS,
    color: colors.dark.text3,
  },
  chevron: {
    ...typography.h3,
    color: colors.dark.text3,
    lineHeight: 24,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },

  // ── Avatar section
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.dark.purpleBg,
    borderWidth: 1.5,
    borderColor: colors.dark.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarInitial: {
    ...typography.h1,
    color: colors.dark.purple,
  },
  userName: {
    ...typography.h2,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.bodyS,
    color: colors.dark.text3,
  },

  // ── Section label (shared)
  sectionLabel: {
    ...typography.label,
    color: colors.dark.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },

  // ── Stats card
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.dark.border,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.dark.border,
    marginVertical: spacing.lg,
  },
  statValue: {
    ...typography.h2,
    color: colors.dark.text,
  },
  statLabel: {
    ...typography.bodyXS,
    color: colors.dark.text3,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 16,
  },

  // ── Settings / account card
  card: {
    backgroundColor: colors.dark.bg2,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.dark.border,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },

  // ── Version note
  versionText: {
    ...typography.bodyXS,
    color: colors.dark.text3,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
