import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { BottomSheet, Button, Card, Header, IconBadge, Screen, SectionHeader } from '../../components';

export default function TrustedDevicesScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { devices, removeDevice, removeOtherDevices } = useAppState();
  // { device } to remove one device, { all: true } to remove every other device
  const [confirm, setConfirm] = useState(null);

  const current = devices.find((d) => d.current);
  const others = devices.filter((d) => !d.current);

  const onConfirm = () => {
    if (confirm.all) removeOtherDevices();
    else removeDevice(confirm.device.id);
    setConfirm(null);
  };

  return (
    <Screen
      header={<Header title={t('devices.title')} subtitle={t('devices.count', { count: devices.length })} />}
      footer={
        others.length ? (
          <Button title={t('devices.logoutAll')} icon="log-out-outline" variant="secondary" onPress={() => setConfirm({ all: true })} />
        ) : null
      }
    >
      <View className="flex-row gap-2.5 p-3.5 rounded-2xl items-start bg-primary-soft">
        <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
        <Text className="flex-1 text-[12.5px] leading-[18px] text-ink">{t('devices.info')}</Text>
      </View>

      {current ? (
        <>
          <SectionHeader title={t('devices.thisDevice')} className="mt-1.5" />
          <DeviceCard device={current} />
        </>
      ) : null}

      <SectionHeader title={t('devices.others')} />
      {others.map((d) => (
        <DeviceCard key={d.id} device={d} onRemove={() => setConfirm({ device: d })} />
      ))}
      {!others.length ? (
        <Card className="items-center py-[22px]">
          <Ionicons name="checkmark-circle" size={30} color={colors.success} />
          <Text className="text-[13.5px] mt-2 text-muted">{t('devices.none')}</Text>
        </Card>
      ) : null}

      <BottomSheet visible={!!confirm} onClose={() => setConfirm(null)}>
        <View className="items-center">
          <View className="w-14 h-14 rounded-full items-center justify-center bg-danger-soft">
            <Ionicons name="phone-portrait" size={24} color={colors.danger} />
          </View>
          <Text className="text-[19px] font-extrabold mt-3.5 text-center text-ink">
            {confirm?.all ? t('devices.logoutAllQ') : t('devices.removeQ', { name: confirm?.device?.name })}
          </Text>
          <Text className="text-sm mt-1.5 text-center leading-5 text-muted">
            {confirm?.all ? t('devices.logoutAllText') : t('devices.removeText')}
          </Text>
          <View className="flex-row gap-3 mt-[22px] self-stretch">
            <Button title={t('common.cancel')} variant="secondary" onPress={() => setConfirm(null)} className="flex-1" />
            <Button title={confirm?.all ? t('devices.logoutAllBtn') : t('common.remove')} onPress={onConfirm} className="flex-1" />
          </View>
        </View>
      </BottomSheet>
    </Screen>
  );
}

function DeviceCard({ device, onRemove }) {
  const { t, loc } = useI18n();
  return (
    <Card className={`mb-3 ${device.current ? 'border-[1.5px] border-primary' : ''}`}>
      <View className="flex-row items-center gap-3">
        <IconBadge icon={device.icon} accent={device.current ? 'purple' : 'blue'} size={48} />
        <View className="flex-1">
          <Text className="text-[15.5px] font-bold text-ink">{device.name}</Text>
          <Text className="text-[12.5px] mt-[3px] text-muted">{device.os}</Text>
        </View>
        {device.current ? (
          <View className="flex-row items-center gap-[5px] px-2.5 py-[5px] rounded-[10px] bg-success-soft">
            <View className="w-1.5 h-1.5 rounded-full bg-success" />
            <Text className="text-[11.5px] font-bold text-success">{t('devices.active')}</Text>
          </View>
        ) : (
          <Pressable onPress={onRemove} hitSlop={8} className="px-3 py-[7px] rounded-[10px] bg-danger-soft active:opacity-70">
            <Text className="text-[12.5px] font-bold text-danger">{t('common.remove')}</Text>
          </Pressable>
        )}
      </View>
      <View className="flex-row gap-4 mt-3.5 pt-3 border-line" style={{ borderTopWidth: StyleSheet.hairlineWidth }}>
        <Detail icon="location-outline" text={loc(device, 'location')} />
        <Detail
          icon="time-outline"
          text={
            device.current
              ? t('devices.added', { date: loc(device, 'addedOn') })
              : t('devices.lastActive', { date: loc(device, 'lastActive') })
          }
        />
      </View>
    </Card>
  );
}

function Detail({ icon, text }) {
  const { colors } = useTheme();
  return (
    <View className="flex-row items-center gap-[5px] shrink">
      <Ionicons name={icon} size={14} color={colors.textFaint} />
      <Text className="text-xs text-muted" numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}
