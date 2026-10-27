import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { recipients } from '../../data/mock';
import { isValidEgMobile } from '../../utils/format';
import { Button, Header, Screen, TextField } from '../../components';
import {
  ContactsLink,
  TransferAmountSection,
  VerifiedRecipient,
  goToTransferReview,
  useRecipientLookup,
  useTransferForm,
} from './shared';

// Numbers starting with 0155 are treated as "not registered" to demo the error state.
const resolveMobile = (mobile) =>
  recipients.find((r) => r.mobile === mobile) ?? (mobile.startsWith('0155') ? null : { unknown: true, accent: 'green' });

export default function TransferByMobileScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const form = useTransferForm();
  const [mobile, setMobile] = useState(route.params?.recipient?.mobile ?? '');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (route.params?.recipient) setMobile(route.params.recipient.mobile);
  }, [route.params?.recipient]);

  const digits = mobile.replace(/\D/g, '');
  const valid = isValidEgMobile(digits);
  const lookup = useRecipientLookup(digits, valid, resolveMobile);
  const matchName = lookup.match ? (lookup.match.unknown ? t('transfer.unknownUser') : loc(lookup.match, 'name')) : null;

  const onContinue = () =>
    goToTransferReview(navigation, form, t, {
      name: matchName,
      accent: lookup.match.accent,
      via: t('transfer.mobile'),
      rows: [{ label: t('transfer.mobile'), value: `+20 ${digits.slice(1)}` }],
    });

  return (
    <Screen
      header={<Header title={t('transfer.mobileTitle')} subtitle={t('transfer.mobileSubtitle')} />}
      footer={<Button title={t('common.continue')} onPress={onContinue} disabled={!lookup.match || !form.valid} />}
    >
      <TextField
        label={t('transfer.mobile')}
        placeholder="01X XXXX XXXX"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={(text) => setMobile(text.replace(/[^\d]/g, '').slice(0, 11))}
        onBlur={() => setTouched(true)}
        maxLength={11}
        icon="phone-portrait-outline"
        right={
          <View className="px-2 py-1 rounded-lg border bg-surface border-line">
            <Text className="text-[12.5px] font-semibold text-muted">🇪🇬 +20</Text>
          </View>
        }
        error={touched && digits && !valid ? t('transfer.mobileInvalid') : null}
      />
      <VerifiedRecipient
        loading={lookup.loading}
        name={matchName}
        accent={lookup.match?.accent}
        detail={lookup.match?.ipa ?? t('transfer.registered')}
        notFound={lookup.notFound ? t('transfer.mobileNotFound') : null}
      />
      <ContactsLink onPress={() => navigation.navigate('SelectRecipient', { returnTo: 'TransferByMobile' })} />

      <View className="flex-row items-center gap-2 p-3 rounded-[14px] mb-[18px] bg-primary-soft">
        <Ionicons name="information-circle" size={18} color={colors.primary} />
        <Text className="flex-1 text-[12.5px] leading-[17px] text-ink">{t('transfer.mobileInfo')}</Text>
      </View>

      <TransferAmountSection form={form} />
    </Screen>
  );
}
