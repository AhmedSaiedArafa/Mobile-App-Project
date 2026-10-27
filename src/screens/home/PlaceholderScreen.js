import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { Button, Header, IconBadge, Screen } from '../../components';

/** Stand-in for tabs outside the current scope (Accounts). */
export default function PlaceholderScreen({ route }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();
  const name = t(`tabs.${route.name}`);
  return (
    <Screen header={<Header title={name} back={false} />} scroll={false}>
      <View className="flex-1 items-center justify-center pb-20">
        <IconBadge icon="construct" accent="purple" size={72} round />
        <Text className="text-xl font-bold mt-4 text-ink">{t('placeholder.comingSoon', { name })}</Text>
        <Text className="text-sm mt-1.5 text-muted">{t('placeholder.notInScope')}</Text>
        <Button
          title={isDark ? t('common.switchToLight') : t('common.switchToDark')}
          icon={isDark ? 'sunny' : 'moon'}
          variant="secondary"
          onPress={toggleTheme}
          className="mt-6 self-stretch"
        />
      </View>
    </Screen>
  );
}
