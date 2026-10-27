import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { isValidEgMobile } from '../../utils/format';
import { Button, Header, PinPad, Screen, StepProgress, TextField } from '../../components';

const STEPS = ['info', 'otp', 'pin', 'done'];
const OTP_LENGTH = 6;
const OTP_TIMEOUT = 60;

// Screen
export default function SignUpScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { login } = useAppState();
  const [step, setStep] = useState(0);

  // Step labels
  const stepLabels = [t('auth.steps.info'), t('auth.steps.verify'), t('auth.steps.pin'), t('auth.steps.done')];

  // State — personal info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [touched, setTouched] = useState({});

  // State — OTP
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(null);
  const [countdown, setCountdown] = useState(OTP_TIMEOUT);
  const [otpBusy, setOtpBusy] = useState(false);

  // State — PIN
  const [pin, setPin] = useState('');
  const [pinStep, setPinStep] = useState('create');
  const [firstPin, setFirstPin] = useState('');
  const [pinError, setPinError] = useState(null);

  // State — done
  const scale = useRef(new Animated.Value(0.4)).current;

  // Validation — info
  const nameValid = fullName.trim().split(' ').filter(Boolean).length >= 2;
  const phoneValid = isValidEgMobile(phone.replace(/\D/g, ''));
  const idValid = /^\d{14}$/.test(nationalId.replace(/\s/g, ''));
  const infoValid = nameValid && phoneValid && idValid;

  // OTP countdown
  useEffect(() => {
    if (step !== 1) return;
    setCountdown(OTP_TIMEOUT);
    const timer = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [step]);

  // Done animation
  useEffect(() => {
    if (step === 3) {
      Animated.spring(scale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }).start();
    }
  }, [step, scale]);

  const touch = (field) => setTouched((p) => ({ ...p, [field]: true }));

  // Handlers
  const submitInfo = () => {
    setTouched({ name: true, phone: true, id: true });
    if (!infoValid) return;
    setStep(1);
  };

  const submitOtp = () => {
    setOtpError(null);
    setOtpBusy(true);
    setTimeout(() => {
      setOtpBusy(false);
      if (otp === '000000') {
        setOtpError(t('auth.otpInvalid'));
        setOtp('');
        return;
      }
      setStep(2);
    }, 800);
  };

  const resendOtp = () => {
    setCountdown(OTP_TIMEOUT);
    setOtp('');
    setOtpError(null);
  };

  const isWeak = (p) => /^(\d)\1{5}$/.test(p) || '0123456789'.includes(p) || '9876543210'.includes(p);

  const onPinComplete = (value) => {
    setPinError(null);
    if (pinStep === 'create') {
      if (isWeak(value)) {
        setPinError(t('auth.pinWeak'));
        setPin('');
        return;
      }
      setFirstPin(value);
      setPinStep('confirm');
      setPin('');
    } else {
      if (value !== firstPin) {
        setPinError(t('auth.pinMismatch'));
        setPin('');
        return;
      }
      setStep(3);
    }
  };

  const back = () => {
    if (step === 0) return navigation.goBack();
    if (step === 2 && pinStep === 'confirm') {
      setPinStep('create');
      setPin('');
      setPinError(null);
      return;
    }
    setStep(step - 1);
  };

  // Render — Step 0: Personal info
  if (step === 0) {
    return (
      <Screen
        header={<Header title={t('auth.signUpTitle')} subtitle={t('auth.signUpSubtitle')} />}
        footer={<Button title={t('common.continue')} onPress={submitInfo} disabled={!infoValid} />}
        scroll
        keyboardAvoiding
      >
        <StepProgress steps={stepLabels} current={0} />

        <TextField
          label={t('auth.fullName')}
          placeholder={t('auth.fullNamePh')}
          value={fullName}
          onChangeText={setFullName}
          onBlur={() => touch('name')}
          autoCapitalize="words"
          icon="person-outline"
          error={touched.name && !nameValid ? t('auth.fullNameError') : null}
        />
        <TextField
          label={t('auth.phone')}
          placeholder="01X XXXX XXXX"
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^\d]/g, '').slice(0, 11))}
          onBlur={() => touch('phone')}
          keyboardType="phone-pad"
          maxLength={11}
          icon="phone-portrait-outline"
          error={touched.phone && !phoneValid ? t('auth.phoneError') : null}
        />
        <TextField
          label={t('auth.nationalId')}
          placeholder={t('auth.nationalIdPh')}
          value={nationalId}
          onChangeText={(text) => setNationalId(text.replace(/[^\d]/g, '').slice(0, 14))}
          onBlur={() => touch('id')}
          keyboardType="number-pad"
          maxLength={14}
          icon="card-outline"
          error={touched.id && !idValid ? t('auth.nationalIdError') : null}
        />

        <View className="flex-row items-center gap-2.5 p-3.5 rounded-2xl mt-2 bg-primary-soft">
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          <Text className="flex-1 text-[12.5px] leading-[18px] text-ink">{t('auth.infoSecure')}</Text>
        </View>
      </Screen>
    );
  }

  // Render — Step 1: OTP verification
  if (step === 1) {
    return (
      <Screen header={<Header title={t('auth.verifyTitle')} onBack={back} />} scroll={false}>
        <StepProgress steps={stepLabels} current={1} />

        <View className="items-center mt-4">
          <View className="w-[60px] h-[60px] rounded-full items-center justify-center mb-3 bg-primary-soft">
            <Ionicons name="chatbubble-ellipses" size={24} color={colors.primary} />
          </View>
          <Text className="text-xl font-extrabold text-ink">{t('auth.otpTitle')}</Text>
          <Text className="text-[13px] mt-1.5 text-center px-5 text-muted">
            {t('auth.otpSent', { phone: `+20 ${phone.slice(1)}` })}
          </Text>
        </View>

        {/* OTP input */}
        <View className="flex-row justify-center gap-2.5 mt-6" style={{ direction: 'ltr' }}>
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <View
              key={i}
              className={`w-12 h-14 rounded-2xl border-[1.5px] items-center justify-center ${
                otpError ? 'border-danger' : i === otp.length ? 'border-primary bg-primary-soft' : otp[i] ? 'border-primary' : 'border-line'
              } bg-field`}
            >
              <Text className="text-[22px] font-bold text-ink">{otp[i] ?? ''}</Text>
            </View>
          ))}
        </View>
        {otpError ? <Text className="text-center text-xs mt-2 text-danger">{otpError}</Text> : null}

        {/* Hidden input to capture keyboard */}
        <TextInput
          value={otp}
          onChangeText={(text) => {
            const clean = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
            setOtp(clean);
            if (otpError) setOtpError(null);
          }}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          autoFocus
          className="absolute opacity-0 h-0"
        />

        <Button
          title={t('auth.verifyOtp')}
          onPress={submitOtp}
          disabled={otp.length < OTP_LENGTH}
          loading={otpBusy}
          className="mt-6 mx-5"
        />

        <View className="flex-row items-center justify-center mt-4 gap-1">
          <Text className="text-sm text-muted">{t('auth.noCode')}</Text>
          {countdown > 0 ? (
            <Text className="text-sm font-bold text-muted">{t('auth.resendIn', { sec: countdown })}</Text>
          ) : (
            <Pressable onPress={resendOtp} hitSlop={8}>
              <Text className="text-sm font-bold text-primary">{t('auth.resend')}</Text>
            </Pressable>
          )}
        </View>
      </Screen>
    );
  }

  // Render — Step 2: Create PIN
  if (step === 2) {
    return (
      <Screen header={<Header title={t('auth.createPinTitle')} onBack={back} />} scroll={false}>
        <StepProgress steps={stepLabels} current={2} />

        <View className="items-center mt-4">
          <View className="w-[60px] h-[60px] rounded-full items-center justify-center mb-3 bg-primary-soft">
            <Ionicons name={pinStep === 'create' ? 'key' : 'shield-checkmark'} size={24} color={colors.primary} />
          </View>
          <Text className="text-xl font-extrabold text-ink">
            {pinStep === 'create' ? t('auth.pinCreate') : t('auth.pinConfirm')}
          </Text>
          <Text className="text-[13px] mt-1.5 text-center px-5 text-muted">
            {pinStep === 'create' ? t('auth.pinCreateSub') : t('auth.pinConfirmSub')}
          </Text>
        </View>

        <View className="flex-1 justify-end">
          <PinPad
            value={pin}
            onChange={(v) => { if (pinError) setPinError(null); setPin(v); }}
            onComplete={onPinComplete}
            error={pinError}
          />
        </View>
      </Screen>
    );
  }

  // Render — Step 3: Success
  return (
    <Screen
      footer={<Button title={t('auth.getStarted')} onPress={login} />}
      scroll={false}
    >
      <View className="flex-1 items-center justify-center px-5">
        <View className="items-center justify-center h-[190px]">
          <View className="absolute w-[180px] h-[180px] rounded-full opacity-50 bg-success-soft" />
          <View className="absolute w-[136px] h-[136px] rounded-full bg-success-soft" />
          <Animated.View
            style={{ width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.success, transform: [{ scale }] }}
          >
            <Ionicons name="checkmark" size={50} color="#FFFFFF" />
          </Animated.View>
        </View>

        <Text className="text-2xl font-extrabold text-center mt-2 text-ink">{t('auth.welcomeTitle')}</Text>
        <Text className="text-sm text-center mt-2 leading-5 text-muted">{t('auth.welcomeText')}</Text>

        <View className="flex-row items-center gap-2.5 p-3.5 rounded-2xl mt-6 self-stretch bg-primary-soft">
          <Ionicons name="information-circle" size={20} color={colors.primary} />
          <Text className="flex-1 text-[12.5px] leading-[18px] text-ink">{t('auth.welcomeTip')}</Text>
        </View>
      </View>
    </Screen>
  );
}
