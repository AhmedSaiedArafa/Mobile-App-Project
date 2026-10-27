import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { isValidEgMobile } from '../../utils/format';
import { Button, LanguageSheet, PinPad, Screen, TextField } from '../../components';

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export default function LoginScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const { t, direction } = useI18n();
  const { login } = useAppState();
  const [mode, setMode] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('id');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const trimmedPhone = phone.replace(/\s/g, '');
  const trimmedEmail = email.trim();
  const idValid = mode === 'phone' ? isValidEgMobile(trimmedPhone) : isValidEmail(trimmedEmail);
  const displayId = mode === 'phone' ? trimmedPhone : trimmedEmail;

  const onContinue = () => {
    if (!idValid) return;
    setStep('pin');
    setPin('');
    setError(null);
  };

  const onPinComplete = (value) => {
    setError(null);
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (value === '000000') {
        setError(t('auth.wrongPin'));
        setPin('');
        return;
      }
      login();
    }, 1000);
  };

  const backToId = () => {
    setStep('id');
    setPin('');
    setError(null);
  };

  if (step === 'id') {
    return (
      <Screen scroll={false}>
        <View className="flex-row justify-between items-center mb-2">
          <View />
          <Pressable onPress={() => setLangOpen(true)} hitSlop={8} className="flex-row items-center gap-1.5 px-3 py-2 rounded-full border border-line bg-surface">
            <Ionicons name="language" size={18} color={colors.primary} />
            <Text className="text-[13px] font-semibold text-ink">{t('auth.lang')}</Text>
          </Pressable>
        </View>

        <View className="flex-1 justify-center">
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-[26px] items-center justify-center bg-primary mb-4">
              <Ionicons name="flash" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-[28px] font-extrabold text-ink">SwiftFlow</Text>
            <Text className="text-sm mt-1.5 text-muted">{t('auth.tagline')}</Text>
          </View>

          <View className="flex-row rounded-2xl p-1 mb-5 bg-surface-alt">
            <Pressable onPress={() => setMode('phone')} className={`flex-1 py-2.5 rounded-xl items-center ${mode === 'phone' ? 'bg-surface' : ''}`}>
              <Text className={`text-[13.5px] font-bold ${mode === 'phone' ? 'text-primary' : 'text-muted'}`}>{t('auth.phoneTab')}</Text>
            </Pressable>
            <Pressable onPress={() => setMode('email')} className={`flex-1 py-2.5 rounded-xl items-center ${mode === 'email' ? 'bg-surface' : ''}`}>
              <Text className={`text-[13.5px] font-bold ${mode === 'email' ? 'text-primary' : 'text-muted'}`}>{t('auth.emailTab')}</Text>
            </Pressable>
          </View>

          {mode === 'phone' ? (
            <TextField
              label={t('auth.phone')}
              placeholder="01X XXXX XXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={11}
              icon="phone-portrait-outline"
              className="mb-2"
            />
          ) : (
            <TextField
              label={t('auth.email')}
              placeholder={t('auth.emailPh')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon="mail-outline"
              className="mb-2"
            />
          )}
          <Text className="text-xs mb-6 text-muted">
            {mode === 'phone' ? t('auth.phoneHint') : t('auth.emailHint')}
          </Text>

          <Button title={t('auth.login')} onPress={onContinue} disabled={!idValid} />

          <View className="flex-row items-center justify-center mt-6 gap-1">
            <Text className="text-sm text-muted">{t('auth.noAccount')}</Text>
            <Pressable onPress={() => navigation.navigate('SignUp')} hitSlop={8}>
              <Text className="text-sm font-bold text-primary">{t('auth.signUp')}</Text>
            </Pressable>
          </View>
        </View>

        <LanguageSheet visible={langOpen} onClose={() => setLangOpen(false)} />
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View className="flex-row items-center px-1 pt-1.5 pb-3" style={{ direction: 'ltr' }}>
        <Pressable onPress={backToId} hitSlop={8} className="w-11 h-11 items-center justify-center rounded-full border bg-surface border-line">
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
      </View>

      <View className="items-center mt-4 mb-2">
        <View className="w-[60px] h-[60px] rounded-full items-center justify-center mb-3 bg-primary-soft">
          <Ionicons name="lock-closed" size={24} color={colors.primary} />
        </View>
        <Text className="text-xl font-extrabold text-ink">{t('auth.enterPin')}</Text>
        <Text className="text-[13px] mt-1.5 text-center text-muted">{t('auth.enterPinSub')}</Text>
        <View className="flex-row items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-surface-alt">
          <Ionicons name={mode === 'phone' ? 'phone-portrait' : 'mail'} size={14} color={colors.textMuted} />
          <Text className="text-[13px] font-semibold text-muted">{displayId}</Text>
        </View>
      </View>

      <View className="flex-1 justify-end">
        {busy ? (
          <View className="h-[330px] items-center justify-center">
            <View className="w-12 h-12 rounded-full items-center justify-center bg-primary-soft">
              <Ionicons name="sync" size={24} color={colors.primary} />
            </View>
            <Text className="text-[13px] mt-3 text-muted">{t('auth.verifying')}</Text>
          </View>
        ) : (
          <PinPad value={pin} onChange={(v) => { if (error) setError(null); setPin(v); }} onComplete={onPinComplete} error={error} />
        )}
        <Pressable onPress={() => navigation.navigate('HelpSupport')} hitSlop={8} className="self-center mt-2 mb-3">
          <Text className="font-bold text-on-soft">{t('auth.forgotPin')}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
