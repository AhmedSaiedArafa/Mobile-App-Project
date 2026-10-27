import { Text, View } from 'react-native';

type DetailRowProps = {
  label: string;
  value: string;
};

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View className="flex-row items-center justify-between py-2">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="ml-4 flex-shrink text-right text-sm font-semibold text-text">
        {value}
      </Text>
    </View>
  );
}