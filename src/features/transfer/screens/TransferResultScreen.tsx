import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/ui/AppButton';
import Card from '@/components/ui/Card';
import DetailRow from '@/components/ui/DetailRow';
import IconPlaceholder from '@/components/ui/IconPlaceholder';
import { RECIPIENT } from '../data/transferData';
import { formatMoney } from '@/utils/formatMoney';
import { useTransfer } from '../context/TransferContext';

export default function TransferResultScreen() {
  const insets = useSafeAreaInsets();
  const { amount } = useTransfer();
  const amountValue = parseFloat(amount) || 0;

  return (
    <View
      className="flex-1 gap-4 bg-background px-5"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }}
    >
      <View className="flex-1 items-center justify-center gap-2">
        <IconPlaceholder label="Success" size={80} tone="success" shape="circle" />
        <Text className="mt-2 text-2xl font-bold text-text">Transfer Successful</Text>
        <Text className="text-center text-sm text-muted">
          Your money is on its way to {RECIPIENT.name}
        </Text>
        <Text className="text-3xl font-bold text-primary">
          {formatMoney(amountValue)} EGP
        </Text>
      </View>

      <Card>
        <DetailRow label="Reference" value="TRX-20261026-4821" />
        <DetailRow label="Date" value="Oct 26, 2026 • 2:30 PM" />
        <DetailRow label="To" value={RECIPIENT.ipa} />
        <DetailRow label="Status" value="Completed" />
      </Card>

      <View className="gap-3">
        <AppButton
          label="Done"
          onPress={() => router.replace('/history')}
        />
        <AppButton label="Share Receipt" onPress={() => {}} variant="outline" />
      </View>
    </View>
  );
}
