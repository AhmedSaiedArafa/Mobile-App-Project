import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { formatMoney } from '../../utils/format';
import { Button, Card, Divider, Header, LogoBadge, Screen, StatusPill } from '../../components';

// Account row
function AccountRow({ account, onPress, loc, colors, money }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center py-3.5 px-1 active:opacity-70">
      <LogoBadge label={account.logo} bg={account.logoBg} fg={account.logoFg} size={48} />
      <View className="flex-1 ml-3.5">
        <Text className="text-[15px] font-bold text-ink">{loc(account, 'name')}</Text>
        <Text className="text-[12.5px] mt-[3px] text-muted">{account.type} · {account.number}</Text>
      </View>
      <View className="items-end">
        <Text className="text-sm font-bold text-ink">{money(account.balance)}</Text>
        <StatusPill label={account.status} />
      </View>
    </Pressable>
  );
}

// Screen
export default function LinkedAccountsScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, loc, money } = useI18n();
  const { linkedAccounts } = useAppState();
  const [refreshing, setRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selected = linkedAccounts[selectedIdx] ?? linkedAccounts[0];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <Screen
      header={<Header title={t('accounts.title')} subtitle={t('accounts.subtitle')} />}
      footer={<Button title={t('accounts.addAccount')} icon="add" onPress={() => navigation.navigate('AddBankAccount')} />}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {selected ? (
          <View className="items-center py-6 mb-4 rounded-[22px] overflow-hidden bg-hero">
            <View className="flex-row items-center gap-2">
              <Text className="text-sm text-white/70">{loc(selected, 'name')}</Text>
              <Pressable onPress={() => setShowBalance(!showBalance)} hitSlop={12}>
                <Ionicons name={showBalance ? 'eye-outline' : 'eye-off-outline'} size={18} color="rgba(255,255,255,0.7)" />
              </Pressable>
            </View>
            <Text className="text-[32px] font-extrabold mt-1.5 text-white">
              {showBalance ? formatMoney(selected.balance) : '••••••'} <Text className="text-base font-bold text-white/70">{t('common.egp')}</Text>
            </Text>
            {linkedAccounts.length > 1 ? (
              <View className="flex-row items-center gap-2 mt-3">
                {linkedAccounts.map((a, i) => (
                  <Pressable key={a.id} onPress={() => setSelectedIdx(i)} hitSlop={6}>
                    <View className={`w-2.5 h-2.5 rounded-full ${i === selectedIdx ? 'bg-white' : 'bg-white/30'}`} />
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        {linkedAccounts.length === 0 ? (
          <View className="items-center my-10">
            <Ionicons name="wallet-outline" size={48} color={colors.textFaint} />
            <Text className="mt-2.5 text-[15px] text-muted">{t('accounts.empty')}</Text>
          </View>
        ) : (
          <Card padded={false} className="px-3 py-1">
            {linkedAccounts.map((account, i) => (
              <View key={account.id}>
                {i > 0 && <Divider inset={62} />}
                <AccountRow
                  account={account}
                  loc={loc}
                  colors={colors}
                  money={money}
                  onPress={() => navigation.navigate('AccountDetails', { accountId: account.id })}
                />
              </View>
            ))}
          </Card>
        )}

        <Pressable
          onPress={() => navigation.navigate('AddBankAccount')}
          className="min-h-[64px] rounded-2xl border-[1.5px] border-dashed border-line items-center justify-center mt-3.5 active:opacity-70"
        >
          <Text className="text-[15px] font-bold text-primary">{t('accounts.linkAnother')}</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
