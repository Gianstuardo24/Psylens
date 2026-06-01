import { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography, spacing, radius } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';

type Theme = typeof colors.dark;

const PREMIUM_KEY = 'psylens_is_premium';

type Plan = 'monthly' | 'annual';

const VALUE_PROPS = [
  '+40 autores desde Wundt hasta Van der Kolk',
  'Todas las capas Concepto y Fondo',
  'Glosario completo con conexiones',
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export function PaywallSheet({ visible, onClose, onUnlock }: Props) {
  const { height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('annual');

  const translateY      = useRef(new Animated.Value(screenH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const s = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    if (!visible) return;
    translateY.setValue(screenH);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  function handleClose() {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: screenH,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }

  async function handleUnlock() {
    await AsyncStorage.setItem(PREMIUM_KEY, 'true').catch(() => {});
    onUnlock();
    handleClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <Animated.View style={[s.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          s.sheet,
          { transform: [{ translateY }], paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Handle */}
        <View style={s.handleWrap}>
          <View style={s.handle} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={s.content}
        >
          {/* Title */}
          <Text style={s.title}>Continúa el camino completo</Text>
          <Text style={s.subtitle}>
            Desbloquea todos los bloques, autores y conexiones.
          </Text>

          {/* Value props */}
          <View style={s.valueProps}>
            {VALUE_PROPS.map((prop, i) => (
              <View key={i} style={s.valueProp}>
                <View style={s.checkCircle}>
                  <Text style={s.checkMark}>✓</Text>
                </View>
                <Text style={s.valuePropText}>{prop}</Text>
              </View>
            ))}
          </View>

          {/* Plan options */}
          <View style={s.plans}>
            <TouchableOpacity
              style={[s.plan, selectedPlan === 'monthly' && s.planSelected]}
              onPress={() => setSelectedPlan('monthly')}
              activeOpacity={0.8}
            >
              <View style={[s.radio, selectedPlan === 'monthly' && s.radioSelected]} />
              <View style={s.planInfo}>
                <Text style={[s.planName, selectedPlan === 'monthly' && s.planNameSelected]}>
                  Mensual
                </Text>
                <Text style={s.planPrice}>$4.99/mes</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.plan, selectedPlan === 'annual' && s.planSelected]}
              onPress={() => setSelectedPlan('annual')}
              activeOpacity={0.8}
            >
              <View style={[s.radio, selectedPlan === 'annual' && s.radioSelected]} />
              <View style={s.planInfo}>
                <Text style={[s.planName, selectedPlan === 'annual' && s.planNameSelected]}>
                  Anual
                </Text>
                <Text style={s.planPrice}>$39.99/año</Text>
              </View>
              <View style={s.savingsBadge}>
                <Text style={s.savingsText}>Ahorra 33%</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity style={s.ctaButton} onPress={handleUnlock} activeOpacity={0.85}>
            <Text style={s.ctaText}>Desbloquear Premium →</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={s.footer}>Cancelar cuando quieras · Restaurar compra</Text>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.65)',
    },
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.bg2,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      maxHeight: '88%',
    },
    handleWrap: {
      alignItems: 'center',
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.bg3,
    },
    content: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
    },

    // Header
    title: {
      ...typography.h2,
      color: theme.text,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.bodyS,
      color: theme.text2,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: spacing.xl,
    },

    // Value props
    valueProps: {
      gap: spacing.md,
      marginBottom: spacing.xl,
    },
    valueProp: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.md,
    },
    checkCircle: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: theme.greenBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    checkMark: {
      ...typography.label,
      color: theme.green,
      fontWeight: '700',
    },
    valuePropText: {
      ...typography.bodyS,
      color: theme.text,
      flex: 1,
      lineHeight: 22,
    },

    // Plan options
    plans: {
      gap: spacing.sm,
      marginBottom: spacing.xl,
    },
    plan: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.bg3,
      borderRadius: radius.lg,
      borderWidth: 1.5,
      borderColor: theme.border,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    planSelected: {
      borderColor: theme.purple,
      backgroundColor: theme.purpleBg,
    },
    radio: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: theme.text3,
    },
    radioSelected: {
      borderColor: theme.purple,
      backgroundColor: theme.purple,
    },
    planInfo: {
      flex: 1,
    },
    planName: {
      ...typography.bodyS,
      color: theme.text2,
      fontWeight: '600',
    },
    planNameSelected: {
      color: theme.text,
    },
    planPrice: {
      ...typography.bodyXS,
      color: theme.text3,
      marginTop: 2,
    },
    savingsBadge: {
      backgroundColor: theme.purpleBg,
      borderRadius: radius.full,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderWidth: 1,
      borderColor: theme.purple,
    },
    savingsText: {
      ...typography.label,
      color: theme.purple,
    },

    // CTA
    ctaButton: {
      backgroundColor: theme.green,
      borderRadius: radius.lg,
      paddingVertical: spacing.lg,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    ctaText: {
      ...typography.body,
      color: theme.text,
      fontWeight: '600',
    },

    // Footer
    footer: {
      ...typography.bodyXS,
      color: theme.text3,
      textAlign: 'center',
    },
  });
}
