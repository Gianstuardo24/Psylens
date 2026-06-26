import { useState, useCallback, useMemo } from 'react';
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
import * as Notifications from 'expo-notifications';
import { colors } from '../../constants/colors';
import { typography, spacing, radius } from '../../constants/typography';
import { authors } from '../../constants/data';
import { useTheme } from '../../hooks/useTheme';

type Theme = typeof colors.dark;

const PROGRESS_KEY     = 'psylens_progress';
const DAYS_VISITED_KEY = 'psylens_days_visited';
const NAME_KEY         = 'psylens_user_name';
const REMINDER_KEY     = 'psylens_reminder_enabled';
const ONBOARDING_KEY   = 'psylens_onboarding_done';

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
  theme: Theme;
};

function SettingRow({
  label,
  value,
  onPress,
  rightElement,
  labelColor,
  isLast,
  theme,
}: SettingRowProps) {
  const sr = useMemo(() => makeSrStyles(theme), [theme]);

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
  const { theme, isDark, toggleTheme } = useTheme();

  const [progress,    setProgress]    = useState<ProgressMap>({});
  const [daysVisited, setDaysVisited] = useState<string[]>([]);
  const [userName,    setUserName]    = useState('');
  const [language,         setLanguage]         = useState<'Español' | 'English'>('Español');
  const [reminderEnabled,  setReminderEnabled]  = useState(false);
  const [isPremium]                             = useState(false);
  const [refreshing,    setRefreshing]    = useState(false);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem(PROGRESS_KEY).catch(() => null),
        AsyncStorage.getItem(DAYS_VISITED_KEY).catch(() => null),
        AsyncStorage.getItem(NAME_KEY).catch(() => null),
        AsyncStorage.getItem(REMINDER_KEY).catch(() => null),
      ]).then(([rawProg, rawDays, rawName, rawReminder]) => {
        if (rawProg) setProgress(JSON.parse(rawProg));
        if (rawDays) setDaysVisited(JSON.parse(rawDays));
        setUserName(rawName ?? '');
        setReminderEnabled(rawReminder === 'true');
      });
    }, []),
  );

  const completedAuthors = authors.filter(a => isComplete(progress, a.id)).length;
  const layersRead = Object.values(progress).reduce((sum, p) => (
    sum + (p.surface ? 1 : 0) + (p.concept ? 1 : 0) + (p.fondo ? 1 : 0)
  ), 0);
  const streak = computeStreak(daysVisited);

  const styles = useMemo(() => makeStyles(theme), [theme]);

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

  async function handleReminderToggle(value: boolean) {
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Activa las notificaciones en los ajustes de tu dispositivo para recibir recordatorios.',
          [{ text: 'Entendido' }],
        );
        return;
      }
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('psylens-reminder', {
          name: 'Recordatorio diario',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Psylens',
          body: 'Tu momento de hoy te espera.',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: 9,
          minute: 0,
        },
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    setReminderEnabled(value);
    await AsyncStorage.setItem(REMINDER_KEY, String(value)).catch(() => {});
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
          onPress: async () => {
            await AsyncStorage.removeItem(ONBOARDING_KEY).catch(() => {});
            router.replace('/onboarding');
          },
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
        {
          text: 'Eliminar cuenta',
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
              'psylens_user_name',
              'psylens_saved_quotes',
            ]).catch(() => {});
            const allKeys = await AsyncStorage.getAllKeys();
            const journalKeys = allKeys.filter(k => k.startsWith('psylens_journal_'));
            if (journalKeys.length > 0) {
              await AsyncStorage.multiRemove(journalKeys);
            }
            router.replace('/splash');
          },
        },
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
              'psylens_saved_quotes',
              'psylens_theme',
            ]).catch(() => {});
            const allKeys = await AsyncStorage.getAllKeys();
            const journalKeys = allKeys.filter(k => k.startsWith('psylens_journal_'));
            if (journalKeys.length > 0) {
              await AsyncStorage.multiRemove(journalKeys);
            }
            router.replace('/splash');
          },
        },
      ],
    );
  }

  function handleForceReturningType(type: number) {
    AsyncStorage.multiRemove(['psylens_returning_last_shown']).catch(() => {});
    AsyncStorage.setItem('psylens_returning_debug_force', String(type)).catch(() => {});
    router.replace('/splash');
  }

  async function handleCompleteUntilAvicena() {
    const rawProgress = await AsyncStorage.getItem(PROGRESS_KEY).catch(() => null);
    const prog: ProgressMap = rawProgress ? JSON.parse(rawProgress) : {};
    const ids = ['intro-1', 'intro-2', 'intro-3', 'intro-4',
                 'heraclito-democrito', 'hipocrates', 'platon', 'aristoteles', 'helenisticas', 'avicena'];
    for (const id of ids) {
      prog[id] = { surface: true, concept: true, fondo: true };
    }
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(prog)).catch(() => {});
    const unlockedIds = ['intro-2', 'intro-3', 'intro-4', 'rev-0a', 'heraclito-democrito', 'hipocrates', 'platon', 'rev-0b', 'aristoteles', 'helenisticas', 'avicena'];
    await AsyncStorage.setItem('psylens_unlocked', JSON.stringify(unlockedIds)).catch(() => {});
    router.replace('/splash');
  }

  async function handleResetDarwinProgress() {
    const rawProgress = await AsyncStorage.getItem(PROGRESS_KEY).catch(() => null);
    if (rawProgress) {
      const prog: ProgressMap = JSON.parse(rawProgress);
      delete prog['darwin'];
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(prog)).catch(() => {});
    }

    const rawQuotes = await AsyncStorage.getItem('psylens_saved_quotes').catch(() => null);
    if (rawQuotes) {
      const quotes: { authorId: string }[] = JSON.parse(rawQuotes);
      const filtered = quotes.filter(q => q.authorId !== 'darwin');
      await AsyncStorage.setItem('psylens_saved_quotes', JSON.stringify(filtered)).catch(() => {});
    }

    await AsyncStorage.multiRemove([
      'psylens_journal_darwin',
      'psylens_quiz_step_darwin',
      'psylens_quiz_open_darwin',
    ]).catch(() => {});

    router.push('/autor/darwin');
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.bg }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.text3}
        />
      }
    >

      {/* ── Avatar section ─────────────────────────────── */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>
            {(userName || 'Explorador')[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.userName}>{userName || 'Explorador'}</Text>
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
          theme={theme}
          label="Modo oscuro"
          rightElement={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: theme.bg3,
                true:  theme.green,
              }}
              thumbColor={
                Platform.OS === 'android'
                  ? isDark ? theme.text : theme.text3
                  : undefined
              }
              ios_backgroundColor={theme.bg3}
            />
          }
        />

        <SettingRow
          theme={theme}
          label="Idioma"
          value={language}
          onPress={handleLanguage}
        />

        <SettingRow
          theme={theme}
          label="Recordatorio diario"
          rightElement={
            <Switch
              value={reminderEnabled}
              onValueChange={handleReminderToggle}
              trackColor={{
                false: theme.bg3,
                true:  theme.green,
              }}
              thumbColor={
                Platform.OS === 'android'
                  ? reminderEnabled ? theme.text : theme.text3
                  : undefined
              }
              ios_backgroundColor={theme.bg3}
            />
          }
        />

        <SettingRow
          theme={theme}
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
          theme={theme}
          label="Cerrar sesión"
          labelColor={theme.text2}
          onPress={handleSignOut}
        />

        <SettingRow
          theme={theme}
          label="Resetear progreso"
          labelColor={theme.coral}
          onPress={handleResetProgress}
        />

        {__DEV__ && (
          <>
            <SettingRow
              theme={theme}
              label="Debug: Racha"
              labelColor={theme.text2}
              onPress={() => handleForceReturningType(1)}
            />
            <SettingRow
              theme={theme}
              label="Debug: Frase de un autor"
              labelColor={theme.text2}
              onPress={() => handleForceReturningType(2)}
            />
            <SettingRow
              theme={theme}
              label="Debug: Tu recorrido (frases guardadas)"
              labelColor={theme.text2}
              onPress={() => handleForceReturningType(4)}
            />
            <SettingRow
              theme={theme}
              label="Debug: Reflexión"
              labelColor={theme.text2}
              onPress={() => handleForceReturningType(5)}
            />
            <SettingRow
              theme={theme}
              label="Debug: Completar hasta Avicena"
              labelColor={theme.text2}
              onPress={handleCompleteUntilAvicena}
            />
            <SettingRow
              theme={theme}
              label="Debug: Reset darwin progress"
              labelColor={theme.text2}
              onPress={handleResetDarwinProgress}
            />
          </>
        )}

        <SettingRow
          theme={theme}
          label="Eliminar cuenta"
          labelColor={theme.coral}
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

