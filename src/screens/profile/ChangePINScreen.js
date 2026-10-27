import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { Button, Header, PinPad, Screen, StepProgress } from '../../components';

const COPY = ['current', 'new', 'confirm'];

const isWeak = (pin) => /^(\d)\1{5}$/.test(pin) || '0123456789'.includes(pin) || '9876543210'.includes(pin);

export default function ChangePINScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const steps = [t('changePIN.steps.current'), t('changePIN.steps.new'), t('changePIN.steps.confirm')];
  const [step, setStep] = useState(0);
  const [pin, setPin] = useState('');
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const fail = (msg) => {
    setError(msg);
    setTimeout(() => setPin(''), 350);
  };

  const onComplete = (value) => {
    setError(null);
    if (step === 0) {
      setBusy(true);
      // Simulated check against the backend. 000000 is treated as wrong to demo the error.
      setTimeout(() => {
        setBusy(false);
        if (value === '000000') return fail('changePIN.incorrect');
        setCurrent(value);
        setPin('');
        setStep(1);
      }, 700);
    } else if (step === 1) {
      if (value === current) return fail('changePIN.same');
      if (isWeak(value)) return fail('changePIN.weak');
      setNext(value);
      setPin('');
      setStep(2);
    } else {
      if (value !== next) return fail('changePIN.mismatch');
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setDone(true);
      }, 900);
    }
  };

  const back = () => {
    if (step === 0 || done) return navigation.goBack();
    setError(null);
    setPin('');
    setStep(step - 1);
  };

  if (done) {
    return (
      <Screen footer={<Button title={t('common.done')} onPress={() => navigation.goBack()} />} scroll={false}>
        <View className="flex-1 items-center justify-center px-2.5">
          <View className="w-[150px] h-[150px] rounded-full items-center justify-center bg-success-soft">
            <View className="w-[88px] h-[88px] rounded-full items-center justify-center bg-success">
              <Ionicons name="checkmark" size={44} color="#FFFFFF" />
            </View>
          </View>
          <Text className="text-2xl font-extrabold mt-[22px] text-ink">{t('changePIN.doneTitle')}</Text>
          <Text className="text-sm mt-2 text-center leading-5 text-muted">{t('changePIN.doneText')}</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={<Header title={t('changePIN.title')} onBack={back} />} scroll={false}>
      <StepProgress steps={steps} current={step} />

      <View className="items-center mt-4">
        <View className="w-[60px] h-[60px] rounded-full items-center justify-center mb-3.5 bg-primary-soft">
          <Ionicons name={step === 0 ? 'lock-closed' : 'key'} size={24} color={colors.primary} />
        </View>
        <Text className="text-xl font-extrabold text-ink">{t(`changePIN.${COPY[step]}Title`)}</Text>
        <Text className="text-[13.5px] mt-1.5 text-center px-5 leading-[19px] text-muted">{t(`changePIN.${COPY[step]}Sub`)}</Text>
      </View>

      <View className="flex-1 justify-end">
        {busy ? (
          <View className="h-[330px] items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <PinPad
            value={pin}
            onChange={(v) => {
              if (error) setError(null);
              setPin(v);
            }}
            onComplete={onComplete}
            error={error ? t(error) : null}
          />
        )}
        {step === 0 ? (
          <Pressable onPress={() => navigation.navigate('HelpSupport')} hitSlop={8} className="self-center mt-2 mb-3">
            <Text className="font-bold text-on-soft">{t('changePIN.forgot')}</Text>
          </Pressable>
        ) : null}
      </View>
    </Screen>
  );
}
