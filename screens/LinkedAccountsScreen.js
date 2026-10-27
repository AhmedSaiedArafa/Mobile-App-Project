import { useContext, useState } from 'react';
import { View, Text, FlatList, Pressable, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AccountsContext, formatMoney } from '../context/AccountsContext';
import Header from '../component/Header';
import AccountCard from '../component/AccountCard';
import PrimaryButton from '../component/PrimaryButton';
import { styles, colors } from '../style';

export default function LinkedAccountsScreen({ navigation }) {
  const { accounts } = useContext(AccountsContext);
  const [showBalance, setShowBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const summary = (
    <LinearGradient
      colors={colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={styles.gradientCard}
    >
      <View className={styles.cardTop}>
        <Text className={styles.cardLabel}>Total Balance</Text>
        <Pressable onPress={() => setShowBalance(!showBalance)} hitSlop={12}>
          <Ionicons name={showBalance ? 'eye-outline' : 'eye-off-outline'} size={22} color={colors.white} />
        </Pressable>
      </View>
      <Text className={styles.cardAmount}>
        {showBalance ? formatMoney(total) : '••••••'} <Text className={styles.cardCurrency}>EGP</Text>
      </Text>
      <Text className={styles.cardPill}>
        {accounts.length} linked {accounts.length === 1 ? 'account' : 'accounts'}
      </Text>
    </LinearGradient>
  );

  const addTile = (
    <Pressable className={styles.linkTile} onPress={() => navigation.navigate('AddBankAccount')}>
      <Text className={styles.linkTileText}>+ Link another account</Text>
    </Pressable>
  );

  const empty = (
    <View className={styles.empty}>
      <Ionicons name="wallet-outline" size={48} color={colors.muted} />
      <Text className={styles.emptyText}>No linked accounts yet</Text>
    </View>
  );

  return (
    <View className={styles.screen}>
      <Header
        title="Linked Accounts"
        subtitle="Manage your connected banks"
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      />
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        contentContainerClassName={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={summary}
        ListEmptyComponent={empty}
        ListFooterComponent={addTile}
        renderItem={({ item }) => (
          <AccountCard
            account={item}
            onPress={() => navigation.navigate('AccountDetails', { accountId: item.id })}
          />
        )}
      />
      <PrimaryButton
        title="Add Bank Account"
        icon="add"
        onPress={() => navigation.navigate('AddBankAccount')}
      />
    </View>
  );
}