function makeSrStyles(theme: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      minHeight: 52,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    label: {
      ...typography.body,
      color: theme.text,
      flex: 1,
    },
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    value: {
      ...typography.bodyS,
      color: theme.text3,
    },
    chevron: {
      ...typography.h3,
      color: theme.text3,
      lineHeight: 24,
    },
  });
}

// ─── Screen styles ────────────────────────────────────────────────────────────

function makeStyles(theme: Theme) {
  return StyleSheet.create({
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
      backgroundColor: theme.purpleBg,
      borderWidth: 1.5,
      borderColor: theme.purple,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    avatarInitial: {
      ...typography.h1,
      color: theme.purple,
    },
    userName: {
      ...typography.h2,
      color: theme.text,
      marginBottom: spacing.xs,
    },
    userEmail: {
      ...typography.bodyS,
      color: theme.text3,
    },

    // ── Section label (shared)
    sectionLabel: {
      ...typography.label,
      color: theme.text3,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },

    // ── Stats card
    statsCard: {
      flexDirection: 'row',
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: spacing.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    stat: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.xl,
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.border,
      marginVertical: spacing.lg,
    },
    statValue: {
      ...typography.h2,
      color: theme.text,
    },
    statLabel: {
      ...typography.bodyXS,
      color: theme.text3,
      textAlign: 'center',
      marginTop: spacing.xs,
      lineHeight: 16,
    },

    // ── Settings / account card
    card: {
      backgroundColor: theme.bg2,
      borderRadius: radius.xl,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: spacing.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },

    // ── Version note
    versionText: {
      ...typography.bodyXS,
      color: theme.text3,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
  });
}
