import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';

export function CircleButton({ icon, onPress, badge, size = 44 }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      className="items-center justify-center border bg-surface border-line rounded-full active:opacity-70"
      style={{ width: size, height: size }}
    >
      <Ionicons name={icon} size={size * 0.48} color={colors.text} />
      {badge ? <View className="absolute top-[9px] right-[10px] w-[9px] h-[9px] rounded-full bg-danger border-[1.5px] border-surface" /> : null}
    </Pressable>
  );
}

export default function Header({ title, subtitle, back = true, onBack, right }) {
  const navigation = useNavigation();

  // The header keeps the English layout in every language: back button on the left, pointing left.
  return (
    <View className="flex-row items-center px-5 pt-1.5 pb-3" style={{ direction: 'ltr' }}>
      <View className="w-12">
        {back ? <CircleButton icon="chevron-back" onPress={onBack ?? (() => navigation.goBack())} /> : null}
      </View>
      <View className="flex-1 items-center">
        <Text className="text-lg font-bold text-ink" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-xs mt-0.5 text-muted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View className="w-12 items-end">{right}</View>
    </View>
  );
}
