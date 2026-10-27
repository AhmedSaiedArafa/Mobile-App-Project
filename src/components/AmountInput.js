import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { formatMoney } from '../utils/format';

const QUICK = [100, 200, 500, 1000];

/** Large amount entry with currency suffix and quick-amount chips. */
export default function AmountInput({ value, onChange, quick = QUICK, error, helper, label }) {
  const { colors } = useTheme();
  const { t, isRTL } = useI18n();

  const onText = (text) => {
    const clean = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    const [i, d] = clean.split('.');
    onChange(d !== undefined ? `${i}.${d.slice(0, 2)}` : i);
  };

  return (
    <View className="mb-4">
      <Text className="text-[13px] font-semibold mb-2 text-muted">{label ?? t('common.amount')}</Text>
      <View className={`flex-row items-center rounded-[18px] border-[1.2px] px-[18px] h-[76px] bg-field ${error ? 'border-danger' : 'border-line'}`}>
        <TextInput
          value={value}
          onChangeText={onText}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.textFaint}
          selectionColor={colors.primary}
          className="flex-1 text-[32px] font-bold text-ink"
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        />
        <Text className="text-lg font-bold text-muted">{t('common.egp')}</Text>
      </View>
      {error ? <Text className="text-xs mt-1.5 text-danger">{error}</Text> : null}
      {!error && helper ? <Text className="text-xs mt-1.5 text-muted">{helper}</Text> : null}
      {quick?.length ? (
        <View className="flex-row gap-2 mt-3">
          {quick.map((q) => {
            const active = Number(value) === q;
            return (
              <Pressable
                key={q}
                onPress={() => onChange(String(q))}
                className={`flex-1 h-[38px] rounded-xl items-center justify-center ${active ? 'bg-primary' : 'bg-primary-soft'}`}
              >
                <Text className={`text-sm font-bold ${active ? 'text-white' : 'text-on-soft'}`}>{formatMoney(q).replace('.00', '')}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
