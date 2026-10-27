import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { recipients } from '../../data/mock';
import { isValidIPA } from '../../utils/format';
import { Button, Header, Screen, TextField } from '../../components';
import {
  ContactsLink,
  TransferAmountSection,
  VerifiedRecipient,
  goToTransferReview,
  useRecipientLookup,
  useTransferForm,
} from './shared';

const SUFFIX = '@swiftflow';
const toUsername = (ipa) => ipa.replace(/@swiftflow$/i, '');

// Unknown but well-formed addresses resolve to a name derived from the handle (demo data).
function resolveIPA(ipa) {
  const known = recipients.find((r) => r.ipa === ipa);
  if (known) return known;
  const handle = toUsername(ipa);
  if (handle.startsWith('unknown')) return null;
  const name = handle
    .split(/[._-]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(' ');
  return { name, accent: 'blue' };
}

export default function TransferByIPAScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const form = useTransferForm();
  const [username, setUsername] = useState(route.params?.recipient ? toUsername(route.params.recipient.ipa) : '');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (route.params?.recipient) setUsername(toUsername(route.params.recipient.ipa));
  }, [route.params?.recipient]);

  const ipa = `${username.trim().toLowerCase()}${SUFFIX}`;
  const valid = isValidIPA(ipa);
  const lookup = useRecipientLookup(ipa, valid, resolveIPA);

  const onContinue = () =>
    goToTransferReview(navigation, form, t, {
      name: loc(lookup.match, 'name'),
      accent: lookup.match.accent,
      via: t('transfer.ipa'),
      rows: [{ label: 'IPA', value: ipa }],
    });

  return (
    <Screen
      header={<Header title={t('transfer.ipaTitle')} subtitle={t('transfer.ipaSubtitle')} />}
      footer={<Button title={t('common.continue')} onPress={onContinue} disabled={!lookup.match || !form.valid} />}
    >
      <TextField
        label={t('transfer.ipa')}
        placeholder={t('transfer.ipaPh')}
        value={username}
        onChangeText={(text) => setUsername(toUsername(text.replace(/\s/g, '')))}
        onBlur={() => setTouched(true)}
        autoCapitalize="none"
        autoCorrect={false}
        icon="at"
        right={<Text className="text-[15px] font-semibold text-muted">{SUFFIX}</Text>}
        error={touched && username && !valid ? t('transfer.ipaInvalid') : null}
      />
      <VerifiedRecipient
        loading={lookup.loading}
        name={lookup.match ? loc(lookup.match, 'name') : null}
        accent={lookup.match?.accent}
        detail={ipa}
        notFound={lookup.notFound ? t('transfer.ipaNotFound') : null}
      />
      <ContactsLink onPress={() => navigation.navigate('SelectRecipient', { returnTo: 'TransferByIPA' })} />

      <TransferAmountSection form={form} />
    </Screen>
  );
}
