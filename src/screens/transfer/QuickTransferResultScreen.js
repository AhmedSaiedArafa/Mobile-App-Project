import React, { useEffect, useRef } from 'react';
import { Animated, Share, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { formatMoney } from '../../utils/format';
import { Button, Card, DetailRow, Divider, Screen } from '../../components';

export default function QuickTransferResultScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { t, loc, money } = useI18n();
  const p = route.params;
  const ok = p.status === 'success';
  const tone = ok ? colors.success : colors.danger;
  const scale = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }).start();
  }, [scale]);

  const title = ok ? t('result.transferSuccess') : t('result.transferFailed');
  const message = ok ? t('result.msgTransfer', { name: loc(p.recipient, 'name') }) : t('result.msgFailed');

  const goHome = () => navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });

  const share = () =>
    Share.share({
      message: `${title}\n${loc(p.recipient, 'name')}\n${t('common.amount')}: ${money(p.amount)}\n${t('result.reference')}: ${p.reference}\n${p.date}`,
    });

  return (
    <Screen
      footer={
        ok ? (
          <View className="flex-row gap-3">
            <Button title={t('result.shareReceipt')} icon="share-social-outline" variant="secondary" onPress={share} className="flex-1" />
            <Button title={t('common.done')} onPress={goHome} className="flex-1" />
          </View>
        ) : (
          <View className="flex-row gap-3">
            <Button title={t('common.home')} variant="secondary" onPress={goHome} className="flex-1" />
            <Button title={t('common.tryAgain')} icon="refresh" onPress={() => navigation.goBack()} className="flex-1" />
          </View>
        )
      }
    >
      <View className="items-center justify-center h-[190px] mt-5">
        <View className={`absolute w-[180px] h-[180px] rounded-full opacity-50 ${ok ? 'bg-success-soft' : 'bg-danger-soft'}`} />
        <View className={`absolute w-[136px] h-[136px] rounded-full ${ok ? 'bg-success-soft' : 'bg-danger-soft'}`} />
        <Animated.View
          style={{ width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: tone, transform: [{ scale }] }}
        >
          <Ionicons name={ok ? 'checkmark' : 'close'} size={50} color="#FFFFFF" />
        </Animated.View>
      </View>

      <Text className="text-2xl font-extrabold text-center mt-2 text-ink">{title}</Text>
      <Text className="text-sm text-center mt-2 px-5 leading-5 text-muted">{message}</Text>
      <Text className="text-[34px] font-extrabold text-center mt-4 text-ink">
        {formatMoney(p.amount)} <Text className="text-lg font-semibold">{t('common.egp')}</Text>
      </Text>

      <Card className="mt-6">
        <DetailRow label={t('result.status')} value={ok ? t('common.completed') : t('result.failed')} valueColor={tone} />
        <DetailRow label={t('result.reference')} value={p.reference} />
        <DetailRow label={t('result.dateTime')} value={p.date} />
        <Divider />
        <DetailRow label={t('common.to')} value={loc(p.recipient, 'name')} />
        <DetailRow label={t('transfer.ipa')} value={p.recipient.ipa} />
        <DetailRow label={t('common.from')} value={p.fromAccount} />
        <Divider />
        <DetailRow label={t('common.fees')} value={p.fee ? money(p.fee) : t('common.free')} />
        <DetailRow label={t('common.total')} value={money(p.amount + p.fee)} strong />
      </Card>
    </Screen>
  );
}
