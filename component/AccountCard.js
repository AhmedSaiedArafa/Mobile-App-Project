import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BankBadge, StatusPill } from './Badges';
import { formatMoney, maskNumber } from '../context/AccountsContext';
import { styles, colors } from '../style';

export default function AccountCard({ account, onPress }) {
  return (
    <Pressable className={styles.accountCard} onPress={onPress}>
      <BankBadge bank={account.bank} />
      <View className={styles.accountInfo}>
        <Text className={styles.accountBank}>{account.bank}</Text>
        <Text className={styles.accountSub}>
          {account.type} · {maskNumber(account.number)}
        </Text>
      </View>
      <View className={styles.accountRight}>
        <Text className={styles.accountBalance}>
          {formatMoney(account.balance)} {account.currency}
        </Text>
        <StatusPill status={account.status} />
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} />
    </Pressable>
  );
}
