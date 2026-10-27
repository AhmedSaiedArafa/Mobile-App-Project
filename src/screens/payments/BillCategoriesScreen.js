import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import { useI18n } from '../../i18n';
import { billCategories, providers } from '../../data/mock';
import { matches } from '../../utils/search';
import { Card, Header, IconBadge, ListRow, Screen, SearchBar, SectionHeader, StepProgress } from '../../components';
import CategoryGrid from './CategoryGrid';

export const usePaymentSteps = () => {
  const { t } = useI18n();
  return [t('payments.steps.category'), t('payments.steps.provider'), t('payments.steps.details'), t('payments.steps.review')];
};

export default function BillCategoriesScreen({ navigation }) {
  const { t, loc } = useI18n();
  const steps = usePaymentSteps();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const categories = useMemo(() => (q ? billCategories.filter((c) => matches(c, 'name', q)) : billCategories), [q]);
  // Searching also matches billers directly so the user can skip a step.
  const providerMatches = useMemo(() => {
    if (!q) return [];
    return billCategories.flatMap((c) =>
      (providers[c.id] || []).filter((p) => matches(p, 'name', q)).map((p) => ({ category: c, provider: p }))
    );
  }, [q]);

  return (
    <Screen header={<Header title={t('payments.billsTitle')} subtitle={t('payments.chooseCategory')} />}>
      <StepProgress steps={steps} current={0} />
      <SearchBar value={query} onChangeText={setQuery} placeholder={t('payments.searchCategoryOrBiller')} className="mb-5" />

      {categories.length ? (
        <Card className="pt-5 pb-1">
          <CategoryGrid
            categories={categories}
            onSelect={(c) => navigation.navigate('SelectServiceProvider', { categoryId: c.id })}
          />
        </Card>
      ) : null}

      {providerMatches.length ? (
        <>
          <SectionHeader title={t('payments.billers')} />
          <Card padded={false} className="px-3 py-1">
            {providerMatches.map(({ category, provider }) => (
              <ListRow
                key={`${category.id}-${provider.id}`}
                left={<IconBadge icon={category.icon} accent={category.accent} size={42} round iconSize={20} />}
                title={loc(provider, 'name')}
                subtitle={loc(category, 'name')}
                onPress={() => navigation.navigate('EnterPaymentDetails', { categoryId: category.id, providerId: provider.id })}
              />
            ))}
          </Card>
        </>
      ) : null}

      {!categories.length && !providerMatches.length ? (
        <Text className="text-center mt-10 text-sm text-muted">{t('payments.nothingFound', { q: query })}</Text>
      ) : null}
    </Screen>
  );
}
