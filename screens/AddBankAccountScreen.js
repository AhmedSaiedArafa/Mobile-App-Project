import { useContext, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AccountsContext, BANKS, ACCOUNT_TYPES } from '../context/AccountsContext';
import Header from '../component/Header';
import PrimaryButton from '../component/PrimaryButton';
import { FormField, ChipSelector, SegmentedControl } from '../component/FormInputs';
import { styles, colors } from '../style';

export default function AddBankAccountScreen({ navigation }) {
  const { addAccount, accountExists } = useContext(AccountsContext);

  const [bank, setBank] = useState('');
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('Savings');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const clearError = (field) => setErrors({ ...errors, [field]: '' });

  const validate = () => {
    const newErrors = {};
    if (!bank) newErrors.bank = 'Please select a bank';
    if (holder.trim().length < 3) newErrors.holder = 'Enter the full account holder name';
    if (!/^\d{10,16}$/.test(number)) newErrors.number = 'Account number must be 10–16 digits';
    else if (accountExists(number)) newErrors.number = 'This account is already linked';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      addAccount({
        bank,
        holder: holder.trim(),
        number,
        type,
        balance: Math.floor(Math.random() * 50000),
      });
      setLoading(false);
      Alert.alert('Account added', `${bank} account linked successfully.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1200);
  };

  return (
    <KeyboardAvoidingView className={styles.screen} behavior="padding">
      <Header title="Add Bank Account" subtitle="Link a new account" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerClassName={styles.formContent} keyboardShouldPersistTaps="handled">
        <ChipSelector
          label="Bank"
          options={BANKS}
          value={bank}
          onChange={(b) => {
            setBank(b);
            clearError('bank');
          }}
          error={errors.bank}
        />
        <FormField
          label="Account holder name"
          placeholder="As written on your bank card"
          value={holder}
          onChangeText={(text) => {
            setHolder(text);
            clearError('holder');
          }}
          autoCapitalize="words"
          error={errors.holder}
        />
        <FormField
          label="Account number"
          placeholder="10–16 digits"
          value={number}
          onChangeText={(text) => {
            setNumber(text.replace(/\D/g, ''));
            clearError('number');
          }}
          keyboardType="number-pad"
          maxLength={16}
          error={errors.number}
        />
        <SegmentedControl label="Account type" options={ACCOUNT_TYPES} value={type} onChange={setType} />

        <View className={styles.noteBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          <Text className={styles.noteText}>Your details are encrypted and verified with your bank.</Text>
        </View>
      </ScrollView>
      <PrimaryButton title="Validate & Add Account" loading={loading} onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
}
