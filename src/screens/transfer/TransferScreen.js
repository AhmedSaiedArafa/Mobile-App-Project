import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { recentTransactions, recipients } from '../../data/mock';
import { ActionTile, Avatar, BalanceCard, Card, Header, Screen, SectionHeader, ThemeToggle, TransactionRow } from '../../components';

const METHODS = [
  { key: 'ipa', icon: 'at', accent: 'purple', title: 'transfer.ipa', description: 'transfer.ipaDesc', route: 'TransferByIPA' },
  { key: 'mobile', icon: 'phone-portrait', accent: 'green', title: 'transfer.mobile', description: 'transfer.mobileDesc', route: 'TransferByMobile' },
  { key: 'bank', icon: 'business', accent: 'blue', title: 'transfer.bank', description: 'transfer.bankDesc', route: 'TransferByBankAccount' },
  { key: 'contacts', icon: 'people', accent: 'orange', title: 'transfer.saved', description: 'transfer.savedDesc', route: 'SelectRecipient' },
];

export default function TransferScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const { isFavorite } = useAppState();
  const favorites = recipients.filter((r) => isFavorite(r.id));
  const transfers = recentTransactions.filter((tx) => tx.accent !== 'blue');

  return (
    <Screen header={<Header title={t('transfer.title')} subtitle={t('transfer.subtitle')} right={<ThemeToggle size={40} />} />}>
      <BalanceCard compact />

      <SectionHeader title={t('transfer.via')} />
      <View className="flex-row flex-wrap justify-between">
        {METHODS.map((m) => (
          <ActionTile
            key={m.key}
            variant="card"
            icon={m.icon}
            accent={m.accent}
            title={t(m.title)}
            description={t(m.description)}
            onPress={() => navigation.navigate(m.route)}
          />
        ))}
      </View>

      <SectionHeader title={t('common.favorites')} onAction={() => navigation.navigate('SelectRecipient')} className="mt-2.5" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-5">
        <Pressable onPress={() => navigation.navigate('SelectRecipient')} className="items-center w-[62px] active:opacity-70">
          <View className="w-[58px] h-[58px] rounded-full border-[1.5px] border-dashed border-primary items-center justify-center">
            <Ionicons name="add" size={26} color={colors.primary} />
          </View>
          <Text className="text-[12.5px] font-medium mt-1.5 text-ink">{t('transfer.newRecipientShort')}</Text>
        </Pressable>
        {favorites.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => navigation.navigate('TransferByIPA', { recipient: r })}
            className="items-center w-[62px] active:opacity-70"
          >
            <Avatar name={loc(r, 'name')} accent={r.accent} size={58} />
            <Text className="text-[12.5px] font-medium mt-1.5 text-ink" numberOfLines={1}>
              {loc(r, 'name').split(' ')[0]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title={t('transfer.recent')} onAction={() => {}} />
      <Card padded={false} className="px-4">
        {transfers.map((tx, i) => (
          <TransactionRow key={tx.id} item={tx} last={i === transfers.length - 1} />
        ))}
      </Card>
    </Screen>
  );
}
