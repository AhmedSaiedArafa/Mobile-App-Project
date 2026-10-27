import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { banks, recipients } from '../../data/mock';
import { matches } from '../../utils/search';
import { Avatar, Button, Card, ChipGroup, Divider, Header, ListRow, Screen, SearchBar } from '../../components';

/**
 * Lists saved recipients. When opened from a transfer form (`returnTo` param) the
 * choice is handed back to that form; otherwise it starts an IPA transfer.
 */
export default function SelectRecipientScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc, icons } = useI18n();
  const { isFavorite, toggleFavorite } = useAppState();
  const returnTo = route.params?.returnTo;
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filters = [
    { label: t('common.all'), value: 'all' },
    { label: t('common.favorites'), value: 'fav', icon: 'star' },
  ];

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipients
      .filter((r) => filter === 'all' || isFavorite(r.id))
      .filter((r) => !q || matches(r, 'name', q) || r.ipa.includes(q) || r.mobile.includes(q));
  }, [query, filter, isFavorite]);

  const bankName = (short) => {
    const bank = banks.find((b) => b.short === short);
    return bank ? loc(bank, 'name') : short;
  };
  const detail = (r) => (returnTo === 'TransferByMobile' ? r.mobile : returnTo === 'TransferByBankAccount' ? bankName(r.bank) : r.ipa);

  const select = (r) => {
    if (returnTo) navigation.popTo(returnTo, { recipient: r }, { merge: true });
    else navigation.navigate('TransferByIPA', { recipient: r });
  };

  return (
    <Screen
      header={<Header title={t('transfer.selectTitle')} />}
      footer={
        !returnTo ? (
          <Button title={t('transfer.newRecipient')} icon="person-add" variant="secondary" onPress={() => navigation.navigate('TransferByIPA')} />
        ) : null
      }
    >
      <SearchBar value={query} onChangeText={setQuery} placeholder={t('transfer.selectSearch')} />
      <ChipGroup options={filters} value={filter} onChange={setFilter} className="mt-3.5 mb-4" />

      <Card padded={false} className="px-3 py-1">
        {list.map((r, i) => (
          <View key={r.id}>
            {i ? <Divider inset={62} /> : null}
            <ListRow
              left={<Avatar name={loc(r, 'name')} accent={r.accent} size={46} />}
              title={loc(r, 'name')}
              subtitle={detail(r)}
              right={
                <View className="flex-row items-center gap-1.5">
                  <Pressable onPress={() => toggleFavorite(r.id)} hitSlop={8}>
                    <Ionicons name={isFavorite(r.id) ? 'star' : 'star-outline'} size={20} color={isFavorite(r.id) ? colors.warning : colors.textFaint} />
                  </Pressable>
                  <Ionicons name={icons.forward} size={18} color={colors.textFaint} />
                </View>
              }
              onPress={() => select(r)}
            />
          </View>
        ))}
        {!list.length ? (
          <View className="items-center py-8">
            <Ionicons name="people-outline" size={36} color={colors.textFaint} />
            <Text className="mt-2 text-muted">{t('transfer.noRecipients')}</Text>
          </View>
        ) : null}
      </Card>
    </Screen>
  );
}
