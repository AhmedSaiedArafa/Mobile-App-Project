import { useContext, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AccountsContext, formatMoney, maskNumber } from '../context/AccountsContext';
import Header from '../component/Header';
import { BankBadge, StatusPill } from '../component/Badges';
import { styles, colors } from '../style';

function InfoRow({ label, value, last, children }) {
  return (
    <View className={`${styles.infoRow} ${last ? '' : styles.infoRowBorder}`}>
      <Text className={styles.infoLabel}>{label}</Text>
      {children || <Text className={styles.infoValue}>{value}</Text>}
    </View>
  );
}

export default function AccountDetailsScreen({ route, navigation }) {
  const { accounts } = useContext(AccountsContext);
  const [showBalance, setShowBalance] = useState(true);
  const [showNumber, setShowNumber] = useState(false);

  const account = accounts.find((a) => a.id === route.params.accountId);

  if (!account) {
    return (
      <View className={styles.screen}>
        <Header title="Account Details" onBack={() => navigation.goBack()} />
        <Text className={styles.syncedText}>Account not found.</Text>
      </View>
    );
  }

  return (
    <View className={styles.screen}>
      <Header
        title="Account Details"
        subtitle={`${account.bank} · ${account.type}`}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerClassName={styles.detailsContent}>
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={styles.gradientCard}
        >
          <View className={styles.heroTop}>
            <BankBadge bank={account.bank} onDark />
            <View className={styles.heroNames}>
              <Text className={styles.heroBank}>{account.bank}</Text>
              <Text className={styles.heroType}>{account.type} Account</Text>
            </View>
            <StatusPill status={account.status} />
          </View>
          <Text className={styles.heroLabel}>Available balance</Text>
          <View className={styles.heroRow}>
            <Text className={styles.heroBalance}>
              {showBalance ? formatMoney(account.balance) : '••••••'}{' '}
              <Text className={styles.cardCurrency}>{account.currency}</Text>
            </Text>
            <Pressable onPress={() => setShowBalance(!showBalance)} hitSlop={12}>
              <Ionicons name={showBalance ? 'eye-outline' : 'eye-off-outline'} size={22} color={colors.white} />
            </Pressable>
          </View>
        </LinearGradient>

        <View className={styles.infoCard}>
          <Text className={styles.infoTitle}>Account information</Text>
          <InfoRow label="Account holder" value={account.holder} />
          <InfoRow label="Account number">
            <View className={styles.numberRow}>
              <Text className={styles.infoValue}>
                {showNumber ? account.number : maskNumber(account.number)}
              </Text>
              <Pressable onPress={() => setShowNumber(!showNumber)} hitSlop={12}>
                <Ionicons
                  name={showNumber ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.primary}
                  style={{ marginLeft: 8 }}
                />
              </Pressable>
            </View>
          </InfoRow>
          <InfoRow label="Account type" value={account.type} />
          <InfoRow label="Currency" value={account.currency} />
          <InfoRow label="Status">
            <StatusPill status={account.status} />
          </InfoRow>
          <InfoRow label="Linked on" value={account.linkedOn} last />
        </View>
        <Text className={styles.syncedText}>Last synced just now</Text>
      </ScrollView>
    </View>
  );
}
