import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AppButton from '@/components/ui/AppButton';
import Card from '@/components/ui/Card';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { BALANCE, RECIPIENT } from '../data/transferData';
import { formatMoney } from '@/utils/formatMoney';
import { useTransfer } from '../context/TransferContext';



export default function EnterTransferAmountScreen() {
  const insets = useSafeAreaInsets();
  const { setTransfer } = useTransfer();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

    const value = parseFloat(amount);
    
    const exceedsBalance = value > BALANCE;

    const canContinue = value > 0 && !exceedsBalance;

    function handleContinue() {
        setTransfer({ amount, note });
        router.push('/transfer/review');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-background">
          
           <View className="flex-1 gap-4 px-5" style={{ paddingTop: insets.top + 8 }}>
             <ScreenHeader title="Send Money" />

         <Card extraStyles="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-primarySoft">
            <Text className="font-bold text-primary"> {RECIPIENT.initials} </Text>
          </View>
          <View>
            <Text className="text-base font-bold text-text"> {RECIPIENT.name} </Text>
            <Text className="text-sm text-muted"> {RECIPIENT.ipa} </Text>
          </View>
        </Card>

         <Card extraStyles="items-center py-7">
          <Text className="text-sm text-muted">Enter amount</Text>
          <View className="my-2 flex-row items-baseline">
            <TextInput value={amount} onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ''))} placeholder="0.00" keyboardType="decimal-pad" accessibilityLabel="Transfer amount" className="min-w-[120px] text-center text-5xl font-bold text-primary"/>
            <Text className="ml-2 text-lg font-bold text-primary">EGP</Text>
          </View>
          <Text className="text-sm text-muted"> Available: {formatMoney(BALANCE)} EGP </Text>
          {exceedsBalance && ( <Text className="mt-2 text-sm text-danger"> This amount is more than your balance </Text>)}
          
        </Card>

        <Card>
          <Text className="text-sm text-muted">Note (optional)</Text>
          <TextInput value={note} onChangeText={setNote} placeholder="What is this for?" maxLength={60} accessibilityLabel="Transfer note" className="py-2 text-base text-text" />
        </Card>

        <View className="flex-1" />

        <View style={{ paddingBottom: insets.bottom + 16 }}>
          <AppButton label="Continue" onPress={handleContinue} disabled={!canContinue} />
        </View>
      </View>
    </KeyboardAvoidingView>
    );
}
