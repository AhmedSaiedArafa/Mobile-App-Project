import React, { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

/** Round sun / moon button that switches between light and dark mode. */
export default function ThemeToggle({ size = 44 }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { t } = useI18n();
  const spin = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(spin, { toValue: isDark ? 1 : 0, friction: 6, useNativeDriver: true }).start();
  }, [isDark, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Pressable
      onPress={toggleTheme}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={isDark ? t('common.switchToLight') : t('common.switchToDark')}
      className="items-center justify-center border rounded-full bg-surface border-line active:opacity-70"
      style={{ width: size, height: size }}
    >
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Ionicons name={isDark ? 'sunny' : 'moon'} size={size * 0.46} color={isDark ? '#FFC94A' : colors.primary} />
      </Animated.View>
    </Pressable>
  );
}
