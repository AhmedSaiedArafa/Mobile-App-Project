import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import BottomSheet from './BottomSheet';
import PinPad from './PinPad';

/** IPN PIN entry sheet (InstaPay confirms every payment with a 6-digit PIN). */
export default function PinSheet({ visible, onClose, onComplete, loading }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (!visible) setPin('');
  }, [visible]);

  return (
    <BottomSheet visible={visible} onClose={loading ? undefined : onClose}>
      <View className="items-center mb-[18px]">
        <View className="w-[52px] h-[52px] rounded-full items-center justify-center mb-3 bg-primary-soft">
          <Ionicons name="lock-closed" size={22} color={colors.primary} />
        </View>
        <Text className="text-lg font-bold text-ink">{t('pin.title')}</Text>
        <Text className="text-[13px] mt-1 text-center text-muted">{t('pin.sub')}</Text>
      </View>

      {loading ? (
        <View className="h-[300px] items-center justify-center">
          <ActivityIndicator color={colors.primary} size="large" />
          <Text className="text-[13px] mt-3 text-center text-muted">{t('pin.processing')}</Text>
        </View>
      ) : (
        <PinPad value={pin} onChange={setPin} onComplete={onComplete} />
      )}
    </BottomSheet>
  );
}
