import React, { useState } from 'react';
import { useTheme } from '../../theme';
import { useI18n } from '../../i18n';
import { useAppState } from '../../state/AppState';
import { Header, LanguageSheet, languageLabel, MenuGroup, MenuItem, Screen } from '../../components';

export default function SettingsScreen({ navigation }) {
  const { isDark, toggleTheme } = useTheme();
  const { t, money, lang } = useI18n();
  const { devices } = useAppState();
  // Local only for now - persist these through the backend / storage later.
  const [prefs, setPrefs] = useState({
    biometric: true,
    hideBalance: false,
    loginAlerts: true,
    push: true,
    transactionAlerts: true,
    billReminders: true,
    offers: false,
  });
  const [langOpen, setLangOpen] = useState(false);
  const set = (key) => (v) => setPrefs((p) => ({ ...p, [key]: v }));
  const limit = money(70000).replace('.00', '');

  return (
    <Screen header={<Header title={t('settings.title')} />}>
      <MenuGroup title={t('profile.preferences')} className="mt-1">
        <MenuItem icon="language" accent="blue" title={t('settings.language')} value={languageLabel(lang)} onPress={() => setLangOpen(true)} />
        <MenuItem icon="moon" accent="purple" title={t('profile.darkMode')} toggle={isDark} onToggle={toggleTheme} />
      </MenuGroup>

      <MenuGroup title={t('settings.security')}>
        <MenuItem icon="keypad" accent="orange" title={t('profile.changePIN')} onPress={() => navigation.navigate('ChangePIN')} />
        <MenuItem icon="finger-print" accent="green" title={t('settings.biometric')} subtitle={t('settings.biometricSub')} toggle={prefs.biometric} onToggle={set('biometric')} />
        <MenuItem icon="eye-off" accent="teal" title={t('settings.hideBalance')} toggle={prefs.hideBalance} onToggle={set('hideBalance')} />
        <MenuItem icon="shield-checkmark" accent="blue" title={t('settings.loginAlerts')} toggle={prefs.loginAlerts} onToggle={set('loginAlerts')} />
        <MenuItem icon="phone-portrait" accent="purple" title={t('settings.trustedDevices')} value={String(devices.length)} onPress={() => navigation.navigate('TrustedDevices')} />
      </MenuGroup>

      <MenuGroup title={t('settings.notifications')}>
        <MenuItem icon="notifications" accent="green" title={t('settings.push')} toggle={prefs.push} onToggle={set('push')} />
        <MenuItem icon="swap-horizontal" accent="blue" title={t('settings.txAlerts')} toggle={prefs.transactionAlerts} onToggle={set('transactionAlerts')} />
        <MenuItem icon="calendar" accent="orange" title={t('settings.billReminders')} toggle={prefs.billReminders} onToggle={set('billReminders')} />
        <MenuItem icon="pricetag" accent="pink" title={t('settings.offers')} toggle={prefs.offers} onToggle={set('offers')} />
      </MenuGroup>

      <MenuGroup title={t('settings.limits')}>
        <MenuItem icon="speedometer" accent="purple" title={t('settings.dailyLimit')} value={limit} />
        <MenuItem icon="repeat" accent="teal" title={t('settings.perTx')} value={limit} />
      </MenuGroup>

      <MenuGroup title={t('settings.about')}>
        <MenuItem icon="document-text" accent="blue" title={t('settings.terms')} onPress={() => navigation.navigate('Legal', { type: 'terms' })} />
        <MenuItem icon="lock-closed" accent="green" title={t('settings.privacy')} onPress={() => navigation.navigate('Legal', { type: 'privacy' })} />
        <MenuItem icon="information-circle" accent="purple" title={t('settings.version')} value="1.0.0" />
      </MenuGroup>

      <LanguageSheet visible={langOpen} onClose={() => setLangOpen(false)} />
    </Screen>
  );
}
