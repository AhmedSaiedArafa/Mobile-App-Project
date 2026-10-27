import React, { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { faqs, support } from '../../data/mock';
import { BottomSheet, Button, Card, ChipGroup, Divider, Header, IconBadge, ListRow, Screen, SearchBar, SectionHeader, TextField } from '../../components';

const ISSUE_TYPES = ['Transfer', 'Bill payment', 'Account', 'App problem', 'Other'];
const POPULAR = ['f4', 'f12', 'f11', 'f7'];

export default function HelpSupportScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const { t, loc } = useI18n();
  const [query, setQuery] = useState('');
  const [reportOpen, setReportOpen] = useState(false);

  const contacts = [
    { key: 'call', icon: 'call', accent: 'green', title: t('help.call'), sub: support.phone, onPress: () => Linking.openURL(`tel:${support.phone}`) },
    { key: 'email', icon: 'mail', accent: 'blue', title: t('help.email'), sub: t('help.emailSub'), onPress: () => Linking.openURL(`mailto:${support.email}`) },
    { key: 'report', icon: 'chatbubbles', accent: 'orange', title: t('help.report'), sub: t('help.reportSub'), onPress: () => setReportOpen(true) },
  ];

  return (
    <Screen header={<Header title={t('help.title')} />}>
      <View className={`rounded-3xl p-[22px] overflow-hidden bg-hero ${isDark ? 'border border-hero-line' : ''}`}>
        <View className="absolute w-[200px] h-[200px] rounded-full -right-[60px] -top-[90px] bg-white/10" />
        <Ionicons name="headset" size={30} color="#FFFFFF" />
        <Text className="text-[21px] font-extrabold mt-3 text-white">{t('help.hero')}</Text>
        <Text className="text-[13px] mt-1 text-white/80">{loc(support, 'hours')}</Text>
      </View>

      <SearchBar value={query} onChangeText={setQuery} placeholder={t('help.search')} className="mt-4" />
      {query.trim() ? (
        <Button
          title={t('help.searchFaq', { q: query.trim() })}
          variant="secondary"
          icon="search"
          onPress={() => navigation.navigate('FAQ', { query: query.trim() })}
          className="mt-2.5"
        />
      ) : null}

      <SectionHeader title={t('help.contact')} />
      <View className="flex-row gap-2.5">
        {contacts.map((c) => (
          <Pressable key={c.key} onPress={c.onPress} className="flex-1 active:opacity-75">
            <Card className="items-center py-[18px] px-2" padded={false}>
              <IconBadge icon={c.icon} accent={c.accent} size={46} round iconSize={22} />
              <Text className="text-sm font-bold mt-2.5 text-ink">{c.title}</Text>
              <Text className="text-[11.5px] mt-[3px] text-muted" numberOfLines={1}>
                {c.sub}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>

      <SectionHeader title={t('help.popular')} onAction={() => navigation.navigate('FAQ')} />
      <Card padded={false} className="px-3 py-1">
        {POPULAR.map((id, i) => {
          const f = faqs.find((x) => x.id === id);
          return (
            <View key={id}>
              {i ? <Divider inset={52} /> : null}
              <ListRow
                left={<IconBadge icon="help" accent="purple" size={38} round iconSize={18} />}
                title={loc(f, 'q')}
                subtitle={t(`faq.cats.${f.category}`)}
                onPress={() => navigation.navigate('FAQ', { openId: id })}
              />
            </View>
          );
        })}
      </Card>

      <View className="flex-row items-center gap-3 mt-5 p-4 rounded-[22px] bg-danger-soft">
        <Ionicons name="warning" size={22} color={colors.danger} />
        <Text className="flex-1 text-[13px] leading-[19px] text-ink">{t('help.safety')}</Text>
      </View>

      <ReportSheet visible={reportOpen} onClose={() => setReportOpen(false)} />
    </Screen>
  );
}

/** "Report a problem" form. Submitting is simulated and returns a ticket number. */
function ReportSheet({ visible, onClose }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [type, setType] = useState(ISSUE_TYPES[0]);
  const [reference, setReference] = useState('');
  const [details, setDetails] = useState('');
  const [sending, setSending] = useState(false);
  const [ticket, setTicket] = useState(null);

  const close = () => {
    onClose();
    setTimeout(() => {
      setTicket(null);
      setReference('');
      setDetails('');
      setType(ISSUE_TYPES[0]);
    }, 300);
  };

  const submit = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setTicket(`TK-${Date.now().toString().slice(-6)}`);
    }, 1000);
  };

  return (
    <BottomSheet visible={visible} onClose={close} title={ticket ? null : t('help.reportTitle')}>
      {ticket ? (
        <View className="items-center pt-1.5">
          <View className="w-[70px] h-[70px] rounded-full items-center justify-center bg-success-soft">
            <Ionicons name="checkmark" size={34} color={colors.success} />
          </View>
          <Text className="text-xl font-extrabold mt-4 text-ink">{t('help.ticketDone')}</Text>
          <Text className="text-sm text-center mt-2 leading-5 text-muted">
            {t('help.ticketText1')} <Text className="font-extrabold text-ink">{ticket}</Text>. {t('help.ticketText2')}
          </Text>
          <Button title={t('common.done')} onPress={close} className="self-stretch mt-[22px]" />
        </View>
      ) : (
        <>
          <Text className="text-[13px] font-semibold mb-2 text-muted">{t('help.about')}</Text>
          <ChipGroup
            options={ISSUE_TYPES.map((it) => ({ label: t(`help.issueTypes.${it}`), value: it }))}
            value={type}
            onChange={setType}
          />
          <TextField
            label={t('help.refLabel')}
            placeholder={t('help.refPh')}
            value={reference}
            onChangeText={setReference}
            autoCapitalize="characters"
            icon="receipt-outline"
          />
          <TextField
            label={t('help.describe')}
            placeholder={t('help.describePh')}
            value={details}
            onChangeText={setDetails}
            multiline
            maxLength={500}
            textAlignVertical="top"
            inputClassName="min-h-[90px]"
            helper={`${details.length}/500`}
          />
          <Button title={t('help.submit')} icon="send" onPress={submit} loading={sending} disabled={details.trim().length < 10} />
        </>
      )}
    </BottomSheet>
  );
}
