import React, { Children } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { IconBadge } from './Badges';
import Card, { Divider } from './Card';

/** Titled card holding MenuItems, with dividers between rows. */
export function MenuGroup({ title, children, className = 'mt-[22px]' }) {
  const { isRTL } = useI18n();
  const items = Children.toArray(children).filter(Boolean);
  return (
    <View className={className}>
      {/* letter spacing breaks Arabic letter joining, so it is only used for Latin text */}
      {title ? (
        <Text className={`text-[13px] font-bold uppercase mb-2.5 text-muted ${isRTL ? '' : 'tracking-wider'}`} style={{ marginStart: 4 }}>
          {title}
        </Text>
      ) : null}
      <Card padded={false} className="px-3.5">
        {items.map((child, i) => (
          <View key={i}>
            {i ? <Divider inset={52} /> : null}
            {child}
          </View>
        ))}
      </Card>
    </View>
  );
}

/**
 * One settings / profile row.
 * Pass `value` for a text on the right, `toggle` + `onToggle` for a switch,
 * or `onPress` for a chevron row. `danger` paints it red (e.g. Log out).
 */
export function MenuItem({ icon, accent = 'purple', title, subtitle, value, onPress, toggle, onToggle, badge, danger }) {
  const { colors } = useTheme();
  const { icons } = useI18n();
  const isSwitch = typeof toggle === 'boolean';

  return (
    <Pressable
      onPress={isSwitch ? () => onToggle(!toggle) : onPress}
      disabled={!onPress && !isSwitch}
      className="flex-row items-center gap-3.5 py-[13px] active:opacity-70"
    >
      <IconBadge icon={icon} accent={danger ? 'red' : accent} size={38} iconSize={19} />
      <View className="flex-1">
        <Text className={`text-[15px] font-semibold ${danger ? 'text-danger' : 'text-ink'}`}>{title}</Text>
        {subtitle ? <Text className="text-[12.5px] mt-0.5 text-muted">{subtitle}</Text> : null}
      </View>
      {badge ? (
        <View className="min-w-[22px] h-[22px] rounded-full px-1.5 items-center justify-center bg-danger">
          <Text className="text-white text-xs font-bold">{badge}</Text>
        </View>
      ) : null}
      {value ? <Text className="text-[13.5px] font-medium text-muted">{value}</Text> : null}
      {isSwitch ? (
        <Switch value={toggle} onValueChange={onToggle} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#FFFFFF" />
      ) : onPress && !danger ? (
        <Ionicons name={icons.forward} size={18} color={colors.textFaint} />
      ) : null}
    </Pressable>
  );
}
