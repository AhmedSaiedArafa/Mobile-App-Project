import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { banks } from '../../data/mock';
import { matches } from '../../utils/search';
import { BottomSheet, Button, Card, ChipGroup, Header, ListRow, LogoBadge, Screen, SearchBar, TextField } from '../../components';
import { ContactsLink, TransferAmountSection, goToTransferReview, useTransferForm } from './shared';

const findBank = (name) => banks.find((b) => b.name === name || b.short === name);

export default function TransferByBankAccountScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const form = useTransferForm();
  const [bank, setBank] = useState(null);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankQuery, setBankQuery] = useState('');
  const [type, setType] = useState('account');
  const [number, setNumber] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [save, setSave] = useState(false);
  const [touched, setTouched] = useState(false);

  const types = [
    { label: t('transfer.accountNumber'), value: 'account' },
    { label: t('transfer.iban'), value: 'iban' },
  ];

  useEffect(() => {
    const r = route.params?.recipient;
    if (r) {
      setBeneficiary(loc(r, 'name'));
      setBank(findBank(r.bank) ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.recipient]);

  const clean = number.replace(/\s/g, '').toUpperCase();
  // Egyptian IBAN: EG + 27 digits (29 chars). Account numbers vary by bank (10-16 digits).
  const numberValid = type === 'iban' ? /^EG\d{27}$/.test(clean) : /^\d{10,16}$/.test(clean);
  const nameValid = beneficiary.trim().split(' ').filter(Boolean).length >= 2;
  const canContinue = bank && numberValid && nameValid && form.valid;
  const numberLabel = type === 'iban' ? t('transfer.iban') : t('transfer.accountNumber');

  const bankList = useMemo(() => {
    const q = bankQuery.trim().toLowerCase();
    return q ? banks.filter((b) => matches(b, 'name', q) || b.short.toLowerCase().includes(q)) : banks;
  }, [bankQuery]);

  const onContinue = () =>
    goToTransferReview(navigation, form, t, {
      name: beneficiary.trim(),
      accent: 'blue',
      via: t('transfer.bank'),
      rows: [
        { label: t('transfer.bankLabel'), value: loc(bank, 'name') },
        { label: numberLabel, value: clean },
      ],
    });

  return (
    <Screen
      header={<Header title={t('transfer.bankTitle')} subtitle={t('transfer.bankSubtitle')} />}
      footer={<Button title={t('common.continue')} onPress={onContinue} disabled={!canContinue} />}
    >
      <Text className="text-[13px] font-semibold mb-2 text-muted">{t('transfer.recipientBank')}</Text>
      <Pressable onPress={() => setBankOpen(true)} className="active:opacity-80">
        <Card className="flex-row items-center gap-3 py-3">
          {bank ? (
            <LogoBadge label={bank.short} bg={bank.color} size={42} />
          ) : (
            <View className="w-[42px] h-[42px] rounded-full items-center justify-center bg-primary-soft">
              <Ionicons name="business" size={20} color={colors.primary} />
            </View>
          )}
          <Text className={`flex-1 text-[15px] font-semibold ${bank ? 'text-ink' : 'text-faint'}`} numberOfLines={1}>
            {bank ? loc(bank, 'name') : t('transfer.selectBank')}
          </Text>
          <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
        </Card>
      </Pressable>

      <View className="h-4" />
      <ChipGroup
        options={types}
        value={type}
        onChange={(next) => {
          setType(next);
          setNumber('');
          setTouched(false);
        }}
      />

      <TextField
        label={numberLabel}
        placeholder={type === 'iban' ? 'EG00 0000 0000 0000 0000 0000 0000 0' : t('transfer.accountPh')}
        keyboardType={type === 'iban' ? 'default' : 'number-pad'}
        autoCapitalize="characters"
        autoCorrect={false}
        value={number}
        onChangeText={setNumber}
        onBlur={() => setTouched(true)}
        maxLength={type === 'iban' ? 36 : 16}
        icon={type === 'iban' ? 'globe-outline' : 'card-outline'}
        error={touched && number && !numberValid ? (type === 'iban' ? t('transfer.ibanInvalid') : t('transfer.accountInvalid')) : null}
      />
      <TextField
        label={t('transfer.beneficiary')}
        placeholder={t('transfer.beneficiaryPh')}
        value={beneficiary}
        onChangeText={setBeneficiary}
        autoCapitalize="words"
        icon="person-outline"
      />
      <ContactsLink onPress={() => navigation.navigate('SelectRecipient', { returnTo: 'TransferByBankAccount' })} />

      <TransferAmountSection form={form} />

      <Card className="flex-row items-center gap-3 py-3">
        <Ionicons name="star-outline" size={20} color={colors.primary} />
        <View className="flex-1">
          <Text className="text-[14.5px] font-semibold text-ink">{t('transfer.saveBeneficiary')}</Text>
          <Text className="text-[12.5px] mt-0.5 text-muted">{t('transfer.saveBeneficiarySub')}</Text>
        </View>
        <Switch value={save} onValueChange={setSave} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#FFFFFF" />
      </Card>

      <BottomSheet visible={bankOpen} onClose={() => setBankOpen(false)} title={t('transfer.selectBank')} scroll>
        <SearchBar value={bankQuery} onChangeText={setBankQuery} placeholder={t('transfer.searchBanks')} className="mb-2.5" />
        <View>
          {bankList.map((b) => (
            <ListRow
              key={b.id}
              selected={bank?.id === b.id}
              left={<LogoBadge label={b.short} bg={b.color} size={40} />}
              title={loc(b, 'name')}
              right={bank?.id === b.id ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
              onPress={() => {
                setBank(b);
                setBankOpen(false);
                setBankQuery('');
              }}
              className="px-2.5"
            />
          ))}
        </View>
      </BottomSheet>
    </Screen>
  );
}
