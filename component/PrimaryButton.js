import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../style';

export default function PrimaryButton({ title, icon, onPress, loading }) {
  const insets = useSafeAreaInsets();

  return (
    <View className={styles.footer} style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
      <Pressable className={styles.footerPress} onPress={onPress} disabled={loading}>
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={styles.footerButton}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              {icon && <Ionicons name={icon} size={20} color={colors.white} />}
              <Text className={styles.footerText}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}
