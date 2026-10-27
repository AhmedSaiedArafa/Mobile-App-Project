import { Text, View } from 'react-native';

type IconPlaceholderProps = {
  label: string;
  size: number;
  tone?: 'primary' | 'success';
  shape?: 'rounded' | 'circle';
};

export default function IconPlaceholder({
  label,
  size,
  tone = 'primary',
  shape = 'rounded',
}: IconPlaceholderProps) {
  const toneStyles = tone === 'success'
    ? 'border-success bg-successSoft'
    : 'border-primary bg-primarySoft';
  const textToneStyles = tone === 'success' ? 'text-success' : 'text-primary';

  return (
    <View
      accessible
      accessibilityLabel={`${label} icon placeholder`}
      className={`items-center justify-center border-dashed ${toneStyles}`}
      style={{
        width: size,
        height: size,
        borderWidth: 1,
        borderRadius: shape === 'circle' ? size / 2 : 12,
      }}
    >
      <Text className={`text-[8px] font-bold leading-3 ${textToneStyles}`}>ICON</Text>
      <Text
        adjustsFontSizeToFit
        className={`px-0.5 text-center text-[9px] font-semibold leading-3 ${textToneStyles}`}
        minimumFontScale={0.65}
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );
}
