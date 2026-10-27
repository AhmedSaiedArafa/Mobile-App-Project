import React from 'react';
import { Pressable, Share, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { transactions } from '../../data/mock';
import { formatMoney } from '../../utils/format';
import { Button, Card, DetailRow, Divider, Header, Screen, StatusPill } from '../../components';

// Screen
export default function TransactionDetailsScreen({ route }) {
  const { colors } = useTheme();
  const { t, loc, money } = useI18n();
  const { id } = route.params;
  const item = transactions.find((tx) => tx.id === id);

  if (!item) {
    return (
      <Screen header={<Header title={t('history.detailsTitle')} />}>
        <Text className="mt-10 text-center text-base text-muted">
          {id ? t('history.notFound') : t('history.missingId')}
        </Text>
      </Screen>
    );
  }

  const isReceived = item.type === 'received';
  const iconName = item.type === 'sent' ? 'paper-plane' : item.type === 'received' ? 'arrow-down' : 'document-text-outline';
  const sign = item.amount < 0 ? '−' : '+';
  const display = `${sign} ${formatMoney(Math.abs(item.amount))} ${t('common.egp')}`;

  const share = () =>
    Share.share({
      message: `${loc(item, 'title')}\n${t('common.amount')}: ${display}\n${t('history.reference')}: ${item.reference}\n${loc(item, 'date')}`,
    });

  return (
    <Screen
      header={<Header title={t('history.detailsTitle')} />}
      footer={
        <View className="gap-3">
          <Button title={t('history.shareReceipt')} icon="share-social-outline" onPress={share} />
        </View>
      }
    >
      <Card className="items-center gap-2 py-6">
        <View className={`h-14 w-14 items-center justify-center rounded-full ${isReceived ? 'bg-success-soft' : 'bg-primary-soft'}`}>
          <Ionicons name={iconName} size={26} color={isReceived ? colors.success : colors.primary} />
        </View>
        <Text className="text-[14px] font-bold text-ink">{loc(item, 'title')}</Text>
        <Text className="text-[28px] font-extrabold text-ink">{display}</Text>
        <StatusPill label={t('common.completed')} />
      </Card>

      <Card className="mt-4">
        <DetailRow label={t('history.reference')} value={item.reference} />
        <DetailRow label={t('history.date')} value={loc(item, 'date')} />
        <DetailRow label={t('common.from')} value={item.from} />
        <DetailRow label={t('common.to')} value={item.to} />
        <DetailRow label={t('history.method')} value={loc(item, 'method')} />
        <Divider />
        <DetailRow label={t('history.fee')} value={item.fee ? money(item.fee) : t('common.free')} valueColor={item.fee ? undefined : colors.success} />
      </Card>

      <Pressable className="items-center py-4 mt-2 active:opacity-70">
        <Text className="text-[13px] font-semibold text-primary">{t('history.reportProblem')}</Text>
      </Pressable>
    </Screen>
  );
}
