import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { billCategories, findCategory, findProvider, recentPayments, savedBillers } from '../../data/mock';
import { formatMoney } from '../../utils/format';
import { matches } from '../../utils/search';
import { Card, Header, LogoBadge, Screen, SearchBar, SectionHeader, ThemeToggle, TransactionRow } from '../../components';
import CategoryGrid from './CategoryGrid';

export default function PaymentsScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const { t, loc, money } = useI18n();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? billCategories.filter((c) => matches(c, 'name', q)) : billCategories.slice(0, 8);
  }, [query]);

  const dueBills = savedBillers.filter((b) => b.due);
  const dueTotal = dueBills.reduce((s, b) => s + b.due, 0);

  const openCategory = (c) => navigation.navigate('SelectServiceProvider', { categoryId: c.id });
  const openSaved = (b) =>
    navigation.navigate('EnterPaymentDetails', { categoryId: b.categoryId, providerId: b.providerId, reference: b.reference });

  return (
    <Screen header={<Header title={t('payments.title')} back={false} right={<ThemeToggle size={40} />} />}>
      <SearchBar value={query} onChangeText={setQuery} placeholder={t('payments.search')} />

      {!query ? (
        <View className={`flex-row items-center rounded-3xl p-5 mt-4 overflow-hidden bg-hero ${isDark ? 'border border-hero-line' : ''}`}>
          <View className="absolute w-[200px] h-[200px] rounded-full -right-[60px] -top-[100px] bg-white/10" />
          <View className="flex-1">
            <Text className="text-sm text-white/85">{t('payments.upcoming')}</Text>
            <Text className="text-[26px] font-extrabold mt-1 text-white">
              {formatMoney(dueTotal)} <Text className="text-base font-semibold">{t('common.egp')}</Text>
            </Text>
            <Text className="text-[12.5px] mt-1 text-white/80">{t('payments.dueCount', { count: dueBills.length })}</Text>
          </View>
          <Pressable onPress={() => openSaved(dueBills[0])} className="bg-white px-4 py-2.5 rounded-[14px] active:opacity-80">
            <Text className="text-sm font-bold text-primary">{t('payments.payNow')}</Text>
          </Pressable>
        </View>
      ) : null}

      <SectionHeader
        title={query ? t('payments.results') : t('payments.categories')}
        onAction={query ? undefined : () => navigation.navigate('BillCategories')}
      />
      {filtered.length ? (
        <CategoryGrid categories={filtered} onSelect={openCategory} />
      ) : (
        <Text className="text-center my-6 text-muted">{t('payments.noCategory', { q: query })}</Text>
      )}

      {!query ? (
        <>
          <SectionHeader title={t('payments.saved')} action={t('common.manage')} onAction={() => {}} className="mt-1.5" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-5 pb-1">
            {savedBillers.map((b) => {
              const provider = findProvider(b.categoryId, b.providerId);
              const category = findCategory(b.categoryId);
              return (
                <Pressable key={b.id} onPress={() => openSaved(b)} className="active:opacity-80">
                  <Card className="w-40 p-3.5 rounded-[20px]" padded={false}>
                    <View className="flex-row justify-between items-start mb-3">
                      <LogoBadge label={provider.short} bg={provider.color} size={40} />
                      <Ionicons name={category.icon} size={16} color={colors.textFaint} />
                    </View>
                    <Text className="text-[14.5px] font-bold text-ink" numberOfLines={1}>
                      {loc(b, 'nickname')}
                    </Text>
                    <Text className="text-xs mt-0.5 text-muted" numberOfLines={1}>
                      {loc(provider, 'name')}
                    </Text>
                    <Text className={`text-[12.5px] font-bold mt-2.5 ${b.due ? 'text-warning' : 'text-success'}`}>
                      {b.due ? t('payments.due', { amount: money(b.due) }) : t('payments.noDues')}
                    </Text>
                  </Card>
                </Pressable>
              );
            })}
            <Pressable onPress={() => navigation.navigate('BillCategories')} className="active:opacity-80">
              <View className="w-40 h-full min-h-[140px] rounded-[20px] border-[1.5px] border-dashed border-primary items-center justify-center">
                <Ionicons name="add-circle" size={30} color={colors.primary} />
                <Text className="text-xs mt-2 text-ink">{t('payments.addBiller')}</Text>
              </View>
            </Pressable>
          </ScrollView>

          <SectionHeader title={t('payments.recent')} onAction={() => {}} />
          <Card padded={false} className="px-4">
            {recentPayments.map((p, i) => (
              <TransactionRow key={p.id} item={p} last={i === recentPayments.length - 1} />
            ))}
          </Card>
        </>
      ) : null}
    </Screen>
  );
}
