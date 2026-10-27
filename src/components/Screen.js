import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

/**
 * Base layout: themed background, safe area, optional scroll and a sticky footer
 * (used for primary actions such as "Continue").
 */
export default function Screen({ children, header, footer, scroll = true, contentClassName = '' }) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { direction } = useI18n();

  return (
    <View className="flex-1 bg-canvas" style={{ direction }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />
      <SafeAreaView edges={['top']} className="flex-1">
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {header}
          {scroll ? (
            <ScrollView
              className="flex-1"
              contentContainerClassName={`px-5 pt-2 pb-8 ${contentClassName}`}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          ) : (
            <View className={`flex-1 px-5 pt-2 pb-8 ${contentClassName}`}>{children}</View>
          )}
          {footer ? (
            <View
              className="px-5 pt-3.5 bg-surface border-t border-line rounded-t-3xl"
              style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            >
              {footer}
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
