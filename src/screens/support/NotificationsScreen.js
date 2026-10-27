import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { Card, ChipGroup, Header, IconBadge, Screen } from '../../components';

const TYPES = {
  transaction: { icon: 'swap-horizontal', accent: 'purple' },
  bill: { icon: 'receipt', accent: 'green' },
  offer: { icon: 'pricetag', accent: 'orange' },
  security: { icon: 'shield-checkmark', accent: 'red' },
};

const FILTER_TYPES = ['transaction', 'bill', 'security', 'offer'];

export default function NotificationsScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const { t, loc, isRTL } = useI18n();
  const { notifications, unreadCount, markRead, markAllRead, removeNotification } = useAppState();
  const [filter, setFilter] = useState('all');
  const filters = [
    { label: t('common.all'), value: 'all' },
    ...FILTER_TYPES.map((type) => ({ label: t(`notifications.filters.${type}`), value: type })),
  ];

  const groups = useMemo(() => {
    const list = notifications.filter((n) => filter === 'all' || n.type === filter);
    return ['Today', 'Earlier']
      .map((g) => ({ title: g, items: list.filter((n) => n.group === g) }))
      .filter((g) => g.items.length);
  }, [notifications, filter]);

  // Tapping a notification marks it read and opens the related screen.
  const open = (n) => {
    markRead(n.id);
    if (n.link === 'Payments') navigation.navigate('Tabs', { screen: 'Payments' });
    else if (n.link) navigation.navigate(n.link);
  };

  return (
    <Screen
      header={
        <Header
          title={t('notifications.title')}
          subtitle={unreadCount ? t('notifications.unread', { count: unreadCount }) : t('notifications.caughtUp')}
          right={
            unreadCount ? (
              <Pressable onPress={markAllRead} hitSlop={8}>
                <Ionicons name="checkmark-done" size={24} color={isDark ? colors.text : colors.primary} />
              </Pressable>
            ) : null
          }
        />
      }
    >
      <ChipGroup options={filters} value={filter} onChange={setFilter} />

      {groups.map((g) => (
        <View key={g.title} className="mb-2">
          <Text className={`text-[13px] font-bold uppercase mb-2.5 mt-1.5 text-muted ${isRTL ? '' : 'tracking-wider'}`} style={{ marginStart: 4 }}>
            {t(`notifications.groups.${g.title}`)}
          </Text>
          <Card padded={false} className="overflow-hidden">
            {g.items.map((n, i) => {
              const type = TYPES[n.type];
              return (
                <Pressable
                  key={n.id}
                  onPress={() => open(n)}
                  className={`flex-row gap-3 p-3.5 items-start active:opacity-70 ${i ? 'border-t border-line' : ''} ${n.read ? '' : 'bg-primary-soft'}`}
                >
                  <IconBadge icon={type.icon} accent={type.accent} size={42} round iconSize={20} />
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className={`flex-1 text-[14.5px] text-ink ${n.read ? 'font-semibold' : 'font-extrabold'}`} numberOfLines={1}>
                        {loc(n, 'title')}
                      </Text>
                      <Text className="text-[11.5px] text-faint">{loc(n, 'time')}</Text>
                    </View>
                    <Text className="text-[13px] mt-1 leading-[18px] text-muted">{loc(n, 'body')}</Text>
                  </View>
                  <View className="items-center gap-3.5 pt-0.5">
                    {!n.read ? <View className="w-2 h-2 rounded-full bg-primary" /> : null}
                    <Pressable onPress={() => removeNotification(n.id)} hitSlop={10}>
                      <Ionicons name="close" size={16} color={colors.textFaint} />
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
          </Card>
        </View>
      ))}

      {!groups.length ? (
        <View className="items-center pt-[60px]">
          <View className="w-20 h-20 rounded-full items-center justify-center bg-primary-soft">
            <Ionicons name="notifications-off-outline" size={36} color={colors.primary} />
          </View>
          <Text className="text-lg font-bold mt-4 text-ink">{t('notifications.empty')}</Text>
          <Text className="text-[13.5px] mt-1.5 text-center text-muted">{t('notifications.emptyText')}</Text>
        </View>
      ) : null}
    </Screen>
  );
}
