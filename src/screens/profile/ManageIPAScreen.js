import React, { useEffect, useState } from 'react';
import { Pressable, Share, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { accounts, recipients } from '../../data/mock';
import { AccountPicker, BottomSheet, Button, Card, Header, LogoBadge, Screen, TextField } from '../../components';

const SUFFIX = '@swiftflow';
const HANDLE_RE = /^[a-z0-9][a-z0-9._-]{2,19}$/;

export default function ManageIPAScreen() {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const { ipas, setDefaultIPA, removeIPA } = useAppState();
  const [createOpen, setCreateOpen] = useState(false);
  const [actionsFor, setActionsFor] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // React Native's share sheet also offers "Copy" on both platforms.
  const share = (ipa) => Share.share({ message: t('ipa.shareText', { address: ipa.address }) });

  return (
    <Screen
      header={<Header title={t('ipa.title')} subtitle={t('ipa.subtitle')} />}
      footer={<Button title={t('ipa.create')} icon="add" onPress={() => setCreateOpen(true)} />}
    >
      <View className="flex-row gap-2.5 p-3.5 rounded-2xl mb-4 items-start bg-primary-soft">
        <Ionicons name="information-circle" size={20} color={colors.primary} />
        <Text className="flex-1 text-[12.5px] leading-[18px] text-ink">{t('ipa.info')}</Text>
      </View>

      {ipas.map((ipa) => {
        const account = accounts.find((a) => a.id === ipa.accountId);
        return (
          <Card key={ipa.id} className={`mb-3.5 ${ipa.isDefault ? 'border-[1.5px] border-primary' : ''}`}>
            <View className="flex-row items-center gap-3">
              <View className="w-11 h-11 rounded-[14px] items-center justify-center bg-primary-soft">
                <Ionicons name="at" size={22} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-ink" numberOfLines={1}>
                  {ipa.address}
                </Text>
                <Text className="text-xs mt-[3px] text-muted">{t('ipa.created', { date: loc(ipa, 'createdAt') })}</Text>
              </View>
              <Pressable onPress={() => setActionsFor(ipa)} hitSlop={10}>
                <Ionicons name="ellipsis-vertical" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <View className="flex-row items-center gap-2.5 mt-3.5 p-2.5 rounded-[14px] bg-surface-alt">
              <LogoBadge label={account.logo} bg={account.logoBg} fg={account.logoFg} size={32} ring={colors.border} />
              <Text className="flex-1 text-[13px] font-medium text-ink" numberOfLines={1}>
                {loc(account, 'name')} • {account.number}
              </Text>
              {ipa.isDefault ? (
                <View className="px-2.5 py-1 rounded-[10px] bg-primary">
                  <Text className="text-[11.5px] font-bold text-white">{t('ipa.default')}</Text>
                </View>
              ) : null}
            </View>

            <View className="flex-row gap-2 mt-3">
              <SmallAction icon="share-social-outline" label={t('common.share')} onPress={() => share(ipa)} />
              {!ipa.isDefault ? <SmallAction icon="star-outline" label={t('ipa.setDefault')} onPress={() => setDefaultIPA(ipa.id)} /> : null}
            </View>
          </Card>
        );
      })}

      {!ipas.length ? (
        <View className="items-center py-10">
          <Ionicons name="at-circle-outline" size={48} color={colors.textFaint} />
          <Text className="mt-2.5 text-sm text-muted">{t('ipa.empty')}</Text>
        </View>
      ) : null}

      <BottomSheet visible={!!actionsFor} onClose={() => setActionsFor(null)} title={actionsFor?.address}>
        {actionsFor && !actionsFor.isDefault ? (
          <SheetRow icon="star-outline" label={t('ipa.setAsDefault')} onPress={() => { setDefaultIPA(actionsFor.id); setActionsFor(null); }} />
        ) : null}
        <SheetRow icon="share-social-outline" label={t('ipa.shareAddress')} onPress={() => { share(actionsFor); setActionsFor(null); }} />
        <SheetRow icon="trash-outline" label={t('ipa.deleteIPA')} danger onPress={() => { setConfirmDelete(actionsFor); setActionsFor(null); }} />
      </BottomSheet>

      <BottomSheet visible={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <View className="items-center">
          <View className="w-14 h-14 rounded-full items-center justify-center bg-danger-soft">
            <Ionicons name="trash" size={24} color={colors.danger} />
          </View>
          <Text className="text-[19px] font-extrabold mt-3.5 text-ink">{t('ipa.deleteQ')}</Text>
          <Text className="text-sm mt-1.5 text-center leading-5 text-muted">{t('ipa.deleteText', { address: confirmDelete?.address })}</Text>
          <View className="flex-row gap-3 mt-[22px] self-stretch">
            <Button title={t('common.cancel')} variant="secondary" onPress={() => setConfirmDelete(null)} className="flex-1" />
            <Button title={t('common.delete')} onPress={() => { removeIPA(confirmDelete.id); setConfirmDelete(null); }} className="flex-1" />
          </View>
        </View>
      </BottomSheet>

      <CreateIPASheet visible={createOpen} onClose={() => setCreateOpen(false)} />
    </Screen>
  );
}

function SmallAction({ icon, label, onPress }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-1.5 px-3 h-[34px] rounded-xl bg-primary-soft active:opacity-70">
      <Ionicons name={icon} size={16} color={colors.onSoft} />
      <Text className="text-[12.5px] font-bold text-on-soft">{label}</Text>
    </Pressable>
  );
}

function SheetRow({ icon, label, onPress, danger }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3.5 py-3.5 active:opacity-60">
      <Ionicons name={icon} size={22} color={danger ? colors.danger : colors.text} />
      <Text className={`text-[15.5px] font-semibold ${danger ? 'text-danger' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}

/** Pick a handle + linked account. Availability is simulated against known addresses. */
function CreateIPASheet({ visible, onClose }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { ipas, addIPA } = useAppState();
  const [handle, setHandle] = useState('');
  const [accountId, setAccountId] = useState(accounts[0].id);
  const [check, setCheck] = useState('idle');

  useEffect(() => {
    if (!visible) {
      setHandle('');
      setCheck('idle');
    }
  }, [visible]);

  const clean = handle.trim().toLowerCase();
  const valid = HANDLE_RE.test(clean);

  useEffect(() => {
    if (!valid) {
      setCheck('idle');
      return undefined;
    }
    setCheck('checking');
    const timer = setTimeout(() => {
      const address = clean + SUFFIX;
      const taken = ipas.some((i) => i.address === address) || recipients.some((r) => r.ipa === address);
      setCheck(taken ? 'taken' : 'available');
    }, 600);
    return () => clearTimeout(timer);
  }, [clean, valid, ipas]);

  const status = {
    checking: { text: t('ipa.checking'), color: colors.textMuted, textClass: 'text-muted', icon: 'sync' },
    available: { text: t('ipa.available', { address: clean + SUFFIX }), color: colors.success, textClass: 'text-success', icon: 'checkmark-circle' },
    taken: { text: t('ipa.taken'), color: colors.danger, textClass: 'text-danger', icon: 'close-circle' },
  }[check];

  return (
    <BottomSheet visible={visible} onClose={onClose} title={t('ipa.createTitle')}>
      <TextField
        label={t('ipa.choose')}
        placeholder={t('ipa.ph')}
        value={handle}
        onChangeText={(text) => setHandle(text.replace(/\s/g, '').replace(/@.*$/, ''))}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        icon="at"
        right={<Text className="font-semibold text-muted">{SUFFIX}</Text>}
        error={handle && !valid ? t('ipa.invalid') : null}
      />
      {status ? (
        <View className="flex-row items-center gap-1.5 -mt-2 mb-3.5">
          <Ionicons name={status.icon} size={16} color={status.color} />
          <Text className={`text-[13px] font-semibold ${status.textClass}`}>{status.text}</Text>
        </View>
      ) : null}
      <AccountPicker value={accountId} onChange={setAccountId} label={t('ipa.receiveInto')} />
      <Button
        title={t('ipa.createBtn')}
        disabled={check !== 'available'}
        onPress={() => {
          addIPA(clean + SUFFIX, accountId);
          onClose();
        }}
      />
    </BottomSheet>
  );
}
