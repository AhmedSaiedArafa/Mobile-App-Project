import { View, Text } from 'react-native';
import { styles } from '../style';

const banks = {
  CIB: { label: 'CIB', bg: '#E8EEFF', color: '#1E4FBF' },
  'National Bank of Egypt': { label: 'NBE', bg: '#1C1B3A', color: '#FFFFFF' },
  'Banque Misr': { label: 'BM', bg: '#FDECEC', color: '#B3261E' },
  QNB: { label: 'QNB', bg: '#F3E8F7', color: '#7A1F8F' },
};

export function BankBadge({ bank, onDark }) {
  const look = banks[bank] || { label: bank.slice(0, 2).toUpperCase(), bg: '#EEEEEE', color: '#333333' };

  return (
    <View
      className={styles.bankBadge}
      style={{ backgroundColor: onDark ? 'rgba(255,255,255,0.2)' : look.bg }}
    >
      <Text className={styles.bankBadgeText} style={{ color: onDark ? '#FFFFFF' : look.color }}>
        {look.label}
      </Text>
    </View>
  );
}

export function StatusPill({ status }) {
  return <Text className={styles.statusPill}>{status}</Text>;
}
