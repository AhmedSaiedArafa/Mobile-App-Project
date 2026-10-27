import { Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/ui/AppButton';
import Card from '@/components/ui/Card';
import DetailRow from '@/components/ui/DetailRow';
import IconPlaceholder from '@/components/ui/IconPlaceholder';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { formatMoney } from '@/utils/formatMoney';
import StatusPill from '../components/StatusPill';
import { TRANSACTIONS, TYPE_ICON_LABELS, signedAmount } from '../data/transactions';

export default function TransactionDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const rawId = Array.isArray(id) ? id[0] : id;
  const transactionId = rawId?.trim();
  const item = TRANSACTIONS.find((transaction) => transaction.id === transactionId);

  return (
    <View
      className="flex-1 gap-4 bg-background px-5"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }}
    >
      <ScreenHeader title="Details" />

      {!item ? (
        <Text className="mt-10 text-center text-base text-muted">
          {transactionId
            ? `Transaction "${transactionId}" not found.`
            : 'Transaction ID is missing.'}
        </Text>
      ) : (
        <>
          <Card extraStyles="items-center gap-2 py-6">
            <IconPlaceholder
              label={TYPE_ICON_LABELS[item.type]}
              size={56}
              tone={item.type === 'received' ? 'success' : 'primary'}
              shape="circle"
            />
            <Text className="text-sm font-bold text-text">{item.title}</Text>
            <Text className="text-3xl font-bold text-text">{signedAmount(item)}</Text>
            <StatusPill />
          </Card>

          <Card>
            <DetailRow label="Reference" value={item.reference} />
            <DetailRow label="Date" value={item.date} />
            <DetailRow label="From" value={item.from} />
            <DetailRow label="To" value={item.to} />
            <DetailRow label="Method" value={item.method} />
            <DetailRow label="Fee" value={`${formatMoney(item.fee)} EGP`} />
          </Card>

          <View className="flex-1" />

          <AppButton label="Share Receipt" onPress={() => {}} />
          <Pressable className="items-center py-3">
            <Text className="text-sm font-semibold text-primary">Report a problem</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
