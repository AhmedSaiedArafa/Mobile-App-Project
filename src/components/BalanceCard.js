import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { accounts, totalBalance } from '../data/mock';
import { formatMoney } from '../utils/format';
import { LogoBadge } from './Badges';

/** Hero "Total Balance" card from the main design. */
export default function BalanceCard({ onPress, onAccountsPress, compact }) {
  const { isDark } = useTheme();
  const { t, icons } = useI18n();
  const [hidden, setHidden] = useState(false);

  return (
    <Pressable onPress={onPress} className="active:opacity-95">
      <View className={`rounded-3xl p-5 overflow-hidden bg-hero ${isDark ? 'border border-hero-line' : ''}`}>
        <View className="absolute w-[260px] h-[260px] rounded-full -right-[90px] -top-[120px] bg-white/10" />

        <View className="flex-row items-center">
          <View className="flex-1">
            <View className="flex-row items-center gap-2.5">
              <Text className="text-[15px] font-medium text-white/90">{t('balance.total')}</Text>
              <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
                <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={18} color="#FFFFFF" />
              </Pressable>
            </View>
            <Text className="text-[32px] font-extrabold mt-2 tracking-wide text-white">
              {hidden ? '••••••' : formatMoney(totalBalance)} <Text className="text-xl font-semibold">{t('common.egp')}</Text>
            </Text>
          </View>
          {onPress ? <Ionicons name={icons.forward} size={20} color="#FFFFFF" /> : null}
        </View>

        {!compact ? (
          <Pressable onPress={onAccountsPress} className="flex-row items-center gap-2.5 mt-[18px] rounded-2xl px-3.5 py-2.5 bg-hero-inner">
            <Ionicons name="business-outline" size={22} color="#FFFFFF" />
            <Text className="flex-1 text-[14.5px] font-medium text-white">{t('balance.linked', { count: accounts.length })}</Text>
            <View className="flex-row gap-2">
              {accounts.map((a) => (
                <LogoBadge key={a.id} label={a.logo} bg={a.logoBg} fg={a.logoFg} size={36} />
              ))}
            </View>
            <Ionicons name={icons.forward} size={18} color="#FFFFFF" />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}
