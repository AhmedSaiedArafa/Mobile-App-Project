import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { matches } from '../../utils/search';
import { faqCategories, faqs } from '../../data/mock';
import { Button, Card, Chip, Header, Screen, SearchBar } from '../../components';

export default function FAQScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc, isRTL } = useI18n();
  const [query, setQuery] = useState(route.params?.query ?? '');
  const [category, setCategory] = useState(route.params?.category ?? 'All');
  const [openId, setOpenId] = useState(route.params?.openId ?? null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs
      .filter((f) => category === 'All' || f.category === category)
      .filter((f) => !q || matches(f, 'q', q) || matches(f, 'a', q));
  }, [query, category]);

  return (
    <Screen header={<Header title={t('faq.title')} subtitle={t('faq.subtitle')} />}>
      <SearchBar value={query} onChangeText={setQuery} placeholder={t('faq.search')} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mt-3.5 mb-4" contentContainerClassName="gap-2 px-5">
        {['All', ...faqCategories].map((c) => (
          <Chip key={c} label={c === 'All' ? t('common.all') : t(`faq.cats.${c}`)} active={category === c} onPress={() => setCategory(c)} />
        ))}
      </ScrollView>

      {list.map((f) => {
        const open = openId === f.id;
        return (
          <Card key={f.id} className={`mb-2.5 py-3.5 ${open ? 'border-[1.5px] border-primary' : ''}`}>
            <Pressable onPress={() => setOpenId(open ? null : f.id)} className="flex-row items-center gap-3">
              <Text className="flex-1 text-[15px] font-bold leading-5 text-ink">{loc(f, 'q')}</Text>
              <View className={`w-[30px] h-[30px] rounded-full items-center justify-center ${open ? 'bg-primary' : 'bg-primary-soft'}`}>
                <Ionicons name={open ? 'remove' : 'add'} size={18} color={open ? '#FFFFFF' : colors.primary} />
              </View>
            </Pressable>
            {open ? (
              <>
                <Text className="text-sm leading-[21px] mt-2.5 text-muted">{loc(f, 'a')}</Text>
                <Text className={`text-[11.5px] font-bold mt-2.5 uppercase text-faint ${isRTL ? '' : 'tracking-wide'}`}>
                  {t(`faq.cats.${f.category}`)}
                </Text>
              </>
            ) : null}
          </Card>
        );
      })}

      {!list.length ? (
        <View className="items-center py-[30px]">
          <Ionicons name="search" size={36} color={colors.textFaint} />
          <Text className="mt-2 text-sm text-muted">{t('faq.noResults', { q: query })}</Text>
        </View>
      ) : null}

      <Card className="items-center mt-3.5">
        <Text className="text-[17px] font-extrabold text-ink">{t('faq.still')}</Text>
        <Text className="text-[13.5px] mt-1 text-muted">{t('faq.stillText')}</Text>
        <Button title={t('faq.contact')} icon="headset" variant="secondary" onPress={() => navigation.navigate('HelpSupport')} className="mt-3.5 self-stretch" />
      </Card>
    </Screen>
  );
}
