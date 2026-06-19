import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors';
import { typography, spacing } from '../constants/typography';
import { getSavedQuotes, isQuoteSaved, saveQuote } from '../utils/savedQuotes';
import { useTheme } from '../hooks/useTheme';

type Theme = typeof colors.dark;

export function SaveQuoteButton({
  authorId,
  authorName,
  quote,
  onSaved,
}: {
  authorId: string;
  authorName: string;
  quote: string;
  onSaved?: () => void;
}) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [saved, setSaved] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let active = true;
    getSavedQuotes().then(list => {
      if (active && isQuoteSaved(list, authorId, quote)) setSaved(true);
    });
    return () => { active = false; };
  }, [authorId, quote]);

  async function handlePress() {
    if (saved) return;
    setSaved(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.3, useNativeDriver: true, speed: 30, bounciness: 14 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
    ]).start();
    await saveQuote({ authorId, authorName, quote });
    onSaved?.();
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={saved ? 1 : 0.7}
      disabled={saved}
    >
      <Animated.Text style={[styles.heart, saved && styles.heartSaved, { transform: [{ scale }] }]}>
        {saved ? '♥' : '♡'}
      </Animated.Text>
      <Text style={[styles.label, saved && styles.labelSaved]}>
        {saved ? 'Guardada en mi diario' : 'Guardar en mi diario'}
      </Text>
    </TouchableOpacity>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.xs,
    },
    heart: {
      fontSize: 18,
      color: theme.text3,
    },
    heartSaved: {
      color: theme.green,
    },
    label: {
      ...typography.bodyS,
      color: theme.text3,
    },
    labelSaved: {
      color: theme.green,
      fontWeight: '600',
    },
  });
}
