import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

const VARIANTS = {
  primary: { box: 'bg-primary', text: 'text-white' },
  secondary: { box: 'bg-primary-soft', text: 'text-on-soft' },
  ghost: { box: '', text: 'text-on-soft' },
};

/** variant: 'primary' (filled), 'secondary' (soft tint), 'ghost' (text only) */
export default function Button({ title, onPress, variant = 'primary', icon, disabled, loading, className = '' }) {
  const { colors } = useTheme();
  const v = VARIANTS[variant];
  const fg = variant === 'primary' ? '#FFFFFF' : colors.onSoft;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-14 rounded-2xl items-center justify-center ${v.box} ${disabled ? 'opacity-[0.45]' : 'active:opacity-[0.85]'} ${className}`}
    >
      <View className="flex-row items-center gap-2">
        {loading ? (
          <ActivityIndicator color={fg} />
        ) : (
          <>
            {icon ? <Ionicons name={icon} size={18} color={fg} /> : null}
            <Text className={`text-base font-bold ${v.text}`}>{title}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
