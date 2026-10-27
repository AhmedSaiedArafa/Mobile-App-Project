import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useI18n } from '../../i18n';
import { findCategory, providers } from '../../data/mock';
import { matches } from '../../utils/search';
import { Card, Divider, Header, IconBadge, ListRow, LogoBadge, Screen, SearchBar, StepProgress } from '../../components';
import { usePaymentSteps } from './BillCategoriesScreen';

export default function SelectServiceProviderScreen({ navigation, route }) {
  const { t, loc } = useI18n();
  const steps = usePaymentSteps();
  const category = findCategory(route.params.categoryId);
  const categoryName = loc(category, 'name');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const all = providers[category.id] || [];
    const q = query.trim().toLowerCase();
    return q ? all.filter((p) => matches(p, 'name', q)) : all;
  }, [category.id, query]);

  const subtitleFor = (p) =>
    p.services
      ? p.services.map((s) => t(`services.${s}`)).join(' • ')
      : category.mode === 'inquiry'
      ? t('payments.inquiryPay')
      : t('payments.enterAmountPay');

  return (
    <Screen header={<Header title={categoryName} subtitle={t('payments.selectProvider')} />}>
      <StepProgress steps={steps} current={1} />

      <Card className="flex-row items-center gap-3.5">
        <IconBadge icon={category.icon} accent={category.accent} size={52} />
        <View className="flex-1">
          <Text className="text-base font-bold text-ink">{t('payments.categoryBills', { name: categoryName })}</Text>
          <Text className="text-[12.5px] mt-[3px] text-muted">
            {t('payments.providersAvailable', { count: (providers[category.id] || []).length })}
          </Text>
        </View>
      </Card>

      <SearchBar value={query} onChangeText={setQuery} placeholder={t('payments.searchProviders')} className="my-[18px]" />

      <Card padded={false} className="px-3 py-1">
        {list.map((p, i) => (
          <View key={p.id}>
            {i ? <Divider inset={60} /> : null}
            <ListRow
              left={<LogoBadge label={p.short} bg={p.color} size={46} />}
              title={loc(p, 'name')}
              subtitle={subtitleFor(p)}
              onPress={() => navigation.navigate('EnterPaymentDetails', { categoryId: category.id, providerId: p.id })}
            />
          </View>
        ))}
        {!list.length ? <Text className="text-center py-6 text-muted">{t('payments.noProviders', { q: query })}</Text> : null}
      </Card>
    </Screen>
  );
}
