import React from 'react';
import { Text, View } from 'react-native';
import { useI18n } from '../i18n';

export default function StepProgress({ steps, current }) {
  const { t } = useI18n();
  return (
    <View className="mb-[18px]">
      <View className="flex-row gap-1.5">
        {steps.map((s, i) => (
          <View key={s} className={`flex-1 h-1 rounded-sm ${i <= current ? 'bg-primary' : 'bg-line'}`} />
        ))}
      </View>
      <Text className="text-[12.5px] mt-2 text-muted">
        {t('common.step', { n: current + 1, total: steps.length })} • <Text className="font-semibold text-ink">{steps[current]}</Text>
      </Text>
    </View>
  );
}
