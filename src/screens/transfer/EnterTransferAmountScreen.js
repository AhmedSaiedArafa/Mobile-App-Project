import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { accounts } from '../../data/mock';
import { formatMoney, transferFee } from '../../utils/format';
import { Avatar, Button, Card, Header, Screen, AmountInput } from '../../components';

const DAILY_LIMIT = 70000;

export default function EnterTransferAmountScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc, money } = useI18n();
  const { recipient } = route.params;
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const account = accounts[0];
  const value = Number(amount) || 0;
  const fee = transferFee(value);
  const exceedsBalance = value + fee > account.balance;
  const exceedsLimit = value > DAILY_LIMIT;
  const canContinue = value > 0 && !exceedsBalance && !exceedsLimit;

  const error = exceedsLimit
    ? t('transfer.dailyLimit', { limit: formatMoney(DAILY_LIMIT).replace('.00', '') })
    : exceedsBalance
    ? t('transfer.insufficient')
    : null;

  const onContinue = () =>
    navigation.navigate('QuickReviewTransfer', {
      recipient,
      amount: value,
      fee,
      note,
      accountId: account.id,
    });

  return (
    <Screen
      header={<Header title={t('transfer.title')} />}
      footer={<Button title={t('common.continue')} onPress={onContinue} disabled={!canContinue} />}
    >
      <Card className="flex-row items-center gap-3 mb-4">
        <Avatar name={loc(recipient, 'name')} accent={recipient.accent ?? 'purple'} size={44} />
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-ink">{loc(recipient, 'name')}</Text>
          <Text className="text-[13px] text-muted">{recipient.ipa}</Text>
        </View>
      </Card>

      <AmountInput
        value={amount}
        onChange={setAmount}
        error={error}
        helper={value ? t('transfer.feeHelper', { fee: fee.toFixed(2) }) : t('transfer.feeInfo')}
        quick={[500, 1000, 2000, 5000]}
      />

      <Text className="text-[13px] mt-2 text-muted">
        {t('balance.total')}: {money(account.balance)}
      </Text>
    </Screen>
  );
}
