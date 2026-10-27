import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { user, recentTransactions } from '../../data/mock';
import { ActionTile, BalanceCard, CircleButton, Screen, SectionHeader, ThemeToggle, TransactionRow } from '../../components';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const { unreadCount } = useAppState();

  const actions = [
    { key: 'send', icon: 'paper-plane', accent: 'purple', title: t('home.sendMoney'), onPress: () => navigation.navigate('Transfer') },
    { key: 'bills', icon: 'wallet', accent: 'green', title: t('home.payBills'), onPress: () => navigation.navigate('BillCategories') },
    { key: 'accounts', icon: 'business', accent: 'blue', title: t('home.manageAccounts'), onPress: () => navigation.navigate('Accounts') },
    { key: 'history', icon: 'time', accent: 'orange', title: t('home.history'), onPress: () => navigation.navigate('TransactionHistory') },
  ];

  return (
    <Screen>
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-3">
          <View className="w-[54px] h-[54px] rounded-full items-center justify-center border-[3px] bg-primary-soft border-surface">
            <Ionicons name="person" size={26} color={colors.onSoft} />
          </View>
          <View>
            <Text className="text-sm text-muted">{t('home.greeting')}</Text>
            <Text className="text-[22px] font-extrabold mt-0.5 text-ink">{loc(user, 'fullName')} 👋</Text>
            <Text className="text-[13px] mt-1 text-muted">{t('home.tagline')}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <ThemeToggle size={44} />
          <CircleButton icon="notifications-outline" badge={unreadCount > 0} size={44} onPress={() => navigation.navigate('Notifications')} />
        </View>
      </View>

      <BalanceCard onPress={() => navigation.navigate('Accounts')} onAccountsPress={() => navigation.navigate('Accounts')} />

      <View className="flex-row mt-[22px] -mx-1">
        {actions.map(({ key, ...a }) => (
          <ActionTile key={key} {...a} />
        ))}
      </View>

      <SectionHeader title={t('home.recent')} onAction={() => navigation.navigate('TransactionHistory')} />
      {recentTransactions.map((tx, i) => (
        <TransactionRow key={tx.id} item={tx} last={i === recentTransactions.length - 1} />
      ))}
    </Screen>
  );
}
