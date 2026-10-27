import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useI18n } from '../../i18n';
import { IconBadge } from '../../components';

/** 4-column grid of bill categories (same visual language as the home quick actions). */
export default function CategoryGrid({ categories, onSelect }) {
  const { loc } = useI18n();
  return (
    <View className="flex-row flex-wrap -mx-1">
      {categories.map((c) => (
        <Pressable key={c.id} onPress={() => onSelect(c)} className="w-1/4 items-center px-1 mb-4 active:opacity-70">
          <View className="w-[70px] h-[70px] rounded-[20px] items-center justify-center border bg-surface border-line">
            <IconBadge icon={c.icon} accent={c.accent} size={44} round iconSize={22} />
          </View>
          <Text className="text-[12.5px] font-medium mt-2 text-center text-ink" numberOfLines={2}>
            {loc(c, 'name')}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
