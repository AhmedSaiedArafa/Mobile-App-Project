import type { ReactNode } from 'react';
import { View } from 'react-native';

type CardProps = { children: ReactNode; extraStyles?: string };

export default function Card({ children, extraStyles = '' }: CardProps) {
  return (
    <View className={`rounded-2xl bg-surface p-4 shadow-sm ${extraStyles}`}>
      {children}
    </View>
  );
}
