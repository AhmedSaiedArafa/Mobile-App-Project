import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { IconBadge, StatusPill } from './Badges';

/** Generic tappable list row: leading element, title/subtitle, trailing element. */
export function ListRow({ left, title, subtitle, right, onPress, selected, className = '' }) {
  const { colors } = useTheme();
  const { icons } = useI18n();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={`flex-row items-center gap-3.5 py-3 px-1 rounded-2xl border active:opacity-70 ${
        selected ? 'bg-primary-soft border-primary' : 'border-transparent'
      } ${className}`}
    >
      {left}
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-ink" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-[12.5px] mt-[3px] text-muted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right === undefined && onPress ? <Ionicons name={icons.forward} size={18} color={colors.textFaint} /> : right}
    </Pressable>
  );
}

/** Transaction line matching the "Recent Transactions" list in the main design. */
export function TransactionRow({ item, last }) {
  const { t, loc, money } = useI18n();
  const incoming = item.amount > 0;
  return (
    <View
      className={`flex-row items-center gap-3.5 py-[13px] ${last ? '' : 'border-line'}`}
      style={!last && { borderBottomWidth: StyleSheet.hairlineWidth }}
    >
      <IconBadge icon={item.icon} accent={item.accent} size={48} round />
      <View className="flex-1">
        <Text className="text-[14.5px] font-semibold text-ink" numberOfLines={1}>
          {loc(item, 'title')}
        </Text>
        <Text className="text-[12.5px] mt-[3px] text-muted" numberOfLines={1}>
          {loc(item, 'meta')}
        </Text>
      </View>
      <View className="items-end gap-1">
        <Text className="text-sm font-semibold text-ink">
          {incoming ? '+ ' : '- '}
          {money(item.amount)}
        </Text>
        <StatusPill label={t('common.completed')} />
      </View>
    </View>
  );
}

/** Label / value line used in review & receipt summaries. */
export function DetailRow({ label, value, strong, valueColor }) {
  const { isRTL } = useI18n();
  return (
    <View className="flex-row justify-between items-start py-[9px] gap-4">
      <Text className="text-sm text-muted">{label}</Text>
      <Text
        className={`shrink ${strong ? 'text-base font-extrabold' : 'text-sm font-semibold'} ${valueColor ? '' : 'text-ink'}`}
        style={[{ textAlign: isRTL ? 'left' : 'right' }, valueColor && { color: valueColor }]}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}
