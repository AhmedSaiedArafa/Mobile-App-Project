import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconPlaceholder from '@/components/ui/IconPlaceholder';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { RECIPIENT } from '../data/transferData';
import { formatMoney } from '@/utils/formatMoney';
import { useTransfer } from '../context/TransferContext';

const PIN_LENGTH = 6;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'] as const;
type KeypadKey = (typeof KEYS)[number];


export default function ConfirmTransferScreen() {
  const insets = useSafeAreaInsets();
  const { amount } = useTransfer();
  const [pin, setPin] = useState('');

  const amountValue = parseFloat(amount) || 0;

  function handleKey(key: KeypadKey) {
    if (key === 'delete') {
      setPin(pin.slice(0, -1));
      return;
    } else if (pin.length === PIN_LENGTH) {
        return;
    }
    const newPin = pin + key;
    setPin(newPin);
    if (newPin.length === PIN_LENGTH) {
      router.replace('/transfer/result');
    }
  }

  return (
    <View
      className="flex-1 gap-4 bg-background px-5"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }}
    >
      <ScreenHeader title="Confirm Transfer" />

      <View className="items-center">
        <Text className="text-xl font-bold text-text">Enter your PIN</Text>
        <Text className="mt-1 text-center text-sm text-muted">
          to send {formatMoney(amountValue)} EGP to {RECIPIENT.name}
        </Text>
      </View>

      <View className="my-4 flex-row justify-center gap-3">
        {Array.from({ length: PIN_LENGTH }).map((_, index) => (
          <View
            key={index}
            className={`h-4 w-4 rounded-full ${
              index < pin.length ? 'bg-primary' : 'bg-primarySoft'
            }`}
          />
        ))}
      </View>

      <View className="flex-row flex-wrap px-3">
        {KEYS.map((key, index) =>
          key === '' ? (
            <View key={index} className="w-1/3" />
          ) : (
            <View key={index} className="w-1/3 p-1.5">
              <Pressable
                onPress={() => handleKey(key)}
                accessibilityRole="button"
                accessibilityLabel={key === 'delete' ? 'Delete last PIN digit' : key}
                className="h-16 items-center justify-center rounded-2xl bg-surface active:opacity-70"
              >
                {key === 'delete' ? (
                  <IconPlaceholder label="Delete" size={48} />
                ) : (
                  <Text className="text-2xl font-semibold text-text">{key}</Text>
                )}
              </Pressable>
            </View>
          )
        )}
      </View>

      <Pressable className="items-center py-3">
        <Text className="text-sm font-semibold text-primary">Forgot PIN?</Text>
      </Pressable>
    </View>
  );
}
