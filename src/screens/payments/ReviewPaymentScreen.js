import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { accounts } from '../../data/mock';
import { formatMoney, nowLabel, refNumber } from '../../utils/format';
import { Avatar, Button, Card, DetailRow, Divider, Header, LogoBadge, PinSheet, Screen, StepProgress } from '../../components';
import { usePaymentSteps } from './BillCategoriesScreen';

/**
 * Shared review step for bill payments (kind: 'bill') and money transfers (kind: 'transfer').
 * Params: { kind, title, subtitle, logo?, avatarAccent?, amount, fee, accountId, rows[] }
 */
export default function ReviewPaymentScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc, money, lang } = useI18n();
  const steps = usePaymentSteps();
  const p = route.params;
  const isBill = p.kind === 'bill';
  const account = accounts.find((a) => a.id === p.accountId);
  const total = p.amount + p.fee;

  const [pinOpen, setPinOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const submit = (pin) => {
    setProcessing(true);
    // Simulated processing. PIN 000000 simulates a declined transaction.
    setTimeout(() => {
      setProcessing(false);
      setPinOpen(false);
      navigation.replace('PaymentResult', {
        ...p,
        status: pin === '000000' ? 'failed' : 'success',
        reference: refNumber(),
        date: nowLabel(lang),
        fromAccount: `${loc(account, 'name')} (${account.number})`,
      });
    }, 1500);
  };

  return (
    <Screen
      header={<Header title={isBill ? t('review.titleBill') : t('review.titleTransfer')} />}
      footer={
        <Button
          title={isBill ? t('review.pay', { amount: money(total) }) : t('review.send', { amount: money(p.amount) })}
          icon="lock-closed"
          onPress={() => setPinOpen(true)}
        />
      }
    >
      {isBill ? <StepProgress steps={steps} current={3} /> : null}

      <Card className="items-center py-[22px]">
        {p.logo ? (
          <LogoBadge label={p.logo.label} bg={p.logo.color} size={64} />
        ) : (
          <Avatar name={p.title} accent={p.avatarAccent ?? 'purple'} size={64} />
        )}
        <Text className="text-[13px] mt-3.5 text-muted">{isBill ? t('review.paying') : t('review.sendingTo')}</Text>
        <Text className="text-[19px] font-extrabold mt-1 text-center text-ink">{p.title}</Text>
        <Text className="text-[13px] mt-1 text-center text-muted">{p.subtitle}</Text>
        <View className="mt-4 px-[22px] py-2.5 rounded-2xl bg-primary-soft">
          <Text className="text-[28px] font-extrabold text-ink">
            {formatMoney(p.amount)} <Text className="text-base font-semibold">{t('common.egp')}</Text>
          </Text>
        </View>
      </Card>

      <Text className="text-base font-bold mt-[22px] mb-2.5 text-ink">{isBill ? t('review.paymentDetails') : t('review.transferDetails')}</Text>
      <Card>
        {p.rows.map((r) => (
          <DetailRow key={r.label} label={r.label} value={r.value} />
        ))}
        <DetailRow label={t('common.from')} value={`${loc(account, 'name')}\n${account.number}`} />
        <Divider />
        <DetailRow label={t('common.amount')} value={money(p.amount)} />
        <DetailRow label={t('common.fees')} value={p.fee ? money(p.fee) : t('common.free')} valueColor={p.fee ? undefined : colors.success} />
        <Divider />
        <DetailRow label={t('common.total')} value={money(total)} strong />
      </Card>

      <View className="flex-row gap-2.5 p-3.5 rounded-2xl mt-4 items-start bg-primary-soft">
        <Ionicons name="information-circle" size={20} color={colors.primary} />
        <Text className="flex-1 text-[12.5px] leading-[18px] text-ink">
          {isBill ? t('review.noticeBill') : t('review.noticeTransfer')}
        </Text>
      </View>

      <PinSheet visible={pinOpen} onClose={() => setPinOpen(false)} onComplete={submit} loading={processing} />
    </Screen>
  );
}
