import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { accounts } from '../../data/mock';
import { formatMoney, transferFee } from '../../utils/format';
import { AccountPicker, AmountInput, Avatar, ChipGroup, TextField } from '../../components';

const PURPOSES = ['Family', 'Rent', 'Gift', 'Salary', 'Other'];
const DAILY_LIMIT = 70000;

/** State shared by every transfer form: source account, amount, purpose and note. */
export function useTransferForm() {
  const { t } = useI18n();
  const [accountId, setAccountId] = useState(accounts[0].id);
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('Family');
  const [note, setNote] = useState('');

  const account = accounts.find((a) => a.id === accountId);
  const value = Number(amount) || 0;
  const fee = transferFee(value);
  const amountError =
    value > DAILY_LIMIT
      ? t('transfer.dailyLimit', { limit: formatMoney(DAILY_LIMIT).replace('.00', '') })
      : value && value + fee > account.balance
      ? t('transfer.insufficient')
      : null;

  return { accountId, setAccountId, amount, setAmount, purpose, setPurpose, note, setNote, value, fee, amountError, valid: value > 0 && !amountError };
}

/**
 * Simulated InstaPay name lookup. `resolve(key)` returns { name, nameAr?, accent } for the
 * recipient, or null when no account exists.
 */
export function useRecipientLookup(key, valid, resolve) {
  const [state, setState] = useState({ loading: false, match: null, notFound: false });

  useEffect(() => {
    if (!valid) {
      setState({ loading: false, match: null, notFound: false });
      return undefined;
    }
    setState({ loading: true, match: null, notFound: false });
    const timer = setTimeout(() => {
      const match = resolve(key);
      setState({ loading: false, match, notFound: !match });
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, valid]);

  return state;
}

export function TransferAmountSection({ form }) {
  const { t } = useI18n();
  return (
    <>
      <AccountPicker value={form.accountId} onChange={form.setAccountId} />
      <AmountInput
        value={form.amount}
        onChange={form.setAmount}
        error={form.amountError}
        helper={form.value ? t('transfer.feeHelper', { fee: form.fee.toFixed(2) }) : t('transfer.feeInfo')}
        quick={[500, 1000, 2000, 5000]}
      />
      <Text className="text-[13px] font-semibold mb-2 text-muted">{t('transfer.purpose')}</Text>
      <ChipGroup
        options={PURPOSES.map((p) => ({ label: t(`transfer.purposes.${p}`), value: p }))}
        value={form.purpose}
        onChange={form.setPurpose}
      />
      <TextField
        label={t('transfer.note')}
        placeholder={t('transfer.notePh')}
        value={form.note}
        onChangeText={form.setNote}
        maxLength={60}
        icon="chatbubble-ellipses-outline"
      />
    </>
  );
}

/** Builds the review params. `t` is the translator from useI18n(). */
export function goToTransferReview(navigation, form, t, { name, accent, via, rows }) {
  navigation.navigate('ReviewPayment', {
    kind: 'transfer',
    title: name,
    subtitle: t('transfer.viaMethod', { method: via }),
    avatarAccent: accent,
    amount: form.value,
    fee: form.fee,
    accountId: form.accountId,
    rows: [
      { id: 'to', label: t('common.to'), value: name },
      ...rows,
      { label: t('transfer.purpose'), value: t(`transfer.purposes.${form.purpose}`) },
      ...(form.note ? [{ label: t('transfer.note2'), value: form.note }] : []),
    ],
  });
}

/** Result of a recipient lookup (IPA / mobile) shown under the input. */
export function VerifiedRecipient({ name, accent, detail, loading, notFound }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const box = 'flex-row items-center gap-3 p-3 rounded-2xl border -mt-1 mb-4';
  if (loading) {
    return (
      <View className={`${box} bg-surface-alt border-line`}>
        <Ionicons name="sync" size={18} color={colors.textMuted} />
        <Text className="text-[13px] text-muted">{t('transfer.verifying')}</Text>
      </View>
    );
  }
  if (notFound) {
    return (
      <View className={`${box} bg-danger-soft border-transparent`}>
        <Ionicons name="alert-circle" size={18} color={colors.danger} />
        <Text className="flex-1 text-[13px] text-danger">{notFound}</Text>
      </View>
    );
  }
  if (!name) return null;
  return (
    <View className={`${box} bg-success-soft border-transparent`}>
      <Avatar name={name} accent={accent} size={38} />
      <View className="flex-1">
        <Text className="text-[14.5px] font-bold text-ink">{name}</Text>
        <Text className="text-xs mt-0.5 text-muted">{detail}</Text>
      </View>
      <Ionicons name="checkmark-circle" size={22} color={colors.success} />
    </View>
  );
}

export function ContactsLink({ onPress }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  return (
    <Pressable onPress={onPress} hitSlop={6} className="flex-row items-center gap-1.5 self-start mb-5 -mt-1 active:opacity-70">
      <Ionicons name="people-outline" size={18} color={colors.onSoft} />
      <Text className="text-[13.5px] font-bold text-on-soft">{t('transfer.contacts')}</Text>
    </Pressable>
  );
}
