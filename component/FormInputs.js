import { View, Text, TextInput, Pressable } from 'react-native';
import { styles, colors } from '../style';

export function FormField({ label, error, ...inputProps }) {
  return (
    <View className={styles.field}>
      <Text className={styles.fieldLabel}>{label}</Text>
      <TextInput
        className={`${styles.input} ${error ? styles.inputError : styles.inputOk}`}
        placeholderTextColor={colors.muted}
        {...inputProps}
      />
      {error ? <Text className={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function ChipSelector({ label, options, value, onChange, error }) {
  return (
    <View className={styles.field}>
      <Text className={styles.fieldLabel}>{label}</Text>
      <View className={styles.chipRow}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <Pressable
              key={option}
              className={`${styles.chip} ${selected ? styles.chipOn : styles.chipOff}`}
              onPress={() => onChange(option)}
            >
              <Text className={`${styles.chipText} ${selected ? styles.chipTextOn : styles.chipTextOff}`}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text className={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function SegmentedControl({ label, options, value, onChange }) {
  return (
    <View className={styles.field}>
      <Text className={styles.fieldLabel}>{label}</Text>
      <View className={styles.segmentTrack}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <Pressable
              key={option}
              className={`${styles.segment} ${selected ? styles.segmentOn : styles.segmentOff}`}
              onPress={() => onChange(option)}
            >
              <Text
                className={`${styles.segmentText} ${selected ? styles.segmentTextOn : styles.segmentTextOff}`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
