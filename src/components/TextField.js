import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

export default function TextField({ label, icon, error, helper, right, className = 'mb-4', inputClassName = '', onFocus, onBlur, ...inputProps }) {
  const { colors } = useTheme();
  const { isRTL } = useI18n();
  const [focused, setFocused] = useState(false);
  const borderClass = error ? 'border-danger' : focused ? 'border-primary' : 'border-line';

  return (
    <View className={className}>
      {label ? <Text className="text-[13px] font-semibold mb-2 text-muted">{label}</Text> : null}
      <View className={`flex-row items-center gap-2.5 min-h-[54px] rounded-2xl border-[1.2px] px-3.5 bg-field ${borderClass}`}>
        {icon ? <Ionicons name={icon} size={20} color={focused ? colors.primary : colors.textFaint} /> : null}
        <TextInput
          placeholderTextColor={colors.textFaint}
          selectionColor={colors.primary}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={`flex-1 text-[15px] py-3.5 text-ink ${inputClassName}`}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
          {...inputProps}
        />
        {right}
      </View>
      {error ? (
        <Text className="text-xs mt-1.5 text-danger">{error}</Text>
      ) : helper ? (
        <Text className="text-xs mt-1.5 text-muted">{helper}</Text>
      ) : null}
    </View>
  );
}

export function SearchBar({ value, onChangeText, placeholder, className = '' }) {
  const { t } = useI18n();
  return (
    <TextField
      icon="search"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder ?? t('common.search')}
      autoCorrect={false}
      className={className}
    />
  );
}
