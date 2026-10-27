import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { formatMoney } from '../../utils/format';
import { Card, DetailRow, Divider, Header, LogoBadge, Screen, StatusPill } from '../../components';

// Screen
export default function AccountDetailsScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const { linkedAccounts } = useAppState();
  const [showBalance, setShowBalance] = useState(true);
  const [showNumber, setShowNumber] = useState(false);

  const account = linkedAccounts.find((a) => a.id === route.params.accountId);

  if (!account) {
    return (
      <Screen header={<Header title={t('accounts.details')} />}>
        <Text className="mt-10 text-center text-base text-muted">{t('accounts.notFound')}</Text>
      </Screen>
    );
  }

  // Derived values
  const maskedNumber = account.fullNumber
    ? `•••• ${account.fullNumber.slice(-4)}`
    : account.number;

  return (
    <Screen header={<Header title={t('accounts.details')} subtitle={`${account.bank} · ${account.type}`} />} scroll>
      <View className="items-center py-6 mb-4 p-4 rounded-[22px] overflow-hidden bg-hero">
        <View className="flex-row items-center gap-3 self-stretch">
          <LogoBadge label={account.logo} bg="rgba(255,255,255,0.2)" fg="#FFFFFF" size={48} />
          <View className="flex-1">
            <Text className="text-lg font-bold text-white">{account.bank}</Text>
            <Text className="text-[13px] text-white/70 mt-0.5">{t('accounts.typeLabel', { type: account.type })}</Text>
          </View>
          <StatusPill label={account.status} />
        </View>
        <Text className="text-[13px] text-white/70 mt-5">{t('accounts.totalBalance')}</Text>
        <View className="flex-row items-center mt-1 gap-3">
          <Text className="text-[30px] font-extrabold text-white">
            {showBalance ? formatMoney(account.balance) : '••••••'} <Text className="text-base font-bold text-white/70">{account.currency}</Text>
          </Text>
          <Pressable onPress={() => setShowBalance(!showBalance)} hitSlop={12}>
            <Ionicons name={showBalance ? 'eye-outline' : 'eye-off-outline'} size={22} color="rgba(255,255,255,0.7)" />
          </Pressable>
        </View>
      </View>

      <Text className="text-base font-bold mb-2.5 text-ink">{t('accounts.info')}</Text>
      <Card>
        <DetailRow label={t('accounts.holder')} value={account.holder} />
        <View className="flex-row justify-between items-center py-[9px] gap-4">
          <Text className="text-sm text-muted">{t('accounts.accountNumber')}</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-semibold text-ink">
              {showNumber && account.fullNumber ? account.fullNumber : maskedNumber}
            </Text>
            <Pressable onPress={() => setShowNumber(!showNumber)} hitSlop={12}>
              <Ionicons name={showNumber ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.primary} />
            </Pressable>
          </View>
        </View>
        <DetailRow label={t('accounts.accountType')} value={account.type} />
        <DetailRow label={t('accounts.currency')} value={account.currency} />
        <View className="flex-row justify-between items-center py-[9px] gap-4">
          <Text className="text-sm text-muted">{t('accounts.status')}</Text>
          <StatusPill label={account.status} />
        </View>
        <DetailRow label={t('accounts.linkedOn')} value={loc(account, 'linkedOn')} />
      </Card>
      <Text className="text-center text-xs mt-3.5 text-muted">{t('accounts.lastSynced')}</Text>
    </Screen>
  );
}
