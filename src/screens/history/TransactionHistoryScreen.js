import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { transactions } from '../../data/mock';
import { formatMoney } from '../../utils/format';
import { Card, Header, Screen, StatusPill } from '../../components';

const FILTERS = ['all', 'sent', 'received', 'bill'];
const GROUPS = ['Today', 'Earlier'];

function signedAmount(item, money) {
  const sign = item.amount < 0 ? '−' : '+';
  return `${sign} ${formatMoney(Math.abs(item.amount))} EGP`;
}

function TransactionRow({ item, onPress, loc, colors }) {
  const isReceived = item.type === 'received';
  const iconName = item.type === 'sent' ? 'paper-plane' : item.type === 'received' ? 'arrow-down' : 'document-text-outline';
  return (
    <Pressable onPress={onPress} className="flex-row items-center justify-between py-3 active:opacity-70">
      <View className="flex-1 flex-row items-center gap-3">
        <View className={`h-11 w-11 items-center justify-center rounded-full ${isReceived ? 'bg-success-soft' : 'bg-primary-soft'}`}>
          <Ionicons name={iconName} size={20} color={isReceived ? colors.success : colors.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-[14px] font-bold text-ink" numberOfLines={1}>{loc(item, 'title')}</Text>
          <Text className="text-xs text-muted">{loc(item, 'subtitle')}</Text>
        </View>
      </View>
      <View className="ml-3 items-end gap-1">
        <Text className={`text-[13px] font-bold ${isReceived ? 'text-success' : 'text-ink'}`}>{signedAmount(item)}</Text>
        <StatusPill label="Completed" />
      </View>
    </Pressable>
  );
}

export default function TransactionHistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const [filter, setFilter] = useState('all');

  const shown = transactions.filter((tx) => filter === 'all' || tx.type === filter);

  return (
    <Screen
      header={<Header title={t('history.title')} />}
      scroll
    >
      <View className="flex-row gap-2 mb-4">
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            className={`h-10 flex-1 items-center justify-center rounded-2xl border ${
              filter === f ? 'border-primary bg-primary' : 'border-line bg-surface'
            }`}
          >
            <Text className={`text-[13px] font-semibold ${filter === f ? 'text-white' : 'text-primary'}`}>
              {t(`history.filters.${f}`)}
            </Text>
          </Pressable>
        ))}
      </View>

      {shown.length === 0 && (
        <Text className="mt-10 text-center text-sm text-muted">{t('history.empty')}</Text>
      )}

      {GROUPS.map((group) => {
        const items = shown.filter((tx) => tx.group === group);
        if (items.length === 0) return null;
        return (
          <View key={group} className="mb-4">
            <Text className="mb-2 text-[13px] font-semibold text-muted">{t(`history.groups.${group}`)}</Text>
            <Card>
              {items.map((item) => (
                <TransactionRow
                  key={item.id}
                  item={item}
                  colors={colors}
                  loc={loc}
                  onPress={() => navigation.navigate('TransactionDetails', { id: item.id })}
                />
              ))}
            </Card>
          </View>
        );
      })}
    </Screen>
  );
}
