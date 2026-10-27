import { Pressable, Text, View } from 'react-native';

import IconPlaceholder from '@/components/ui/IconPlaceholder';
import { TYPE_ICON_LABELS, type Transaction, signedAmount } from '../data/transactions';
import StatusPill from './StatusPill';

type TransactionRowProps = {
  item: Transaction;
  onPress: () => void;
};

export default function TransactionRow({ item, onPress }: TransactionRowProps) {
  const isReceived = item.type === 'received';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between py-3 active:opacity-70"
    >
      <View className="flex-1 flex-row items-center gap-3">
        <IconPlaceholder
          label={TYPE_ICON_LABELS[item.type]}
          size={44}
          tone={isReceived ? 'success' : 'primary'}
        />
        <View className="flex-1">
          <Text className="text-sm font-bold text-text">{item.title}</Text>
          <Text className="text-xs text-muted">{item.subtitle}</Text>
        </View>
      </View>

      <View className="ml-3 items-end gap-1">
        <Text className={`text-sm font-bold ${isReceived ? 'text-success' : 'text-text'}`}>
          {signedAmount(item)}
        </Text>
        <StatusPill />
      </View>
    </Pressable>
  );
}
