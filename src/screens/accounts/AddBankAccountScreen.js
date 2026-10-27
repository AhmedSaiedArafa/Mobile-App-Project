import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { banks as bankList, accountTypes } from '../../data/mock';
import { Button, Card, ChipGroup, Header, Screen, TextField } from '../../components';

// Screen
export default function AddBankAccountScreen({ navigation }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const { addLinkedAccount, accountExists } = useAppState();

  const [bank, setBank] = useState('');
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('Savings');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Helpers
  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: '' }));

  const bankOptions = bankList.map((b) => ({ label: loc(b, 'name'), value: b.id }));
  const typeOptions = accountTypes.map((tp) => ({ label: tp, value: tp }));

  // Validation
  const validate = () => {
    const next = {};
    if (!bank) next.bank = t('accounts.selectBank');
    if (holder.trim().length < 3) next.holder = t('accounts.holderInvalid');
    if (!/^\d{10,16}$/.test(number)) next.number = t('accounts.numberInvalid');
    else if (accountExists(number)) next.number = t('accounts.alreadyLinked');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Submit
  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    const bankObj = bankList.find((b) => b.id === bank);
    const bankName = bankObj ? loc(bankObj, 'name') : bank;
    setTimeout(() => {
      addLinkedAccount({
        bank: bankName,
        name: `${bankName} ${type}`,
        holder: holder.trim(),
        fullNumber: number,
        type,
        balance: 0,
      });
      setLoading(false);
      Alert.alert(t('accounts.addedAlert'), t('accounts.addedMsg', { bank: bankName }), [
        { text: t('common.done'), onPress: () => navigation.goBack() },
      ]);
    }, 1200);
  };

  return (
    <Screen
      header={<Header title={t('accounts.addAccount')} subtitle={t('accounts.addSubtitle')} />}
      footer={<Button title={t('accounts.validateAdd')} loading={loading} onPress={handleSubmit} />}
      scroll
      keyboardAvoiding
    >
      <Text className="text-[13px] font-semibold mb-2 text-muted">{t('accounts.bank')}</Text>
      <ChipGroup
        options={bankOptions}
        value={bank}
        onChange={(v) => { setBank(v); clearError('bank'); }}
      />
      {errors.bank ? <Text className="text-xs text-danger -mt-1 mb-2">{errors.bank}</Text> : null}

      <TextField
        label={t('accounts.holderName')}
        placeholder={t('accounts.holderPh')}
        value={holder}
        onChangeText={(text) => { setHolder(text); clearError('holder'); }}
        autoCapitalize="words"
        error={errors.holder}
      />
      <TextField
        label={t('accounts.accountNumber')}
        placeholder={t('accounts.numberPh')}
        value={number}
        onChangeText={(text) => { setNumber(text.replace(/\D/g, '')); clearError('number'); }}
        keyboardType="number-pad"
        maxLength={16}
        error={errors.number}
      />

      <Text className="text-[13px] font-semibold mb-2 text-muted">{t('accounts.accountType')}</Text>
      <ChipGroup options={typeOptions} value={type} onChange={setType} />

      <View className="flex-row items-center gap-2.5 p-3.5 rounded-2xl mt-4 bg-primary-soft">
        <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
        <Text className="flex-1 text-[12.5px] leading-[18px] text-ink">{t('accounts.secureNote')}</Text>
      </View>
    </Screen>
  );
}
