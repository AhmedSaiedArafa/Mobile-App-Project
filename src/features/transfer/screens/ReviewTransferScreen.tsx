import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/ui/AppButton';
import Card from '@/components/ui/Card';
import DetailRow from '@/components/ui/DetailRow';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { ACCOUNT, FEE, RECIPIENT } from '../data/transferData';
import { formatMoney } from '@/utils/formatMoney';
import { useTransfer } from '../context/TransferContext';
import { router } from 'expo-router';

export default function ReviewTransferScreen() {
  const insets = useSafeAreaInsets();
  const { amount, note } = useTransfer();

  const amountValue = parseFloat(amount) || 0;
  const total = amountValue + FEE;

  function handleConfirm() {
    router.push('/transfer/confirm');
  }

  return (
    <View className="flex-1 gap-4 bg-background px-5" style={{ paddingTop: insets.top + 8 }}>
      <ScreenHeader title="Review Transfer" />

      <Card extraStyles="items-center py-6">
        <Text className="text-sm text-muted">You are sending</Text>
        <Text className="mt-1 text-4xl font-bold text-primary">
          {formatMoney(amountValue)} EGP
        </Text>
      </Card>

      <Card>
        <DetailRow label="From" value={`${ACCOUNT.name} ••${ACCOUNT.last4}`} />
        <DetailRow label="To" value={RECIPIENT.name} />
        <DetailRow label="IPA" value={RECIPIENT.ipa} />
        <DetailRow label="Note" value={note || 'None'} />
        <DetailRow label="Fee" value={`${formatMoney(FEE)} EGP`} />
        <View className="mt-2 flex-row items-center justify-between border-t border-primarySoft pt-3">
          <Text className="text-base font-bold text-text">Total</Text>
          <Text className="text-lg font-bold text-primary">
            {formatMoney(total)} EGP
          </Text>
        </View>
      </Card>

      <View className="flex-1" />

      <View className="gap-3" style={{ paddingBottom: insets.bottom + 16 }}>
        <AppButton label="Confirm & Continue" onPress={handleConfirm} />
        <AppButton label="Edit Details" onPress={() => router.back()} variant="outline" />
      </View>
    </View>
  );
}
