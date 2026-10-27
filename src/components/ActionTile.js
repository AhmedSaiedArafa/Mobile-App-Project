import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { IconBadge } from './Badges';

// Full class names so Tailwind can find them when it scans the code.
const TILE_BG = { purple: 'bg-tile-purple', green: 'bg-tile-green', blue: 'bg-tile-blue', orange: 'bg-tile-orange' };

/**
 * Quick action from the main design.
 * 'square' (default): soft tinted square with label below (4 per row).
 * 'card': wide card with title + description (2 per row).
 */
export default function ActionTile({ icon, accent, title, description, onPress, variant = 'square' }) {
  const { colors, isDark } = useTheme();
  const { icons } = useI18n();

  if (variant === 'square') {
    return (
      <Pressable onPress={onPress} className="w-1/4 items-center px-1 active:opacity-75">
        <View className={`w-20 h-20 rounded-[22px] items-center justify-center ${TILE_BG[accent]}`}>
          <IconBadge icon={icon} accent={accent} size={46} round iconSize={24} />
        </View>
        <Text className="text-[13.5px] font-medium mt-2.5 text-center leading-[18px] text-ink" numberOfLines={2}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} className="w-[48.5%] mb-3 active:opacity-85">
      <View className={`rounded-[20px] p-4 min-h-[108px] ${TILE_BG[accent]} ${isDark ? 'border border-line' : ''}`}>
        <View className="flex-row justify-between items-start mb-2.5">
          <IconBadge icon={icon} accent={accent} size={38} iconSize={20} />
          <Ionicons name={icons.forward} size={18} color={colors.textMuted} />
        </View>
        <Text className="text-base font-bold text-ink" numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text className="text-[12.5px] mt-[3px] text-muted" numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
