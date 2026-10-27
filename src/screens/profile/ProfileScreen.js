import React, { useState } from 'react';
import { Pressable, Share, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { accounts, user } from '../../data/mock';
import { BottomSheet, Button, Header, LanguageSheet, languageLabel, MenuGroup, MenuItem, Screen, ThemeToggle } from '../../components';

export default function ProfileScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { t, loc, lang } = useI18n();
  const { defaultIPA, ipas, unreadCount } = useAppState();
  const [langOpen, setLangOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // React Native's share sheet also offers "Copy" on both platforms.
  const shareIPA = () => Share.share({ message: t('ipa.shareText', { address: defaultIPA.address }) });

  return (
    <Screen header={<Header title={t('profile.title')} back={false} right={<ThemeToggle size={40} />} />}>
      <View className={`rounded-3xl p-5 overflow-hidden bg-hero ${isDark ? 'border border-hero-line' : ''}`}>
        <View className="absolute w-60 h-60 rounded-full -right-20 -top-[120px] bg-white/10" />
        <View className="flex-row items-center gap-3.5">
          <View className="w-16 h-16 rounded-full items-center justify-center bg-white/20 border-2 border-white/50">
            <Ionicons name="person" size={32} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xl font-extrabold text-white">{loc(user, 'fullName')}</Text>
              {user.verified ? <Ionicons name="checkmark-circle" size={18} color="#7CF5C0" /> : null}
            </View>
            <Text className="text-[13px] mt-[3px] text-white/80">+20 {user.mobile.slice(1)}</Text>
            <Text className="text-[13px] mt-[3px] text-white/80">{t('profile.memberSince', { date: loc(user, 'memberSince') })}</Text>
          </View>
        </View>

        {defaultIPA ? (
          <Pressable onPress={shareIPA} className="flex-row items-center gap-3 mt-[18px] rounded-2xl px-3.5 py-2.5 bg-hero-inner active:opacity-80">
            <Ionicons name="at" size={20} color="#FFFFFF" />
            <View className="flex-1">
              <Text className="text-xs text-white/75">{t('profile.defaultIPA')}</Text>
              <Text className="text-[15px] font-bold mt-0.5 text-white">{defaultIPA.address}</Text>
            </View>
            <View className="flex-row items-center gap-1 bg-white px-2.5 py-1.5 rounded-xl">
              <Ionicons name="share-social-outline" size={16} color={colors.primary} />
              <Text className="text-[12.5px] font-bold text-primary">{t('common.share')}</Text>
            </View>
          </Pressable>
        ) : null}
      </View>

      <MenuGroup title={t('profile.account')}>
        <MenuItem icon="at" accent="purple" title={t('profile.manageIPA')} subtitle={t('profile.ipaCount', { count: ipas.length })} onPress={() => navigation.navigate('ManageIPA')} />
        <MenuItem icon="business" accent="blue" title={t('profile.linkedAccounts')} subtitle={t('profile.bankCount', { count: accounts.length })} onPress={() => navigation.navigate('Accounts')} />
        <MenuItem icon="keypad" accent="orange" title={t('profile.changePIN')} subtitle={t('profile.changePINSub')} onPress={() => navigation.navigate('ChangePIN')} />
      </MenuGroup>

      <MenuGroup title={t('profile.preferences')}>
        <MenuItem icon="notifications" accent="green" title={t('profile.notifications')} badge={unreadCount || null} onPress={() => navigation.navigate('Notifications')} />
        <MenuItem icon="language" accent="blue" title={t('settings.language')} value={languageLabel(lang)} onPress={() => setLangOpen(true)} />
        <MenuItem icon="moon" accent="purple" title={t('profile.darkMode')} toggle={isDark} onToggle={toggleTheme} />
        <MenuItem icon="settings" accent="teal" title={t('profile.settings')} subtitle={t('profile.settingsSub')} onPress={() => navigation.navigate('Settings')} />
      </MenuGroup>

      <MenuGroup title={t('profile.support')}>
        <MenuItem icon="headset" accent="blue" title={t('profile.help')} onPress={() => navigation.navigate('HelpSupport')} />
        <MenuItem icon="help-circle" accent="yellow" title={t('profile.faq')} onPress={() => navigation.navigate('FAQ')} />
      </MenuGroup>

      <MenuGroup>
        <MenuItem icon="log-out-outline" title={t('profile.logout')} danger onPress={() => setLogoutOpen(true)} />
      </MenuGroup>

      <Text className="text-center text-xs mt-5 text-faint">{t('profile.version', { v: '1.0.0' })}</Text>

      <LanguageSheet visible={langOpen} onClose={() => setLangOpen(false)} />

      <BottomSheet visible={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <View className="items-center">
          <View className="w-14 h-14 rounded-full items-center justify-center bg-danger-soft">
            <Ionicons name="log-out-outline" size={26} color={colors.danger} />
          </View>
          <Text className="text-[19px] font-extrabold mt-3.5 text-ink">{t('profile.logoutQ')}</Text>
          <Text className="text-sm mt-1.5 text-center text-muted">{t('profile.logoutText')}</Text>
          <View className="flex-row gap-3 mt-[22px] self-stretch">
            <Button title={t('common.cancel')} variant="secondary" onPress={() => setLogoutOpen(false)} className="flex-1" />
            {/* TODO: clear the session and go to the login screen once auth exists */}
            <Button title={t('profile.logout')} onPress={() => setLogoutOpen(false)} className="flex-1" />
          </View>
        </View>
      </BottomSheet>
    </Screen>
  );
}
