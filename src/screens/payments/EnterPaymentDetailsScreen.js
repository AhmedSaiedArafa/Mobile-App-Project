import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { accounts, findCategory, findProvider, savedBillers, user } from '../../data/mock';
import { billFee, isValidEgMobile } from '../../utils/format';
import {
  AccountPicker,
  AmountInput,
  Button,
  Card,
  ChipGroup,
  DetailRow,
  Divider,
  Header,
  LogoBadge,
  Screen,
  StepProgress,
  TextField,
} from '../../components';
import { usePaymentSteps } from './BillCategoriesScreen';

export default function EnterPaymentDetailsScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc, money } = useI18n();
  const steps = usePaymentSteps();
  const category = findCategory(route.params.categoryId);
  const provider = findProvider(category.id, route.params.providerId);
  const field = category.field;
  const fieldLabel = loc(field, 'label');
  const categoryName = loc(category, 'name');
  const providerName = loc(provider, 'name');

  const [service, setService] = useState(provider.services?.[0]);
  const [reference, setReference] = useState(route.params.reference ?? '');
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState(accounts[0].id);
  const [saveBiller, setSaveBiller] = useState(false);
  const [bill, setBill] = useState(null);
  const [inquiring, setInquiring] = useState(false);
  const [touched, setTouched] = useState(false);

  // Postpaid mobile bills are looked up like any other inquiry-based bill.
  const isInquiry = category.mode === 'inquiry' || service === 'Postpaid Bill';
  const account = accounts.find((a) => a.id === accountId);
  const ref = reference.replace(/\s/g, '');
  const serviceName = service ? t(`services.${service}`) : null;

  const isNumericField = field.keyboard === 'number-pad';
  const maxLen = field.max ?? (isNumericField ? 20 : 50);

  const referenceError = (() => {
    if (!touched || field.min === 0) return null;
    if (isNumericField && ref.length > 0 && !/^\d+$/.test(ref)) return t('payments.numericOnly');
    if (ref.length < field.min) return t('payments.minChars', { label: fieldLabel, min: field.min });
    if (field.max && ref.length > field.max) return t('payments.maxChars', { label: fieldLabel, max: field.max });
    if (category.id === 'mobile' && !isValidEgMobile(ref)) return t('payments.invalidMobile');
    return null;
  })();
  const referenceValid = field.min === 0 || (ref.length >= field.min && (!field.max || ref.length <= field.max) && (!isNumericField || /^\d*$/.test(ref)) && (category.id !== 'mobile' || isValidEgMobile(ref)));

  const payAmount = isInquiry ? bill?.due ?? 0 : Number(amount) || 0;
  const fee = billFee(payAmount);
  const insufficient = payAmount + fee > account.balance;
  const canContinue = referenceValid && payAmount > 0 && !insufficient;

  const inquire = () => {
    setTouched(true);
    if (!referenceValid) return;
    setInquiring(true);
    setBill(null);
    // Simulated biller inquiry
    setTimeout(() => {
      const saved = savedBillers.find((b) => b.reference === ref && b.providerId === provider.id);
      setBill({
        customer: user.fullName,
        customerAr: user.fullNameAr,
        period: 'October 2026',
        periodAr: 'أكتوبر 2026',
        dueDate: 'Nov 05, 2026',
        dueDateAr: '5 نوفمبر 2026',
        due: saved?.due ?? Math.round(150 + Math.random() * 900),
      });
      setInquiring(false);
    }, 1100);
  };

  const onContinue = () => {
    // `id` lets the receipt skip rows it already shows in its own header.
    const rows = [
      { id: 'biller', label: t('payments.biller'), value: providerName },
      ...(serviceName ? [{ label: t('payments.service'), value: serviceName }] : []),
      ...(ref ? [{ label: fieldLabel, value: ref }] : []),
      ...(bill
        ? [
            { label: t('payments.customerName'), value: loc(bill, 'customer') },
            { label: t('payments.billingPeriod'), value: loc(bill, 'period') },
          ]
        : []),
    ];
    navigation.navigate('ReviewPayment', {
      kind: 'bill',
      title: providerName,
      subtitle: serviceName ? `${categoryName} • ${serviceName}` : t('payments.billSuffix', { name: categoryName }),
      logo: { label: provider.short, color: provider.color },
      amount: payAmount,
      fee,
      accountId,
      rows,
      saveBiller,
    });
  };

  return (
    <Screen
      header={<Header title={t('payments.detailsTitle')} subtitle={categoryName} />}
      footer={<Button title={t('common.continue')} onPress={onContinue} disabled={!canContinue} />}
    >
      <StepProgress steps={steps} current={2} />

      <Card className="flex-row items-center gap-3.5">
        <LogoBadge label={provider.short} bg={provider.color} size={52} />
        <View className="flex-1">
          <Text className="text-base font-bold text-ink">{providerName}</Text>
          <Text className="text-[12.5px] mt-[3px] text-muted">{categoryName}</Text>
        </View>
        <Ionicons name="shield-checkmark" size={20} color={colors.success} />
      </Card>

      <View className="h-[18px]" />

      {provider.services ? (
        <>
          <Text className="text-[13px] font-semibold mb-2 text-muted">{t('payments.serviceType')}</Text>
          <ChipGroup
            options={provider.services.map((s) => ({ label: t(`services.${s}`), value: s }))}
            value={service}
            onChange={(s) => {
              setService(s);
              setBill(null);
            }}
          />
        </>
      ) : null}

      <TextField
        label={fieldLabel}
        placeholder={loc(field, 'placeholder')}
        keyboardType={field.keyboard}
        value={reference}
        onChangeText={(text) => {
          const cleaned = isNumericField ? text.replace(/[^\d\s]/g, '') : text;
          setReference(cleaned);
          setBill(null);
        }}
        onBlur={() => setTouched(true)}
        maxLength={maxLen}
        icon={category.icon}
        error={referenceError}
        helper={isInquiry ? t('payments.fetchHelper') : undefined}
      />

      {isInquiry ? (
        bill ? (
          <Card className="mb-4">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-[15px] font-bold text-ink">{t('payments.billDetails')}</Text>
              <View className="px-2.5 py-1 rounded-[10px] bg-danger-soft">
                <Text className="text-[11.5px] font-bold text-danger">{t('payments.dueOn', { date: loc(bill, 'dueDate') })}</Text>
              </View>
            </View>
            <DetailRow label={t('payments.customerName')} value={loc(bill, 'customer')} />
            <DetailRow label={t('payments.billingPeriod')} value={loc(bill, 'period')} />
            <Divider />
            <DetailRow label={t('payments.amountDue')} value={money(bill.due)} strong />
          </Card>
        ) : (
          <Button
            title={t('payments.inquire')}
            icon="search"
            variant="secondary"
            onPress={inquire}
            loading={inquiring}
            className="mb-[18px]"
          />
        )
      ) : (
        <AmountInput
          value={amount}
          onChange={setAmount}
          error={insufficient && payAmount ? t('payments.insufficient') : null}
          quick={category.id === 'mobile' ? [25, 50, 100, 200] : undefined}
        />
      )}

      {payAmount > 0 || !isInquiry ? (
        <AccountPicker value={accountId} onChange={setAccountId} label={t('payments.payFrom')} />
      ) : null}

      {isInquiry && insufficient && bill ? (
        <Text className="text-[12.5px] -mt-2 mb-3.5 text-danger">{t('payments.insufficient')}</Text>
      ) : null}

      <Card className="flex-row items-center gap-3 py-3">
        <Ionicons name="bookmark-outline" size={20} color={colors.primary} />
        <View className="flex-1">
          <Text className="text-[14.5px] font-semibold text-ink">{t('payments.saveBiller')}</Text>
          <Text className="text-[12.5px] mt-[3px] text-muted">{t('payments.saveBillerSub')}</Text>
        </View>
        <Switch
          value={saveBiller}
          onValueChange={setSaveBiller}
          trackColor={{ true: colors.primary, false: colors.border }}
          thumbColor="#FFFFFF"
        />
      </Card>
    </Screen>
  );
}
