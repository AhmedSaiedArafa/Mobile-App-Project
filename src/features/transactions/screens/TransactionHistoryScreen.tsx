import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '@/components/ui/Card';
import ScreenHeader from '@/components/ui/ScreenHeader';
import TransactionRow from '../components/TransactionRow';
import { TRANSACTIONS } from '../data/transactions';

const FILTERS = [
  { label: 'All', type: 'all' },
  { label: 'Sent', type: 'sent' },
  { label: 'Received', type: 'received' },
  { label: 'Bills', type: 'bill' },
];
const GROUPS = ['Today', 'Earlier'] as const;

export default function TransactionHistoryScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const shown = TRANSACTIONS.filter((transaction) => filter === 'all' || transaction.type === filter);

  return (
    <View
      className="flex-1 gap-4 bg-background px-5"
      style={{ paddingTop: insets.top + 8 }}
    >
      <ScreenHeader title="Transactions" />

      <View className="flex-row gap-2">
        {FILTERS.map((item) => (
          <Pressable
            key={item.type}
            onPress={() => setFilter(item.type)}
            className={`h-11 flex-1 items-center justify-center rounded-2xl border ${
              filter === item.type ? 'border-primary bg-primary' : 'border-primarySoft bg-surface'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                filter === item.type ? 'text-white' : 'text-primary'
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        {shown.length === 0 && (
          <Text className="mt-10 text-center text-sm text-muted">
            No transactions here yet.
          </Text>
        )}

        {GROUPS.map((group) => {
          const items = shown.filter((transaction) => transaction.group === group);
          if (items.length === 0) {
            return null;
          }
          return (
            <View key={group} className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-muted">{group}</Text>
              <Card extraStyles="py-1">
                {items.map((item) => (
                  <TransactionRow
                    key={item.id}
                    item={item}
                    onPress={() => router.push(`/history/${encodeURIComponent(item.id)}`)}
                  />
                ))}
              </Card>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
