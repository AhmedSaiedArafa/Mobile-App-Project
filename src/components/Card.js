import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

export default function Card({ children, className = '', style, padded = true }) {
  const { isDark } = useTheme();
  return (
    <View
      className={`bg-surface rounded-[22px] ${isDark ? 'border border-line' : ''} ${padded ? 'p-4' : ''} ${className}`}
      style={[!isDark && { boxShadow: '0 8px 20px rgba(43,30,140,0.06)' }, style]}
    >
      {children}
    </View>
  );
}

export function SectionHeader({ title, action, onAction, className = 'mt-[22px]' }) {
  const { colors } = useTheme();
  const { t, icons } = useI18n();
  return (
    <View className={`flex-row items-center justify-between mb-3 ${className}`}>
      <Text className="text-lg font-bold text-ink">{title}</Text>
      {onAction ? (
        <Pressable onPress={onAction} hitSlop={8} className="flex-row items-center gap-0.5">
          <Text className="text-sm font-semibold text-on-soft">{action ?? t('common.viewAll')}</Text>
          <Ionicons name={icons.forward} size={14} color={colors.onSoft} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function Divider({ inset = 0 }) {
  return <View className="bg-line" style={{ height: StyleSheet.hairlineWidth, marginStart: inset }} />;
}
