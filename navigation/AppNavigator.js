import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinkedAccountsScreen from '../screens/LinkedAccountsScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import AddBankAccountScreen from '../screens/AddBankAccountScreen';
import { colors } from '../style';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LinkedAccounts"
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }}
    >
      <Stack.Screen name="LinkedAccounts" component={LinkedAccountsScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
      <Stack.Screen name="AddBankAccount" component={AddBankAccountScreen} />
    </Stack.Navigator>
  );
}
