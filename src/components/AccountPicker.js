import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { accounts } from '../data/mock';
import { LogoBadge } from './Badges';
import BottomSheet from './BottomSheet';
import { ListRow } from './Rows';

/** "Pay from" selector showing a linked bank account; opens a sheet to switch. */
export default function AccountPicker({ value, onChange, label }) {
  const { colors } = useTheme();
  const { t, loc, money } = useI18n();
  const [open, setOpen] = useState(false);
  const account = accounts.find((a) => a.id === value) ?? accounts[0];

  return (
    <View className="mb-4">
      <Text className="text-[13px] font-semibold mb-2 text-muted">{label ?? t('common.fromAccount')}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center gap-3 p-3.5 rounded-[18px] border bg-surface border-line active:opacity-80"
      >
        <LogoBadge label={account.logo} bg={account.logoBg} fg={account.logoFg} size={44} ring={colors.border} />
        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-ink">{loc(account, 'name')}</Text>
          <Text className="text-[12.5px] mt-[3px] text-muted">
            {account.number} • {money(account.balance)}
          </Text>
        </View>
        <View className="flex-row items-center gap-0.5 px-2.5 py-1.5 rounded-xl bg-primary-soft">
          <Text className="text-[12.5px] font-bold text-on-soft">{t('common.change')}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.onSoft} />
        </View>
      </Pressable>

      <BottomSheet visible={open} onClose={() => setOpen(false)} title={t('common.selectAccount')}>
        {accounts.map((a) => (
          <ListRow
            key={a.id}
            selected={a.id === account.id}
            left={<LogoBadge label={a.logo} bg={a.logoBg} fg={a.logoFg} size={44} ring={colors.border} />}
            title={loc(a, 'name')}
            subtitle={`${a.number} • ${money(a.balance)}`}
            right={a.id === account.id ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
            onPress={() => {
              onChange?.(a.id);
              setOpen(false);
            }}
            className="px-3 mb-1.5"
          />
        ))}
      </BottomSheet>
    </View>
  );
}
