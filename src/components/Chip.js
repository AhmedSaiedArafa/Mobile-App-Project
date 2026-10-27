import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

export default function Chip({ label, icon, active, onPress }) {
  const { colors, isDark } = useTheme();
  const fg = active ? '#FFFFFF' : isDark ? colors.textMuted : colors.text;
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-1.5 px-3.5 h-[38px] rounded-full border ${active ? 'bg-primary border-primary' : 'bg-surface border-line'}`}
    >
      {icon ? <Ionicons name={icon} size={15} color={fg} /> : null}
      <Text className={`text-[13.5px] font-semibold ${active ? 'text-white' : isDark ? 'text-muted' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}

export function ChipGroup({ options, value, onChange, className = 'mb-4' }) {
  return (
    <View className={`flex-row flex-wrap gap-2 ${className}`}>
      {options.map((o) => {
        const opt = typeof o === 'string' ? { label: o, value: o } : o;
        return <Chip key={opt.value} label={opt.label} icon={opt.icon} active={value === opt.value} onPress={() => onChange(opt.value)} />;
      })}
    </View>
  );
}
