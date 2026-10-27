import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

const ICONS = {
  Home: ['home', 'home-outline'],
  Accounts: ['wallet', 'wallet-outline'],
  Payments: ['receipt', 'receipt-outline'],
  Profile: ['person', 'person-outline'],
};

/** Bottom bar from the main design: 4 tabs + raised centre "send" button. */
export default function TabBar({ state, navigation }) {
  const { colors } = useTheme();
  const { t, direction } = useI18n();
  const insets = useSafeAreaInsets();

  const tab = (route, index) => {
    const focused = state.index === index;
    const color = focused ? colors.tabActive : colors.textFaint;
    const [on, off] = ICONS[route.name];
    return (
      <Pressable
        key={route.key}
        onPress={() => {
          const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
        }}
        className="flex-1 items-center gap-1"
      >
        <Ionicons name={focused ? on : off} size={24} color={color} />
        <Text className={`text-xs ${focused ? 'font-bold' : 'font-medium'}`} style={{ color }}>
          {t(`tabs.${route.name}`)}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      className="flex-row pt-2.5 bg-tabbar border-t border-line rounded-t-[26px]"
      style={{ paddingBottom: Math.max(insets.bottom, 12), direction, boxShadow: '0 -6px 16px rgba(0,0,0,0.08)' }}
    >
      {state.routes.slice(0, 2).map((r, i) => tab(r, i))}
      <View className="w-[76px] items-center">
        <Pressable onPress={() => navigation.getParent()?.navigate('Transfer')} className="absolute -top-[38px] active:scale-95">
          <View className="w-16 h-16 rounded-full items-center justify-center bg-primary border-[5px] border-tabbar">
            <Ionicons name="paper-plane" size={26} color="#FFFFFF" />
          </View>
        </Pressable>
      </View>
      {state.routes.slice(2).map((r, i) => tab(r, i + 2))}
    </View>
  );
}
