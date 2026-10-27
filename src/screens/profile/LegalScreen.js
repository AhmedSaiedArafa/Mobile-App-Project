import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { legal } from '../../data/legal';
import { Button, Card, Header, IconBadge, Screen } from '../../components';

/** Terms & Conditions / Privacy Policy. route.params.type: 'terms' | 'privacy' */
export default function LegalScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc } = useI18n();
  const type = route.params?.type === 'privacy' ? 'privacy' : 'terms';
  const doc = legal[type];

  return (
    <Screen header={<Header title={t(`settings.${type}`)} />}>
      <Card className="flex-row items-center gap-3.5 mb-2">
        <IconBadge icon={type === 'terms' ? 'document-text' : 'lock-closed'} accent={type === 'terms' ? 'blue' : 'green'} size={52} />
        <View className="flex-1">
          <Text className="text-xs font-semibold text-muted">{t('legal.lastUpdated', { date: loc(doc, 'updated') })}</Text>
          <Text className="text-sm leading-5 mt-1 text-ink">{loc(doc, 'intro')}</Text>
        </View>
      </Card>

      {doc.sections.map((s) => (
        <View key={s.title} className="mt-[18px]">
          <Text className="text-base font-extrabold mb-1.5 text-ink">{loc(s, 'title')}</Text>
          <Text className="text-sm leading-[22px] text-muted">{loc(s, 'body')}</Text>
        </View>
      ))}

      <Card className="items-center mt-[26px]">
        <Ionicons name="chatbubbles-outline" size={26} color={colors.primary} />
        <Text className="text-[15px] font-bold mt-2 text-ink">{t('legal.questions')}</Text>
        <Button title={t('legal.contact')} variant="secondary" icon="headset" onPress={() => navigation.navigate('HelpSupport')} className="self-stretch mt-3" />
      </Card>
    </Screen>
  );
}
