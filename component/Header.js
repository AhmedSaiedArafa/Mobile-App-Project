import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../style';

export default function Header({ title, subtitle, onBack }) {
  const insets = useSafeAreaInsets();

  return (
    <View className={styles.headerRow} style={{ paddingTop: insets.top + 12 }}>
      {onBack && (
        <Pressable className={styles.backButton} onPress={onBack} accessibilityLabel="Back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
      )}
      <View>
        <Text className={styles.headerTitle}>{title}</Text>
        {subtitle ? <Text className={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
