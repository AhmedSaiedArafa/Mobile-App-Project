import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

export default function BottomSheet({ visible, onClose, title, children, scroll = false }) {
  const { themeVars } = useTheme();
  const insets = useSafeAreaInsets();
  const { direction } = useI18n();
  const Body = scroll ? ScrollView : View;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      {/* A Modal renders outside the app root, so it gets the theme variables again here. */}
      <View className="flex-1" style={[themeVars, { direction }]}>
        <Pressable className="absolute inset-0 bg-overlay" onPress={onClose} />
        <View className="flex-1 justify-end" pointerEvents="box-none">
          <View className="bg-surface rounded-t-[28px] px-5 pt-2.5" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
            <View className="self-center w-11 h-[5px] rounded-full bg-line mb-3.5" />
            {title ? <Text className="text-lg font-bold text-ink mb-3">{title}</Text> : null}
            <Body className={scroll ? 'max-h-[460px]' : ''} showsVerticalScrollIndicator={false}>
              {children}
            </Body>
          </View>
        </View>
      </View>
    </Modal>
  );
}
