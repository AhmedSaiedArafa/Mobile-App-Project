import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

export const PIN_LENGTH = 6;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

/** PIN dots + numeric keypad. Controlled: pass `value` and `onChange`. */
export default function PinPad({ value, onChange, onComplete, error, disabled }) {
  const { colors } = useTheme();

  const press = (k) => {
    if (disabled) return;
    if (k === 'del') return onChange(value.slice(0, -1));
    if (!k || value.length >= PIN_LENGTH) return;
    const next = value + k;
    onChange(next);
    if (next.length === PIN_LENGTH) onComplete?.(next);
  };

  return (
    <View>
      {/* Digits always fill left to right, also in Arabic. */}
      <View className="flex-row justify-center gap-3" style={{ direction: 'ltr' }}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => {
          const filled = i < value.length;
          return (
            <View
              key={i}
              className={`w-4 h-4 rounded-full border ${error ? 'border-danger' : 'border-line'} ${
                filled ? (error ? 'bg-danger' : 'bg-primary') : 'bg-field'
              }`}
            />
          );
        })}
      </View>
      <Text className="text-center text-[12.5px] mt-2.5 mb-2 min-h-[18px] text-danger">{error ?? ' '}</Text>
      <View className="flex-row flex-wrap" style={{ direction: 'ltr' }}>
        {KEYS.map((k, i) => (
          <Pressable
            key={i}
            onPress={() => press(k)}
            disabled={!k || disabled}
            className={`w-1/3 h-[62px] items-center justify-center rounded-[18px] ${k ? 'active:bg-primary-soft' : ''}`}
          >
            {k === 'del' ? (
              <Ionicons name="backspace-outline" size={24} color={colors.text} />
            ) : (
              <Text className="text-[26px] font-semibold text-ink">{k}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
