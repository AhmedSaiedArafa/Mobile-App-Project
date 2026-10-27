import { Pressable, Text } from 'react-native';

type AppButtonProps = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
}

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}: AppButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={`h-[52px] items-center justify-center rounded-2xl active:opacity-70 ${
        isPrimary ? 'bg-primary' : 'border border-primarySoft bg-surface'
      } ${disabled ? 'opacity-40' : ''}`}
    >
      <Text className={`text-base font-semibold ${isPrimary ? 'text-white' : 'text-primary'}`}>
        {label}
      </Text>
    </Pressable>
  );
}