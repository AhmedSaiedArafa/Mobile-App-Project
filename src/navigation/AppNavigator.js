import React from 'react';
import { View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import TabBar from './TabBar';

import { useAppState } from '../state/AppState';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

import HomeScreen from '../screens/home/HomeScreen';
import PlaceholderScreen from '../screens/home/PlaceholderScreen';

import PaymentsScreen from '../screens/payments/PaymentsScreen';
import BillCategoriesScreen from '../screens/payments/BillCategoriesScreen';
import SelectServiceProviderScreen from '../screens/payments/SelectServiceProviderScreen';
import EnterPaymentDetailsScreen from '../screens/payments/EnterPaymentDetailsScreen';
import ReviewPaymentScreen from '../screens/payments/ReviewPaymentScreen';
import PaymentResultScreen from '../screens/payments/PaymentResultScreen';

import TransferScreen from '../screens/transfer/TransferScreen';
import SelectRecipientScreen from '../screens/transfer/SelectRecipientScreen';
import TransferByIPAScreen from '../screens/transfer/TransferByIPAScreen';
import TransferByMobileScreen from '../screens/transfer/TransferByMobileScreen';
import TransferByBankAccountScreen from '../screens/transfer/TransferByBankAccountScreen';
import EnterTransferAmountScreen from '../screens/transfer/EnterTransferAmountScreen';
import QuickReviewTransferScreen from '../screens/transfer/QuickReviewTransferScreen';
import QuickTransferResultScreen from '../screens/transfer/QuickTransferResultScreen';

import TransactionHistoryScreen from '../screens/history/TransactionHistoryScreen';
import TransactionDetailsScreen from '../screens/history/TransactionDetailsScreen';

import LinkedAccountsScreen from '../screens/accounts/LinkedAccountsScreen';
import AccountDetailsScreen from '../screens/accounts/AccountDetailsScreen';
import AddBankAccountScreen from '../screens/accounts/AddBankAccountScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ManageIPAScreen from '../screens/profile/ManageIPAScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import ChangePINScreen from '../screens/profile/ChangePINScreen';
import TrustedDevicesScreen from '../screens/profile/TrustedDevicesScreen';
import LegalScreen from '../screens/profile/LegalScreen';

import NotificationsScreen from '../screens/support/NotificationsScreen';
import HelpSupportScreen from '../screens/support/HelpSupportScreen';
import FAQScreen from '../screens/support/FAQScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.background } }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Accounts" component={LinkedAccountsScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { colors, isDark, themeVars } = useTheme();
  const { isLoggedIn } = useAppState();
  const base = isDark ? DarkTheme : DefaultTheme;
  // Navigation paints these behind and between screens, so transitions never flash white.
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: colors.background, card: colors.background, primary: colors.primary },
  };

  return (
    <View className="flex-1 bg-canvas" style={themeVars}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: colors.background },
          }}
        >
        {!isLoggedIn ? (
          <>
          {/* 0 - Auth */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          </>
        ) : (
          <>
        <Stack.Screen name="Tabs" component={Tabs} />

        {/* 1 - Payments & Bills */}
        <Stack.Screen name="BillCategories" component={BillCategoriesScreen} />
        <Stack.Screen name="SelectServiceProvider" component={SelectServiceProviderScreen} />
        <Stack.Screen name="EnterPaymentDetails" component={EnterPaymentDetailsScreen} />
        <Stack.Screen name="ReviewPayment" component={ReviewPaymentScreen} />
        <Stack.Screen name="PaymentResult" component={PaymentResultScreen} options={{ gestureEnabled: false, animation: 'fade' }} />

        {/* 2 - Money Transfer */}
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="SelectRecipient" component={SelectRecipientScreen} />
        <Stack.Screen name="TransferByIPA" component={TransferByIPAScreen} />
        <Stack.Screen name="TransferByMobile" component={TransferByMobileScreen} />
        <Stack.Screen name="TransferByBankAccount" component={TransferByBankAccountScreen} />
        <Stack.Screen name="EnterTransferAmount" component={EnterTransferAmountScreen} />
        <Stack.Screen name="QuickReviewTransfer" component={QuickReviewTransferScreen} />
        <Stack.Screen name="QuickTransferResult" component={QuickTransferResultScreen} options={{ gestureEnabled: false, animation: 'fade' }} />

        {/* 3 - Transaction History */}
        <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />

        {/* 4 - Linked Accounts */}
        <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
        <Stack.Screen name="AddBankAccount" component={AddBankAccountScreen} />

        {/* 5 - Profile & IPA Management */}
        <Stack.Screen name="ManageIPA" component={ManageIPAScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ChangePIN" component={ChangePINScreen} />
        <Stack.Screen name="TrustedDevices" component={TrustedDevicesScreen} />
        <Stack.Screen name="Legal" component={LegalScreen} />

        {/* 6 - Notifications & Support */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
