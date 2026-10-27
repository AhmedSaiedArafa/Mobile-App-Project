import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import BottomSheet from './BottomSheet';

export const LANGUAGES = [
  { id: 'en', label: 'English', sub: 'English' },
  { id: 'ar', label: 'العربية', sub: 'Arabic' },
];

export const languageLabel = (id) => LANGUAGES.find((l) => l.id === id)?.label;

/** Bottom sheet listing the app languages; picking one applies it and closes the sheet. */
export default function LanguageSheet({ visible, onClose }) {
  const { colors } = useTheme();
  const { t, lang, setLang } = useI18n();

  return (
    <BottomSheet visible={visible} onClose={onClose} title={t('settings.language')}>
      {LANGUAGES.map((l) => {
        const active = lang === l.id;
        return (
          <Pressable
            key={l.id}
            onPress={() => {
              setLang(l.id);
              onClose();
            }}
            className={`flex-row items-center gap-3.5 p-3.5 rounded-2xl border mb-2.5 active:opacity-70 ${
              active ? 'border-primary bg-primary-soft' : 'border-line'
            }`}
          >
            <View className={`w-10 h-10 rounded-full items-center justify-center ${active ? 'bg-primary' : 'bg-field'}`}>
              <Text className={`text-[13px] font-extrabold ${active ? 'text-white' : 'text-muted'}`}>{l.id.toUpperCase()}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-ink">{l.label}</Text>
              <Text className="text-[12.5px] mt-0.5 text-muted">{l.sub}</Text>
            </View>
            <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={22} color={active ? colors.primary : colors.textFaint} />
          </Pressable>
        );
      })}
    </BottomSheet>
  );
}
