import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import IconPlaceholder from './IconPlaceholder';

type ScreenHeaderProps = {
  title: string;
};

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() => router.back()}
        className="h-11 w-11 items-center justify-center rounded-full bg-surface"
      >
        <IconPlaceholder label="Back" size={44} shape="circle" />
      </Pressable>
      <Text className="text-lg font-bold text-text">{title}</Text>
      <View className="w-11" />
    </View>
  );
}