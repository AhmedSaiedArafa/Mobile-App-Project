import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { initials } from '../utils/format';

/** Rounded icon square / circle tinted with one of the theme accents. */
export function IconBadge({ icon, accent = 'purple', size = 46, round = false, iconSize }) {
  const { colors } = useTheme();
  const a = colors.accents[accent] ?? colors.accents.purple;
  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size, borderRadius: round ? size / 2 : size * 0.3, backgroundColor: a.bg }}
    >
      <Ionicons name={icon} size={iconSize ?? Math.round(size * 0.48)} color={a.fg} />
    </View>
  );
}

/** Brand placeholder (bank / biller) drawn as a coloured circle with its short name. Colours come from the data. */
export function LogoBadge({ label, bg, fg = '#FFFFFF', size = 46, ring }) {
  const fontSize = label.length > 3 ? size * 0.24 : label.length > 2 ? size * 0.28 : size * 0.36;
  return (
    <View
      className="items-center justify-center rounded-full"
      style={[{ width: size, height: size, backgroundColor: bg }, ring && { borderWidth: 2, borderColor: ring }]}
    >
      <Text className="font-extrabold tracking-wide" style={{ color: fg, fontSize }}>
        {label}
      </Text>
    </View>
  );
}

export function Avatar({ name, accent = 'purple', size = 46 }) {
  const { colors } = useTheme();
  const a = colors.accents[accent] ?? colors.accents.purple;
  return (
    <View className="items-center justify-center rounded-full" style={{ width: size, height: size, backgroundColor: a.bg }}>
      <Text className="font-bold" style={{ color: a.fg, fontSize: size * 0.36 }}>
        {initials(name)}
      </Text>
    </View>
  );
}

export function StatusPill({ label }) {
  return (
    <View className="flex-row items-center gap-[5px]">
      <View className="w-1.5 h-1.5 rounded-full bg-success" />
      <Text className="text-xs font-medium text-success">{label}</Text>
    </View>
  );
}
